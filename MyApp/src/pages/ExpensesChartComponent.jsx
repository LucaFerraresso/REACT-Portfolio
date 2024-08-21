import React, { useState, useEffect } from "react";
import { getExpensesFirestore } from "../API/firestore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ExpensesChart = () => {
  const [data, setData] = useState([]);
  const [maxAmount, setMaxAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesData = await getExpensesFirestore();
        const daysOrder = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
        const orderedData = expensesData.sort(
          (a, b) =>
            daysOrder.indexOf(a.day.toLowerCase()) -
            daysOrder.indexOf(b.day.toLowerCase())
        );
        setData(orderedData);
        setMaxAmount(Math.max(...orderedData.map((item) => item.amount)));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-6 rounded-lg flex flex-col items-center">
        <Skeleton height={30} width={200} />
        <div className="flex space-x-2 h-48 mt-6">
          {[...Array(7)].map((_, index) => (
            <Skeleton key={index} height={150} width={40} />
          ))}
        </div>
        <div className="mt-6 pt-4">
          <Skeleton height={20} width={120} />
          <Skeleton height={32} width={180} className="mt-2" />
          <Skeleton height={20} width={60} className="mt-4" />
          <Skeleton height={20} width={140} className="mt-1" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center font-dm-sans">
      <div className="flex flex-col items-center justify-center max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-very-pale-orange p-6 rounded-lg shadow-lg">
        <h1 className="text-dark-brown text-2xl font-bold mb-10">
          Spending - Last 7 days
        </h1>
        <div className="flex justify-between items-end h-48 w-full">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center mx-1"
              style={{ height: "100%" }}
            >
              <div
                className={`relative ${
                  item.amount === maxAmount ? "bg-cyan" : "bg-soft-red"
                } w-full rounded-md transition-all duration-300`}
                style={{
                  height: ` ${(item.amount / maxAmount) * 100}%`,
                  maxHeight: "100%",
                  display: "flex",
                  alignItems: "flex-end", // Starting from the bottom
                }}
              >
                <span className="absolute -top-8 bg-dark-brown text-white text-sm px-2 py-1 rounded-lg opacity-0 hover:opacity-100">
                  ${item.amount}
                </span>
              </div>
              <span className="text-medium-brown mt-2 text-xs md:text-sm">
                {item.day}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t-2 border-cream mt-6 pt-4 w-full">
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
    </div>
  );
};

export default ExpensesChart;
