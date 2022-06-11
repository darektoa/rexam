import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 4444;

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(PORT, () => {
  console.log(`Success Listen On Port ${PORT}`);
});

export default app;