import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseConfig";

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getProductsFireStore() {
  const productsCollection = collection(db, "products");
  const productSnapshot = await getDocs(productsCollection);
  const productsList = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(productsList);
  return productsList;
}
