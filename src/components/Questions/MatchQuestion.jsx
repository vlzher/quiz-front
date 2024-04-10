import React, {useState} from 'react';
import Xarrow from 'react-xarrows';

const MatchQuestion = ({width, question, optionsLeft, optionsRight }) => {
    const [connections, setConnections] = useState([]);

    const handleDragStart = (event, leftID) => {
        event.dataTransfer.setData("leftID", leftID )
    };

    const handleDrop = (event, rightID) => {
        const leftID = event.dataTransfer.getData('leftID');
        if(!leftID) return
        let newConnections = [...connections];
        newConnections = newConnections.filter((el) => el.from !== leftID && el.to !== rightID);
        newConnections.push({ from: leftID, to: rightID })
        setConnections(newConnections);
    };
    console.log(connections)
    return (
        <div className={`w-${width} p-4 border border-gray-300 rounded-lg`}>
            <h2 className="text-lg font-semibold mb-2">{question}</h2>
            <div className="flex w-full justify-between">
                <div
                    className="w-1/3 p-2 border border-gray-300 rounded-lg mr-4"
                >
                    {optionsLeft.map((option, index) => (
                        <div
                            key={`left_${index}_${option}`}
                            id={`left_${index}_${option}`}
                            draggable
                            onDragStart={(event) => handleDragStart(event, `left_${index}_${option}`)}
                            className="flex items-center space-x-2 bg-gray-100 rounded-md my-2 cursor-move"
                        >
                            <div className="select-none flex items-center justify-center w-7 h-7 m-1 rounded-full bg-gray-700">
                                {index + 1}
                            </div>
                            <span className="select-none text-black">{option}</span>
                        </div>
                    ))}
                </div>
                <div
                    className="w-1/2 p-2 border border-gray-300 rounded-lg ml-4"
                >
                    {optionsRight.map((option, index) => (
                        <div
                            key={`right_${index}_${option}`}
                            id={`right_${index}_${option}`}
                            draggable
                            onDrop={(event) => handleDrop(event,`right_${index}_${option}`)}
                            onDragOver={(e) => e.preventDefault()}
                            className="flex items-center space-x-2 bg-gray-100 rounded-md my-2 cursor-move"
                        >
                            <div className="select-none flex items-center justify-center w-7 h-7 m-1 rounded-full bg-gray-700">
                                {index + optionsLeft.length + 1}
                            </div>
                            <span className="select-none text-black">{option}</span>
                        </div>
                    ))}
                </div>
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
