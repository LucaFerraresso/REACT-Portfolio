import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "tailwindcss/tailwind.css";
import { Navigate } from "react-router-dom";
//default setup
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import DefaultLayout from "./pages/DefaultLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
//components/pages
import Projects from "./pages/Projects.jsx";
import AdviceApp from "./pages/AdviceGenerator.jsx";
import AgeCalculator from "./pages/AgeCalculator.jsx";
import ContactForm from "./pages/ContactForm.jsx";
import MortgageCalculator from "./pages/MortgageCalculator.jsx";
import FakeEcommerce from "./pages/FakeEcommerce.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Cart from "./pages/Cart.jsx";
import InteractiveForm from "./pages/InteractiveCardForm.jsx";
import TipCalculator from "./pages/TipCalculator.jsx";
import InteractivePricingSlider from "./pages/InteractivePricingSlider.jsx";
import NewsLetterSignUp from "./pages/NewsLetterSignUp.jsx";
import LaunchCountdownTimer from "./pages/LaunchCountdownTimer.jsx";
import ExpensesChartComponent from "./pages/ExpensesChartComponent.jsx";
import RockPaperScissors from "./pages/RockPaperScissors.jsx";
import ThreeJsProject from "./pages/ThreeJsProject.jsx";
//navbar and footer links
import Login from "./pages/Login.jsx";
import Contacts from "./pages/Contacts.jsx";
import AboutMe from "./pages/AboutMe.jsx";
//provider
import { CartProvider } from "./useContext/CartContext.jsx";
import { AuthProvider } from "./useContext/AuthContext.jsx";
//toast library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//firebase online database
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig.js";
//authContext
export { AuthContext } from "./useContext/AuthContext.jsx";
//traduttore
import "./i18n.js";

//inizio app

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/homepage" />,
      },
      {
        path: "/homepage",
        element: <HomePage />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/exercise/advicegenerator",
        element: <AdviceApp />,
      },
      {
        path: "/exercise/agecalculator",
        element: <AgeCalculator />,
      },
      {
        path: "/exercise/contactform",
        element: <ContactForm />,
      },
      {
        path: "/exercise/mortgagecalculator",
        element: <MortgageCalculator />,
      },
      {
        path: "/exercise/fakeecommerce",
        element: <FakeEcommerce />,
      },
      {
        path: "/exercise/fakeecommerce/:id",
        element: <ProductPage />,
      },
      {
        path: "/exercise/fakeecommerce/cart",
        element: <Cart />,
      },
      {
        path: "/exercise/interactivecardform",
        element: <InteractiveForm />,
      },
      {
        path: "/exercise/tipcalculator",
        element: <TipCalculator />,
      },
      {
        path: "/exercise/pricingslider",
        element: <InteractivePricingSlider />,
      },
      {
        path: "/exercise/newslettersignup",
        element: <NewsLetterSignUp />,
      },
      {
        path: "/exercise/launchcountdowntimer",
        element: <LaunchCountdownTimer />,
      },
      {
        path: "/exercise/expenseschartcomponent",
        element: <ExpensesChartComponent />,
      },
      {
        path: "/exercise/rockpaperscissorsmaster",
        element: <RockPaperScissors />,
      },
      {
        path: "/exercise/threejsproject",
        element: <ThreeJsProject />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/aboutme",
        element: <AboutMe />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
    <ToastContainer />
  </>
);
