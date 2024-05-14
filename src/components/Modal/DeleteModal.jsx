import {Button, Modal} from "flowbite-react";

export default function DeleteModal({openModal, setOpenModal, setToDelete, value}) {
    return (
        <>
            <Modal
                show={openModal === "pop-up"}
                size="md"
                popup
                onClose={() => setOpenModal(undefined)}
            >
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                onClick={() => {
                                    setOpenModal(undefined);
                                    setToDelete(value);
                                }}
                            >
                                Yes, I'm sure
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => {
                                    setOpenModal(undefined);
                                }}
                            >
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
