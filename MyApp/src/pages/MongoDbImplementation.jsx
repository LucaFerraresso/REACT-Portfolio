import React, { useEffect, useState } from "react";

const MongoDbImplementation = () => {
  // Stato per memorizzare gli esercizi
  const [exercises, setExercises] = useState([]);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">MongoDB to localhost</h1>
    </div>
  );
};

export default MongoDbImplementation;
