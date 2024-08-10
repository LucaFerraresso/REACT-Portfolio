import React, { useState, useEffect } from "react";
import { getExpensesFirestore } from "../API/firestore";

const ExpensesChart = () => {
  const [data, setData] = useState([]);
  const [maxAmount, setMaxAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesData = await getExpensesFirestore();
        setData(expensesData);
        const max = Math.max(...expensesData.map((item) => item.amount));
        setMaxAmount(max);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-very-pale-orange p-6 rounded-lg shadow-lg">
      <h1 className="text-dark-brown text-2xl font-bold mb-6">
        Spending - Last 7 days
      </h1>
      <div className="flex space-x-4 h-48">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className={`relative ${
                item.amount === maxAmount ? "bg-cyan" : "bg-soft-red"
              } h-0 w-full rounded-md transition-all duration-300`}
              style={{ height: `${(item.amount / maxAmount) * 100}%` }}
            >
              <span className="absolute -top-8 bg-dark-brown text-white text-sm px-2 py-1 rounded-lg opacity-0 hover:opacity-100">
                ${item.amount}
              </span>
            </div>
            <span className="text-medium-brown mt-2">{item.day}</span>
          </div>
        ))}
      </div>
      <div className="border-t-2 border-cream mt-6 pt-4">
        <div className="flex justify-between">
          <div>
            <p className="text-medium-brown">Total this month</p>
            <p className="text-dark-brown text-2xl font-bold">$478.33</p>
          </div>
          <div className="text-right">
            <p className="text-dark-brown font-bold">+2.4%</p>
            <p className="text-medium-brown">from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesChart;
