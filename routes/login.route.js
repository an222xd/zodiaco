const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const authController = require('../controllers/login.controller');


//Validación de un usuario
router.post(
  '/signup',
  [
    //se usa el validator body de express, quitar espacios -> trim() , no esté vacio .not().isEmpty()
    body('name').trim().not().isEmpty(),
    body('email')
      //verificamos que sea un correo electrónico
      .isEmail()
      .withMessage('Please enter a valid email.')
      //normalizamos el  email, lo convierte a minúsculas
      .normalizeEmail(),
      //se valida el password con una longitud mínima de 7
    body('password').trim().isLength({ min: 7 }),
  ],
  authController.signup
);

router.post('/login', authController.login);

//recuperar contraseña
router.put('/forgot-password', authController.forgotPassword);
//crear nueva contraseña
router.put('/new-password', authController.createNewPassword);

module.exports = router;
