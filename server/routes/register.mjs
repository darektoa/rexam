/* eslint-disable object-curly-newline */
import app from '../configs/app.mjs';
import connection from '../configs/connection.mjs';
import Responsejson from '../templates/response-json.mjs';

const query = {
  email: 'SELECT * FROM users WHERE email = ?',
  username: 'SELECT * FROM users WHERE username = ?',
  addUser: 'INSERT users VALUES(null, ?, ?, ?, ?, NOW(), NOW())',
  lastInsertID: 'SELECT LAST_INSERT_ID()',
};

const addUser = async (data) => {
  const { username, email, password, name } = data;

  try {
    if (username && email && password && name) {
      const conn = await connection;
      await conn.query(query.addUser, [username, email, password, name]);
      return { status: 200, message: 'Register Successfully' };
    }

    return { status: 400, message: 'Invalid Input' };
  } catch (err) {
    return { status: 400, message: 'Register Failed' };
  }
};

app.post('/register', async (req, res) => {
  let dataEmail;
  let dataUsername;

  try {
    const client = req.body;
    const conn = await connection;
    const resultUsername = await conn.query(query.username, client.username);
    const resultEmail = await conn.query(query.email, client.email);
    const responseJson = Responsejson();

    [dataEmail] = resultEmail;
    [dataUsername] = resultUsername;

    if (dataUsername && !dataEmail) responseJson.message.error.username = 'Username Is Already';
    else if (dataEmail && dataUsername) responseJson.message.error.email = 'Account Is Already';
    else if (!(dataEmail && dataUsername)) {
      const { status, message } = await addUser(client);
      responseJson.status = status;
      responseJson.message = message;
    } else {
      responseJson.status = 400;
      responseJson.message = 'Invalid Input';
    }

    res.json(responseJson);
  } catch (err) {
    const responseJson = Responsejson();
    responseJson.message = err;
    res.json(responseJson);
  }
});