import {useEffect, useState} from 'react';
import {Modal} from "flowbite-react";
import {ModalTypes} from "./AddQuestionModal.jsx";
import OneAnswerQuestion from "../../Questions/OneAnswerQuestion.jsx";
import MultipleAnswerQuestion from "../../Questions/MutipleAnswerQuestion.jsx";
import OrderQuestion from "../../Questions/OrderQuestion.jsx";
import MatchQuestion from "../../Questions/MatchQuestion.jsx";
import {
    addFileQuestion,
    addMatchQuestion,
    addMultipleChooseQuestion,
    addOneChooseQuestion,
    addOrderQuestion
} from "../../../api/api.js";
import {useAuth} from "react-oidc-context";
import {useParams} from "react-router-dom";

const AddQuestionModalResult = ({
                                    modalType,
                                    setModalType,
                                    questionTitle,
                                    questionOptions,
                                    setQuestionOptions,
                                    setIsResultModal,
                                    questionOptionsRight,
                                    setQuestionOptionsRight,
                                    setQuestionTitle,
                                    setOpenModal
                                }) => {
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const auth = useAuth();
    const {id} = useParams();


    function renderQuestion() {
        const optionsData = questionOptions.map((option) => ({text: option}))
        const optionsDataRight = questionOptionsRight.map((option) => ({text: option}))
        switch (modalType) {
            case ModalTypes.OneAnswerQuestion:
                return (<OneAnswerQuestion width={"full"} question={questionTitle} options={optionsData} isModal={true}
                                           setState={setCorrectAnswer}/>)
            case ModalTypes.MultipleAnswerQuestion:
                return (
                    <MultipleAnswerQuestion width={"full"} question={questionTitle} options={optionsData} isModal={true}
                                            setState={setCorrectAnswer}/>)
            case ModalTypes.OrderQuestion:
                return (<OrderQuestion width={"full"} question={questionTitle} options={optionsData} isModal={true}
                                       setState={setCorrectAnswer}/>)
            case ModalTypes.MatchQuestion:
                return (<MatchQuestion width={"full"} question={questionTitle} optionsLeft={optionsData}
                                       optionsRight={optionsDataRight} isModal={true} setState={setCorrectAnswer}/>)
            default:
                return null;
        }
    }

    async function onSubmit() {
        const accessToken = auth.user.access_token;

        switch (modalType) {
            case ModalTypes.OneAnswerQuestion:
                await addOneChooseQuestion(accessToken, id, questionTitle, questionOptions, correctAnswer)
                break;
            case ModalTypes.MultipleAnswerQuestion:
                await addMultipleChooseQuestion(accessToken, id, questionTitle, questionOptions, correctAnswer)
                break;
            case ModalTypes.OrderQuestion:
                await addOrderQuestion(accessToken, id, questionTitle, questionOptions, correctAnswer)
                break;
            case ModalTypes.MatchQuestion:
                await addMatchQuestion(accessToken, id, questionTitle, questionOptions, questionOptionsRight, correctAnswer)
                break;
        }

        setQuestionOptions([])
        setQuestionOptionsRight([])
        setQuestionTitle("")
        setModalType(ModalTypes.Menu)
        setIsResultModal(false)
        setOpenModal(undefined)

    }

    useEffect(() => {
        if (modalType === ModalTypes.FileQuestion) {
            addFileQuestion(auth.user.access_token, id, questionTitle).then(() => {
                setQuestionTitle("")
                setModalType(ModalTypes.Menu)
                setIsResultModal(false)
            })
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