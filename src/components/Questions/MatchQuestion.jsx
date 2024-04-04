import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const MatchQuestion = () => {
    const [leftColumn, setLeftColumn] = useState([
        { id: '1', content: 'Item 1', connectedTo: null },
        { id: '2', content: 'Item 2', connectedTo: null },
        // Add more items as needed
    ]);

    const [rightColumn, setRightColumn] = useState([]);

    const [lines, setLines] = useState([]);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        const draggedItem = leftColumn[sourceIndex];
        const newLeftColumn = [...leftColumn];
        newLeftColumn.splice(sourceIndex, 1);

        const newRightColumn = [...rightColumn, draggedItem];
        setLeftColumn(newLeftColumn);
        setRightColumn(newRightColumn);

        // Update lines
        updateLines();
    };

    const updateLines = () => {
        const newLines = rightColumn.map((item) => {
            if (item.connectedTo !== null) {
                const from = document.getElementById(item.id);
                const to = document.getElementById(item.connectedTo);

                const fromRect = from.getBoundingClientRect();
                const toRect = to.getBoundingClientRect();

                return {
                    from: {
                        x: fromRect.left + fromRect.width / 2,
                        y: fromRect.top + fromRect.height / 2,
                    },
                    to: {
                        x: toRect.left + toRect.width / 2,
                        y: toRect.top + toRect.height / 2,
                    },
                };
            } else {
                return null;
            }
        });

        setLines(newLines.filter((line) => line !== null));
    };

    return (
        <div className="flex justify-center">
            <div className="w-1/2">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="left-column">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {leftColumn.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                id={item.id}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="p-4 mb-2 bg-gray-200 rounded-md cursor-pointer"
                                            >
                                                {item.content}
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
            <div className="w-1/2">
                <Droppable droppableId="right-column">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="h-full"
                        >
                            {rightColumn.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <div
                                            id={item.id}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="p-4 mb-2 bg-gray-200 rounded-md cursor-pointer"
                                        >
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
            <div className="w-1/2 relative">
                {lines.map((line, index) => (
                    <svg key={index} className="absolute" style={{ zIndex: -1 }}>
                        <line
                            x1={line.from.x}
                            y1={line.from.y}
                            x2={line.to.x}
                            y2={line.to.y}
                            stroke="black"
                            strokeWidth="2"
                        />
                    </svg>
                ))}
            </div>
        </div>
    );
};

export default MatchQuestion;
