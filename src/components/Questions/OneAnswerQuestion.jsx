import React, { useState } from 'react';

const OneAnswerQuestion = ({ width, question, options }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (index) => {
        setSelectedOption(index);
    };

    return (
        <div className={`w-${width} p-4 border border-gray-300 rounded-lg`}>
            <h2 className="text-lg font-semibold mb-2">{question}</h2>
            <div className="flex flex-col">
                {options.map((option, index) => (
                    <div key={option} onClick={() => handleOptionChange(index)} className="flex items-center space-x-2 bg-gray-100 rounded-md my-2">
                        <div
                            className="select-none flex items-center justify-center w-8 h-7 m-1 rounded-full bg-gray-700"
                            onClick={() => handleOptionChange(index)}
                        >
                            {selectedOption === index ? '✓' : index + 1}
                        </div>
                        <div className={"w-full flex justify-between"}>
                            <label className="select-none text-black">{option}</label>
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
            </div>
        </div>
    );
};

export default OneAnswerQuestion;
