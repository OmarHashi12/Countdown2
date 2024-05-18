import React, { useState, useEffect } from 'react';
import fetchQuestions from '../services/triviaService';
import './TriviaGame.css';

const TriviaGame = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    const getQuestions = async () => {
      const data = await fetchQuestions();
      console.log(data); // Log the data to inspect its structure
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
        <div key={question.id} className="trivia-card">
          <div className="trivia-question">
            <h5>{question.question.text || question.question}</h5>
          </div>
          <div className="trivia-answers">
            {question.incorrectAnswers.concat(question.correctAnswer).sort().map((answer, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={question.id}
                  value={answer}
                  onChange={() => handleAnswerChange(question.id, answer)}
                />
                {answer.text ? answer.text : answer}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={checkAnswers} className="submit-button">Submit</button>
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default TriviaGame;
