import axios from 'axios';

const fetchQuestions = async (amount = 10, category = 'general') => {
  try {
    const response = await axios.get(`https://the-trivia-api.com/v2/questions?limit=${amount}&categories=${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

export default fetchQuestions;
