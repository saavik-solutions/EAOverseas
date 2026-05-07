import riyaImg from '../features/landing/assets/riya_mehta.png';
import arjunImg from '../features/landing/assets/arjun_singh.png';
import snehaImg from '../features/landing/assets/sneha_kapoor.png';
import rohanImg from '../features/landing/assets/rohan_mehra.png';
import anjaliImg from '../features/landing/assets/anjali_rao.png';
import kabirImg from '../features/landing/assets/kabir_malhotra.png';
import ishitaImg from '../features/landing/assets/ishita_verma.png';
import vikramImg from '../features/landing/assets/vikram_iyer.png';

// New team member images
import ceoImg from '../features/landing/assets/team_sui.jpg';
import graphicImg from '../features/landing/assets/team_lara.jpg';
import frontendImg from '../features/landing/assets/team_sam.jpg';
import backendImg from '../features/landing/assets/team_edrik.jpg';

export const experts = [
    {
        id: "david-kim",
        name: "David Kim",
        role: "CEO & Founder",
        image: ceoImg,
        tags: ["Leadership", "Vision"],
        bio: "Visionary leader dedicated to transforming global education accessibility through technology and personalized guidance.",
        category: "Leadership",
        color: "#111218",
        tagBg: "#E0E0E0",
        stats: {
            studentsGuided: "10,000+",
            visaSuccess: "99.9%",
            yearsExperience: "20+"
        },
        journey: [
            "David founded EAOverseas with a singular mission: to democratize access to world-class education. His journey from a student immigrant to an ed-tech pioneer inspires our entire team.",
            "Under his leadership, EAOverseas has grown from a small consultancy to a global platform.",
            "He focuses on strategic partnerships and technological innovation to keep us ahead of the curve."
        ],
        expertise: [
            { title: "Strategic Vision", icon: "visibility", desc: "Long-term planning and industry disruption strategies." },
            { title: "Global Partnerships", icon: "public", desc: "Building alliances with top universities worldwide." },
            { title: "Leadership", icon: "groups", desc: "Mentoring the next generation of educational leaders." }
        ]
    },
    {
        id: "riya-mehta",
        name: "Riya Mehta",
        role: "Senior Education Counsellor",
        image: riyaImg,
        tags: ["Study Abroad", "Career Path"],
        bio: "Expert in Ivy League admissions with over 8 years of experience in career coaching.",
        category: "Counsellors",
        color: "#9747FF",
        tagBg: "#E8DAFF",
        stats: {
            studentsGuided: "1,200+",
            visaSuccess: "98%",
            yearsExperience: "10+"
        },
        journey: [
            "With over a decade of dedicated experience in international education, Riya Mehta has become one of EAOverseas' most sought-after consultants. Her journey began with a passion for bridging the gap between Indian students' potential and global academic opportunities.",
            "Riya specializes specifically in UK and Canada admissions, having successfully placed students in prestigious institutions like the University of Oxford, LSE, and the University of Toronto. Her approach is holistic, focusing not just on the application, but on building a narrative that resonates with admission committees.",
            "She holds an Advanced Certification in Global Career Counselling and has personally visited over 50 campuses worldwide to provide first-hand insights to her students. Her expertise extends into complex visa compliance and high-stakes interview preparation."
        ],
        expertise: [
            { title: "SOP Review", icon: "description", desc: "Crafting compelling statements that highlight your unique strengths and vision." },
            { title: "Visa Interview Prep", icon: "record_voice_over", desc: "Confidence-building mocks and technical guidance for successful visa outcomes." },
            { title: "University Shortlisting", icon: "school", desc: "Data-driven selection of institutions based on profile, budget, and career goals." }
        ]
    },
    {
        id: "arjun-singh",
        name: "Arjun Singh",
        role: "Visa Compliance Lead",
        image: arjunImg,
        tags: ["Visa", "Immigration"],
        bio: "Navigating complex immigration laws for students heading to USA, Canada, and UK.",
        category: "Visa Experts",
        color: "#007F16",
        tagBg: "#BFFFCA",
        stats: {
            studentsGuided: "3000+",
            visaSuccess: "99.5%",
            yearsExperience: "12+"
        },
        journey: [
            "Arjun Singh brings over 12 years of specialized experience in visa compliance and immigration law. His meticulous approach has helped thousands of students navigate the complex legal landscapes of international education.",
            "Formerly a visa officer, Arjun has insider knowledge of what consulates look for. He specializes in overturning refusals and handling complex cases for the USA, Canada, and UK.",
            "He leads our compliance team, ensuring that every application meets the strictest standards of accuracy and integrity."
        ],
        expertise: [
            { title: "Visa Filing", icon: "description", desc: "Error-free documentation and application filing for all major destinations." },
            { title: "Refusal Analysis", icon: "gavel", desc: "Expert analysis and re-application strategies for previously refused visas." },
            { title: "Compliance Check", icon: "verified_user", desc: "Thorough verification of financial and academic documents." }
        ]
    },
    {
        id: "sneha-kapoor",
        name: "Sneha Kapoor",
        role: "Global Partnerships",
        image: snehaImg,
        tags: ["Universities", "UK/USA"],
        bio: "Building bridges with world-class institutions to create unique opportunities for our students.",
        category: "Leadership",
        color: "#2D83F2",
        tagBg: "#B2D3FF",
        stats: {
            studentsGuided: "800+",
            visaSuccess: "97%",
            yearsExperience: "9+"
        },
        journey: [
            "Sneha Kapoor is the architect behind EAOverseas' global network. With a background in International Relations, she has spent the last decade building strategic partnerships with top-tier universities.",
            "Her work ensures that our students have access to exclusive scholarships and priority application processing at partner institutions.",
            "Sneha frequently travels to the UK and USA to meet with admissions deans and stay ahead of the curve on evolving admission trends."
        ],
        expertise: [
            { title: "University Relations", icon: "handshake", desc: "leveraging direct connections for admission advantages." },
            { title: "Scholarship Negotiation", icon: "savings", desc: "Identifying and securing hidden funding opportunities." },
            { title: "Profile Building", icon: "account_circle", desc: "Strategic advice on extracurriculars to boost Ivy League chances." }
        ]
    },
    {
        id: "rohan-mehra",
        name: "Rohan Mehra",
        role: "Study Abroad Expert",
        image: rohanImg,
        tags: ["Admissions", "Australia"],
        bio: "Specializing in Australian Group of Eight universities and scholarship acquisitions.",
        category: "Counsellors",
        color: "#F28A0B",
        tagBg: "#FFEBD2",
        stats: {
            studentsGuided: "1500+",
            visaSuccess: "96%",
            yearsExperience: "7+"
        },
        journey: [
            "Rohan Mehra is our resident expert on Australian education. An alumnus of the University of Melbourne, he understands the Australian academic system from the inside out.",
            "He has helped hundreds of students secure admissions to the prestigious Group of Eight universities.",
            "Rohan is passionate about helping students find the right course that aligns with Australia's skilled migration lists."
        ],
        expertise: [
            { title: "G8 Admissions", icon: "school", desc: "Specialized guidance for Australia's top research universities." },
            { title: "Scholarships", icon: "redeem", desc: "Securing merit-based and destination-specific scholarships." },
            { title: "PR Pathways", icon: "map", desc: "Advice on courses with strong permanent residency prospects." }
        ]
    },
    {
        id: "anjali-rao",
        name: "Anjali Rao",
        role: "Career Coach",
        image: anjaliImg,
        tags: ["Coaching", "Soft Skills"],
        bio: "Helping students develop the interpersonal skills needed for international success.",
        category: "Counsellors",
        color: "#FF4785",
        tagBg: "#FFE5EE",
        stats: {
            studentsGuided: "2000+",
            visaSuccess: "N/A",
            yearsExperience: "15+"
        },
        journey: [
            "Anjali Rao believes that academic success is just one part of the equation. As a certified life coach, she helps students prepare for the cultural and emotional transition of studying abroad.",
            "She conducts workshops on soft skills, networking, and cultural adaptation.",
            "Her students are known for their confidence and ability to thrive in diverse international environments."
        ],
        expertise: [
            { title: "Career Mapping", icon: "explore", desc: "Aligning academic choices with long-term career aspirations." },
            { title: "Interview Coaching", icon: "mic", desc: "Mastering the art of communication for university and job interviews." },
            { title: "Cultural Training", icon: "public", desc: "Preparing for life and work in a new country." }
        ]
    },
    {
        id: "kabir-malhotra",
        name: "Kabir Malhotra",
        role: "Lead Strategist",
        image: kabirImg,
        tags: ["Strategy", "Growth"],
        bio: "Overseeing long-term educational roadmaps and strategic institutional alignments.",
        category: "Leadership",
        color: "#00B4D8",
        tagBg: "#E0F7FA",
        stats: {
            studentsGuided: "500+",
            visaSuccess: "99%",
            yearsExperience: "11+"
        },
        journey: [
            "Kabir Malhotra is the strategic brain behind complex student profiles. He excels at helping students with non-traditional backgrounds or career gaps find their path to top universities.",
            "His data-driven approach ensures that every application is optimized for success.",
            "Kabir also mentors our junior counsellors, setting the standard for excellence at EAOverseas."
        ],
        expertise: [
            { title: "Gap Year Strategy", icon: "timelapse", desc: "Turning career breaks into compelling application assets." },
            { title: "Profile Evaluation", icon: "analytics", desc: "Deep-dive analysis of academic and professional history." },
            { title: "Strategic Planning", icon: "lightbulb", desc: "Long-term roadmaps for high school students targeting top unis." }
        ]
    },
    {
        id: "ishita-verma",
        name: "Ishita Verma",
        role: "University Liaison",
        image: ishitaImg,
        tags: ["Europe", "Research"],
        bio: "Managing relations with European research centers and technical universities.",
        category: "Leadership",
        color: "#7B61FF",
        tagBg: "#E0DBFF",
        stats: {
            studentsGuided: "600+",
            visaSuccess: "95%",
            yearsExperience: "8+"
        },
        journey: [
            "Ishita Verma is our expert on European education, with a focus on Germany, France, and Netherlands.",
            "She helps students navigate the complex admission procedures for TU9 universities in Germany and Grande Écoles in France.",
            "Ishita is fluent in German and French, providing invaluable support for language-track programs."
        ],
        expertise: [
            { title: "European Admissions", icon: "euro", desc: "Expertise in public universities and low-tuition options." },
            { title: "Research Proposals", icon: "article", desc: "Guiding PhD and Master's by Research applicants." },
            { title: "Language Prep", icon: "translate", desc: "Resources and planning for IELTS, TOEFL, and German levels." }
        ]
    },
    {
        id: "vikram-iyer",
        name: "Vikram Iyer",
        role: "Senior Consultant",
        image: vikramImg,
        tags: ["Canada", "PR"],
        bio: "Specialist in Canadian student visas and post-graduate work permit pathways.",
        category: "Counsellors",
        color: "#FF5E5E",
        tagBg: "#FFE0E0",
        stats: {
            studentsGuided: "1800+",
            visaSuccess: "94%",
            yearsExperience: "6+"
        },
        journey: [
            "Vikram Iyer lives and breathes Canadian education. He stays updated on every IRCC policy change to ensure his students' applications are always compliant.",
            "He has a knack for matching students with colleges that offer the best co-op programs and employment outcomes.",
            "Vikram's guidance extends beyond the offer letter to pre-departure and housing support."
        ],
        expertise: [
            { title: "SDS Applications", icon: "speed", desc: "Fast-tracking visas through the Student Direct Stream." },
            { title: "Co-op Programs", icon: "work", desc: "Finding courses with integrated work experience." },
            { title: "Settlement Support", icon: "home", desc: "Advice on banking, SIN, and housing in Canada." }
        ]
    },
    {
        id: "lara-croft",
        name: "Lara Croft",
        role: "Lead Graphic Designer",
        image: graphicImg,
        tags: ["Design", "Branding"],
        bio: "Creating visual narratives that define the EAOverseas brand and user experience.",
        category: "Tech & Design",
        color: "#FF6384",
        tagBg: "#FFE6EA",
        stats: {
            studentsGuided: "N/A",
            visaSuccess: "N/A",
            yearsExperience: "5+"
        },
        journey: [
            "Lara is the creative eye behind everything at EAOverseas. With a background in fine arts and digital design, she ensures our brand resonates with students.",
            "She leads the design team in creating intuitive and beautiful interfaces."
        ],
        expertise: [
            { title: "UI Design", icon: "palette", desc: "Crafting beautiful and functional user interfaces." },
            { title: "Branding", icon: "stars", desc: "Maintaining consistent brand identity across all platforms." },
            { title: "Visual Storytelling", icon: "brush", desc: "Engaging users through compelling graphics." }
        ]
    },
    {
        id: "sam-smith",
        name: "Sam Smith",
        role: "Frontend Developer",
        image: frontendImg,
        tags: ["React", "UI/UX"],
        bio: "Building responsive and interactive web experiences for our students.",
        category: "Tech & Design",
        color: "#36A2EB",
        tagBg: "#E0F2F7",
        stats: {
            studentsGuided: "N/A",
            visaSuccess: "N/A",
            yearsExperience: "4+"
        },
        journey: [
            "Sam is a React enthusiast who loves bringing designs to life. He ensures that the student portal is fast, accessible, and bug-free.",
            "He works closely with the design team to implement pixel-perfect layouts."
        ],
        expertise: [
            { title: "React Development", icon: "code", desc: "Building scalable single-page applications." },
            { title: "Performance Optimization", icon: "speed", desc: "Ensuring lighting-fast load times for users." },
            { title: "Accessibility", icon: "accessibility_new", desc: "Making education accessible to everyone." }
        ]
    },
    {
        id: "edrik-vanhoutte",
        name: "Edrik Vanhoutte",
        role: "Backend Developer",
        image: backendImg,
        tags: ["Node.js", "Database"],
        bio: "Architecting the robust systems that power our global operations.",
        category: "Tech & Design",
        color: "#4BC0C0",
        tagBg: "#E0F7FA",
        stats: {
            studentsGuided: "N/A",
            visaSuccess: "N/A",
            yearsExperience: "8+"
        },
        journey: [
            "Edrik manages the complex data infrastructure that handles thousands of student applications. He ensures data security and system reliability.",
            "His work on our automated matching algorithm has revolutionized how we pair students with universities."
        ],
        expertise: [
            { title: "API Design", icon: "api", desc: "Building secure and efficient APIs." },
            { title: "Database Management", icon: "database", desc: "Optimizing improved data storage and retrieval." },
            { title: "Security", icon: "security", desc: "Protecting sensitive student data." }
        ]
    }
];
