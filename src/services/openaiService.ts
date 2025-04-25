//import { getMockReview } from "../mock/mockReview";
import { getRealAIReview } from "../realAIReview/realAIReview";

export const getCodeReview = async (code: string): Promise<string> => {
    return getRealAIReview(code);
    //const response = await getMockReview(code);
    //return response.message.content;
};