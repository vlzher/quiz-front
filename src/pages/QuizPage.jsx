import {useEffect, useState} from "react";
import Navbar from "../components/Navbar.jsx";
import {useNavigate, useParams} from "react-router-dom";
import AddQuestionModal from "../components/Modal/AddQuestionModal/AddQuestionModal.jsx";
import {useAuth} from "react-oidc-context";
import {deleteQuestion, deleteQuiz, getAnswers, getQuizByID, getStats} from "../api/api.js";
import {Button} from "flowbite-react";
import BarGraph from "../components/BarGraph.jsx";
import Question from "../components/Questions/Question.jsx";

const QuizPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
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
    }, [questions]);

    useEffect(() => {
        updateGraphData();
    }, [answerCount]);


    async function updateQuestions() {
        await getQuizByID(auth.user.access_token, id).then((data) => {
            setIsAuthor(data.userID === auth.user.profile.sub)
            const {title, questions} = data;
            setQuizTitle(title);
            setQuestions(questions);
        })
    }

    async function updateGraphData() {
        getStats(auth.user.access_token, id).then((data) => {
            setGraphData(data)
        })
    }

    async function updateAnswers() {
        const answerTemp = {};
        await getAnswers(auth.user.access_token, id).then((data) => {
            data.forEach((answer) => {
                answerTemp[answer.questionID] = {...answer};
            })
        })
        setAnswerCount(Object.keys(answerTemp).length);
        setAnswers(answerTemp)
    }

    function handleDeleteQuiz() {
        deleteQuiz(auth.user.access_token, id).then(() => navigate("/quizzies"))
    }

    function handleDeleteQuestion(questionID) {
        deleteQuestion(auth.user.access_token, id, questionID).then(() => updateQuestions())
        setAnswerCount(prev => prev - 1)
    }

    function increaseAnswerCount() {
        setAnswerCount(prev => prev + 1);
    }

    useEffect(() => {
        if (!answerCount || !graphData.length) {
            return;
        }
        if (answerCount === graphData.length) {
            updateGraphData();
            updateAnswers();
        }
    }, [answerCount]);

    useEffect(() => {
        if (openModal === undefined) {
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
                {questions && questions.map((question) => {
                    return <Question key={question.id} question={question} answer={answers[question.id]}
                                     deleteFunction={() => handleDeleteQuestion(question.id)} isAuthor={isAuthor}
                                     increaseAnswerCount={increaseAnswerCount} updateAnswers={updateAnswers}/>

                })}
                <AddQuestionModal openModal={openModal} setOpenModal={setOpenModal}/>
                {graphData.length !== 0 && answerCount === graphData.length &&
                    <BarGraph data={graphData} questions={questions.map((question) => question.text)}/>}
            </div>
        </div>
    );
};

export default QuizPage;
