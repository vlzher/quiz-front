import AddQuizModal from "./Modal/AddQuizModal.jsx";
import AddQuestionModal from "./Modal/AddQuestionModal/AddQuestionModal.jsx";

const Navbar = ({isQuizModal,
  isQuizzes,
  leftButtonTitle,
  leftButtonFunction,
  rightButtonTitle,
  rightButtonFunction,
  setFunction,openModal,setOpenModal,isAuthor
}) => {
  return (
    <nav className=" w-full border-gray-200 shadow-md" >
      <div className="flex flex-wrap justify-between mx-3 p-4">
        {isQuizModal|| isAuthor ? (
          <button
            onClick={leftButtonFunction}
            className="text-gray-900 font-semibold block  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-300"
            type="button"
          >
            {leftButtonTitle}
          </button>
        ) : (
          <div></div>
        )}

        <div className="flex">
          <button
            onClick={rightButtonFunction}
            type="submit"
            className="text-gray-900 font-semibold bg-blue-700 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-300"
          >
            {rightButtonTitle}
          </button>
        </div>
      </div>
      {isQuizModal ? (
          <AddQuizModal setQuizzes={setFunction} openModal={openModal} setOpenModal={setOpenModal} />
      ) : (
          <AddQuestionModal setQuizzes={setFunction} openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </nav>
  );
};

export default Navbar;
