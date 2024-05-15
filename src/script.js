document.addEventListener('DOMContentLoaded', () => {
    fetchQuestions();
});

async function fetchQuestions() {
    const response = await fetch('https://the-trivia-api.com/v2/questions?limit=5');
    const data = await response.json();
    displayQuestions(data);
}

function displayQuestions(questions) {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';
    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <p>${question.question}</p>
            <div class="answers">
                ${[...question.incorrectAnswers, question.correctAnswer].sort().map((answer, i) => `
                    <label>
                        <input type="radio" name="question${index}" value="${answer}">
                        ${answer}
                    </label>
                `).join('')}
            </div>
        `;
        questionContainer.appendChild(questionElement);
    });
}

function checkAnswers() {
    const questions = document.querySelectorAll('.question');
    let score = 0;
    questions.forEach((questionElement, index) => {
        const selectedAnswer = questionElement.querySelector(`input[name="question${index}"]:checked`);
        if (selectedAnswer) {
            const questionData = questionsData[index];
            if (selectedAnswer.value === questionData.correctAnswer) {
                score++;
            }
        }
    });
    document.getElementById('score').innerText = `Score: ${score}/${questions.length}`;
}
