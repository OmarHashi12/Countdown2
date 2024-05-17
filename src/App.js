const { Button, Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel } = MaterialUI;

// Mock API fetch function
const fetchQuestions = async (amount = 10, category = 'general_knowledge') => {
  const response = await fetch(`https://the-trivia-api.com/v2/questions?limit=${amount}&categories=${category}`);
  const data = await response.json();
  return data;
};

const TriviaGame = () => {
  const [questions, setQuestions] = React.useState([]);
  const [selectedAnswers, setSelectedAnswers] = React.useState({});
  const [score, setScore] = React.useState(null);

  React.useEffect(() => {
    const getQuestions = async () => {
      const data = await fetchQuestions();
      console.log(data); // Log data to check if it is correctly fetched
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
      {questions.length > 0 ? questions.map((question) => (
        <Card key={question.id} className="trivia-card">
          <CardContent>
            <Typography variant="h5" className="question">{question.question}</Typography>
            <RadioGroup onChange={(e) => handleAnswerChange(question.id, e.target.value)}>
              {[...question.incorrectAnswers, question.correctAnswer].sort().map((answer, index) => (
                <FormControlLabel key={index} value={answer} control={<Radio />} label={answer} />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      )) : <Typography variant="h6">Loading questions...</Typography>}
      <Button variant="contained" color="primary" onClick={checkAnswers} className="submit-button">Submit</Button>
      {score !== null && (
        <Typography variant="h6" className="score">
          You got {score} out of {questions.length} correct!
        </Typography>
      )}
    </div>
  );
};

ReactDOM.render(<TriviaGame />, document.getElementById('root'));
