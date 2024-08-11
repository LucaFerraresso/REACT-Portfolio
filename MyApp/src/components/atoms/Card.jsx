import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import { useAuth } from "../../useContext/AuthContext";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import {
  saveVoteToFirestore,
  getVotesFromFirestore,
  getTotalVotes,
  getAllVotes,
} from "../../API/firestore";

const Card = ({ title, description, link, backgroundImage, projectId }) => {
  const [rating, setRating] = useState(0);
  const [selectedVote, setSelectedVote] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const { user } = useAuth();

  const handleStarClick = (value) => {
    if (!user) {
      toast.error("Devi effettuare il login per votare!");
      return;
    }

    setSelectedVote(value); // Imposta il voto selezionato
  };

  const handleVote = async () => {
    if (!user) {
      toast.error("Devi effettuare il login per votare!");
      return;
    }

    if (selectedVote === 0) {
      toast.error("Seleziona un voto prima di votare!");
      return;
    }

    try {
      await saveVoteToFirestore(projectId, user.uid, selectedVote); // Salva il voto nel Firestore
      setRating(selectedVote); // Aggiorna il rating con il voto selezionato
      toast.success("Voto registrato con successo!");

      const updatedTotalVotes = await getTotalVotes(projectId); // Aggiorna il totale dei voti
      setTotalVotes(updatedTotalVotes); // Imposta il numero totale di voti
      updateAverageRating();
    } catch (error) {
      toast.error("Errore durante la registrazione del voto.");
      //console.error("Errore nel salvataggio del voto:", error);
    }
  };
  const updateAverageRating = async () => {
    const votes = await getAllVotes(projectId); // Ottieni tutti i voti
    const totalVotesCount = votes.length; // Numero totale di voti
    const sumOfVotes = votes.reduce((sum, vote) => sum + vote, 0); // Somma dei voti
    const average = totalVotesCount > 0 ? sumOfVotes / totalVotesCount : 0; // Calcola la media
    setAverageRating(average.toFixed(1)); // Imposta la media, con una cifra decimale
  };

  useEffect(() => {
    const fetchVotes = async () => {
      if (user) {
        try {
          const savedVote = await getVotesFromFirestore(projectId, user.uid);
          if (savedVote !== null) {
            setRating(savedVote);
            setSelectedVote(savedVote);
            setHasVoted(true);
          } else {
            setRating(0);
            setSelectedVote(0);
            setHasVoted(false);
          }
        } catch (error) {
          console.error("Errore nel recupero del voto:", error);
        }
      }

      try {
        const votesCount = await getTotalVotes(projectId);
        setTotalVotes(votesCount);
        updateAverageRating();
      } catch (error) {
        console.error("Errore nel recupero del totale voti:", error);
      }
    };

    fetchVotes();
  }, [user, projectId]);

  const [imageProps, imageApi] = useSpring(() => ({
    transform: "scale(1)",
    config: { tension: 200, friction: 20 },
  }));

  return (
    <div className="w-[300px] h-[500px] md:w-[350px] md:h-[550px] lg:w-[400px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg bg-white border border-black">
      <div className="flex flex-col justify-between h-full">
        <div className="relative overflow-hidden bg-gradient-to-b from-light-cyan to-cream h-1/3">
          <Link to={link}>
            <animated.img
              src={backgroundImage}
              alt="Background"
              className="w-full h-96 object-cover transition-transform duration-300 cursor-pointer"
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
        <div className="p-4 h-1/3">
          <h1 className="text-dark-brown text-xl font-bold mb-2">{title}</h1>
          <p className="text-gray-700 text-base mb-4">{description}</p>

          {/* Sezione di voto condizionata */}
          {user && !hasVoted && (
            <div className="h-1/3">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    onClick={() => handleStarClick(star)}
                    color={
                      star <= (selectedVote || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    style={{
                      cursor: "pointer",
                      transition: "color 200ms",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={handleVote}
                className={`bg-green text-white py-1 px-2 rounded hover:bg-green-600 transition duration-200 ${
                  selectedVote === 0 || hasVoted
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={selectedVote === 0 || hasVoted} // Disabilita il pulsante se il voto è stato già inviato
              >
                Vota
              </button>
            </div>
          )}

          <div className="text-gray-700 text-base mt-4 mb-2">
            Punteggio attuale: {rating} ({totalVotes} voti)
          </div>
          <div className="text-gray-700 text-base mt-2">
            Media voti: {averageRating} ({totalVotes} voti)
          </div>
          <div className="flex items-center space-x-1 mt-2 mb-2">
            {Array.from({ length: Math.round(averageRating) }, (_, index) => (
              <FaStar key={index} size={24} color="#ffc107" />
            ))}
            {Array.from(
              { length: 5 - Math.round(averageRating) },
              (_, index) => (
                <FaStar
                  key={index + Math.round(averageRating)}
                  size={24}
                  color="#e4e5e9"
                />
              )
            )}
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
