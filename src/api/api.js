import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

async function getQuizzes(accessToken) {
    try {
        const response = await axios.get(`${BASE_URL}/api/quizzes`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        throw error;
    }
}

async function createQuiz(accessToken, quizTitle) {
    try {
        const response = await axios.post(`${BASE_URL}/api/quizzes`, { quizTitle }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating quiz:', error);
        throw error;
    }
}

async function getStats(accessToken, quizID) {
    try {
        const response = await axios.post(`${BASE_URL}/api/quizzes/${quizID}/getStats`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching quiz stats:', error);
        throw error;
    }
}

async function addOrderQuestion(accessToken, quizID, text, options, correctOrder) {
    const optionsArray = [];
    options.forEach((option) => (
        optionsArray.push({text: option})
    ));
    const correctOrderIndexes = [];
    correctOrder.forEach((option) => {
        correctOrderIndexes.push(options.indexOf(option));
    })
    const questionData = {
        text,
        options: optionsArray,
        correctOrder:correctOrderIndexes
    };
    try {
        const response = await axios.post(`${BASE_URL}/api/quizzes/${quizID}/addOrderQuestion`, questionData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding order question:', error);
        throw error;
    }
}

async function addOneChooseQuestion(accessToken, quizID, text, options, correctOptionPosition) {
    const optionsArray = [];
    options.forEach((option) => (
        optionsArray.push({text: option})
    ));
    const questionData = {
        text,
        options: optionsArray,
        correctOptionPosition
    };
    try {
        const response = await axios.post(`${BASE_URL}/api/quizzes/${quizID}/addOneChooseQuestion`, questionData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding one choose question:', error);
        throw error;
    }
}

async function addMultipleChooseQuestion(accessToken, quizID, text, options, correctOptionPositions) {
    const optionsArray = [];
    options.forEach((option) => (
        optionsArray.push({text: option})
    ));

    const questionData = {
        text,
        options: optionsArray,
        correctOptionPositions
    };
    try {
        const response = await axios.post(`${BASE_URL}/api/quizzes/${quizID}/addMultipleChooseQuestion`, questionData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding multiple choose question:', error);
        throw error;
    }
}

async function addMatchQuestion(accessToken, quizID, text, leftOptions, rightOptions, correctAnswer) {
    const leftOptionsArray = [];
    leftOptions.forEach((option) => (
        leftOptionsArray.push({text: option})
    ));
    const rightOptionsArray = [];
    rightOptions.forEach((option) => (
        rightOptionsArray.push({text: option})
    ));
    const correctAnswerData = [];
    correctAnswer.forEach((answer) => {
        let {from,to} = answer;
        from = from.split("_")[1];
        to = to.split("_")[1];
        correctAnswerData.push([from,to])
    });
    const questionData = {
        text,
        leftOptions: leftOptionsArray,
        rightOptions: rightOptionsArray,
        correctAnswer: correctAnswerData
    }
    try {
        const response = await axios.post(`${BASE_URL}/api/quizzes/${quizID}/addMatchQuestion`, questionData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding match question:', error);
        throw error;
    }
}

async function addFileQuestion(accessToken, quizID, text) {
    try {
        const questionData = {
            text
        }
        const response = await axios.post(`${BASE_URL}/api/quizzes/${quizID}/addFileQuestion`, questionData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding file question:', error);
        throw error;
    }
}

async function answerOrderQuestion(accessToken, questionID, answerData) {
    try {
        const response = await axios.post(`${BASE_URL}/api/quizzes/answerOrderQuestion/${questionID}`, answerData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error answering order question:', error);
        throw error;
    }
}

async function answerMultipleChooseQuestion(accessToken, questionID, answerData) {
    try {
        const response = await axios.post(`${BASE_URL}/api/quizzes/answerMultipleChooseQuestion/${questionID}`, answerData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error answering multiple choose question:', error);
        throw error;
    }
}

async function answerMatchQuestion(accessToken, questionID, answerData) {
    try {
        const response = await axios.post(`${BASE_URL}/api/quizzes/answerMatchQuestion/${questionID}`, answerData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error answering match question:', error);
        throw error;
    }
}

async function answerFileQuestion(accessToken, questionID, answerData) {
    try {
        const formData = new FormData();
        formData.append('file', answerData.file);
        formData.append('request', JSON.stringify(answerData.request));

        const response = await axios.post(`${BASE_URL}/api/quizzes/answerFileQuestion/${questionID}`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error answering file question:', error);
        throw error;
    }
}

async function answerChooseQuestion(accessToken, questionID, answerData) {
    try {
        const response = await axios.post(`${BASE_URL}/api/quizzes/answerChooseQuestion/${questionID}`, answerData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error answering choose question:', error);
        throw error;
    }
}

async function getQuizByID(accessToken, quizID) {
    try {
        const response = await axios.get(`${BASE_URL}/api/quizzes/${quizID}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching quiz by ID:', error);
        throw error;
    }
}

async function deleteQuiz(accessToken, quizID) {
    try {
        const response = await axios.delete(`${BASE_URL}/api/quizzes/${quizID}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting quiz:', error);
        throw error;
    }
}

async function getAnswers(accessToken, quizID) {
    try {
        const response = await axios.get(`${BASE_URL}/api/quizzes/${quizID}/getAnswers`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching quiz answers:', error);
        throw error;
    }
}

async function deleteQuestion(accessToken, quizID, questionID) {
    try {
        const response = await axios.delete(`${BASE_URL}/api/quizzes/${quizID}/${questionID}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting question:', error);
        throw error;
    }
}

export {
    getQuizzes,
    createQuiz,
    getStats,
    addOrderQuestion,
    addOneChooseQuestion,
    addMultipleChooseQuestion,
    addMatchQuestion,
    addFileQuestion,
    answerOrderQuestion,
    answerMultipleChooseQuestion,
    answerMatchQuestion,
    answerFileQuestion,
    answerChooseQuestion,
    getQuizByID,
    deleteQuiz,
    getAnswers,
    deleteQuestion
};
