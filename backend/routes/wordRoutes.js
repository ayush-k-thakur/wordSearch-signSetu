import express from "express";
import { getAllWords, getWord, addWord, updateWord, deleteWord } from "../controllers/wordControllers.js";

const router = express.Router();

router.get("/", getAllWords);
router.get("/:query", getWord);
router.post("/", addWord);
router.put("/:id", updateWord);
router.delete("/:id", deleteWord);

export default router;