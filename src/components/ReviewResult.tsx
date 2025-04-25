import React from "react";

type Props = {
    result: string;
};

const ReviewResult: React.FC<Props> = ({ result }) => {
    if (!result) return null;

    return (
        <div className="w-full max-w-2xl mx-auto mt-6 p-4 border border-green-400 bg-green-50 rounded">
            <h2 className="text-lg font-semibold mb-2">Результат ревью:</h2>
            <pre className="whitespace-pre-wrap font-mono text-gray-800">{result}</pre>
        </div>
    );
};

export default ReviewResult;