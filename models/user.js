const db = require('../database/db');


//exportamos la clase User
module.exports = class User {

  //recibirá como parámetros 
  constructor(name, email, apellidopaterno, apellidomaterno, password, id_rol, resetToken) {
    this.name = name;
    this.apellidopaterno = apellidopaterno; 
    this.apellidomaterno = apellidomaterno;
    this.email = email;
    this.password = password;
    this.id_rol = id_rol;
    this.resetToken = resetToken;
  }

  //busca un usuario en función al email
  static find(email) {
    try {
      //retorna una sentencia sql
      return db.execute('SELECT * FROM usuarios WHERE correo = ?', [email]);
    } catch (error) {
      return 1;
    }
  }

    //busca un usuario en función al email
  static findToken(resetToken) {
    //retorna una sentencia sql
    return db.execute('SELECT * FROM usuarios WHERE resetToken = ?', [resetToken]);
  }

  //guarda el nuevo usuario
  static save(user) {
    //retirna una sentencia sql
    return db.execute(
      //para evitar la injeccion sql especificamos los argumentos como ?
      'INSERT INTO usuarios (nombre, apellido_paterno,  apellido_materno, password, correo,  id_rol, id_Estatus, resetToken) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [user.name, user.apellidopaterno, user.apellidomaterno, user.password, user.email, user.id_rol, user.id_Estatus, user.resetToken]
    );
  }

  static saveVenta(id_usuario, direccion, total) {
    return db.execute(`insert into ventas (id_usuario, direccion, total) values (?, ?, ?)`,
        [id_usuario, direccion, total],
    ); 
  }

  static findIdVenta() {
    return db.execute('SELECT LAST_INSERT_ID() as idVenta');
  }

  static InsertProductoVendido(idVenta, idProducto) {
    console.log('valor',idProducto, idVenta)
    return db.execute(`insert into productos_vendidos
            (id_venta, id_producto)
            values
            (?, ?)`,
        [idVenta, idProducto],
    )
  }

    //actualiza el nuevo usuario con el token
    static update(idUser, User) {
      //retirna una sentencia sql
      return db.execute(
        //para evitar la injeccion sql especificamos los argumentos como ?
        `update usuarios set resetToken = '${User}' WHERE id_usuario = '${idUser}';`
      );
    }

    //actualiza el usuario con su nueva contraseña
    static updatePassword(idUser, User) {
      //retirna una sentencia sql
      return db.execute(
        //para evitar la injeccion sql especificamos los argumentos como ?
        `update usuarios set password = '${User}' WHERE id_usuario = '${idUser}';`
      );
    }
};
