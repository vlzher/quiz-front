import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const OrderQuestion = ({width, question, options, setState, isModal }) => {
    const [orderedOptions, setOrderedOptions] = useState(options);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const newOptions = Array.from(orderedOptions);
        const [removed] = newOptions.splice(result.source.index, 1);
        newOptions.splice(result.destination.index, 0, removed);
        if(isModal) setState(newOptions);
        setOrderedOptions(newOptions);
    };

    return (
        <div className={`w-${width} p-4 border border-gray-300 rounded-lg`}>
            <h2 className="text-lg font-semibold mb-2">{question}</h2>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col
                        ">
                            {orderedOptions.map((option, index) => (
                                <Draggable key={option} draggableId={option} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="flex items-center space-x-2 bg-gray-100 rounded-md my-2 cursor-move"
                                        >
                                            <div className="select-none flex items-center justify-center w-7 h-7 m-1 rounded-full bg-gray-700">
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
    );
};

export default OrderQuestion;
