import React, { useEffect, useState } from "react";

const MongoDbImplementation = () => {
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async () => {
    try {
      const response = await fetch("http://localhost:5000/exercise");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Exercises</h1>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise._id} className="mb-2">
            <span className="font-semibold">{exercise.title}</span> -{" "}
            {exercise.type} mins
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MongoDbImplementation;
