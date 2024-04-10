import React, {useEffect} from 'react';
import {Modal} from "flowbite-react";
import {ModalTypes} from "./AddQuestionModal.jsx";
import OneAnswerQuestion from "../../Questions/OneAnswerQuestion.jsx";
import MultipleAnswerQuestion from "../../Questions/MutipleAnswerQuestion.jsx";
import OrderQuestion from "../../Questions/OrderQuestion.jsx";
import FileQuestion from "../../Questions/FileQuestion.jsx";
import MatchQuestion from "../../Questions/MatchQuestion.jsx";

const AddQuestionModalResult = ({
                                    modalType,
                                    setModalType,
                                    questionTitle,
                                    questionOptions,
                                    setQuestionOptions,
                                    setIsResultModal,
                                    questionOptionsRight,
                                    setQuestionOptionsRight,
    setQuestionTitle
                                }) => {
    function renderQuestion(){
        switch (modalType){
            case ModalTypes.OneAnswerQuestion:
                return (<OneAnswerQuestion width={"full"} question={questionTitle} options={questionOptions}/>)
            case ModalTypes.MultipleAnswerQuestion:
                return (<MultipleAnswerQuestion width={"full"} question={questionTitle} options={questionOptions}/> )
            case ModalTypes.OrderQuestion:
                return (<OrderQuestion width={"full"} question={questionTitle} options={questionOptions}/> )
            case ModalTypes.MatchQuestion:
                return (<MatchQuestion width={"full"} question={questionTitle} optionsLeft={questionOptions} optionsRight={questionOptionsRight} />)
            default:
                return null;
        }
    }
    
    function onSubmit(){
        setQuestionOptions([])
        setQuestionOptionsRight([])
        setQuestionTitle("")
        setModalType(ModalTypes.Menu)
        setIsResultModal(false)
    }

    useEffect(() => {
        if(modalType === ModalTypes.FileQuestion){
            setQuestionTitle("")
            setModalType(ModalTypes.Menu)
            setIsResultModal(false)
        }
    }, [modalType, setIsResultModal, setModalType]);



    return (
        <>
            <Modal.Header><span className={"text-2xl"}>Choose the Correct Answer</span></Modal.Header>
            <Modal.Body>
                <div className={"flex justify-center items-center"}>
                    {renderQuestion()}
                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className="w-full flex justify-end items-center space-x-2 rounded-b dark:border-gray-600">
                    <button
                        type="button"
                        onClick={onSubmit}
                        className="text-gray-700 font-semibold dark:bg-gray-100 dark:hover:bg-gray-300 dark:focus:ring-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-cente "
                    >
                        Add New Question
                    </button>
                </div>
            </Modal.Footer>
        </>
    );
};

export default AddQuestionModalResult;