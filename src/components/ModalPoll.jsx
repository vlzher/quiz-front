import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { createPoll } from "../api/api.js";

const errorInputClassname =
  "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
const errorLabelClassname =
  "block mb-2 text-sm font-medium text-red-700 dark:text-red-500";
const normalInputClassname =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const normalLabelClassname =
  "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

const ModalPoll = ({ props, setPolls }) => {
  const [pollName, setPollName] = useState("");
  const [isInputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = () => {
    if (pollName.length < 4) {
      setInputError(true);
      setErrorMessage("poll name length must have 4 symbols");
      return;
    }
    createPoll(pollName).then(({ success, data, error }) => {
      if (success) {
        setPollName("");
        setErrorMessage("");
        setPolls((prev) => [...prev, data]);
        setInputError(false);
        props.setOpenModal(undefined);
      } else {
        setInputError(true);
        setErrorMessage(error);
      }
    });
  };

  return (
    <>
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Adding new Poll</Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-5">
              <label
                htmlFor="error"
                className={
                  isInputError ? errorLabelClassname : normalLabelClassname
                }
              >
                Enter Poll name
              </label>
              <input
                type="text"
                value={pollName}
                onChange={(e) => setPollName(e.target.value)}
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
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Poll
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalPoll;
