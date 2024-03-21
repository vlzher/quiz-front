export const makeQuestion = (res) => {
  const result = {};
  result["questionID"] = res["questionID"];
  result["questionName"] = res["questionName"];
  result["questionOptions"] = res.questionOptions.map((option) => {
    return {
      option: option.questionOptionName,
      votes: option.answerCount,
      optionID: option.questionOptionID,
    };
  });
  return result;
};
