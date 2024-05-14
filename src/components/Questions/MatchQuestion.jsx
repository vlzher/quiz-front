import {useEffect, useState} from 'react';
import Xarrow from 'react-xarrows';
import {answerMatchQuestion} from "../../api/api.js";
import {useAuth} from "react-oidc-context";
import {Button} from "flowbite-react";

const MatchQuestion = ({
                           width,
                           questionID,
                           question,
                           optionsLeft,
                           optionsRight,
                           setState,
                           isModal,
                           answer,
                           isAuthor,
                           deleteFunction,
                           increaseAnswerCount
                       }) => {

    const [connections, setConnections] = useState([]);
    const [isCorrect, setIsCorrect] = useState(undefined);
    const auth = useAuth();


    const handleDragStart = (event, leftID) => {
        if (isCorrect !== undefined) return;
        event.dataTransfer.setData("leftID", leftID)
    };

    const handleDrop = (event, rightID) => {
        if (isCorrect !== undefined) return;
        const leftID = event.dataTransfer.getData('leftID');
        if (!leftID) return
        let newConnections = [...connections];
        newConnections = newConnections.filter((el) => el.from !== leftID && el.to !== rightID);
        newConnections.push({from: leftID, to: rightID})
        if (isModal) setState(newConnections);
        setConnections(newConnections);
    };

    useEffect(() => {
        if (answer) {
            const matchAnswers = answer.matchAnswers.map(([from, to]) => {
                const leftIndex = optionsLeft.findIndex((option) => option.id === from);
                const rightIndex = optionsRight.findIndex((option) => option.id === to);
                const {text: leftText} = optionsLeft.find((option) => option.id === from);
                const {text: rightText} = optionsRight.find((option) => option.id === to);
                return {from: `left_${leftIndex}_${leftText}_${from}`, to: `right_${rightIndex}_${rightText}_${to}`}

            })
            setConnections(matchAnswers);
            setIsCorrect(answer.isCorrect);
        }
    }, [answer]);

    function onSubmit() {
        const accessToken = auth.user.access_token;
        const answer = connections.map(({from, to}) => {
            const fromID = from.split('_')[3];
            const toID = to.split('_')[3];
            return [fromID, toID]
        });
        answerMatchQuestion(accessToken, questionID, answer).then((data) => {
            setIsCorrect(data)
        })
        setConnections([...connections])
        increaseAnswerCount();
    }


    return (
        <div
            className={`w-${width} ${!isModal && "my-3"} p-4 border ${isCorrect === undefined ? "border-gray-300" : isCorrect ? "border-green-500" : "border-red-500"} rounded-lg`}>
            <div className=" flex justify-between items-center mb-4">
                <div className={"text-lg font-semibold"}>
                    {question}
                </div>
                {isAuthor && <Button
                    size={"xs"}
                    color="failure"
                    onClick={() => deleteFunction()}
                >
                    Delete Question
                </Button>}
            </div>
            <div className="flex w-full justify-between">
                <div
                    className="w-1/3 p-2 border border-gray-300 rounded-lg mr-4"
                >
                    {optionsLeft.map(({text, id}, index) => (
                        <div
                            key={`left_${index}_${text}_${id}`}
                            id={`left_${index}_${text}_${id}`}
                            draggable
                            onDragStart={(event) => handleDragStart(event, `left_${index}_${text}_${id}`)}
                            className={`flex items-center space-x-2 bg-gray-100 rounded-md my-2 ${isCorrect === undefined && "cursor-move"}`}
                        >
                            <div
                                className="select-none flex items-center justify-center w-7 h-7 m-1 rounded-full bg-gray-700">
                                {index + 1}
                            </div>
                            <span className="select-none text-black">{text}</span>
                        </div>
                    ))}
                </div>
                <div
                    className="w-1/2 p-2 border border-gray-300 rounded-lg ml-4"
                >
                    {optionsRight.map(({text, id}, index) => (
                        <div
                            key={`right_${index}_${text}_${id}`}
                            id={`right_${index}_${text}_${id}`}
                            draggable
                            onDrop={(event) => handleDrop(event, `right_${index}_${text}_${id}`)}
                            onDragOver={(e) => e.preventDefault()}
                            className={`flex items-center space-x-2 bg-gray-100 rounded-md my-2 ${isCorrect === undefined && "cursor-move"}`}
                        >
                            <div
                                className="select-none flex items-center justify-center w-7 h-7 m-1 rounded-full bg-gray-700">
                                {index + optionsLeft.length + 1}
                            </div>
                            <span className="select-none text-black">{text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={"w-full  flex justify-center items-center mt-2"}>
                {!isModal && <button
                    type="submit"
                    onClick={onSubmit}
                    className={`w-1/2 ${isCorrect !== undefined && "opacity-0"}  text-gray-900 font-semibold bg-blue-700 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-300`}
                >
                    {"Submit Answer"}
                </button>}
            </div>
            {connections.map((connection, index) => (
                <Xarrow
                    color={"White"}
                    key={index}
                    start={connection.from}
                    end={connection.to}
                />
            ))}
        </div>
    );
};

export default MatchQuestion;
