import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const WordContext = createContext();

export const WordProvider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);

  // Base API URL
  const API_URL = "http://localhost:5000/api/words";

  // Fetch all words
  const fetchWords = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setWords(res.data);
    } catch (err) {
      toast.error("Failed to fetch words.");
    } finally {
      setLoading(false);
    }
  };

  // Add new word
  const addWord = async (newWord) => {
    try {
      setLoading(true);
      const res = await axios.post(API_URL, newWord);
      setWords((prev) => [...prev, res.data]);
      toast.success("Word added!");
    } catch (err) {
      toast.error("Failed to add word.");
    } finally {
      setLoading(false);
    }
  };

  // Delete word
  const deleteWord = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      setWords((prev) => prev.filter((word) => word._id !== id));
      toast.success("Word deleted!");
    } catch (err) {
      toast.error("Failed to delete word.");
    } finally {
      setLoading(false);
    }
  };

  // Edit word
  const editWord = async (id, updatedData) => {
    try {
      setLoading(true);
      const res = await axios.put(`${API_URL}/${id}`, updatedData);
      setWords((prev) =>
        prev.map((word) => (word._id === id ? res.data : word))
      );
      toast.success("Word updated!");
    } catch (err) {
      toast.error("Failed to update word.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <WordContext.Provider
      value={{ words, loading, addWord, deleteWord, editWord }}
    >
      {children}
    </WordContext.Provider>
  );
};
