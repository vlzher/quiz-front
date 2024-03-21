import React, { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import PollField from "./PollField.jsx";
import DeleteModal from "./DeleteModal.jsx";
import { makeQuestion } from "../utils/makeQuestion.js";
import { addQuestionToPoll } from "../api/api.js";
import { useParams } from "react-router-dom";

const errorInputClassname =
  "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
const errorLabelClassname =
  "block mb-2 text-sm font-medium text-red-700 dark:text-red-500";
const normalInputClassname =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const normalLabelClassname =
  "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

const ModalQuestion = ({ props, setQuestions }) => {
  const [questionName, setQuestionName] = useState("");
  const [isInputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [questionOption, setQuestionOption] = useState("");
  const [questionOptions, setQuestionOptions] = useState([]);
  const [openModalDelete, setOpenModalDelete] = useState();
  const propsDelete = {
    openModal: openModalDelete,
    setOpenModal: setOpenModalDelete,
  };
  const { id } = useParams();
  const [valueToDelete, setValueToDelete] = useState("");
  const [toDelete, setToDelete] = useState("");

  const addQuestionOption = () => {
    if (questionOption && !questionOptions.includes(questionOption))
      setQuestionOptions((prev) => [...prev, questionOption]);
    setQuestionOption("");
  };
  useEffect(() => {
    setQuestionOptions((prev) => prev.filter((val) => val !== valueToDelete));
  }, [toDelete]);
  const onRemove = (fieldValue) => {
    setValueToDelete(fieldValue);
    setOpenModalDelete("pop-up");
  };
  const onSubmit = () => {
    if (questionOptions.length < 2) {
      setInputError(true);
      setErrorMessage("Poll must contains 2+ fields");
      return;
    }
    if (questionName.length < 4) {
      setInputError(true);
      setErrorMessage("poll name length must have 4 symbols");
      return;
    }
    addQuestionToPoll(id, questionName, questionOptions).then(
      ({ success, data, error }) => {
        if (success) {
          setQuestionOption("");
          setQuestionOptions([]);
          setQuestionName("");
          setErrorMessage("");
          setQuestions((prev) => [...prev, makeQuestion(data)]);
          setInputError(false);
          props.setOpenModal(undefined);
        } else {
          setInputError(true);
          setErrorMessage(error);
        }
      }
    );
  };

  return (
    <>
      <DeleteModal
        props={propsDelete}
        setToDelete={setToDelete}
        value={valueToDelete}
      />
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Adding New Question</Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-5">
              <label
                htmlFor="error"
                className={
                  isInputError ? errorLabelClassname : normalLabelClassname
                }
              >
                Enter Question Name
              </label>
              <input
                type="text"
                value={questionName}
                onChange={(e) => setQuestionName(e.target.value)}
                className={
                  isInputError ? errorInputClassname : normalInputClassname
                }
              />{" "}
            </div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Add question option
            </label>

            <div className="flex flex-row justify-between mb-5">
              <input
                type="text"
                value={questionOption}
                onChange={(e) => setQuestionOption(e.target.value)}
                className="w-3/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name of option"
                required
              />
              <button
                onClick={addQuestionOption}
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Add
              </button>
            </div>
            {questionOptions.map((pollField) => (
              <PollField
                key={pollField}
                pollName={pollField}
                onRemove={() => onRemove(pollField)}
              />
            ))}
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
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Question
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalQuestion;
