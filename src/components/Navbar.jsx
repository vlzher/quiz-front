import React from "react";

import ModalPoll from "./ModalPoll.jsx";
import ModalQuestion from "./ModalQuestion.jsx";

const Navbar = ({
  isMyPoll,
  isPollModal,
  props,
  nameButton1,
  functionButton1,
  nameButton2,
  functionButton2,
  setPolls,
  setQuestions,
}) => {
  return (
    <nav className=" w-full bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        {isPollModal || (!isPollModal && isMyPoll) ? (
          <button
            onClick={functionButton1}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            {nameButton1}
          </button>
        ) : (
          <div></div>
        )}
        {isPollModal ? (
          <ModalPoll setPolls={setPolls} props={props} />
        ) : (
          <ModalQuestion setQuestions={setPolls} props={props} />
        )}
        <div className="flex items-center">
          <button
            onClick={functionButton2}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {nameButton2}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
