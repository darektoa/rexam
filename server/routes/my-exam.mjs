import app from '../configs/app.mjs';
import connection from '../configs/connection.mjs';
import ResponseJson from '../templates/response-json.mjs';

const query = {
  userId: 'SELECT id_user FROM users WHERE email = ? AND password = ?',
  getExams: 'SELECT * FROM exams WHERE id_user = ?',
  getQuestions: 'SELECT * FROM questions WHERE id_exam = ?',
  getOptions: 'SELECT * FROM options WHERE id_question = ?',
};


const getMyExams = async (userId) => {
  const responseJson = ResponseJson();

  try {
    const conn = await connection;
    const resultExams = await conn.query(query.getExams, [userId]);

    responseJson.message = 'Success to get my exams';
    responseJson.data = resultExams;
    return responseJson;
  } catch (err) {
    responseJson.status = 400;
    responseJson.message = 'Failed to get my exams';
    return responseJson;
  }
};


app.post('/my-exam', async (req, res) => {
  const responseJson = ResponseJson();

  try {
    const client = req.body;
    const conn = await connection;
    const resultUser = await conn.query(query.userId, [client.email, client.password]);
    const [dataUser] = resultUser;
    const { id_user: userId } = dataUser;

    if (!userId) {
      responseJson.status = 400;
      responseJson.message = 'Invalid user';
    } else {
      const resultMyExams = await getMyExams(userId);
      res.json(resultMyExams);
    }

    res.json(responseJson);
  } catch (err) {
    responseJson.status = 400;
    responseJson.message = 'Unknown Error';
    res.json(responseJson);
  }
});

export default { getMyExams };