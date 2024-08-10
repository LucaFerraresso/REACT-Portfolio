import {
  getFirestore,
  collection,
  getDoc,
  setDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseConfig";
import { toast } from "react-toastify";

// Inizializzo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//fetch (get) per ottenere i prodotti dal database per il fake ecommerce
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

//fetch (get) per ottenere le spese nel expenses chart components
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

// Funzione per salvare o aggiornare i voti nel Firestore
export async function saveVoteToFirestore(projectId, userId, vote) {
  const voteDocRef = doc(db, `votes`, `${projectId}_${userId}`);

  try {
    // Utilizza setDoc per creare o aggiornare il documento con un ID specifico
    await setDoc(voteDocRef, {
      projectId,
      userId,
      vote,
    });

    toast.success("Voto salvato con successo");
  } catch (error) {
    toast.error("Errore nel salvataggio del voto");
    console.error("Errore nel salvataggio del voto: ", error);
  }
}

// Funzione per ottenere il voto di un utente per un progetto specifico da Firestore
export async function getVotesFromFirestore(projectId, userId) {
  const voteDocRef = doc(db, `votes`, `${projectId}_${userId}`);

  try {
    const docSnapshot = await getDoc(voteDocRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data().vote;
    } else {
      return null;
    }
  } catch (error) {
    toast.error("Errore nel recupero del voto");
    console.error("Errore nel recupero del voto: ", error);
    return null;
  }
}

// Funzione per ottenere il numero totale di voti per un progetto
export async function getTotalVotes(projectId) {
  const votesCollection = collection(db, "votes");
  const q = query(votesCollection, where("projectId", "==", projectId));

  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.size; // Ritorna il numero totale di documenti (voti)
  } catch (error) {
    console.error("Errore nel conteggio dei voti: ", error);
    return 0;
  }
}
