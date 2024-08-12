import React, { useEffect, useState } from "react";

const MongoDbImplementation = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/exercises");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Exercises</h1>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise._id}>
            {exercise.title}: {exercise.description} - {exercise.type} -{" "}
            {exercise.difficulty}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MongoDbImplementation;
