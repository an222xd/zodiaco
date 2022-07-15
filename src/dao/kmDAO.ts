// imports
import pool from '../database/database';

class KmDAO {
    public async saveData(signo: number, genero: number, edad: number, sueldo: number, parejas: number) {
        try {
            const result = await pool.then(async (connection) => {
                return await connection.query(`INSERT INTO DatosU (signo, genero, edad, sueldo, parejas)VALUES (${signo}, ${genero}, ${edad}, ${sueldo}, ${parejas})`);
            });
            return result;
        } catch (err) {
            return err;
        }
    }

    public async getData(x: String, y: String){
        try {
            const result = await pool.then(async (connection) => {
                return await connection.query(`SELECT ${x}, ${y} FROM DatosU`);
            });
            return result.recordset;
        } catch (err) {
            return err;
        }
    }

    public async countData(){
        try {
            const result = await pool.then(async (connection) => {
                return await connection.query(`SELECT COUNT(*) as count FROM DatosU`);
            });
            return result.recordset;
        } catch (err) {
            return err;
        }
    }
}

export const dao = new KmDAO();