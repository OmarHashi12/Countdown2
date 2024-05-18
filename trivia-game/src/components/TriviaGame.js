import React, { useState, useEffect } from 'react';
import fetchQuestions from '../services/triviaService';
import { Button, Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import './TriviaGame.css'; // Add CSS file for styling

const TriviaGame = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    const getQuestions = async () => {
      const data = await fetchQuestions();
      setQuestions(data);
    };
    getQuestions();
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

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
    <div className="trivia-container">
      {questions.map((question) => (
        <Card key={question.id} className="trivia-card">
          <CardContent>
            <Typography variant="h5">{question.question}</Typography>
            <RadioGroup onChange={(e) => handleAnswerChange(question.id, e.target.value)}>
              {question.incorrectAnswers.concat(question.correctAnswer).sort().map((answer, index) => (
                <FormControlLabel key={index} value={answer} control={<Radio />} label={answer} />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
      <Button variant="contained" color="primary" onClick={checkAnswers} className="submit-button">Submit</Button>
      <Typography variant="h6" className="score">Score: {score}</Typography>
    </div>
  );
};

export default TriviaGame;
