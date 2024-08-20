import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";
import { useAuth } from "../../useContext/AuthContext";
import { toast } from "react-toastify";
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

  const handleMouseEnter = () => imageApi.start({ transform: "scale(1.1)" });
  const handleMouseLeave = () => imageApi.start({ transform: "scale(1)" });

  const technologies = [
    { text: "HTML", color: "text-blue-300" },
    { text: "CSS", color: "text-red" },
    { text: "JS", color: "text-yellow-400" },
  ];

  return (
    <div className="w-[300px] h-[500px] md:w-[350px] md:h-[550px] lg:w-[400px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg bg-white border border-black flex flex-col">
      <div className="relative overflow-hidden bg-gradient-to-b from-light-cyan to-cream h-1/2">
        <animated.div
          className="relative w-full h-full cursor-pointer"
          style={imageProps}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => (window.location.href = link)}
        >
          <animated.img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </animated.div>
        <div className="absolute top-0 right-0 mt-2 mr-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded border border-black text-shadow-sm">
          FREE
        </div>
      </div>
      <div
        className={`flex flex-col flex-grow p-4 justify-between ${
          user ? "pt-2" : ""
        }`}
      >
        <div className="flex-grow">
          <h1 className="text-dark-brown text-xl font-bold mb-2">{title}</h1>
          <p className="text-gray-700 text-base mb-4">{description}</p>
        </div>
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
          </div>
        )}
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
                className={`${tech.color} text-2xl font-bold px-2.5 py-0.5 rounded border border-black`}
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
