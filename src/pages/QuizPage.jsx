import  { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { useNavigate, useParams } from "react-router-dom";
import OrderQuestion from "../components/Questions/OrderQuestion.jsx";
import OneAnswerQuestion from "../components/Questions/OneAnswerQuestion.jsx";
import MultipleAnswerQuestion from "../components/Questions/MutipleAnswerQuestion.jsx";
import FileQuestion from "../components/Questions/FileQuestion.jsx";
import MatchQuestion from "../components/Questions/MatchQuestion.jsx";
import AddQuestionModal from "../components/Modal/AddQuestionModal/AddQuestionModal.jsx";

const QuizPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quizTitle, setQuizTitle] = useState("null");
  const [questions, setQuestions] = useState([]);
  const [openModal, setOpenModal] = useState();

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
          navigate("/polls");
        }}
        setFunction={setQuestions}
      />
      <div className="p-5 w-full text-4xl flex justify-between">
        <div>
          Quiz name: {quizTitle}, ID: {id}
        </div>
        {/*{myPoll ? (*/}
        {/*  <button*/}
        {/*    onClick={() => {*/}
        {/*      deletePoll(id).then(({ success }) => {*/}
        {/*        if (success) navigate("/polls");*/}
        {/*      });*/}
        {/*    }}*/}
        {/*    className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"*/}
        {/*    type="button"*/}
        {/*  >*/}
        {/*    Delete Quiz*/}
        {/*  </button>*/}
        {/*) : (*/}
        {/*  <div></div>*/}
        {/*)}*/}

      </div>
      <div className="flex flex-col items-center w-full">

        <OrderQuestion width={"1/3"} question={"What is your favorite color?"} options={[
          "Option A",
          "Option B",
          "Option C",
          "Option D",
        ]}/>
        <OneAnswerQuestion width={"1/3"} question={"What is your favorite color?"} options={[
          "Option A",
          "Option B",
          "Option C",
          "Option D",
        ]}/>
        <MultipleAnswerQuestion width={"1/3"} question={"What is your favorite color?"} options={[
          "Option A",
          "Option B",
          "Option C",
          "Option D",
        ]}/>
        <FileQuestion width={"1/3"} question={"What is your favorite color?"}/>
        <MatchQuestion width={"2/3"} question={"What is your favorite color?"} optionsLeft={["Option A",
          "Option B"]} optionsRight={[
          "Option C",
          "Option D",
        ]}/>
        <AddQuestionModal openModal={true}/>

      </div>
    </div>
  );
};

export default QuizPage;
