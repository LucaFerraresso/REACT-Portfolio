import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseConfig";

// Inizializzo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//fetch per ottenere i prodotti dal database per il fake ecommerce
export async function getProductsFireStore() {
  const productsCollection = collection(db, "products");
  const productSnapshot = await getDocs(productsCollection);
  const productsList = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(productsList);
  productsList.forEach((product) => {
    console.log("day", product.day, "amount", product.amount);
  });

  return productsList;
}

//fetch per ottenere le spese nel expenses chart components
export async function getExpensesFirestore() {
  const expensesCollection = collection(db, "expenses");
  const expensesSnapshot = await getDocs(expensesCollection);
  const expensesList = expensesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(expensesList);
  return expensesList;
}
