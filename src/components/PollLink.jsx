import React from "react";
import { useNavigate } from "react-router-dom";

const PollLink = ({ pollId, pollName }) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        "mt-5 w-3/4 h-20 flex justify-center items-center text-white bg-blue-700 rounded-md text-center  text-5xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      }
      onClick={() => {
        navigate(`/poll/${pollId}`);
      }}
    >
      {pollName}
    </div>
  );
};

export default PollLink;
