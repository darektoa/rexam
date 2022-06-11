import app from '../configs/app.mjs';
import connection from '../configs/connection.mjs';
import ResponseJson from '../templates/response-json.mjs';
import CodeGenerator from '../utils/code-generator.mjs';

const query = {
  userId: 'SELECT id_user FROM users WHERE email = ? AND password = ?',
  optionId: 'SELECT id_option FROM options WHERE id_question = ? AND index_option = ?',
  exam: 'SeLECT * FROM exams WHERE id_exam = ?',
  exams: 'SELECT * FROM exams WHERE id_user = ?',
  examCodes: 'SELECT code_exam FROM exams',
  addExam: 'INSERT exams VALUES(null, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
  addQuestion: 'INSERT questions VALUES(null, ?, ?, NOW(), NOW())',
  addOption: 'INSERT options VALUES(null, ?, ?, ?, NOW())',
  addAnswer: 'INSERT answers VALUES(null, ?, ?, NOW())',
  lastInsertID: 'SELECT LAST_INSERT_ID()',
};


const addQuestion = async (examId, question) => {
  const responseJson = ResponseJson();

  try {
    const conn = await connection;
    const result = await conn.query(query.addQuestion, [examId, question]);

    responseJson.message = 'Success add question';
    responseJson.data = result;
    return responseJson;
  } catch (err) {
    responseJson.status = 400;
    responseJson.message = 'Failed add question';
    return responseJson;
  }
};


const addOption = async (questionId, data) => {
  const responseJson = ResponseJson();

  try {
    console.log(questionId, data);
    const { indexOption, value } = data;
    const conn = await connection;
    const result = await conn.query(query.addOption, [questionId, indexOption, value]);

    responseJson.message = 'Success add option';
    responseJson.data = result;
    return responseJson;
  } catch (err) {
    responseJson.status = 400;
    responseJson.message = 'Failed add option';
    return responseJson;
  }
};


const addAnswer = async (questionId, indexOption) => {
  const responseJson = ResponseJson();

  try {
    const conn = await connection;
    const resultOptionId = await conn.query(query.optionId, [questionId, indexOption]);
    const { id_option: optionId } = resultOptionId[0];
    const result = await conn.query(query.addAnswer, [questionId, optionId]);
    console.log(resultOptionId[0], result);

    responseJson.message = 'Success add answer';
    return responseJson;
  } catch (err) {
    responseJson.status = 400;
    responseJson.message = 'Failed to add answer';
    return responseJson;
  }
};


const addOptions = async (questionId, options) => {
  const responseJson = ResponseJson();

  try {
    options.forEach(async (item, index) => {
      const result = await addOption(questionId, {
        indexOption: index,
        value: item,
      });
      console.log(item, index);
      console.log(result);
    });

    responseJson.message = 'Success add all options';
    return responseJson;
  } catch (err) {
    responseJson.status = 400;
    responseJson.message = 'Failed add some options';
    return responseJson;
  }
};


const addQuestions = async (examId, questions) => {
  const responseJson = ResponseJson();

  try {
    questions.forEach(async (item) => {
      const { question, options, answer } = item;
      const resultQuestion = await addQuestion(examId, question);
      const { insertId: questionId } = resultQuestion.data;
      await addOptions(questionId, options);
      await addAnswer(questionId, answer);
    });

    responseJson.message = 'Success add all questions';
    return responseJson;
  } catch (err) {
    responseJson.status = 400;
    responseJson.message = 'Failed add some question';
    return responseJson;
  }
};


const addExam = async (userId, data) => {
  const responseJson = ResponseJson();

  try {
    const conn = await connection;
    const examCodes = await conn.query(query.examCodes);
    const examCode = CodeGenerator.generate(6, examCodes);
    console.log(userId, data, examCode);

    if (examCode && data) {
      const resultAddExam = await conn.query(query.addExam, [
        userId,
        examCode,
        data.examName,
        data.examDuration,
        data.examDescription,
        data.examStatus || '1',
      ]);
      const { insertId: examId } = resultAddExam;
      await addQuestions(examId, data.questions);
      const resultExam = await conn.query(query.exam, examId);
      const [dataExam] = resultExam;

      responseJson.message = 'Success add exam';
      responseJson.data = dataExam;
      return responseJson;
    }

    responseJson.status = 400;
    responseJson.message = 'Invalid input';
    return responseJson;
  } catch (err) {
    responseJson.status = 400;
    responseJson.message = 'Failed add exam';
    return responseJson;
  }
};


app.post('/create-exam', async (req, res) => {
  const responseJson = ResponseJson();

  try {
    const client = req.body;
    const conn = await connection;
    const resultUser = await conn.query(query.userId, [client.email, client.password]);
    const [dataUser] = resultUser;
    const { id_user: userId } = dataUser;

    if (!userId) {
      responseJson.status = 400;
      responseJson.message = 'Invalid User';
    } else {
      const result = await addExam(userId, client);
      res.json(result);
    }

    res.json(responseJson);
  } catch (err) {
    responseJson.status = 400;
    responseJson.message = 'Error Unknown';
    res.json(responseJson);
  }
});