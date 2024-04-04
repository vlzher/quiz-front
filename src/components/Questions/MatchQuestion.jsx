import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const MatchQuestion = ({ question, optionsLeft, optionsRight }) => {
    const [orderedOptionsLeft, setOrderedOptionsLeft] = useState(optionsLeft);
    const [orderedOptionsRight, setOrderedOptionsRight] = useState(optionsRight);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        if (result.source.droppableId === 'left' && result.destination.droppableId === 'left') {
            const newOptionsLeft = Array.from(orderedOptionsLeft);
            const [removed] = newOptionsLeft.splice(result.source.index, 1);
            newOptionsLeft.splice(result.destination.index, 0, removed);
            setOrderedOptionsLeft(newOptionsLeft);
        } else if (result.source.droppableId === 'right' && result.destination.droppableId === 'right') {
            const newOptionsRight = Array.from(orderedOptionsRight);
            const [removed] = newOptionsRight.splice(result.source.index, 1);
            newOptionsRight.splice(result.destination.index, 0, removed);
            setOrderedOptionsRight(newOptionsRight);
        }
    };

    return (
        <div className="flex flex-col w-1/3 justify-center">
            <h2 className="text-lg font-semibold mb-2">{question}</h2>
            <div className="flex w-full justify-between">
                <div className="w-1/2 p-2 border border-gray-300 rounded-lg mr-4">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="left">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col">
                                    {orderedOptionsLeft.map((option, index) => (
                                        <Draggable key={option} draggableId={option} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="flex items-center space-x-2 bg-gray-100 rounded-md my-2 cursor-move"
                                                >
                                                    <div
                                                        className="select-none flex items-center justify-center w-7 h-7 m-1 rounded-full bg-gray-700">
                                                        {index + 1}
                                                    </div>
                                                    <span className="select-none text-black">{option}</span>

                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>

                <div className="w-1/2 p-2 border border-gray-300 rounded-lg ml-4">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="right">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col">
                                    {orderedOptionsRight.map((option, index) => (
                                        <Draggable key={option} draggableId={option} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="flex items-center space-x-2 bg-gray-100 rounded-md my-2 cursor-move"
                                                >
                                                    <div
                                                        className="select-none flex items-center justify-center w-7 h-7 m-1 rounded-full bg-gray-700">
                                                        {index + orderedOptionsLeft.length + 1}
                                                    </div>
                                                    <span className="select-none text-black">{option}</span>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </div>
    );
};

export default MatchQuestion;
