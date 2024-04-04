import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { getAllPolls, TOKEN_CONST } from "../api/api.js";
import { useNavigate } from "react-router-dom";
import PollLink from "../components/PollLink.jsx";

const PollsPage = () => {
  const navigate = useNavigate();
  const [polls, setPolls] = useState([]);
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_CONST)) {
      navigate("/");
      return;
    }
    getAllPolls().then((res) => {
      setPolls(res);
    });
  }, []);
  return (
    <div className="w-full flex items-center flex-col">
      <Navbar
        isPollModal={true}
        functionButton2={() => {
          localStorage.setItem(TOKEN_CONST, "");
          navigate("/login");
        }}
        nameButton2={"Logout"}
        nameButton1={"Add Poll"}
        functionButton1={() => {
          props.setOpenModal("default");
        }}
        props={props}
        setPolls={setPolls}
      />
      <div className="p-5 w-full text-4xl flex justify-start">
        <div>Current Polls:</div>
      </div>
      {polls.map((poll) => (
        <PollLink
          key={poll.pollID}
          pollName={poll.pollName}
          pollId={poll.pollID}
        />
      ))}

        <PollLink
            pollName={123}
            pollId={1}
        />
    </div>
  );
};

export default PollsPage;
