"use client";

import { useEffect, useState } from "react";
import Quiz from "@/components/Quiz";
import Loading from "./loading";

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

async function getQuizData(): Promise<Question[]> {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&type=multiple"
    );
    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }

    return data.results.map((question: any) => ({
      question: question.question,
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
      correctAnswer: question.correct_answer,
    }));
  } catch (error) {
    console.error("Failed to fetch quiz data:", error);
    return [];
  }
}

const Page = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      const quizData = await getQuizData();
      if (isMounted) {
        setQuestions(quizData);

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserId(parsedUser.id);
        }
      }
    }

    fetchData();

    // Cleanup untuk membatalkan update state jika komponen di-unmount
    return () => {
      isMounted = false;
    };
  }, []);

  if (questions.length === 0) {
    return <Loading/>; 
  }

  return <Quiz questions={questions} userId={userId} />;
};

export default Page;