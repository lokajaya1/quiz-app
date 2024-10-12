"use client";
import { useState, useEffect } from "react";
import StatCard from "./StatCard";
import { saveQuizResults } from "../utils/quizStorage";
import Loading from "@/app/quiz/loading";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

interface QuizProps {
  questions: {
    question: string;
    answers: string[];
    correctAnswer: string;
  }[];
  userId: string | undefined;
}

const Quiz = ({ questions, userId }: QuizProps) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [timeRemaining, setTimeRemaining] = useState(15);
  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeRemaining > 0 && !checked) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && !selectedAnswer) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeRemaining, selectedAnswer, checked]);

  const resetTimer = () => {
    setTimeRemaining(15);
  };

  const handleTimeUp = () => {
    handleAnswer(null);
    toast.info("You ran out of Time!");
  };

  const handleAnswer = (answer: string | null) => {
    setSelectedAnswer(answer);
    setChecked(true);
    if (answer === questions[activeQuestion]?.correctAnswer) {
      setResults((prev) => ({
        ...prev,
        correctAnswers: prev.correctAnswers + 1,
      }));
    } else {
      setResults((prev) => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
    }
  };

  const handleNextQuestion = () => {
    setChecked(false);
    setSelectedAnswer(null);
    resetTimer();
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  useEffect(() => {
    if (showResults) {
      saveQuizResults({
        userId,
        quizScore: results.correctAnswers * 10,
        correctAnswers: results.correctAnswers,
        wrongAnswers: results.wrongAnswers,
      });
    }
  }, [showResults, results, userId]);

  const handleQuitQuiz = () => {
    router.push('/');
  };

  const { question, answers, correctAnswer } = questions[activeQuestion] || {};

  if (!question) return <Loading />;

  return (
    <div className="min-h-[500px]">
      <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col">
        {!showResults ? (
          <>
            <div className="flex justify-between mb-10 items-center">
              <div className="bg-primary text-white px-4 rounded-md py-1">
                <h2>Question: {activeQuestion + 1}/{questions.length}</h2>
              </div>
              <div className="bg-primary text-white px-4 rounded-md py-1">
                {timeRemaining} seconds remaining
              </div>
            </div>

            <h3 className="mb-5 text-2xl font-bold">{question}</h3>
            <ul>
              {answers.map((answer, idx) => (
                <li
                  key={idx}
                  onClick={() => !checked && handleAnswer(answer)}
                  className={`cursor-pointer mb-5 py-3 rounded-md px-3
                    ${checked && (answer === correctAnswer ? "bg-green-500 text-white" : answer === selectedAnswer ? "bg-red-500 text-white" : "")}
                    ${!checked && "hover:bg-primary hover:text-white"}
                  `}
                >
                  <span>{answer}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleNextQuestion}
              disabled={!checked}
              className="font-bold bg-primary text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {activeQuestion === questions.length - 1 ? "Finish" : "Next Question →"}
            </button>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl uppercase mb-10">Results 📈</h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
              <StatCard title="Total Questions" value={questions.length} />
              <StatCard title="Correct Answers" value={results.correctAnswers} />
              <StatCard title="Wrong Answers" value={results.wrongAnswers} />
              <StatCard title="Score" value={`${(results.correctAnswers / questions.length) * 100}%`} />
            </div>
            <div className="mt-10 space-x-4">
              <button onClick={() => window.location.reload()} className="font-bold uppercase bg-primary text-white px-4 py-2 rounded-md">
                Restart Quiz
              </button>
              <button onClick={handleQuitQuiz} className="font-bold uppercase bg-red-500 text-white px-4 py-2 rounded-md">
                Quit Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;