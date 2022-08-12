const { validationResult } = require("express-validator");
var validator = require('validator');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const secret = require("../config/secret");
const nodemailer = require("nodemailer");
const transporter = require("../config/mailer");

/**
 * @Description Método para el registro de usuarios
 * @param {*} req Recuperación de datos para el proceso de registro
 * @param {*} res Respuesta del método
 * @param {*} next 
 * @returns 
 */
exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  //verificamos si los errores están vacios
  if (!errors.isEmpty()) return;

  // se obtienen los datos del body
  var usuario = req.body;

  console.log(usuario)

  // validar que los datos no sean nulos o indefinidos
  if (!usuario.name
    || !usuario.apellidopaterno
    || !usuario.apellidomaterno
    || !usuario.email
    || !usuario.password
     ) {
        return res.status(404).json({ message: "Todos los datos son requeridos", code: 1});
  }

  // se verifica que los datos no se encuentren vacios
  if (validator.isEmpty(usuario.name.trim())
  || validator.isEmpty(usuario.apellidopaterno.trim())
  || validator.isEmpty(usuario.apellidomaterno.trim())
  || validator.isEmpty(usuario.email.trim())
  || validator.isEmpty(usuario.password.trim())
  ) {
      return res.status(404).json({ message: "Todos los datos son requeridos", code: 1});
}

  //obtenemos los datos através del request
  const name = usuario.name;
  const apellidopaterno = usuario.apellidopaterno;
  const apellidomaterno = usuario.apellidomaterno;
  const email = usuario.email;
  const password = usuario.password;

  const findEmail = await User.find(email);
  if ( findEmail[0].length > 0 ) {
    return res.status(404).json({ message: "Este email ya está registrado", code: 0})
  }

  //Cifrado de password
  try {
    //guardamos en una constante el password encriptado
    const hashedPassword = await bcrypt.hash(password, 12);

    //se crea un objeto con la información del user
    const userDetails = {
      name: name,
      email: email,
      apellidopaterno: apellidopaterno,
      apellidomaterno: apellidomaterno,
      password: hashedPassword,
      id_rol: 1,
      resetToken: 1,
      id_Estatus: 1
    };

    //guardaremos el objeto, utilizando la función save creada en user.js
    const result = await User.save(userDetails);

    res.status(201).json({ message: "Usuario Registrado!", code: 0});
  } catch (err) {
    //detectamos cualquier error
    //si no hay un código
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err); //pasamos el método err, creado en controllers
  }
};

/**
 * @Descrition Método para el inicio de sesión de usuarios
 * @param {*} req Recuperación de datos para el proceso de registro
 * @param {*} res Respuesta del método, devuelve: (message, token, idRol, UserId, code )
 * @param {*} next 
 * @returns 
 */
exports.login = async (req, res, next) => {
  try {
    // obtener los datos del body
    const { email, password, ...rest } = req.body;
    // Se verifica la estructura de la petición
    if (Object.keys(rest).length > 0) {
      return res
        .status(400)
        .json({ message: "La estructura no es correcta", code: 1 });
    }
    // Verificar que los datos "username" y "password" existan
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos", code: 1 });
    }

    // Verificamos que exista el email
    const lstUsers = await User.find(email);
    if (lstUsers[0].length <= 0) {
      return res
        .status(404)
        .json({ message: "El email es incorrecto", code: 1 });
    }

    // obtenemos las pocisiones 0 y 1 de la lista de usuarios
    const storedUser = lstUsers[0][0];
    // obtenemos el rol del usuario
    const idUsuario = storedUser.id_rol;
    // comparamos contraseña obtenidad en el body con la que esta guaradada en la base de datos
    const isEqual = await bcrypt.compare(password, storedUser.password);

    // valida el password
    if (!isEqual) {
      return res
        .status(404)
        .json({ message: "La contraseña es incorrecta", code: 1 });
    }

    // Configuración del token
    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.id,
      },
      // jwt secret
      secret.secret.jwtSecret,
      { expiresIn: "1h" }
    );

    // retornará respuesta al front-end
    return res
      .status(200)
      .json({
        message: "Autentificación correcta",
        token: token,
        idRol: idUsuario,
        userId: storedUser.id_usuario,
        code: 0,
      });
  } catch (error) {
    return res.status(500).json({ message: `${error.message}` });
  }
};

