import React from 'react';

const QuestionOption = ({pollName, onRemove}) => {
    return (
        <div>
            <ul className="mb-4 w-full font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-200 dark:border-gray-600 dark:text-gray-900">
                <div
                    className="w-full flex-row flex justify-between items-center px-4 py-3 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                    <li className={"text-xl text-pretty font-semibold"}>{pollName}</li>
                    <button
                        onClick={() => onRemove()}
                        className="text-gray-300 font-semibold bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                        Remove
                    </button>
                </div>
            </ul>
        </div>
    );
};

export default QuestionOption;