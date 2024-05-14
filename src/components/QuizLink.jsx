import {useNavigate} from "react-router-dom";

const QuizLink = ({quizId, quizName}) => {
    const navigate = useNavigate();

    return (
        <div
            className={
                "mt-5 w-3/4 h-20 flex justify-center items-center cursor-pointer select-none font-semibold text-5xl text-gray-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-200"
            }
            onClick={() => {
                navigate(`/quiz/${quizId}`);
            }}
        >
            {quizName}
        </div>
    );
};

export default QuizLink;
