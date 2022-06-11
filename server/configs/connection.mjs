import mysql from 'promise-mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rexam',
}).then((conn) => conn);

export default connection;