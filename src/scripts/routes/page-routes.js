// PAGES IMPORT
import NotFound from '../views/pages/404.js';
import Login from '../views/pages/login.js';
import Register from '../views/pages/register.js';
import Dashboard from '../views/pages/dashboard.js';
import JoinExam from '../views/pages/join-exam.js';
import MyExam from '../views/pages/my-exam.js';
import CreateExam from '../views/pages/create-exam.js';
import CreateExam2 from '../views/pages/create-exam-2.js';
import ExamId from '../views/pages/exam-id.js';

const PageRoutes = {
  '/': Login,
  '/404': NotFound,
  '/login': Login,
  '/register': Register,
  '/dashboard': Dashboard,
  '/join-exam': JoinExam,
  '/my-exam': MyExam,
  '/create-exam': CreateExam,
  '/create-exam-2': CreateExam2,
  '/exam/:id': ExamId,
};

// METHOD TO REDIRECT PAGE TO ANOTHER PAGE
PageRoutes.redirect = (source) => {
  window.location.hash = `#${source}`;
};

export default PageRoutes;