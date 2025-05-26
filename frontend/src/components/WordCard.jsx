import { Link } from "react-router-dom";

export default function WordCard({ word }) {
    return (
        <Link to={`/word/${word._id}`}>
            <div className="border rounded p-4 shadow hover:bg-gray-100 cursor-pointer">
                <h2 className="text-xl font-bold">{word.word}</h2>
                <p className="text-gray-600">{word.definition}</p>
            </div>
        </Link>
    );
}
