import React, { useEffect, useState } from "react";

const MongoDbImplementation = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/exercises")
      .then((response) => response.json())
      .then((data) => setExercises(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Exercises</h1>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise._id}>
            {exercise.title}: {exercise.description} -{" "}
            {exercise.completed ? "Completed" : "Not Completed"}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MongoDbImplementation;
