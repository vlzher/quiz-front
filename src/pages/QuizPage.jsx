import {useEffect, useState} from "react";
import Navbar from "../components/Navbar.jsx";
import {useNavigate, useParams} from "react-router-dom";
import OrderQuestion from "../components/Questions/OrderQuestion.jsx";
import OneAnswerQuestion from "../components/Questions/OneAnswerQuestion.jsx";
import MultipleAnswerQuestion from "../components/Questions/MutipleAnswerQuestion.jsx";
import FileQuestion from "../components/Questions/FileQuestion.jsx";
import MatchQuestion from "../components/Questions/MatchQuestion.jsx";
import AddQuestionModal from "../components/Modal/AddQuestionModal/AddQuestionModal.jsx";
import {useAuth} from "react-oidc-context";
import {deleteQuestion, deleteQuiz, getAnswers, getQuizByID, getStats} from "../api/api.js";
import {Button} from "flowbite-react";
import BarGraph from "../components/BarGraph.jsx";

const QuizPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quizTitle, setQuizTitle] = useState("null");
  const [questions, setQuestions] = useState([]);
  const [openModal, setOpenModal] = useState();
  const [answers, setAnswers] = useState({});
  const auth = useAuth();
  const [isAuthor, setIsAuthor] = useState(false);
  const [graphData, setGraphData] = useState([]);
  const [answerCount, setAnswerCount] = useState(0);
  useEffect(() => {
    updateQuestions();
  }, []);
  useEffect(() => {
    updateGraphData();
  },[questions]);

  useEffect(() => {

    updateGraphData();
  }, [answerCount]);
  async function updateQuestions(){
    await getQuizByID(auth.user.access_token, id).then((data)=> {
      setIsAuthor(data.userID===auth.user.profile.sub)
      const { title, questions} = data;
      setQuizTitle(title);
      setQuestions(questions);
    })
  }
  async function updateGraphData(){
    getStats(auth.user.access_token, id).then((data) => {
      setGraphData(data)
    })
  }

  async function updateAnswers(){
    const answerTemp = {};
    await getAnswers(auth.user.access_token, id).then((data) => {
      data.forEach((answer) => {
        answerTemp[answer.questionID] = {...answer};
      })
    })
    setAnswerCount(Object.keys(answerTemp).length);
    setAnswers(answerTemp)
  }

  function handleDeleteQuiz(){
    deleteQuiz(auth.user.access_token, id).then(() => navigate("/quizzies"))
  }
  function handleDeleteQuestion(questionID){
    deleteQuestion(auth.user.access_token,id,questionID).then(() => updateQuestions())
    setAnswerCount(prev => prev - 1)
  }
  function increaseAnswerCount(){
    setAnswerCount(prev => prev + 1);
  }

  useEffect(() => {
    if(!answerCount || !graphData.length ){
      return;
    }
    if(answerCount === graphData.length){
        updateGraphData();
        updateAnswers();
    }

  }, [answerCount]);

  function renderQuestions(){
    return questions.map((question) => {

      switch (question.type){
        case "ONE":
          return <OneAnswerQuestion key={question.id} questionID={question.id} width={"2/3"} question={question.text} options={question.options} isModal={false} answer={answers[question.id]} isAuthor={isAuthor} deleteFunction={()=>handleDeleteQuestion(question.id)} increaseAnswerCount={increaseAnswerCount}/>
        case "MULTIPLE":
          return <MultipleAnswerQuestion key={question.id} questionID={question.id} width={"2/3"} question={question.text} options={question.options} isModal={false} answer={answers[question.id]} isAuthor={isAuthor} deleteFunction={()=>handleDeleteQuestion(question.id)} updateAnswers={updateAnswers} increaseAnswerCount={increaseAnswerCount}/>
        case "ORDER":
          return <OrderQuestion key={question.id} questionID={question.id} width={"2/3"} question={question.text} options={question.options} isModal={false} answer={answers[question.id]} isAuthor={isAuthor} deleteFunction={()=>handleDeleteQuestion(question.id)} updateAnswers={updateAnswers} increaseAnswerCount={increaseAnswerCount}/>
        case "FILE":
          return <FileQuestion key={question.id} questionID={question.id} width={"2/3"} question={question.text} isModal={false} answer={answers[question.id]} isAuthor={isAuthor} deleteFunction={()=>handleDeleteQuestion(question.id)} updateAnswers={updateAnswers} increaseAnswerCount={increaseAnswerCount}/>
        case "MATCH":
          // eslint-disable-next-line no-case-declarations
          const optionsLeft = question.options.filter((option) => option.isLeft === true);
          // eslint-disable-next-line no-case-declarations
          const optionsRight = question.options.filter((option) => option.isLeft === false);
          if(optionsLeft.length !== optionsRight.length) return null;
          return <MatchQuestion key={question.id} questionID={question.id} width={"2/3"} question={question.text} optionsLeft={optionsLeft} optionsRight={optionsRight} isModal={false} answer={answers[question.id]} isAuthor={isAuthor} deleteFunction={()=>handleDeleteQuestion(question.id)} updateAnswers={updateAnswers} increaseAnswerCount={increaseAnswerCount}/>
        default:
          return null;
      }
    })
  }

  useEffect(() => {
    if(openModal === undefined){
      updateQuestions();
      updateAnswers();
    }
  }, [openModal]);

  return (
    <div className="w-full flex items-center flex-col">
      <Navbar
        isQuizModal={false}
        leftButtonTitle={"Add Question"}
        leftButtonFunction={() => {
          setOpenModal(true);
        }}
        rightButtonTitle={"Return"}
        rightButtonFunction={() => {
          navigate("/quizzies");
        }}
        isAuthor={isAuthor}
        setFunction={setQuestions}
      />
      <div className="p-5 w-full text-4xl flex justify-between">
        <div>
          Quiz name: {quizTitle}
        </div>
        {isAuthor && <Button
            color="failure"
            onClick={() => handleDeleteQuiz()}
        >
          Delete Quiz
        </Button>}

      </div>
      <div className="flex flex-col items-center w-full">

        {questions && renderQuestions()}
        <AddQuestionModal openModal={openModal} setOpenModal={setOpenModal}/>
        {graphData.length !== 0 && answerCount === graphData.length && <BarGraph data={graphData} questions={questions.map((question) => question.text)}/>}
      </div>
    </div>
  );
};

export default QuizPage;
