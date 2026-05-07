export interface Scholarship {
    id: number;
    title: string;
    provider: string;
    description: string;
    amount: string;
    eligibility: string;
    deadline: string;
    image: string;
    status: string;
    category: string;
    longDescription?: string;
    criteria?: string[];
    benefits?: string[];
}

export const scholarships: Scholarship[] = [
    {
        id: 1,
        title: "Future Innovators AI Award",
        provider: "Tech Frontiers Org",
        description: "Supporting undergraduate research in artificial intelligence and machine learning applications.",
        amount: "₹ 2,00,000",
        eligibility: "85%+ Score",
        deadline: "12 Days",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfPhw5mBbq5aoqtOcsm6LDP7j3J7Aq7v_H3Z63PoGu2WIluabWsXB0wRLRzjFB8jlo3Xo_tIhtNYhZD5qwtpMGst_JU7cIoVEHDrDLpodN4YJ5ubbB6fpUgUmSLfjqvyvxm_E3gzokqSldwfjjglx0LvSAliSfrzfU99PxEjZ9q5Dj8PRARGOlrIxQ2Aq4-nZWbvoVatUbI0GsQh0m663Av4RQvAzgLOzIx-OUNjfBuDprfDxdQfmi-p32tQ7EC-g7i4JpwEIgNas",
        status: "Open",
        category: "Tech",
        longDescription: "The Future Innovators AI Award is a prestigious initiative designed to empower future leaders in Artificial Intelligence and Machine Learning. Established by the Tech Frontiers Org, this award aims to bridge the gap between financial constraints and world-class research for exceptionally gifted students worldwide.",
        criteria: [
            "Enrollment in a Computer Science or AI program",
            "GPA of 3.8+ or 85% equivalent",
            "Submission of a research proposal in AI/ML",
            "Demonstrated coding proficiency"
        ],
        benefits: [
            "Project funding up to ₹ 2,00,000",
            "Mentorship from industry experts",
            "Access to premium compute resources",
            "Internship opportunity at Tech Frontiers"
        ]
    },
    {
        id: 2,
        title: "Nursing & Medical Aid",
        provider: "Healthcare Foundation",
        description: "Financial assistance for students pursuing Bachelor of Science in Nursing or Allied Health sciences.",
        amount: "₹ 80,000",
        eligibility: "Economic Need",
        deadline: "Applied",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhpEks_k8K060O40U9G7kofZ8r9h9GzL61kI5r9O7B060O4u9G7kofZ8r9h9GzL61kI5r9O7B",
        status: "Applied",
        category: "Medical",
        longDescription: "This grant focuses on supporting the next generation of healthcare professionals. Our mission is to alleviate the financial burden for dedicated medical students.",
        criteria: [
            "BSc Nursing or Medical student",
            "Verified household income certificate",
            "Consistent academic record",
            "Good standing in clinical practice"
        ],
        benefits: [
            "₹ 80,000 semester grant",
            "Medical equipment allowance",
            "Book and resource stipend",
            "Clinical placement support"
        ]
    },
    {
        id: 3,
        title: "Creative Leadership Grant",
        provider: "Global Arts Council",
        description: "Nurturing the next generation of creative directors and design leaders across the globe.",
        amount: "₹ 3,50,000",
        eligibility: "Portfolio + 80%",
        deadline: "48 Hours",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxBnq55Jk-lKeNH9gm3mMaFxR2T4OwxDIYsEldn889TMiFkjdt8YqaWYeTCX0BYLVs7k-VZ1LNGldOvJBEAg0_tPasdWSMzd7BuGUKOzJ9wNhFHjOGAbUpmci9aIIOLqsCcUoLA08s5svoysl06lhYN00Mod-ssvcHDy_xyAI4cHiH7k89ZeCXQMS_AyVeupsGZD6Su7RRvzMf-ROP-E0KRf__sPeLpL7zTN1qTXQJ3olyyw9fYFnWGsVINZGeXfsNl9K7p3jUNw4",
        status: "Closing Soon",
        category: "Arts",
        longDescription: "The Global Arts Council invites visionary creators to apply for this leadership grant. We support diverse voices in cinema, design, and fine arts.",
        criteria: [
            "Strong digitial portfolio",
            "80% academic threshold",
            "Leadership experience in school/college",
            "Creative project proposal"
        ],
        benefits: [
            "₹ 3,50,000 development grant",
            "International design showcase",
            "Creative residency program",
            "Networking with industry leaders"
        ]
    }
];
