import {useMemo} from 'react';
import {Modal} from "flowbite-react";
import {ModalTypes} from "./AddQuestionModal.jsx";
import MenuButton from "./MenuButton.jsx";


const AddQuestionModalMenu = ({setModalType}) => {
    const buttonsTitles = useMemo(() =>
        [{title: "One Choose Question", onClick: () => setModalType(ModalTypes.OneAnswerQuestion)},
            {title: "Multiple Choose Question", onClick: () => setModalType(ModalTypes.MultipleAnswerQuestion)},
            {title: "File Choose Question", onClick: () => setModalType(ModalTypes.FileQuestion)},
            {title: "Match Question", onClick: () => setModalType(ModalTypes.MatchQuestion)},
            {title: "Order Question", onClick: () => setModalType(ModalTypes.OrderQuestion)}
        ], [setModalType])
    return (
        <>
            <Modal.Header><span className={"text-2xl"}>Choose Question Type</span></Modal.Header>
            <Modal.Body>
                {buttonsTitles.map(({title, onClick}) =>
                    <MenuButton key={title} title={title} onClick={onClick}/>
                )}
            </Modal.Body>
        </>
    );
};

export default AddQuestionModalMenu;