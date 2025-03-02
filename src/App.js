import React, { useState } from 'react';
import './styles.css';
import introMusic from './intro.mp3'

const intromusic = new Audio(introMusic)

const QuizWebsite = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentPrize, setCurrentPrize] = useState(0);
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    askAudience: true,
    phoneFriend: true,
  });

  const questions = [
    { question: 'What is the capital of France?', answers: ['Paris', 'London', 'Rome', 'Berlin'], correct: 'Paris', prize: '100' },
    { question: 'Who is the CEO of Tesla?', answers: ['Jeff Bezos', 'Elon Musk', 'Bill Gates', 'Mark Zuckerberg'], correct: 'Elon Musk', prize: '200' },
    { question: 'What is the largest planet in our solar system?', answers: ['Earth', 'Jupiter', 'Saturn', 'Mars'], correct: 'Jupiter', prize: '300' },
    { question: 'What is the boiling point of water?', answers: ['90°C', '100°C', '110°C', '120°C'], correct: '100°C', prize: '500' },
    { question: 'What is the name of the First Missile launched?', answers: ['Prithvi', 'Agni', 'Brahmos', 'Dhanush'], correct: 'Prithvi', prize: '1000' },
    // Add more questions here
  ];

  const startGame = () => {
    setIsGameStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setShowResult(false);
    setCurrentPrize(0);
    intromusic.play() 
    setLifelines({
      fiftyFifty: true,
      askAudience: true,
      phoneFriend: true,
    });
  };

  const submitAnswer = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === questions[currentQuestionIndex].correct) {
        setScore(score + 1);
        setCurrentPrize(questions[currentQuestionIndex].prize);
      }
      setShowResult(true);
    }
  };

  const nextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setShowScore(true);
    }
  };

  const restartGame = () => {
    setIsGameStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowScore(false);
    setShowResult(false);
  };

  const useFiftyFifty = () => {
    if (lifelines.fiftyFifty) {
      const correctAnswer = questions[currentQuestionIndex].correct;
      const filteredAnswers = questions[currentQuestionIndex].answers.filter(
        answer => answer === correctAnswer || Math.random() > 0.5
      );
      questions[currentQuestionIndex].answers = filteredAnswers;
      setLifelines({ ...lifelines, fiftyFifty: false });
    }
  };

  const useAskAudience = () => {
    if (lifelines.askAudience) {
      // Logic for ask the audience can be implemented here
      setLifelines({ ...lifelines, askAudience: false });
    }
  };

  const usePhoneFriend = () => {
    if (lifelines.phoneFriend) {
      // Logic for phone a friend can be implemented here
      setLifelines({ ...lifelines, phoneFriend: false });
    }
  };

  return (
    <div className="container">
      <div id="quiz-container">
        <h1>Who Wants to Be a Millionaire?</h1>
        {isGameStarted ? (
          showScore ? (
            <div>
              <div id="score">Your final prize: ${currentPrize}</div>
              <button className="btn" id="restart-btn" onClick={restartGame}>Restart Quiz</button>
            </div>
          ) : (
            <div>
              <div id="question">{questions[currentQuestionIndex].question}</div>
              <div id="answer-buttons">
                {questions[currentQuestionIndex].answers.map((answer, index) => (
                  <button
                    key={index}
                    className={`btn ${selectedAnswer === answer ? 'selected' : ''}`}
                    onClick={() => setSelectedAnswer(answer)}
                    disabled={showResult}
                  >
                    {answer}
                  </button>
                ))}
              </div>
              {showResult ? (
                <>
                  <div id="result" className="result">
                    {selectedAnswer === questions[currentQuestionIndex].correct ? 'Correct!' : 'Wrong!'}
                  </div>
                  <button className="btn" onClick={nextQuestion}>Next Question</button>
                </>
              ) : (
                <button className="btn" onClick={submitAnswer}>Submit</button>
              )}
            </div>
          )
        ) : (
          <button className="btn" onClick={startGame}>Start Quiz</button>
        )}
        <div className="lifelines">
          <button className="btn" onClick={useFiftyFifty} disabled={!lifelines.fiftyFifty}>50/50</button>
          <button className="btn" onClick={useAskAudience} disabled={!lifelines.askAudience}>Ask the Audience</button>
          <button className="btn" onClick={usePhoneFriend} disabled={!lifelines.phoneFriend}>Phone a Friend</button>
        </div>
        <div id="current-prize">Current Prize: ${currentPrize}</div>
      </div>
    </div>
  );
};

export default QuizWebsite;




