import { useContext, useEffect, useState } from "react";
import { WordContext } from "../context/WordContext";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

export default function Home() {
    const { words, loading } = useContext(WordContext);
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const wordsPerPage = 5;

    const filteredWords = words
        .filter(word => word.word.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => a.word.localeCompare(b.word));


    const indexOfLastWord = currentPage * wordsPerPage;
    const indexOfFirstWord = indexOfLastWord - wordsPerPage;
    const currentWords = filteredWords.slice(indexOfFirstWord, indexOfLastWord);
    const totalPages = Math.ceil(filteredWords.length / wordsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        console.log(words);
    }, [words]);

    return (
        <div className="p-4 max-w-4xl mx-auto">
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search a word..."
                className="w-full px-4 py-2 mb-2 border rounded shadow"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setCurrentPage(1);
                }}
            />

            {/* Results */}
            {loading ? (
                <Spinner />
            ) : (
                <div className="bg-white p-4 rounded shadow mb-6">
                    {filteredWords.length === 0 ? (
                        <p className="text-center text-gray-500">No matching words found.</p>
                    ) : (
                        currentWords.map((word) => (
                            <Link to={`/word/${word._id}`} key={word._id}>
                                <div className="border rounded p-4 mb-2 hover:bg-gray-100 cursor-pointer">
                                    <h2 className="text-lg font-bold">{word.word}</h2>
                                    <p className="text-gray-600">{word.definition}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            )}

            {/* Pagination Controls */}
            {!loading && filteredWords.length > wordsPerPage && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                    {/* Previous */}
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 border rounded ${currentPage === 1
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white hover:bg-blue-100"
                            }`}
                    >
                        Previous
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => paginate(i + 1)}
                            className={`px-3 py-1 rounded border ${currentPage === i + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-white hover:bg-blue-100"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    {/* Next */}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 border rounded ${currentPage === totalPages
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white hover:bg-blue-100"
                            }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
