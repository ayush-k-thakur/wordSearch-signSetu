import { useState, useContext } from "react";
import { WordContext } from "../context/WordContext";
import { Link } from "react-router-dom"

export default function AddWord() {
  const { addWord } = useContext(WordContext);
  const [form, setForm] = useState({ word: "", definition: "", imageUrl: "", videoUrl: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addWord(form);
    setForm({ word: "", definition: "", imageUrl: "", videoUrl: "" });
  };

  return (
    <><Link to={"/"}><p className="underlined -blue mt-10 text-right mr-12">Back to Search Page</p> </Link>
      <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto">

        {Object.entries(form).map(([key, val]) => (
          <input
            key={key}
            placeholder={key}
            value={val}
            onChange={e => setForm({ ...form, [key]: e.target.value })}
            className="p-2 border rounded w-full mb-3"
          />
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Add Word</button>
      </form></>
  );
}