/**
 * @Description Método que recuperará contraseña olvidada
 * @param {*} req Se recuperará el email desde el body
 * @param {*} res Enviará el mensaje del estado del envío de email
 * @param {*} next 
 * @returns 
 */
exports.forgotPassword = async (req, res, next) => {
  //recibimos el email
  const { email, ...rest } = req.body

  console.log(email)

  // Se verifica si se trajo correctamente el email
  if(!(email)){
     return res.status(400).json({message: 'Email es requerido'});
  }

  try {
       //busca el usuario con el email recuperado desde el body
       let user = await User.find(email);
       const storedUser = user[0][0];

       // validación de email
       if (user[0].length <= 0){
        return res.status(404).json({ message: "El email ingresado no existe", code: 1 });
       }

       // variable que almacenará la ruta para crear la nueva contraseña
       let verificationLink;
       // variable que indicará eñ status del email
       let emailStatus = 'ok'

       //configuración del token
       const token = jwt.sign({
        email: storedUser.correo,
        password: storedUser.password
       },
       secret.secret.jwtSecret, {expiresIn: '20m'});
       
       //lo enviaremos a través de un correo electrónico
       verificationLink = "http://localhost:4200/create-new-password/"+token; //lo podemos meter en un .env
       
       //guardamos el token del usuario en la base de datos
       const newuser = await User.update(storedUser.id_usuario, token);

       try {
          // Configuración Nodemailer para enviar el correo electrónico
          let info = await transporter.transporter.sendMail({
            from: '"The Game Stars" <GameStarts12rwwwrr3@gmail.com', // sender address
            to: storedUser.correo, // list of receivers
            subject: `Recuperación de Contraseña`, // Subject line
            html: `<h3>Hola ${storedUser.nombre} este es un correo con el que podrás recuperar tu contraseña de forma segura<h3/>
            <br>
            <b>Por favor, da click en el siguiente enlace:</b>
            <a href="${verificationLink}">Recuperar contraseña</a>`
          });
       } catch (error) {
        return res.status(500).json({ message: error, code: 1 });
       }

      return res.status(200).json({message: 'Correo electrónico enviado',  info: emailStatus});
  } catch (error) {
    return res.status(500).json({ message: `${error.message}` });
  }
}

/**
 * @Description Método que guardará la nueva contraseña del usuario
 * @param {*} req Se recuperará la nueva contraseña y el token del usuario
 * @param {*} res enviará el estatus del proceso al front-end
 * @param {*} next 
 * @returns 
 */
exports.createNewPassword = async (req, res, next) => {

    // se recuperan los datos desde el body
    const {newPassword, resetToken} = req.body;

    //validación de los campos requeridos
    if(!(resetToken && newPassword)){
      return res.status(400).json({message: "todos los campos son requeridos", code: 1});
    }

    if(validator.isEmpty(resetToken) && validator.isEmpty(newPassword)){
      return res.status(400).json({message: "todos los campos son requeridos", code: 1});
    }


    let jwtPayload;
    let user = User;
    try {
      
      try {
        jwtPayload = jwt.verify(resetToken, 'secretfortoken');
        //verificamos el token del usuario desde la base de datos
        user = await User.findToken(resetToken);

        //validación del token existente
        var storedUser = user[0][0];
        if (user[0].length <= 0){
        return res.status(400).json({message: "No se puede recuperar la contraseña, verifique el enlace enviado a su correo electrónico"});
        }
      } catch (error) {
        return res.status(400).json({message: "Necesitamos verificar su identidad através de un correo electrónico", code: 1});
      }
      
      //Nueva contraseña
      user.password = newPassword;

      //guardamos en una constante el password encriptado
      const hashedPassword = await bcrypt.hash(user.password, 12);
      //Hacemos el update del password nuevo
      await User.updatePassword(storedUser.idUser, hashedPassword);
     
    } catch (error) {
      return res.status(400).json({message: "Ocurrió un error al guardar los datos, por favor vuelve a intentarlo", code: 1});
    }

    return res.status(200).json({message: 'La contraseña se ha cambiado', code: 0});
    
}

