import {useEffect, useState} from 'react';
import {answerFileQuestion} from "../../api/api.js";
import {useAuth} from "react-oidc-context";
import {Button} from "flowbite-react";

const FileQuestion = ({
                          questionID,
                          width,
                          question,
                          isModal,
                          answer,
                          isAuthor,
                          deleteFunction,
                          increaseAnswerCount
                      }) => {
    const [isCorrect, setIsCorrect] = useState(undefined)
    const auth = useAuth();
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        if (answer) {
            setFileName(answer.fileName);
            setIsCorrect(answer.isCorrect);
        }
    }, [answer]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setFile(file);

    };

    const onSubmit = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('request', JSON.stringify({questionID}));
            const accessToken = auth.user.access_token;
            await answerFileQuestion(accessToken, questionID, formData).then((data) => {
                setIsCorrect(data);
                setFileName(file.name);
            });
        }
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
            {isCorrect !== undefined && <h2 className="text-lg font-semibold mt-2">{`Submitted file: ${fileName}`}</h2>}

            {isCorrect === undefined && <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none dark:text-white"
                id="file_input" type="file" onChange={handleFileChange}/>}
            <div className={"w-full flex justify-center  mt-4"}>
                {!isModal && isCorrect === undefined && <button
                    onClick={onSubmit}
                    type="submit"
                    className="w-1/2 text-gray-900 font-semibold bg-blue-700 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-300"
                >
                    {"Submit Answer"}
                </button>}
            </div>
        </div>
    );
};

export default FileQuestion;
