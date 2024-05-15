import React from 'react';
import './App.css';
import TriviaGame from './TriviaGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Trivia Game</h1>
      </header>
      <main>
        <TriviaGame />
      </main>
    </div>
  );
}

export default App;