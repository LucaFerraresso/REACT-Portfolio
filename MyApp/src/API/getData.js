import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./API/firebaseConfig"; // Assicurati che il percorso sia corretto

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//fetch 1 , advice generator
async function getRandomAdvice() {
  const res = await fetch("https://api.adviceslip.com/advice");
  const data = await res.json();
  return data;
}

//fetch per ottenere i prodotti del fake ecommerce da Firestore
async function getProducts() {
  const productsCollection = collection(db, "products");
  const productSnapshot = await getDocs(productsCollection);
  const productsList = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(productsList);
  return productsList;
}

export { getRandomAdvice, getProducts };
