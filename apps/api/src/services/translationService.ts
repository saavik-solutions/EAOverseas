import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const translateText = async (texts: string[], targetLang: string): Promise<string[]> => {
    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is missing.");
        }

        // Mapping simple codes to full names for better AI context
        const langMap: Record<string, string> = {
            'hi': 'Hindi',
            'te': 'Telugu',
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'en': 'English'
        };

        const targetLangName = langMap[targetLang] || targetLang;

        console.log(`OpenAI Translation Request for ${targetLangName}:`, texts);

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are a professional translator and linguistic expert specialized in English to ${targetLangName}.

CRITICAL INSTRUCTIONS:
1. Always distinguish between **Proper Nouns** (Names, Places, Brands, Titles) and **Common Nouns** (General words).
2. For Proper Nouns or titles used as names (e.g., 'Prince', 'Sunny', 'London', 'EA Overseas'), you MUST use **PHONETIC TRANSLITERATION** (representing the Sound in ${targetLangName} script) instead of translating the semantic meaning.
3. For general sentences and common nouns, use standard translation.
4. Maintain tone and casing.

EXAMPLES (English -> Hindi):
- "prince" (as a name/title) -> "प्रिंस" (Transliterated) ✅ [NOT "राजकुमार"]
- "sunny" (as a name) -> "सन्नी" (Transliterated) ✅ [NOT "सूरज की रोशनी"]
- "application" (common word) -> "आवेदन" (Translated) ✅
- "I am Prince" -> "मैं प्रिंस हूँ" ✅

Return a JSON object with a key "translations" containing the array of translated/transliterated strings.`
                },
                {
                    role: "user",
                    content: JSON.stringify({ texts })
                }
            ],
            response_format: { type: "json_object" }
        });

        const content = response.choices[0].message.content;
        console.log("OpenAI Response Content:", content);
        if (!content) throw new Error("Empty response from OpenAI");

        const parsed = JSON.parse(content);
        // Extract translated array — check "translations" key first, then first key found
        const result = parsed.translations || Object.values(parsed).find(v => Array.isArray(v)) || Object.values(parsed)[0];
        console.log("OpenAI Parsed Result:", result);

        return Array.isArray(result) ? result : [texts[0], texts[1]];
    } catch (error: any) {
        console.error("OpenAI Translation Error:", error.message || error);
        throw error;
    }
};
