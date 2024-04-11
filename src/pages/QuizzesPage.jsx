import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import QuizLink from "../components/QuizLink.jsx";

const QuizzesPage = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [openModal, setOpenModal] = useState();

  return (
    <div className="w-full flex items-center flex-col">
      <Navbar
        isQuizModal={true}
        rightButtonFunction={() => {
          navigate("/login");
        }}
        rightButtonTitle={"Logout"}
        leftButtonTitle={"Add The Quiz"}
        leftButtonFunction={() => {
          setOpenModal(true);
        }}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setFunction={setQuizzes}
      />
      <div className="p-5 w-full text-4xl flex justify-start">
        <div className={"text-4l text-white font-semibold"}>Current Quizzes:</div>
      </div>

        <QuizLink
            quizName={123}
            quizId={1}
        />
    </div>
  );
};

export default QuizzesPage;
