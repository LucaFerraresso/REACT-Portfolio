import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useSpring, animated } from "@react-spring/web";
import { getProductsFireStore } from "../API/firestore";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    background: "#ffffff",
    borderRadius: "10px",
    outline: "none",
    width: "90%",
    maxWidth: "600px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getProduct = async () => {
    try {
      const response = await getProductsFireStore();
      const selectedProduct = response.find(
        (product) => product.id.toString() === id
      );

      if (selectedProduct) {
        setProduct(selectedProduct);
        setModalIsOpen(true);
      } else {
        console.error("Product not found");
        navigate("/exercise/fakeecommerce");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      navigate("/exercise/fakeecommerce");
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const springProps = useSpring({
    opacity: modalIsOpen ? 1 : 0,
    transform: modalIsOpen ? "scale(1)" : "scale(0.9)",
    config: { tension: 300, friction: 20 },
  });

  const handleCloseModal = () => {
    setModalIsOpen(false);
    navigate("/exercise/fakeecommerce");
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      contentLabel="Product Details"
      appElement={document.getElementById("root") || undefined}
    >
      {product ? (
        <animated.div
          style={springProps}
          className="flex flex-col items-center"
        >
          <h1 className="text-rose-900 text-3xl font-bold mb-4">
            {product.name}
          </h1>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded border border-gray-300 mb-4"
          />
          <p className="text-green-600 text-xl font-semibold mb-2">
            Price: ${product.price}
          </p>
          <p className="text-rose-500 text-md mb-2">
            Category: {product.category}
          </p>
          <p className="text-gray-700 text-base mb-4">{product.description}</p>
          <button
            onClick={handleCloseModal}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Close
          </button>
        </animated.div>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
};

export default ProductPage;
