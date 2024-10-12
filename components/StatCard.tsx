import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
}

const StatCard = ({ title, value }: StatCardProps) => (
  <div className="bg-gray-200 p-4 rounded-lg shadow-md text-center">
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-lg">{value}</p>
  </div>
);

export default StatCard;
