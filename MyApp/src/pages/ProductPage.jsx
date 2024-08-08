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
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    outline: "none",
    width: "90%",
    maxWidth: "500px",
    height: "auto",
    maxHeight: "80vh",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderWidth: "1px",
    borderColor: "#ddd",
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
    const response = await getProductsFireStore();
    const product = response.find((product) => product.id == id);
    const productWithImage = { ...product, image: product.image };
    setProduct(productWithImage);
    setModalIsOpen(true);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const springProps = useSpring({
    opacity: modalIsOpen ? 1 : 0,
    transform: modalIsOpen ? `scale(1)` : `scale(0.9)`,
    config: { tension: 300, friction: 20 },
  });

  const handleCloseModal = () => {
    setModalIsOpen(false);

    navigate("/exercise/fakeecommerce");
  };

  return (
    <>
      {product && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          style={customStyles}
          contentLabel="Product Details"
          appElement={document.getElementById("root")}
        >
          <animated.div
            style={springProps}
            className="flex flex-col justify-center items-center h-full"
          >
            <div className="flex flex-col gap-2 w-[320px] h-[450px] overflow-hidden p-2 text-center">
              <h1 className="text-rose-900  text-2xl font-bold">
                {" "}
                {product.name}
              </h1>
              <img
                src={product.image}
                alt={product.name}
                className="rounded border border-black"
              />
              <p className="text-green-600 text-lg">Price: {product.price}$</p>
              <p className="text-rose-500 text-sm">
                Category: {product.category}
              </p>
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
              Close
            </button>
          </animated.div>
        </Modal>
      )}
    </>
  );
};

export default ProductPage;
