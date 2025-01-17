import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useSinglePost = (docCollection, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

  // Handle memory leaks

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);
      try {
        const docRef =  await doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

          setDocument(docSnap.data());
  
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);  // Garantir que o loading seja setado como false quando o processo for concluído
      }
    };

    loadDocument();
  }, [docCollection, id]);


    return {
    document,
    loading,
    error,
    };
};
