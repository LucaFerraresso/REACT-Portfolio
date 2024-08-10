import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import { useAuth } from "../../useContext/AuthContext";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import {
  saveVoteToFirestore,
  getVotesFromFirestore,
} from "../../API/firestore"; // Importa le nuove funzioni

const Card = ({ title, description, link, backgroundImage, projectId }) => {
  const [rating, setRating] = useState(0);
  const { user } = useAuth();

  const handleVote = async (value) => {
    if (!user) {
      toast.error("Devi effettuare il login per votare!");
      return;
    }
    setRating(value);
    await saveVoteToFirestore(projectId, user.uid, value); // Salva il voto nel Firestore
    toast.success("Voto registrato con successo!");
  };

  useEffect(() => {
    const fetchVotes = async () => {
      if (user) {
        const savedVote = await getVotesFromFirestore(projectId, user.uid);
        if (savedVote) {
          setRating(savedVote);
        }
      }
    };

    fetchVotes();
  }, [user, projectId]);

  const [imageProps, imageApi] = useSpring(() => ({
    transform: "scale(1)",
    config: { tension: 200, friction: 20 },
  }));

  return (
    <div className="w-[300px] h-[400px] md:w-[350px] md:h-[450px] lg:w-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg bg-white border border-black">
      <div className="flex flex-col justify-between h-full">
        <div className="relative overflow-hidden">
          <Link to={link}>
            <animated.img
              src={backgroundImage}
              alt="Background"
              className="w-full h-60 md:h-72 lg:h-80 object-cover transition-transform duration-300 cursor-pointer"
              style={imageProps}
              onMouseEnter={() => imageApi.start({ transform: "scale(1.1)" })}
              onMouseLeave={() => imageApi.start({ transform: "scale(1)" })}
            />
          </Link>

          <div
            className="absolute top-0 right-0 mt-2 mr-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded border border-black"
            style={{
              textShadow:
                "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
            }}
          >
            FREE
          </div>
        </div>
        <div className="p-6">
          <h1 className="text-gray-900 text-xl font-bold mb-2">{title}</h1>
          <p className="text-gray-700 text-base mb-4">{description}</p>

          <div className="flex items-center space-x-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                onClick={() => handleVote(star)}
                onMouseEnter={() => setRating(star)}
                onMouseLeave={() => setRating((prevRating) => prevRating)}
                color={star <= rating ? "#ffc107" : "#e4e5e9"}
                style={{
                  cursor: "pointer",
                  transition: "color 200ms",
                }}
              />
            ))}
          </div>

          {/* Mostra il punteggio attuale */}
          <div className="text-gray-700 text-base mb-2">
            Punteggio attuale: {rating}
          </div>
          <div className="flex items-center space-x-2">
            <span
              className="text-blue-300 text-2xl font-semibold px-2.5 py-0.5 rounded border border-black"
              style={{
                textShadow:
                  "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
              }}
            >
              HTML
            </span>
            <span
              className="text-blue-800 text-2xl font-semibold px-2.5 py-0.5 rounded border border-black"
              style={{
                textShadow:
                  "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
              }}
            >
              CSS
            </span>
            <span
              className="text-pink-400 text-2xl font-semibold px-2.5 py-0.5 rounded border border-black"
              style={{
                textShadow:
                  "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
              }}
            >
              JS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
