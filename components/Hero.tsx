import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center text-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <div className="px-4 md:px-6 max-w-[1500px] mx-auto w-[90%]">
        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-6xl lg:text-6xl">
            Ready to Challenge Yourself?
          </h1>
          <p className="text-lg text-gray-200">
            Take the quiz and test your knowledge now!
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-10 py-4 text-lg font-semibold text-gray-900 shadow-lg transition-transform transform hover:scale-105"
          >
            Start Quiz
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;