import React, { useState } from 'react';

const MultipleAnswerQuestion = ({ question, options }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionChange = (index) => {
        const selectedIndex = selectedOptions.indexOf(index);
        if (selectedIndex === -1) {
            // If option is not selected, add it to selectedOptions
            setSelectedOptions([...selectedOptions, index]);
        } else {
            // If option is already selected, remove it from selectedOptions
            const newSelectedOptions = [...selectedOptions];
            newSelectedOptions.splice(selectedIndex, 1);
            setSelectedOptions(newSelectedOptions);
        }
    };

    return (
        <div className="w-1/3 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">{question}</h2>
            <div className="flex flex-col h-52">
                {options.map((option, index) => (
                    <div key={option} onClick={() => handleOptionChange(index)} className="flex items-center space-x-2 bg-gray-100 rounded-md my-2">
                        <div
                            className="select-none flex items-center justify-center w-8 h-7 m-1 rounded-full bg-gray-700"
                            onClick={() => handleOptionChange(index)}
                        >
                            {selectedOptions.includes(index) ? '✓' : index + 1}
                        </div>
                        <div className={"w-full flex justify-between"}>
                            <label className="select-none text-black">{option}</label>
                            <input
                                className={"mx-2 bg-green-200"}
                                type="checkbox"
                                name={`option-${index}`}
                                value={index + 1}
                                checked={selectedOptions.includes(index)}
                                onChange={() => handleOptionChange(index)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultipleAnswerQuestion;
