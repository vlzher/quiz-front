import { useState } from "react";
import { Modal } from "flowbite-react";
import {useAuth} from "react-oidc-context";
import {createQuiz} from "../../api/api.js";

const errorInputClassname =
  "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
const errorLabelClassname =
  "block mb-2 text-sm font-medium text-red-700 dark:text-red-500";
const normalInputClassname =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const normalLabelClassname =
  "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

const AddQuizModal = ({ openModal, setOpenModal, setQuizzes}) => {
  const [quizTitle, setQuizTitle] = useState("");
  const [isInputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = useAuth();


  const onSubmit = () => {
    if (quizTitle.length < 4) {
      setInputError(true);
      setErrorMessage("quiz title length must have 4 symbols");
    }
    createQuiz(auth.user.access_token,quizTitle).then(({id,quizTitle}) => {
        setQuizzes(quizzes => [...quizzes, {id, title: quizTitle}])
        setOpenModal(undefined);
        setQuizTitle("");
    })
  };

  return (
    <>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header><div className={"font-semibold text-xl text-white"}>Adding new Quiz</div></Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-5">
              <label
                htmlFor="error"
                className={
                  isInputError ? errorLabelClassname : normalLabelClassname
                }
              >
                Enter Quiz name
              </label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className={
                  isInputError ? errorInputClassname : normalInputClassname
                }
              />{" "}
            </div>

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
              className=" font-semibold dark:text-gray-900 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-200"
            >
              Add Quiz
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddQuizModal;
