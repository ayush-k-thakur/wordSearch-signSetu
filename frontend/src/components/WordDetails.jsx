import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { WordContext } from "../context/WordContext";

export default function WordDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { words, editWord, deleteWord } = useContext(WordContext);

  const word = words.find((w) => w._id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    word: word?.word || "",
    definition: word?.definition || "",
    imageUrl: word?.imageUrl || "",
    videoUrl: word?.videoUrl || "",
  });

  if (!word) {
    return <p className="text-center mt-10">Word not found.</p>;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = async () => {
    if (!formData.word.trim() || !formData.definition.trim()) {
      alert("Word and Definition cannot be empty.");
      return;
    }

    await editWord(id, formData);
    setIsEditing(false);
  };

  const handleDeleteConfirmed = async () => {
    await deleteWord(id);
    setIsDeleting(false);
    navigate("/");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded relative">
      <h1 className="text-3xl font-bold mb-4">{word.word}</h1>
      <p className="mb-4">{word.definition}</p>
      {word.imageUrl && (
        <img src={word.imageUrl} alt={word.word} className="mb-4 rounded" />
      )}
      {word.videoUrl && (
        <video controls className="w-full max-w-lg rounded mb-4">
          <source src={word.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400"
        >
          Edit
        </button>
        <button
          onClick={() => setIsDeleting(true)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50"
            onClick={() => setIsEditing(false)}
          ></div>

          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div
              className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Edit Word</h2>

              <label className="block mb-2 font-semibold">Word:</label>
              <input
                type="text"
                name="word"
                value={formData.word}
                onChange={handleChange}
                className="w-full mb-4 px-3 py-2 border rounded"
              />

              <label className="block mb-2 font-semibold">Definition:</label>
              <textarea
                name="definition"
                value={formData.definition}
                onChange={handleChange}
                rows={4}
                className="w-full mb-4 px-3 py-2 border rounded"
              />

              <label className="block mb-2 font-semibold">Image URL:</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full mb-4 px-3 py-2 border rounded"
              />

              <label className="block mb-2 font-semibold">Video URL:</label>
              <input
                type="text"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                className="w-full mb-4 px-3 py-2 border rounded"
              />

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50"
            onClick={() => setIsDeleting(false)}
          ></div>

          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div
              className="bg-white p-6 rounded shadow-lg max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p className="mb-6">
                Are you sure you want to delete <strong>{word.word}</strong>?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsDeleting(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirmed}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
