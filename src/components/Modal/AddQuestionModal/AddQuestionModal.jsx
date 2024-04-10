import React, {useEffect, useState} from "react";
import {Modal} from "flowbite-react";
import DeleteModal from "../../DeleteModal.jsx";
import AddQuestionModalMenu from "./AddQuestionModalMenu.jsx";
import AddQuestionModalBody from "./AddQuestionModalBody.jsx";
import AddQuestionModalResult from "./AddQuestionModalResult.jsx";

export const ModalTypes = {
    Menu: "Menu",
    OneAnswerQuestion: "One Answer Question",
    MultipleAnswerQuestion: "Multiple Answer Question",
    OrderQuestion: "Order Question",
    MatchQuestion: "Match Question",
    FileQuestion: "File Question"
}

const AddQuestionModal = ({openModal, setOpenModal}) => {
    const [modalType, setModalType] = useState(ModalTypes.Menu)
    const [isResultModal, setIsResultModal] = useState("");
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionOptions, setQuestionOptions] = useState([]);
    const [questionOptionsRight, setQuestionOptionsRight] = useState([]);
    return (
        <>

            <Modal
                show={openModal}
                onClose={() => setOpenModal(undefined)}
            >
                {modalType === ModalTypes.Menu &&
                    <AddQuestionModalMenu modalType={modalType} setModalType={setModalType}/>}
                {modalType !== ModalTypes.Menu && !isResultModal &&
                    <AddQuestionModalBody questionTitle={questionTitle} questionOptionsRight={questionOptionsRight} setQuestionOptionsRight={setQuestionOptionsRight} setQuestionTitle={setQuestionTitle} questionOptions={questionOptions} setQuestionOptions={setQuestionOptions} setIsResultModal={setIsResultModal} modalType={modalType} setModalType={setModalType}/>}
                {modalType && isResultModal && <AddQuestionModalResult setQuestionTitle={setQuestionTitle} questionTitle={questionTitle} questionOptions={questionOptions} modalType={modalType} setModalType={setModalType}
                                                                       setQuestionOptions={setQuestionOptions}
                                                                       setQuestionOptionsRight={setQuestionOptionsRight}

                                                                       questionOptionsRight={questionOptionsRight}
                                                                       setIsResultModal={setIsResultModal}/>}
            </Modal>
        </>
    );
};

export default AddQuestionModal;
