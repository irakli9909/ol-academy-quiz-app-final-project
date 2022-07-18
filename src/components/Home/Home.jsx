import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const enterQuiz = () => {navigate("/Quiz")} 
  const enterHistory = () => {navigate('/History')}
  return (
    <div>
      <div className="title-text">
        <p>Test yourself in the Quiz</p>
      </div>
      <button className="button-items" onClick={enterQuiz}>
        Start Quiz
      </button>
      <button className="button-history" onClick={enterHistory} > History </button>
    </div>
  );
}

export default Home;
