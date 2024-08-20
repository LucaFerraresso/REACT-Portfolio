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

const ProjectCard = ({
  title,
  description,
  link,
  backgroundImage,
  projectId,
}) => {
  const [voteData, setVoteData] = useState({
    rating: 0,
    selectedVote: 0,
    totalVotes: 0,
    averageRating: 0,
    hasVoted: false,
  });

  const [showOverlay, setShowOverlay] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  const { user } = useAuth();

  const handleStarClick = (value) => {
    if (!user) {
      return toast.error("Devi effettuare il login per votare!");
    }
    setVoteData((prevState) => ({ ...prevState, selectedVote: value }));
  };

  const handleVote = async () => {
    if (!user) return toast.error("Devi effettuare il login per votare!");
    if (voteData.selectedVote === 0)
      return toast.error("Seleziona un voto prima di votare!");

    try {
      await saveVoteToFirestore(projectId, user.uid, voteData.selectedVote);
      toast.success("Voto registrato con successo!");

      const updatedTotalVotes = await getTotalVotes(projectId);
      const votes = await getAllVotes(projectId);
      const totalVotesCount = votes.length;
      const sumOfVotes = votes.reduce((sum, vote) => sum + vote, 0);
      const average =
        totalVotesCount > 0 ? (sumOfVotes / totalVotesCount).toFixed(1) : 0;

      setVoteData({
        rating: voteData.selectedVote,
        selectedVote: voteData.selectedVote,
        totalVotes: updatedTotalVotes,
        averageRating: average,
        hasVoted: true,
      });
    } catch (error) {
      toast.error("Errore durante la registrazione del voto.");
    }
  };
  const technologies = [
    { text: "HTML", color: "text-blue-300" },
    { text: "CSS", color: "text-red" },
    { text: "JS", color: "text-yellow-400" },
  ];

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        if (user) {
          const savedVote = await getVotesFromFirestore(projectId, user.uid);
          setVoteData((prevState) => ({
            ...prevState,
            rating: savedVote || 0,
            selectedVote: savedVote || 0,
            hasVoted: savedVote !== null,
          }));
        }
        const votesCount = await getTotalVotes(projectId);
        const votes = await getAllVotes(projectId);
        const totalVotesCount = votes.length;
        const sumOfVotes = votes.reduce((sum, vote) => sum + vote, 0);
        const average =
          totalVotesCount > 0 ? (sumOfVotes / totalVotesCount).toFixed(1) : 0;

        setVoteData((prevState) => ({
          ...prevState,
          totalVotes: votesCount,
          averageRating: average,
        }));
      } catch (error) {
        console.error("Errore nel recupero dei voti:", error);
      }
    };

    fetchVotes();
  }, [user, projectId]);

  const [imageProps, imageApi] = useSpring(() => ({
    transform: "scale(1)",
    config: { tension: 200, friction: 20 },
  }));

  const handleMouseEnter = () => {
    imageApi.start({ transform: "scale(1.1)" });
    if (!hasClicked) setShowOverlay(true);
  };

  const handleMouseLeave = () => {
    imageApi.start({ transform: "scale(1)" });
    if (!hasClicked) setShowOverlay(false);
  };

  const handleClick = () => {
    if (hasClicked) {
      window.location.href = link;
    } else {
      setShowOverlay(true);
      setHasClicked(true);
    }
  };

  return (
    <div className="relative w-[300px] h-[500px] md:w-[350px] md:h-[550px] lg:w-[400px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg border border-black flex flex-col bg-white">
      {/* Sezione Immagine */}
      <div className="relative overflow-hidden h-1/2">
        <Link to={link}>
          <animated.div
            className="relative w-full h-full cursor-pointer"
            style={imageProps}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            <animated.img
              src={backgroundImage}
              alt="Background"
              className="w-full h-full object-cover"
            />
            {showOverlay && (
              <div className="absolute inset-0 flex justify-center items-center opacity-100 bg-black bg-opacity-60 transition-opacity duration-300">
                <span className="text-white text-lg font-bold">
                  View Project
                </span>
              </div>
            )}
          </animated.div>
        </Link>
        <div className="absolute top-0 right-0 mt-2 mr-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded border border-black text-shadow-sm">
          FREE
        </div>
      </div>

      {/* Sezione Contenuto */}
      <div className="flex flex-col flex-grow p-4 justify-between">
        {/* Titolo e Descrizione */}
        <div className="flex-grow">
          <h1 className="text-dark-brown text-xl font-bold mb-2">{title}</h1>
          <p className="text-gray-700 text-base mb-4">{description}</p>
        </div>

        {/* Sezione di voto condizionata */}
        {user && !voteData.hasVoted && (
          <div className="mb-4">
            <div className="flex items-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  onClick={() => handleStarClick(star)}
                  color={
                    star <= (voteData.selectedVote || voteData.rating)
                      ? "#ffc107"
                      : "#e4e5e9"
                  }
                  className="cursor-pointer transition-colors duration-200"
                />
              ))}
            </div>
            <button
              onClick={handleVote}
              className={`bg-green text-white py-1 px-2 rounded hover:bg-green-600 transition duration-200 ${
                !voteData.selectedVote || voteData.hasVoted
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={!voteData.selectedVote || voteData.hasVoted}
            >
              Vota
            </button>
            <div className="text-gray-700 text-base mb-2">
              Punteggio attuale: {voteData.rating} ({voteData.totalVotes} voti)
            </div>
          </div>
        )}

        {/* Media voti e linguaggi */}
        <div className="mt-auto">
          <div className="text-gray-700 text-base mb-2">
            Media voti: {voteData.averageRating} ({voteData.totalVotes} voti)
          </div>
          <div className="flex items-center space-x-1 mb-4">
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar
                key={index}
                size={24}
                color={
                  index < Math.round(voteData.averageRating)
                    ? "#ffc107"
                    : "#e4e5e9"
                }
              />
            ))}
          </div>
          <div className="flex items-center space-x-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className={`${tech.color} text-2xl font-semibold px-2.5 py-0.5 rounded border border-black`}
                style={{
                  textShadow:
                    "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
                }}
              >
                {tech.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
