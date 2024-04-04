import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Line } from 'react-lines';

const MatchQuestion = () => {
    const [terms, setTerms] = useState([
        { id: 'term1', content: 'Term 1' },
        { id: 'term2', content: 'Term 2' },
        { id: 'term3', content: 'Term 3' },
    ]);

    const [definitions, setDefinitions] = useState([
        { id: 'definition1', content: 'Definition 1' },
        { id: 'definition2', content: 'Definition 2' },
        { id: 'definition3', content: 'Definition 3' },
    ]);

    const [matches, setMatches] = useState({});

    const handleDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId) return;

        const termId = draggableId;
        const definitionId = destination.droppableId;

        setMatches((prevMatches) => ({
            ...prevMatches,
            [termId]: definitionId,
        }));
    };

    return (
        <div className="flex justify-center mt-8">
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="terms">
                    {(provided) => (
                        <div
                            className="flex flex-col items-center w-1/2"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <h2 className="mb-4">Terms</h2>
                            {terms.map((term, index) => (
                                <Draggable key={term.id} draggableId={term.id} index={index}>
                                    {(provided) => (
                                        <div
                                            className="bg-gray-200 p-2 mb-2 rounded cursor-pointer"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {term.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <div className="flex justify-center items-center w-1/2">
                    <svg className="w-16">
                        {Object.keys(matches).map((termId) => {
                            const definitionId = matches[termId];
                            const termIndex = terms.findIndex((term) => term.id === termId);
                            const definitionIndex = definitions.findIndex(
                                (definition) => definition.id === definitionId
                            );
                            const termPosition = termIndex * 50 + 25;
                            const definitionPosition = definitionIndex * 50 + 25;
                            return (
                                <Line
                                    key={`${termId}-${definitionId}`}
                                    x0={0}
                                    y0={termPosition}
                                    x1={100}
                                    y1={definitionPosition}
                                    strokeWidth={2}
                                    strokeColor="#000"
                                />
                            );
                        })}
                    </svg>
                </div>
                <Droppable droppableId="definitions">
                    {(provided) => (
                        <div
                            className="flex flex-col items-center w-1/2"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <h2 className="mb-4">Definitions</h2>
                            {definitions.map((definition, index) => (
                                <div
                                    key={definition.id}
                                    className="bg-gray-200 p-2 mb-2 rounded"
                                    data-id={definition.id}
                                >
                                    {definition.content}
                                </div>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default MatchQuestion;
