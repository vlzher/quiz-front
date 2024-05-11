import React, {useEffect, useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {useAuth} from "react-oidc-context";
import {answerOrderQuestion} from "../../api/api.js";
import {Button} from "flowbite-react";

const OrderQuestion = ({width, questionID, question, options, setState, isModal, answer, isAuthor, deleteFunction, increaseAnswerCount }) => {
    const [orderedOptions, setOrderedOptions] = useState(options);
    const auth = useAuth();
    const [isCorrect, setIsCorrect] = useState(undefined);

    const handleDragEnd = (result) => {
        if(isCorrect !== undefined) return;
        if (!result.destination) return;
        const newOptions = Array.from(orderedOptions);
        const [removed] = newOptions.splice(result.source.index, 1);
        newOptions.splice(result.destination.index, 0, removed);
        if(isModal) setState(newOptions);
        setOrderedOptions(newOptions);
    };

    useEffect(() => {
        if(answer) {
            setIsCorrect(answer.isCorrect);

            const orderOptionsData = answer.orderAnswers.map((option) =>
                options.find(({id}) => id === option));
            setOrderedOptions(orderOptionsData);
        }

    }, []);

    function onSubmit(){
        const accessToken = auth.user.access_token;
        const answer = orderedOptions.map(({id}) => id);
        answerOrderQuestion(accessToken, questionID,answer).then((data)=>{
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
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col
                        ">
                            {orderedOptions.map(({id, text}, index) => (
                                <Draggable key={id + text} draggableId={id + text} index={index}
                                           isDragDisabled={isCorrect !== undefined}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="flex items-center space-x-2 bg-gray-100 rounded-md my-2"
                                        >
                                            <div
                                                className="select-none flex items-center justify-center w-7 h-7 m-1 rounded-full bg-gray-700">
                                                {index + 1}
                                            </div>
                                            <span className="select-none text-black">{text}</span>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {!isModal && isCorrect === undefined && <div className={"w-full flex justify-center items-center mt-2"}>
                {!isModal && <button
                    type="submit"
                    onClick={onSubmit}
                    className="w-1/2 text-gray-900 font-semibold bg-blue-700 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-300"
                >
                    {"Submit Answer"}
                </button>}
            </div>}
        </div>
    );
};

export default OrderQuestion;
