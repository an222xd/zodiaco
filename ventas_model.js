const conexion = require("./conexion")
module.exports = {
  obtenerProductosVendidos(idVenta) {
    return new Promise((resolve, reject) => {
      conexion.query(`select productos.* from productos_vendidos inner join productos on productos.id = productos_vendidos.id_producto where productos_vendidos.id_venta = ?;`,
        [idVenta],
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        });
    });
  },
  obtenerPorId(id) {
    return new Promise((resolve, reject) => {
      conexion.query(`select ventas.total, ventas.direccion, usuarios.nombre FROM ventas inner join usuarios on ventas.id_usuario = usuarios.id_usuario WHERE ventas.id = ?`,
        [id],
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados[0]);
        });
    });
  },
  obtener() {
    return new Promise((resolve, reject) => {
      conexion.query(`select ventas.id, ventas.direccion, ventas.total, usuarios.nombre FROM ventas inner join usuarios on ventas.id_usuario = usuarios.id_usuario;`,
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        });
    });
  },
  insertar( idUsuario, direccion, total) {
    console.log('entro', direccion, idUsuario, total)
    return new Promise((resolve, reject) => {
      conexion.query(`insert into ventas
            (id_usuario, direccion, total)
            values
            (?, ?, ?)`,
        [idUsuario, direccion, total], (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados.insertId);
        });
    });
  },

}
