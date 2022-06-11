import NotFoundStyle from '../../styles/404.lazy.css';
import LoginStyle from '../../styles/login.lazy.css';
import RegisterStyle from '../../styles/register.lazy.css';
import RegisterResultStyle from '../../styles/register-result.lazy.css';
import DashboardStyle from '../../styles/dashboard.lazy.css';
import JoinExamStyle from '../../styles/join-exam.lazy.css';
import MyExamStyle from '../../styles/my-exam.lazy.css';
import CreateExamStyle from '../../styles/create-exam.lazy.css';
import CreateExam2Style from '../../styles/create-exam-2.lazy.css';
import ExamIdStyle from '../../styles/exam-id.lazy.css';

const RouteStyles = {
  '/': LoginStyle,
  '/404': NotFoundStyle,
  '/login': LoginStyle,
  '/register': RegisterStyle,
  '/register-result': RegisterResultStyle,
  '/dashboard': DashboardStyle,
  '/join-exam': JoinExamStyle,
  '/my-exam': MyExamStyle,
  '/create-exam': CreateExamStyle,
  '/create-exam-2': CreateExam2Style,
  '/exam/:id': ExamIdStyle,
};

// METHOD TO UNUSE ALL ROUTES STYLE
RouteStyles.unuseAll = () => {
  const styles = Object.values(RouteStyles);
  styles.forEach((style) => {
    if ('unuse' in style) style.unuse();
  });
};

export default RouteStyles;