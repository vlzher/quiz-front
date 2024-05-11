import {useEffect, useState} from "react";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import QuizLink from "../components/QuizLink.jsx";
import {useAuth} from "react-oidc-context";
import {getQuizzes, getStats} from "../api/api.js";

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [openModal, setOpenModal] = useState();
  const auth = useAuth();


    useEffect(() => {
       getQuizzes(auth.user.access_token).then((data) => {
            setQuizzes(data)
        })
    },[])

  return (
    <div className="w-full flex items-center flex-col">
      <Navbar
        isQuizModal={true}
        rightButtonFunction={() => {
            auth.signoutRedirect({ post_logout_redirect_uri: 'http://localhost:5173' })
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
        {
            quizzes && quizzes.map((quiz) => <QuizLink
                    key={quiz.id}
                    quizName={quiz.title}
                    quizId={quiz.id}
                />
            )
        }
    </div>
  );
};

export default QuizzesPage;
