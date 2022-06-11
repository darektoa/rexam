import app from '../configs/app.mjs';
import connection from '../configs/connection.mjs';
import ResponseJson from '../templates/response-json.mjs';

const query = {
  email: 'SELECT email FROM users WHERE email = ?',
  user: 'SELECT * FROM users WHERE email = ? AND password = ?',
  exams: 'SELECT * FROM exams WHERE id_user = ?',
};


const errorCheck = (emailPassword, email) => {
  const responseJson = ResponseJson();
  responseJson.status = 404;
  if (!email) responseJson.message.error.email = 'Email not found';
  if (!emailPassword && email) responseJson.message.error.password = 'Wrong Password';
  return responseJson;
};


app.post('/login', async (req, res) => {
  let dataUser;
  let dataEmail;

  try {
    const client = req.body;
    const conn = await connection;
    const resultUser = await conn.query(query.user, [client.email, client.password]);
    const resultEmail = await conn.query(query.email, [client.email]);
    const responseJson = ResponseJson();

    [dataUser] = resultUser;
    [dataEmail] = resultEmail;

    const resultExams = await conn.query(query.exams, [dataUser.id_user]);

    responseJson.status = 200;
    responseJson.data = dataUser;
    responseJson.data.exams = resultExams;
    responseJson.data.datetime = new Date();
    delete responseJson.data.password;

    res.status(200).json(responseJson);
  } catch (err) {
    const responseJson = errorCheck(dataUser, dataEmail);
    res.json(responseJson);
  }
});