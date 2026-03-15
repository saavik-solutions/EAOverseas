import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const checkContentSafety = async (content: string): Promise<{ flagged: boolean; reason?: string }> => {
    try {
        if (!process.env.OPENAI_API_KEY) {
            console.warn("OPENAI_API_KEY is missing. Skipping moderation check.");
            return { flagged: false };
        }

        const response = await openai.moderations.create({
            input: content,
        });

        const result = response.results[0];
        if (result.flagged) {
            const categories = Object.entries(result.categories)
                .filter(([_, value]) => value === true)
                .map(([key]) => key);

            return { flagged: true, reason: categories.join(', ') };
        }

        return { flagged: false };
    } catch (error: any) {
        console.error("OpenAI Moderation Error:", error.message || error);
        return { flagged: false }; // Fail open for safety of service
    }
};
