import OneAnswerQuestion from "./OneAnswerQuestion.jsx";
import MultipleAnswerQuestion from "./MutipleAnswerQuestion.jsx";
import OrderQuestion from "./OrderQuestion.jsx";
import FileQuestion from "./FileQuestion.jsx";
import MatchQuestion from "./MatchQuestion.jsx";

const Question = ({question, answer, deleteFunction, isAuthor, increaseAnswerCount, updateAnswers}) => {
    function renderQuestion() {
        switch (question.type) {
            case "ONE":
                return <OneAnswerQuestion key={question.id} questionID={question.id} width={"2/3"}
                                          question={question.text} options={question.options} isModal={false}
                                          answer={answer} isAuthor={isAuthor}
                                          deleteFunction={deleteFunction}
                                          increaseAnswerCount={increaseAnswerCount}/>
            case "MULTIPLE":
                return <MultipleAnswerQuestion key={question.id} questionID={question.id} width={"2/3"}
                                               question={question.text} options={question.options} isModal={false}
                                               answer={answer} isAuthor={isAuthor}
                                               deleteFunction={deleteFunction}
                                               updateAnswers={updateAnswers}
                                               increaseAnswerCount={increaseAnswerCount}/>
            case "ORDER":
                return <OrderQuestion key={question.id} questionID={question.id} width={"2/3"}
                                      question={question.text} options={question.options} isModal={false}
                                      answer={answer} isAuthor={isAuthor}
                                      deleteFunction={deleteFunction}
                                      updateAnswers={updateAnswers} increaseAnswerCount={increaseAnswerCount}/>
            case "FILE":
                return <FileQuestion key={question.id} questionID={question.id} width={"2/3"}
                                     question={question.text} isModal={false} answer={answer}
                                     isAuthor={isAuthor} deleteFunction={deleteFunction}
                                     updateAnswers={updateAnswers} increaseAnswerCount={increaseAnswerCount}/>
            case "MATCH":
                // eslint-disable-next-line no-case-declarations
                const optionsLeft = question.options.filter((option) => option.isLeft === true);
                // eslint-disable-next-line no-case-declarations
                const optionsRight = question.options.filter((option) => option.isLeft === false);
                if (optionsLeft.length !== optionsRight.length) return null;
                return <MatchQuestion key={question.id} questionID={question.id} width={"2/3"}
                                      question={question.text} optionsLeft={optionsLeft} optionsRight={optionsRight}
                                      isModal={false} answer={answer} isAuthor={isAuthor}
                                      deleteFunction={deleteFunction}
                                      updateAnswers={updateAnswers} increaseAnswerCount={increaseAnswerCount}/>
            default:
                return null;
        }
    }

    return (
        renderQuestion()
    );
};

export default Question;