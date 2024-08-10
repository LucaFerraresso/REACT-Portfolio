import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
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

//fetch (post) per salvare nel database i voti assegnati ai progetti dagli utenti

// Funzione per salvare i voti nel Firestore
export async function saveVoteToFirestore(projectId, userId, vote) {
  const votesCollection = collection(db, "votes");
  const voteDocRef = doc(votesCollection, `${projectId}_${userId}`);

  try {
    const docSnapshot = await getDocs(voteDocRef);

    if (docSnapshot.exists()) {
      // Se il documento esiste già, aggiorniamo il voto
      await updateDoc(voteDocRef, {
        vote: vote,
      });
    } else {
      // Se il documento non esiste, lo creiamo
      await addDoc(votesCollection, {
        projectId,
        userId,
        vote,
      });
    }

    toast.success("Voto salvato con successo");
  } catch (error) {
    toast.error("Errore nel salvataggio del voto: ");
  }
}

// Funzione per ottenere i voti esistenti da Firestore
export async function getVotesFromFirestore(projectId, userId) {
  const votesCollection = collection(db, "votes");
  const voteDocRef = doc(votesCollection, `${projectId}_${userId}`);

  try {
    const docSnapshot = await getDoc(voteDocRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data().vote;
    } else {
      return null;
    }
  } catch (error) {
    toast.error("Errore nel recupero del voto");
    return null;
  }
}

// Funzione per ottenere il numero totale di voti per un progetto
export async function getTotalVotes(projectId) {
  const votesCollection = collection(db, "votes");
  const q = query(votesCollection, where("projectId", "==", projectId));

  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.size; // Ritorna il numero totale di documenti
  } catch (error) {
    console.error("Errore nel conteggio dei voti: ", error);
    return 0;
  }
}
