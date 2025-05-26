import Word from "../models/Word.js";

export const getAllWords = async (req, res) => {
  const words = await Word.find();
  res.json(words);
};

export const getWord = async (req, res) => {
  const query = req.params.query.toLowerCase();
  const word = await Word.findOne({ word: new RegExp(query, "i") });
  word ? res.json(word) : res.status(404).json({ message: "Word not found" });
};

export const addWord = async (req, res) => {
  const { word, definition, imageUrl, videoUrl } = req.body;
  const newWord = new Word({ word, definition, imageUrl, videoUrl });
  await newWord.save();
  res.status(201).json(newWord);
};

export const updateWord = async (req, res) => {
  const { id } = req.params;
  const updated = await Word.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

export const deleteWord = async (req, res) => {
  const { id } = req.params;
  await Word.findByIdAndDelete(id);
  res.json({ message: "Word deleted" });
};