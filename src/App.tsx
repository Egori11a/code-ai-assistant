import React, { useState } from "react";
import CodeInput from "./components/CodeInput";
import ReviewResult from "./components/ReviewResult";
import { getCodeReview } from "./services/openaiService";

const App: React.FC = () => {
    const [review, setReview] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleCodeSubmit = async (code: string) => {
        setIsLoading(true);
        try {
            const result = await getCodeReview(code);
            setReview(result);
        } catch (err) {
            setReview("Произошла ошибка при получении ревью.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-900 p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-green-400">AI Code Review</h1>
            <div className="flex justify-center items-center w-full h-[calc(100vh-8rem)]">
                <div className="flex w-full h-full">
                    <div className="flex-1 pr-4 h-full">
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6 h-full border-l-4 border-green-400 overflow-auto">
                            <CodeInput onSubmit={handleCodeSubmit} isLoading={isLoading} />
                        </div>
                    </div>
                    <div className="flex-1 pl-4 h-full">
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6 h-full border-l-4 border-green-400 overflow-auto">
                            <ReviewResult result={review} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;