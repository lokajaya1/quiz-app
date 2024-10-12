export const saveQuizResults = (results: {
  userId: string | undefined;
  quizScore: number;
  correctAnswers: number;
  wrongAnswers: number;
}) => {
  localStorage.setItem("quizResults", JSON.stringify(results));
};

export const getQuizResults = () => {
  const results = localStorage.getItem("quizResults");
  return results ? JSON.parse(results) : null;
};

export const clearQuizResults = () => {
  localStorage.removeItem("quizResults");
};
