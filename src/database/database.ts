import mysql from 'promise-mysql';
import keys from '../config/keys';

const pool = mysql.createPool(keys.database);
export default pool;