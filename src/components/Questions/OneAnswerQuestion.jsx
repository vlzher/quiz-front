import React, {useEffect, useState} from 'react';
import {answerChooseQuestion} from "../../api/api.js";
import {useAuth} from "react-oidc-context";
import {Button} from "flowbite-react";

const OneAnswerQuestion = ({ width, questionID, question, options, setState, isModal, answer, isAuthor, deleteFunction, increaseAnswerCount }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const auth = useAuth();
    const [isCorrect, setIsCorrect] = useState(undefined);

    const handleOptionChange = (index) => {
        if(isCorrect !== undefined) return;
        setSelectedOption(index);
        if(isModal) setState(index);
    };

    useEffect(() => {
        if(answer){
            setSelectedOption(answer.chooseAnswer);
            setIsCorrect(answer.isCorrect);
            const correctedIndex = options.findIndex((option) => option.id === answer.chooseAnswer);
            setSelectedOption(correctedIndex);
        }
    }, [answer]);

    function onSubmit(){
        const accessToken = auth.user.access_token;
        const answer = options[selectedOption].id;
        answerChooseQuestion(accessToken, questionID,answer).then((data)=>{
            setIsCorrect(data)
        })
        increaseAnswerCount();
    }

    return (
        <div
            className={`w-${width} ${!isModal && "my-3"} p-4 border ${isCorrect === undefined ? "border-gray-300" : isCorrect ? "border-green-500" : "border-red-500"} rounded-lg`}>
            <div className=" flex justify-between items-center mb-2">
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
            <div className="flex flex-col">
                {options.map(({id, text}, index) => (
                    <div key={id + text} onClick={() => handleOptionChange(index)}
                         className="flex items-center space-x-2 bg-gray-100 rounded-md my-2">
                        <div
                            className="select-none flex items-center justify-center w-8 h-7 m-1 rounded-full bg-gray-700"
                            onClick={() => handleOptionChange(index)}
                        >
                            {selectedOption === index ? '✓' : index + 1}
                        </div>
                        <div className={"w-full flex justify-between"}>
                            <label className="select-none text-black">{text}</label>
                            <input
                                className={"mx-2 checked:accent-gray-700"}
                                type="radio"
                                name={`option-${index}`}
                                value={index + 1}
                                checked={selectedOption === index}
                            />
                        </div>
                    </div>
                ))}
                <div className={"w-full flex justify-center items-center mt-2"}>
                    {!isModal && isCorrect === undefined && <button
                        onClick={onSubmit}
                        type="submit"
                        className="w-1/2 text-gray-900 font-semibold bg-blue-700 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-300"
                    >
                        {"Submit Answer"}
                    </button>}
                </div>

            </div>
        </div>
    );
};

export default OneAnswerQuestion;
