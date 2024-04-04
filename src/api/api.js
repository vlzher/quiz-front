import axios from "axios";

const baseURL = "http://localhost:8080";
export const TOKEN_CONST = "token";


export const getAllPolls = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/polls`, {
      headers: {
        Authorization: `${localStorage.getItem(TOKEN_CONST)}`,
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

export const createPoll = async (pollName) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/polls`,
      { pollName },
      {
        headers: {
          Authorization: `${localStorage.getItem(TOKEN_CONST)}`,
        },
      }
    );
    if (response.status === 201) {
      return { success: true, data: response.data, error: null };
    } else if (response.status === 404) {
      return { success: false, data: null, error: "User not found" };
    } else {
      return { success: false, data: null, error: "Internal Server Error" };
    }
  } catch (error) {
    console.error("Poll creation failed:", error);
    return { success: false, data: null, error: "Internal Server Error" };
  }
};

export const answerQuestion = async (pollID, questionOptionID) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/polls/answer?pollID=${pollID}`,
      { questionOptionID },
      {
        headers: {
          Authorization: `${localStorage.getItem(TOKEN_CONST)}`,
        },
      }
    );

    if (response.status === 201) {
      return { success: true, error: null };
    } else if (response.status === 404) {
      return { success: false, error: "Not found" };
    } else {
      return { success: false, error: "Internal Server Error" };
    }
  } catch (error) {
    console.error("Answer submission failed:", error);
    return { success: false, error: "Internal Server Error" };
  }
};

export const getUserAnswers = async (pollID) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/polls/answers?pollID=${pollID}`,
      {
        headers: {
          Authorization: `${localStorage.getItem(TOKEN_CONST)}`,
        },
      }
    );
    if (response.status === 200) {
      return { success: true, data: response.data, error: null };
    } else {
      return { success: false, data: null, error: "Internal Server Error" };
    }
  } catch (error) {
    console.error("Error fetching user answers:", error);
    return { success: false, data: null, error: "Internal Server Error" };
  }
};

export const getPollDetails = async (pollID) => {
  try {
    const response = await axios.get(`${baseURL}/api/polls/${pollID}`, {
      headers: {
        Authorization: `${localStorage.getItem(TOKEN_CONST)}`,
      },
    });
    if (response.status === 200) {
      return { success: true, data: response.data, error: null };
    } else if (response.status === 404) {
      return { success: false, data: null, error: "Poll not found" };
    } else {
      return { success: false, data: null, error: "Internal Server Error" };
    }
  } catch (error) {
    return { success: false, data: null, error: "Internal Server Error" };
  }
};

export const deletePoll = async (pollID) => {
  try {
    const response = await axios.delete(`${baseURL}/api/polls/${pollID}`, {
      headers: {
        Authorization: `${localStorage.getItem(TOKEN_CONST)}`,
      },
    });
    if (response.status === 204) {
      return { success: true, error: null };
    } else if (response.status === 403) {
      return {
        success: false,
        error: "Forbidden: You don't have permission to delete this poll",
      };
    } else if (response.status === 404) {
      return { success: false, error: "Poll not found" };
    } else {
      return { success: false, error: "Internal Server Error" };
    }
  } catch (error) {
    return { success: false, error: "Internal Server Error" };
  }
};

export const addQuestionToPoll = async (
  pollID,
  questionName,
  questionOptions
) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/polls/${pollID}/addQuestion`,
      { questionName, questionOptions },
      {
        headers: {
          Authorization: `${localStorage.getItem(TOKEN_CONST)}`,
        },
      }
    );
    if (response.status === 201) {
      return { success: true, data: response.data, error: null };
    } else if (response.status === 404) {
      return { success: false, data: null, error: "Poll not found" };
    } else {
      return { success: false, data: null, error: "Internal Server Error" };
    }
  } catch (error) {
    return { success: false, data: null, error: "Internal Server Error" };
  }
};

export const removeQuestionFromPoll = async (pollID, questionID) => {
  try {
    const response = await axios.delete(
      `${baseURL}/api/polls/${pollID}/removeQuestion/${questionID}`,
      {
        headers: {
          Authorization: `${localStorage.getItem(TOKEN_CONST)}`,
        },
      }
    );
    if (response.status === 204) {
      return { success: true, error: null };
    } else if (response.status === 403) {
      return {
        success: false,
        error: "Forbidden: You don't have permission to remove this question",
      };
    } else if (response.status === 404) {
      return { success: false, error: "Poll or question not found" };
    } else {
      return { success: false, error: "Internal Server Error" };
    }
  } catch (error) {
    return { success: false, error: "Internal Server Error" };
  }
};
