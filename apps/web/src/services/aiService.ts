// Mock AI Service to replace broken external API
export const generateAIResponse = async (fullPrompt) => {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
        // Extract the user question and context from the prompt
        // Structure is usually: ... **USER QUESTION:** "${text}"
        const matchQuestion = fullPrompt.match(/\*\*USER QUESTION:\*\* "(.*)"$/s);
        const userQuestion = matchQuestion ? matchQuestion[1] : fullPrompt;
        const lowerQuestion = userQuestion.toLowerCase();

        // Extract User Name from Context
        const matchName = fullPrompt.match(/- Name: (.*)/);
        const userName = matchName ? matchName[1] : "Student";

        // 1. Greetings & Status
        if (lowerQuestion.match(/^(hi|hello|hey|greetings|good morning|good evening)/) || lowerQuestion.includes('how are you')) {
            return `Hello ${userName}! I'm **Guide Buddy**, your EAOverseas assistant. I'm doing great and ready to help you with:\n- **Profile Eligibility**\n- **Visa Requirements**\n- **Finding Colleges**\n- **Loan Options**\n\nWhat would you like to explore today?`;
        }

        // 2. User Identity (My Name)
        if (lowerQuestion.includes('my name') || lowerQuestion.includes('who am i')) {
            return `You are **${userName}**! \n\nI can also see your profile details if you'd like to check your eligibility for specific universities.`;
        }

        // 3. AI Identity (Who are you)
        if (lowerQuestion.includes('who are you') || lowerQuestion.includes('your name') || lowerQuestion.includes('what are you')) {
            return "I am **Guide Buddy**, an AI assistant designed exclusively for the EAOverseas platform. \n\nI can guide you through your entire study abroad journey, from shortlisting colleges to applying for visas and loans.";
        }

        // 3. Profile / Eligibility
        if (lowerQuestion.includes('profile') || lowerQuestion.includes('eligible') || lowerQuestion.includes('strength') || lowerQuestion.includes('score') || lowerQuestion.includes('chances')) {
            return "Based on your **Profile Strength**, you're making great progress! \n\nTo improve your eligibility:\n1. Ensure your **Academic Transcripts** are uploaded in [Documents](/documents).\n2. Complete your **Target Preferences** in [My Profile](/profile).\n3. Check the **Course Finder** for programs matching your GPA.\n\nWould you like me to analyze a specific country match?";
        }

        // 4. Visa
        if (lowerQuestion.includes('visa') || lowerQuestion.includes('permit') || lowerQuestion.includes('unconditional offer')) {
            return "For **Visa Applications**, the requirements vary by country. \n\nGenerally, you will need:\n- Valid Passport\n- University Offer Letter\n- Proof of Funds\n\nVisit our [Visa Prep](/visas) section for a detailed checklist tailored to your target destination.";
        }

        // 5. Loans / Finance
        if (lowerQuestion.includes('loan') || lowerQuestion.includes('fund') || lowerQuestion.includes('money') || lowerQuestion.includes('cost') || lowerQuestion.includes('scholarship') || lowerQuestion.includes('financial')) {
            return "Financing your education is a big step. \n\nYou can check your loan eligibility instantly in our [Loans Section](/loans). We work with top lenders to provide competitive rates for students.\n\nDo you want to see the list of required financial documents?";
        }

        // 6. Colleges / Universities
        if (lowerQuestion.includes('college') || lowerQuestion.includes('university') || lowerQuestion.includes('school') || lowerQuestion.includes('program') || lowerQuestion.includes('course')) {
            return "Looking for the best universities? \n\nI recommend using our **College Finder** to filter by:\n- Ranking\n- Course availability\n- Tuition fees\n\n[Explore Colleges](/colleges) now to shortlist your favorites.";
        }

        // 6. Documents
        if (lowerQuestion.includes('document') || lowerQuestion.includes('upload') || lowerQuestion.includes('nop') || lowerQuestion.includes('sov') || lowerQuestion.includes('lor')) {
            return "Proper documentation is key. Please ensure you have uploaded:\n- **CV/Resume**\n- **Statement of Purpose (SOP)**\n- **Letters of Recommendation (LOR)**\n\nManage all your files securely in the [Documents](/documents) portal.";
        }

        // 7. Accommodation
        if (lowerQuestion.includes('accommodation') || lowerQuestion.includes('housing') || lowerQuestion.includes('stay')) {
            return "Finding a place to stay is easy! Check our [Accommodation](/accommodation) page to find student housing near your university campus.";
        }

        // 8. Application
        if (lowerQuestion.includes('application') || lowerQuestion.includes('apply')) {
            return "Ready to apply? You can track all your drafted and submitted applications in the [Applications](/applications) dashboard. \n\nNeed help writing your SOP? Our [Consultants](/consultant) can review it for you.";
        }

        // Default Fallback
        return "That's an interesting question! \n\nWhile I focus on helping you with your **Study Abroad Journey** (Visas, Loans, Colleges), I recommend checking our [Community Feed](/community-feed) to ask other students, or book a session with a [Consultant](/consultant) for personalized advice.\n\nIs there anything specific about your application I can help with?";

    } catch (err) {
        console.error("Mock AI Error:", err);
        return "I'm having a little trouble connecting right now. Please try again in a moment.";
    }
};
