import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar.jsx";
import Question from "../components/Question.jsx";
import {
  deletePoll,
  getPollDetails,
  getUserAnswers,
  TOKEN_CONST,
} from "../api/api.js";
import { useNavigate, useParams } from "react-router-dom";
import { makeQuestion } from "../utils/makeQuestion.js";

const PollPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pollName, setPollName] = useState("null");
  const [questions, setQuestions] = useState([]);
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const [myPoll, setMyPoll] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    getPollDetails(id).then(({ success, data, error }) => {
      if (success) {
        setPollName(data.pollName);
        setQuestions(data.questions.map((question) => makeQuestion(question)));
        setMyPoll(data.myPoll);
        setError("");
      } else {
        setError(error);
      }
    });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_CONST)) navigate("/");
    localStorage.setItem("react-polls", JSON.stringify([]));
    getUserAnswers(id).then(({ success, data, error }) => {
      if (success) {
        const result = data.map((answer) => {
          return {
            question: answer.questionName,
            option: answer.optionName,
            url: window.location.href,
          };
        });
        localStorage.setItem("react-polls", JSON.stringify(result));
        setError("");
      } else {
        setError(error);
      }
    });
  }, []);
  return (
    <div className="w-full flex items-center flex-col">
      <Navbar
        isMyPoll={myPoll}
        isPollModal={false}
        nameButton1={"Add Question"}
        functionButton1={() => {
          props.setOpenModal("default");
        }}
        nameButton2={"Return"}
        functionButton2={() => {
          navigate("/polls");
        }}
        setPolls={setQuestions}
        props={props}
      />
      <div className="p-5 w-full text-4xl flex justify-between">
        <div>
          Poll name: {pollName}, ID: {id}
        </div>
        {myPoll ? (
          <button
            onClick={() => {
              deletePoll(id).then(({ success }) => {
                if (success) navigate("/polls");
              });
            }}
            className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            type="button"
          >
            Delete Poll
          </button>
        ) : (
          <div></div>
        )}
      </div>
      {questions.map((question) => (
        <Question
          isMyPoll={myPoll}
          questionID={question.questionID}
          setQuestions={setQuestions}
          key={question.questionID}
          options={question.questionOptions}
          questionName={question.questionName}
        />
      ))}
      {error && <div>{error}</div>}
    </div>
  );
};

export default PollPage;
