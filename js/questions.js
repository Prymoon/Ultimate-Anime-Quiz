// Questions data organized by anime series
const quizQuestions = [
    // Naruto Questions
    {
        question: "Who is Naruto's father?",
        options: [
            "Kakashi Hatake",
            "Minato Namikaze",
            "Jiraiya",
            "Hiruzen Sarutobi"
        ],
        correctAnswer: 1, // Index of correct answer
        anime: "naruto",
        type: "character"
    },
    {
        question: "Which of these is NOT a member of Team 7?",
        options: [
            "Sasuke Uchiha",
            "Naruto Uzumaki",
            "Neji Hyuga",
            "Sakura Haruno"
        ],
        correctAnswer: 2,
        anime: "naruto",
        type: "trivia"
    },
    {
        question: "What is the name of the Nine-Tailed Fox sealed within Naruto?",
        options: [
            "Shukaku",
            "Matatabi",
            "Kurama",
            "Gyuki"
        ],
        correctAnswer: 2,
        anime: "naruto",
        type: "trivia"
    },
    
    // One Piece Questions
    {
        question: "What is the name of Luffy's signature attack?",
        options: [
            "Rasengan",
            "Gum-Gum Pistol",
            "Spirit Gun",
            "One For All"
        ],
        correctAnswer: 1,
        anime: "one-piece",
        type: "powers"
    },
    {
        question: "Who is the captain of the Straw Hat Pirates?",
        options: [
            "Roronoa Zoro",
            "Nami",
            "Monkey D. Luffy",
            "Sanji"
        ],
        correctAnswer: 2,
        anime: "one-piece",
        type: "character"
    },
    {
        question: "What is the name of the legendary treasure that everyone is searching for in One Piece?",
        options: [
            "One Piece",
            "Grand Line",
            "Devil Fruit",
            "All Blue"
        ],
        correctAnswer: 0,
        anime: "one-piece",
        type: "trivia"
    },
    
    // Attack on Titan Questions
    {
        question: "What is the name of the military branch that Eren joins?",
        options: [
            "Military Police",
            "Garrison",
            "Scout Regiment",
            "Marleyan Army"
        ],
        correctAnswer: 2,
        anime: "attack-on-titan",
        type: "trivia"
    },
    {
        question: "Who is known as 'Humanity's Strongest Soldier' in Attack on Titan?",
        options: [
            "Eren Yeager",
            "Mikasa Ackerman",
            "Levi Ackerman",
            "Erwin Smith"
        ],
        correctAnswer: 2,
        anime: "attack-on-titan",
        type: "character"
    },
    {
        question: "What is the name of the walls that protect humanity in Attack on Titan? (From outermost to innermost)",
        options: [
            "Maria, Rose, Sina",
            "Rose, Maria, Sina",
            "Sina, Rose, Maria",
            "Maria, Sina, Rose"
        ],
        correctAnswer: 0,
        anime: "attack-on-titan",
        type: "trivia"
    },
    
    // Demon Slayer Questions
    {
        question: "What is Tanjiro's signature breathing style?",
        options: [
            "Water Breathing",
            "Thunder Breathing",
            "Flame Breathing",
            "Sun Breathing"
        ],
        correctAnswer: 0,
        anime: "demon-slayer",
        type: "powers"
    },
    {
        question: "Who turned Nezuko into a demon?",
        options: [
            "Rui",
            "Akaza",
            "Muzan Kibutsuji",
            "Enmu"
        ],
        correctAnswer: 2,
        anime: "demon-slayer",
        type: "trivia"
    },
    {
        question: "What color is Zenitsu's hair?",
        options: [
            "Orange",
            "Blue",
            "Black with orange tips",
            "Blonde"
        ],
        correctAnswer: 3,
        anime: "demon-slayer",
        type: "character"
    },
    
    // Jujutsu Kaisen Questions
    {
        question: "Who is the main protagonist of Jujutsu Kaisen?",
        options: [
            "Megumi Fushiguro",
            "Satoru Gojo",
            "Yuji Itadori",
            "Sukuna"
        ],
        correctAnswer: 2,
        anime: "jujutsu-kaisen",
        type: "character"
    },
    {
        question: "What is the name of the cursed object Yuji consumed?",
        options: [
            "Sukuna's Eye",
            "Sukuna's Finger",
            "Mahito's Heart",
            "Gojo's Blindfold"
        ],
        correctAnswer: 1,
        anime: "jujutsu-kaisen",
        type: "trivia"
    },
    {
        question: "Which of these is NOT one of Gojo's techniques?",
        options: [
            "Limitless",
            "Six Eyes",
            "Domain Expansion: Infinite Void",
            "Black Flash"
        ],
        correctAnswer: 3,
        anime: "jujutsu-kaisen",
        type: "powers"
    }
];

// Famous Anime Quotes
const animeQuotes = [
    {
        quote: "I'll become the Hokage! That is my dream!",
        character: "Naruto Uzumaki",
        anime: "naruto"
    },
    {
        quote: "I'm going to be King of the Pirates!",
        character: "Monkey D. Luffy",
        anime: "one-piece"
    },
    {
        quote: "Tatakae! Tatakae!",
        character: "Eren Yeager",
        anime: "attack-on-titan"
    },
    {
        quote: "Those who break the rules are scum, but those who abandon their friends are worse than scum.",
        character: "Kakashi Hatake",
        anime: "naruto"
    },
    {
        quote: "Set your heart ablaze.",
        character: "Kyojuro Rengoku",
        anime: "demon-slayer"
    }
];

// Score verdicts based on performance
const scoreVerdicts = [
    {
        range: [0, 3],
        text: "You're still a Genin! Time to hit the books! 📚",
        anime: "naruto"
    },
    {
        range: [4, 7],
        text: "You're a Chunin level fan! Not bad! 👍",
        anime: "naruto"
    },
    {
        range: [8, 11],
        text: "Jounin level knowledge! Impressive! 💪",
        anime: "naruto"
    },
    {
        range: [12, 15],
        text: "You're a Hokage! True anime master! 🔥",
        anime: "naruto"
    }
];
