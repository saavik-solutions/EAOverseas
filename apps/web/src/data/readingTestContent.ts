export const readingTestData = [
    {
        id: 1,
        title: "The Growth of Online Learning",
        content: `
      <p class="mb-4">In recent years, online learning has become an increasingly popular alternative to traditional classroom-based education. Advances in internet technology and the widespread availability of digital devices have made it easier for students around the world to access educational content from anywhere and at any time. As a result, many universities and training institutions now offer online courses alongside their on-campus programs.</p>
      <p class="mb-4">One of the main advantages of online learning is flexibility. Students are able to study at their own pace and arrange their learning schedules around work or family commitments. This is particularly beneficial for adult learners and working professionals who may not be able to attend classes during regular hours. In addition, online courses often allow learners to review recorded lectures multiple times, which can improve understanding.</p>
      <p class="mb-4">However, online learning also presents several challenges. Some students find it difficult to stay motivated without face-to-face interaction with teachers and classmates. The lack of direct supervision can lead to procrastination, and technical issues such as poor internet connectivity may interrupt the learning process. Furthermore, not all subjects are suitable for online delivery, especially those that require practical training or hands-on experience.</p>
      <p class="mb-4">Despite these challenges, research suggests that online learning can be just as effective as traditional education when designed properly. Institutions that invest in interactive platforms, regular assessments, and strong student support systems tend to achieve better outcomes. As technology continues to develop, online learning is expected to play an even greater role in the future of education.</p>
    `,
        questions: [
            // Questions 1–5: Multiple Choice
            {
                id: "q1",
                number: 1,
                text: "What has contributed most to the growth of online learning?",
                type: "multiple-choice",
                options: ["Reduced tuition fees", "Improved internet technology", "Government regulations", "Fewer university places"],
                correctAnswer: "Improved internet technology" // Key: B
            },
            {
                id: "q2",
                number: 2,
                text: "Who benefits most from the flexibility of online learning?",
                type: "multiple-choice",
                options: ["School students", "University professors", "Adult learners and professionals", "Researchers"],
                correctAnswer: "Adult learners and professionals" // Key: C
            },
            {
                id: "q3",
                number: 3,
                text: "Why do recorded lectures help students?",
                type: "multiple-choice",
                options: ["They reduce the need for exams", "They replace textbooks", "They allow repeated viewing", "They shorten study time"],
                correctAnswer: "They allow repeated viewing" // Key: C
            },
            {
                id: "q4",
                number: 4,
                text: "What is one disadvantage of online learning mentioned in the passage?",
                type: "multiple-choice",
                options: ["High course fees", "Limited course choices", "Lack of motivation", "Strict deadlines"],
                correctAnswer: "Lack of motivation" // Key: C
            },
            {
                id: "q5",
                number: 5,
                text: "Which type of subject is less suitable for online learning?",
                type: "multiple-choice",
                options: ["Language studies", "History", "Mathematics", "Practical subjects"],
                correctAnswer: "Practical subjects" // Key: D
            },
            // Questions 6–9: Sentence Completion (Text Input)
            {
                id: "q6",
                number: 6,
                text: "Online learning allows students to study from __________ and at any time.",
                type: "text-input",
                correctAnswer: "anywhere"
            },
            {
                id: "q7",
                number: 7,
                text: "Working professionals may find it difficult to attend classes during __________ hours.",
                type: "text-input",
                correctAnswer: "regular"
            },
            {
                id: "q8",
                number: 8,
                text: "Poor __________ connectivity can interrupt online learning.",
                type: "text-input",
                correctAnswer: "internet"
            },
            {
                id: "q9",
                number: 9,
                text: "Online learning can be effective if courses are designed __________.",
                type: "text-input",
                correctAnswer: "properly"
            },
            // Questions 10–13: True/False/Not Given
            {
                id: "q10",
                number: 10,
                text: "Online learning is more effective than traditional classroom education.",
                type: "true-false-not-given",
                options: ["TRUE", "FALSE", "NOT GIVEN"],
                correctAnswer: "NOT GIVEN"
            },
            {
                id: "q11",
                number: 11,
                text: "All universities have replaced classroom teaching with online courses.",
                type: "true-false-not-given",
                options: ["TRUE", "FALSE", "NOT GIVEN"],
                correctAnswer: "FALSE"
            },
            {
                id: "q12",
                number: 12,
                text: "Technical problems can affect the quality of online learning.",
                type: "true-false-not-given",
                options: ["TRUE", "FALSE", "NOT GIVEN"],
                correctAnswer: "TRUE"
            },
            {
                id: "q13",
                number: 13,
                text: "Online education is expected to become less important in the future.",
                type: "true-false-not-given",
                options: ["TRUE", "FALSE", "NOT GIVEN"],
                correctAnswer: "FALSE"
            }
        ]
    },
    {
        id: 2,
        title: "Urban Green Spaces and City Life",
        content: `
      <p class="mb-4">As cities continue to expand, urban green spaces such as parks, gardens, and public squares are becoming increasingly important. These areas provide residents with opportunities for recreation, relaxation, and social interaction, helping to improve overall quality of life. Studies have shown that access to green spaces can reduce stress levels, encourage physical activity, and even improve mental health.</p>
      <p class="mb-4">Urban planners now recognise that green spaces are not simply decorative elements, but essential components of healthy cities. Well-designed parks can help reduce air pollution by absorbing carbon dioxide and filtering airborne particles. In addition, trees and vegetation can lower urban temperatures by providing shade and releasing moisture into the air, which is particularly important in cities affected by heatwaves.</p>
      <p class="mb-4">Despite these benefits, maintaining green spaces in densely populated areas presents several challenges. Limited land availability and high property prices often make it difficult for city authorities to allocate sufficient space for parks. Furthermore, ongoing maintenance requires funding, skilled staff, and long-term planning. As a result, some urban green spaces suffer from neglect or uneven distribution, with wealthier neighbourhoods often enjoying better facilities than poorer areas.</p>
      <p class="mb-4">To address these issues, many cities are exploring innovative solutions, such as rooftop gardens, vertical forests, and the conversion of unused industrial land into public parks. These approaches aim to increase green coverage while making efficient use of available space. By prioritising sustainable urban design, cities can create healthier and more liveable environments for future generations.</p>
    `,
        questions: [
            // Questions 14–18: Multiple Choice
            {
                id: "q14",
                number: 14,
                text: "What is one benefit of urban green spaces mentioned in the passage?",
                type: "multiple-choice",
                options: ["Increased property values", "Reduced stress levels", "Improved public transport", "Higher employment rates"],
                correctAnswer: "Reduced stress levels" // Key: B
            },
            {
                id: "q15",
                number: 15,
                text: "Why do urban planners value green spaces today?",
                type: "multiple-choice",
                options: ["They attract tourists", "They reduce construction costs", "They support public health", "They improve road safety"],
                correctAnswer: "They support public health" // Key: C
            },
            {
                id: "q16",
                number: 16,
                text: "How do trees help cities during heatwaves?",
                type: "multiple-choice",
                options: ["By increasing rainfall", "By absorbing noise", "By providing shade and moisture", "By blocking sunlight completely"],
                correctAnswer: "By providing shade and moisture" // Key: C
            },
            {
                id: "q17",
                number: 17,
                text: "What is a major difficulty in maintaining urban green spaces?",
                type: "multiple-choice",
                options: ["Lack of public interest", "Limited land and funding", "Poor weather conditions", "Insufficient research"],
                correctAnswer: "Limited land and funding" // Key: B
            },
            {
                id: "q18",
                number: 18,
                text: "Which areas often have better green facilities?",
                type: "multiple-choice",
                options: ["Industrial zones", "City centres", "Wealthier neighbourhoods", "Newly developed suburbs"],
                correctAnswer: "Wealthier neighbourhoods" // Key: C
            },
            // Questions 19–22: Sentence Completion (Text Input)
            {
                id: "q19",
                number: 19,
                text: "Green spaces can help filter __________ particles from the air.",
                type: "text-input",
                correctAnswer: "airborne"
            },
            {
                id: "q20",
                number: 20,
                text: "High __________ prices can limit the creation of new parks.",
                type: "text-input",
                correctAnswer: "property"
            },
            {
                id: "q21",
                number: 21,
                text: "Some green spaces suffer from __________ due to poor maintenance.",
                type: "text-input",
                correctAnswer: "neglect"
            },
            {
                id: "q22",
                number: 22,
                text: "Cities are converting unused __________ land into parks.",
                type: "text-input",
                correctAnswer: "industrial"
            },
            // Questions 23–26: True/False/Not Given
            {
                id: "q23",
                number: 23,
                text: "Urban green spaces are mainly used for sporting activities.",
                type: "true-false-not-given",
                options: ["TRUE", "FALSE", "NOT GIVEN"],
                correctAnswer: "FALSE"
            },
            {
                id: "q24",
                number: 24,
                text: "All neighbourhoods have equal access to green spaces.",
                type: "true-false-not-given",
                options: ["TRUE", "FALSE", "NOT GIVEN"],
                correctAnswer: "FALSE"
            },
            {
                id: "q25",
                number: 25,
                text: "Rooftop gardens are one solution to land shortages.",
                type: "true-false-not-given",
                options: ["TRUE", "FALSE", "NOT GIVEN"],
                correctAnswer: "TRUE"
            },
            {
                id: "q26",
                number: 26,
                text: "Sustainable urban design can improve future city life.",
                type: "true-false-not-given",
                options: ["TRUE", "FALSE", "NOT GIVEN"],
                correctAnswer: "TRUE"
            }
        ]
    },
    {
        id: 3,
        title: "The Cognitive Impact of Multitasking",
        content: `
      <p class="mb-4">In an age dominated by digital technology, multitasking has become a common feature of daily life. Individuals frequently engage in multiple activities simultaneously, such as responding to messages while working or consuming media while studying. While this behaviour is often perceived as efficient, cognitive research suggests that multitasking may have significant limitations.</p>
      <p class="mb-4">Neuroscientists argue that the human brain is not designed to process several complex tasks at the same time. Instead, what is commonly described as multitasking is actually rapid task-switching, which places a heavy demand on cognitive resources. Each switch requires the brain to reorient its attention, leading to increased mental fatigue and reduced performance accuracy.</p>
      <p class="mb-4">Experimental studies have demonstrated that individuals who frequently multitask tend to perform worse on tasks requiring sustained concentration. This is because constant interruptions interfere with the brain’s ability to encode information into long-term memory. Over time, habitual multitasking may even alter neural pathways, reducing the capacity for deep, focused thinking.</p>
      <p class="mb-4">However, some researchers caution against viewing multitasking as entirely harmful. Simple or automatic tasks, such as listening to music while performing routine activities, may not significantly impair cognitive function. The key factor appears to be task complexity: when two demanding tasks compete for attention, performance declines sharply.</p>
      <p class="mb-4">Understanding the cognitive effects of multitasking has important implications for education and workplace design. By encouraging environments that minimise unnecessary distractions, institutions can help individuals maintain focus and improve learning and productivity outcomes.</p>
    `,
        questions: [
            // Questions 27–31: Multiple Choice
            {
                id: "q27",
                number: 27,
                text: "What does the passage suggest about multitasking?",
                type: "multiple-choice",
                options: ["It always improves efficiency", "It involves processing tasks simultaneously", "It is often misunderstood", "It strengthens memory"],
                correctAnswer: "It is often misunderstood" // Key: C
            },
            {
                id: "q28",
                number: 28,
                text: "According to neuroscientists, multitasking mainly involves:",
                type: "multiple-choice",
                options: ["Parallel processing", "Automatic behaviour", "Rapid task-switching", "Long-term planning"],
                correctAnswer: "Rapid task-switching" // Key: C
            },
            {
                id: "q29",
                number: 29,
                text: "What effect does task-switching have on the brain?",
                type: "multiple-choice",
                options: ["It increases creativity", "It reduces mental fatigue", "It demands cognitive resources", "It improves accuracy"],
                correctAnswer: "It demands cognitive resources" // Key: C
            },
            {
                id: "q30",
                number: 30,
                text: "Why do frequent multitaskers perform poorly on concentration tasks?",
                type: "multiple-choice",
                options: ["They lack motivation", "Their attention is repeatedly interrupted", "They avoid challenging tasks", "They rely on technology"],
                correctAnswer: "Their attention is repeatedly interrupted" // Key: B
            },
            {
                id: "q31",
                number: 31,
                text: "Which activity is least likely to harm cognitive performance?",
                type: "multiple-choice",
                options: ["Writing an essay while watching videos", "Studying while checking messages", "Listening to music during routine tasks", "Solving problems while browsing social media"],
                correctAnswer: "Listening to music during routine tasks" // Key: C
            },
            // Questions 32–35: Sentence Completion (Text Input)
            {
                id: "q32",
                number: 32,
                text: "Multitasking can reduce the brain’s ability to store information in __________ memory.",
                type: "text-input",
                correctAnswer: "long-term"
            },
            {
                id: "q33",
                number: 33,
                text: "Habitual multitasking may change __________ pathways in the brain.",
                type: "text-input",
                correctAnswer: "neural"
            },
            {
                id: "q34",
                number: 34,
                text: "Performance declines when tasks are equally __________.",
                type: "text-input",
                correctAnswer: "demanding"
            },
            {
                id: "q35",
                number: 35,
                text: "Reducing distractions can improve learning and __________.",
                type: "text-input",
                correctAnswer: "productivity"
            },
            // Questions 36–40: True/False/Not Given
            {
                id: "q36",
                number: 36,
                text: "The brain can effectively handle several complex tasks at once.",
                type: "true-false-not-given",
                options: ["TRUE", "FALSE", "NOT GIVEN"],
                correctAnswer: "FALSE"
            },
            {
                id: "q37",
                number: 37,
                text: "Task-switching leads to higher accuracy.",
                type: "true-false-not-given",
                options: ["TRUE", "FALSE", "NOT GIVEN"],
                correctAnswer: "FALSE"
            },
            {
                id: "q38",
                number: 38,
                text: "All forms of multitasking damage cognitive ability.",
                type: "true-false-not-given",
                options: ["TRUE", "FALSE", "NOT GIVEN"],
                correctAnswer: "FALSE"
            },
            {
                id: "q39",
                number: 39,
                text: "Task complexity affects multitasking outcomes.",
                type: "true-false-not-given",
                options: ["TRUE", "FALSE", "NOT GIVEN"],
                correctAnswer: "TRUE"
            },
            {
                id: "q40",
                number: 40,
                text: "Multitasking research is useful for workplace design.",
                type: "true-false-not-given",
                options: ["TRUE", "FALSE", "NOT GIVEN"],
                correctAnswer: "TRUE"
            }
        ]
    }
];
