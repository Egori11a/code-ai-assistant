import React, { useState } from "react";

type Props = {
    onSubmit: (code: string) => void;
    isLoading: boolean;
};

const CodeInput: React.FC<Props> = ({ onSubmit, isLoading }) => {
    const [code, setCode] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.trim()) {
            onSubmit(code);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-4">
            <textarea
                className="w-full h-64 p-3 border border-gray-300 rounded-lg font-mono resize-none"
                placeholder="Сюда код на отправку"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isLoading}
            />
            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={isLoading}
            >
                {isLoading ? "Анализ..." : "Отправить"}
            </button>
        </form>
    );
};

export default CodeInput; 