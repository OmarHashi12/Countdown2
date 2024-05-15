import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

const TriviaGame = () => {
  // State to hold questions
  const [questions, setQuestions] = useState([]);
  // State to hold selected answers
  const [selectedAnswers, setSelectedAnswers] = useState({});
  // State to hold the score
  const [score, setScore] = useState(0);

  // Function to fetch questions from the API
  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://the-trivia-api.com/v2/questions?limit=10');
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // useEffect to fetch questions on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handle answer selection
  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  // Check answers and calculate score
  const checkAnswers = () => {
    let correctAnswers = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers += 1;
      }
    });
    setScore(correctAnswers);
  };

  return (
    <div>
      {questions.map((question) => (
        <Card key={question.id} style={{ margin: '10px' }}>
          <CardContent>
            <Typography variant="h5">{question.question}</Typography>
            <RadioGroup onChange={(e) => handleAnswerChange(question.id, e.target.value)}>
              {question.incorrectAnswers.concat(question.correctAnswer).map((answer, index) => (
                <FormControlLabel key={index} value={answer} control={<Radio />} label={answer} />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
      <Button onClick={checkAnswers} variant="contained" color="primary">Submit</Button>
      <Typography variant="h6">Score: {score}</Typography>
    </div>
  );
};

export default TriviaGame;