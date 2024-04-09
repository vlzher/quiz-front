import React from 'react';

const FileQuestion = ({ width, question }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className={`w-${width} p-4 border border-gray-300 rounded-lg`}>
            <h2 className="text-lg font-semibold mb-3">{question}</h2>
            <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none dark:text-white"
                id="file_input" type="file" onChange={handleFileChange} />
        </div>
    );
};

export default FileQuestion;
