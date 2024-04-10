import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Modal} from "flowbite-react";
import DeleteModal from "../../DeleteModal.jsx";
import QuestionOption from "./QuestionOption.jsx";
import {ModalTypes} from "./AddQuestionModal.jsx";
const errorInputClassname =
    "bg-red-50 border text-base border-red-500 text-red-900 placeholder-red-700 text-medium rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
const errorLabelClassname =
    "block mb-2 text-base font-medium text-red-700 dark:text-red-500";
const normalInputClassname =
    "bg-gray-50 border dark:border-white border-gray-300 text-gray-900 text-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const normalLabelClassname =
    "block mb-2 text-base font-medium text-gray-900 dark:text-white";
const AddQuestionModalBody = ({questionOptions, setQuestionOptions, questionOptionsRight, setQuestionOptionsRight, questionTitle, setQuestionTitle, modalType, setModalType, setIsResultModal}) => {
    const [isInputError, setInputError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [questionOption, setQuestionOption] = useState("");

    const [openModalDelete, setOpenModalDelete] = useState();

    const [valueToDelete, setValueToDelete] = useState("");
    const [toDelete, setToDelete] = useState("");


    const { id } = useParams();

    useEffect(() => {
        setQuestionOptions((prev) => prev.filter((val) => val !== valueToDelete));
        setQuestionOptionsRight((prev) => prev.filter((val) => val !== valueToDelete));
    }, [toDelete]);
    const addQuestionOption = () => {
        if (questionOption && !questionOptions.includes(questionOption))
            setQuestionOptions((prev) => [...prev, questionOption]);
        setQuestionOption("");
    };
    const addQuestionOptionRight = () => {
        if (questionOption && !questionOptionsRight.includes(questionOption))
            setQuestionOptionsRight((prev) => [...prev, questionOption]);
        setQuestionOption("");
    }
    const onRemove = (fieldValue) => {
        setValueToDelete(fieldValue);
        setOpenModalDelete("pop-up");
    };
    const onSubmit = () => {
        if (modalType!== ModalTypes.FileQuestion && questionOptions.length < 2) {
            setInputError(true);
            setErrorMessage("Question must contains 2+ options");
            return;
        }
        if (modalType === ModalTypes.MatchQuestion && questionOptions.length !== questionOptionsRight.length){
            setInputError(true);
            setErrorMessage("Left options length must the same as right");
            return;
        }
        if (questionTitle.length < 4) {
            setInputError(true);
            setErrorMessage("Question length must have 4 symbols");
            return;
        }
        setIsResultModal(true);
    };
    return (
        <>
            <DeleteModal
                openModal={openModalDelete}
                setOpenModal={setOpenModalDelete}
                setToDelete={setToDelete}
                value={valueToDelete}
            />
            <Modal.Header>Adding New {modalType}</Modal.Header>
            <Modal.Body>
                <div>
                    <div className="mb-5">
                        <label
                            htmlFor="error"
                            className={
                                isInputError ? errorLabelClassname : normalLabelClassname
                            }
                        >
                            Enter Question
                        </label>
                        <input
                            type="text"
                            value={questionTitle}
                            onChange={(e) => setQuestionTitle(e.target.value)}
                            placeholder={"Question"}
                            className={
                                isInputError ? errorInputClassname : normalInputClassname
                            }
                        />{" "}
                    </div>
                    {modalType !== ModalTypes.FileQuestion &&
                        <>
                    <label
                        htmlFor="last_name"
                        className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                        Add Question Option
                    </label>

                            <div className="flex flex-row justify-between mb-5">
                                <input
                                    type="text"
                                    value={questionOption}
                                    onChange={(e) => setQuestionOption(e.target.value)}
                                    className="bg-gray-50 border dark:border-white border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  mr-3 p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Option Name"
                                    required
                                />
                                <button
                                    onClick={addQuestionOption}
                                    className="dark:text-gray-700 font-semibold dark:bg-gray-100 dark:hover:bg-gray-300 dark:focus:ring-gray-300 text-white bg-green-700 hover:bg-green-800 my-1 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-sm w-full sm:w-auto px-7 py-1  text-center "
                                >
                                    {modalType === ModalTypes.MatchQuestion ? "Add Left" : "Add"}
                                </button>
                                {modalType === ModalTypes.MatchQuestion && <button
                                    onClick={addQuestionOptionRight}
                                    className="dark:text-gray-700 ml-2 font-semibold dark:bg-gray-100 dark:hover:bg-gray-300 dark:focus:ring-gray-300 text-white bg-green-700 hover:bg-green-800 my-1 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-sm w-full sm:w-auto px-7 py-1  text-center "
                                >
                                    Add Right
                                </button>}
                            </div>
                            <div className={"w-full flex"}>
                                <div className={modalType !== ModalTypes.MatchQuestion ? "w-full ":"w-1/2 m-1"}>
                                    {questionOptions.map((pollField) => (
                                        <QuestionOption
                                            key={pollField}
                                            pollName={pollField}
                                            onRemove={() => onRemove(pollField)}
                                        />
                                    ))}
                                </div>
                                { modalType === ModalTypes.MatchQuestion &&
                                <div className={"w-1/2 m-1"}>
                                    {questionOptionsRight.map((pollField) => (
                                        <QuestionOption
                                            key={pollField}
                                            pollName={pollField}
                                            onRemove={() => onRemove(pollField)}
                                        />
                                    ))}
                                </div>}

                            </div>
                        </>
                    }
                    {isInputError && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">{errorMessage}</span>
                        </p>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-full flex justify-end items-center space-x-2 rounded-b dark:border-gray-600">
                    <button
                        type="button"
                        onClick={onSubmit}
                        className="text-gray-700 font-semibold dark:bg-gray-100 dark:hover:bg-gray-300 dark:focus:ring-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-cente "
                    >
                        Add Question
                    </button>
                </div>
            </Modal.Footer>
        </>

    );
};

export default AddQuestionModalBody;