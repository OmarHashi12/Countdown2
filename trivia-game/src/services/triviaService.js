import axios from 'axios';

const fetchQuestions = async (amount = 10, category = 'general_knowledge') => {
  try {
    const response = await axios.get(`https://the-trivia-api.com/v2/questions?limit=${amount}&categories=${category}`);
    console.log(response.data); // Log the data to inspect its structure
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

export default fetchQuestions;
