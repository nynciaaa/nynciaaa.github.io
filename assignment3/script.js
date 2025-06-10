// ASSET CONFIGURATION - EDIT THESE PATHS TO MATCH YOUR FILES
const ASSETS = {
  backgrounds: {
    classroom: "classroom.jpg",
    hallway: "hallway.jpg",
    cafeteria: "cafeteria.jpg",
    office: "office.jpg",
  },
  characters: {
    sarah: {
      neutral: "sarah_neutral.png",
      happy: "sarah_happy.png",
      sad: "sarah_sad.png",
      angry: "sarah_angry.png",
      worried: "sarah_worried.png",
    },
    teacher: {
      neutral: "teacher_neutral.png",
      happy: "teacher_happy.png",
      disappointed: "teacher_disappointed.png",
      stern: "teacher_stern.png",
    },
    bully: {
      neutral: "bully_neutral.png",
      smug: "bully_smug.png",
      angry: "bully_angry.png",
    },
  },
  music: {
    background: "assets/music/background music.wav",
    good_ending: "assets/music/good music.wav",
    bad_ending: "assets/music/bad music.wav",
  },
};

// GAME STATE
let currentScene = 0;
let gameData = {
  playerName: "You",
  moralScore: 0, // -100 to +100 scale
  choices: [],
  currentEnding: "neutral",
};

// STORY SCENES WITH MORAL CHOICES
const scenes = [
  {
    id: "intro",
    background: "classroom",
    character: { name: "sarah", emotion: "worried" },
    speaker: "Sarah",
    text: "Hey, you're new here right? I'm Sarah. I have to warn you... there's this group that picks on students. They've been bothering me all week.",
    choices: [
      {
        text: "That's terrible! I'll help you stand up to them.",
        next: "help_sarah",
        moral: 25,
        type: "good",
      },
      {
        text: "Sorry to hear that, but I don't want to get involved.",
        next: "avoid_conflict",
        moral: -10,
        type: "neutral",
      },
      {
        text: "Maybe you did something to deserve it?",
        next: "blame_victim",
        moral: -30,
        type: "bad",
      },
    ],
  },
  {
    id: "help_sarah",
    background: "classroom",
    character: { name: "sarah", emotion: "happy" },
    speaker: "Sarah",
    text: "Thank you so much! It means a lot to have someone willing to help. Look, here comes Jake - he's the main bully.",
    choices: [
      {
        text: "Let's go talk to a teacher about this first.",
        next: "get_authority",
        moral: 30,
        type: "good",
      },
      {
        text: "I'll confront Jake directly and tell him to stop.",
        next: "confront_bully",
        moral: 20,
        type: "neutral",
      },
      {
        text: "Let's gather dirt on Jake to blackmail him.",
        next: "blackmail_plan",
        moral: -20,
        type: "bad",
      },
    ],
  },
  {
    id: "avoid_conflict",
    background: "cafeteria",
    character: { name: "bully", emotion: "smug" },
    speaker: "Jake",
    text: "Well, well, well... the new kid. I heard you were talking to Sarah. You better not be getting any ideas about playing hero.",
    choices: [
      {
        text: "Actually, I think you should leave her alone.",
        next: "late_hero",
        moral: 15,
        type: "good",
      },
      {
        text: "I'm not looking for trouble. I'll stay out of it.",
        next: "neutral_path",
        moral: 0,
        type: "neutral",
      },
      {
        text: "You're right. I don't associate with losers anyway.",
        next: "join_bullies",
        moral: -35,
        type: "bad",
      },
    ],
  },
  {
    id: "blame_victim",
    background: "hallway",
    character: { name: "sarah", emotion: "sad" },
    speaker: "Sarah",
    text: "I... I can't believe you said that. I thought you might be different. I guess I was wrong about you.",
    choices: [
      {
        text: "Wait, I'm sorry. That was cruel of me to say.",
        next: "apologize",
        moral: 10,
        type: "good",
      },
      {
        text: "Look, everyone has problems. Deal with yours.",
        next: "cruel_path",
        moral: -25,
        type: "bad",
      },
    ],
  },
  {
    id: "get_authority",
    background: "office",
    character: { name: "teacher", emotion: "happy" },
    speaker: "Ms. Johnson",
    text: "I'm glad you came to me about this bullying situation. We take these matters very seriously. Thank you for doing the right thing.",
    choices: [
      {
        text: "I just want everyone to feel safe at school.",
        next: "good_ending",
        moral: 30,
        type: "good",
      },
    ],
  },
  {
    id: "confront_bully",
    background: "hallway",
    character: { name: "bully", emotion: "angry" },
    speaker: "Jake",
    text: "You think you're tough, new kid? Fine, but this isn't over. You just made an enemy.",
    choices: [
      {
        text: "I'm not afraid of you, but I don't want to fight.",
        next: "neutral_ending",
        moral: 5,
        type: "neutral",
      },
    ],
  },
  {
    id: "join_bullies",
    background: "cafeteria",
    character: { name: "bully", emotion: "smug" },
    speaker: "Jake",
    text: "Now you're thinking smart! Welcome to the winning team, new kid. Let's go have some fun with the losers.",
    choices: [
      {
        text: "Actually, this feels wrong. I can't do this.",
        next: "redemption",
        moral: 20,
        type: "good",
      },
      {
        text: "Lead the way. Time to show who's boss.",
        next: "bad_ending",
        moral: -40,
        type: "bad",
      },
    ],
  },
];

// ENDINGS BASED ON MORAL SCORE
const endings = {
  good_ending: {
    title: "The Hero's Path",
    badge: "🌟",
    type: "good",
    message:
      "Your courage and compassion have made the school a better place. Sarah and many other students feel safer because of your actions. You've learned that standing up for others, even when it's difficult, is what true character is about. The administration implements new anti-bullying policies, and you become a respected voice for positive change.",
    music: "good_music",
  },
  neutral_ending: {
    title: "The Middle Ground",
    badge: "⚖️",
    type: "neutral",
    message:
      "You navigated the social complexities of high school without making waves. While you didn't actively harm anyone, you also missed opportunities to make a real difference. Sometimes the middle path is safe, but it doesn't always lead to meaningful change. You've learned that neutrality has its own consequences.",
    music: "neutral_music",
  },
  bad_ending: {
    title: "The Dark Path",
    badge: "💀",
    type: "bad",
    message:
      "Your choices have led you down a troubling path. By choosing self-interest over compassion, you've contributed to a culture of cruelty and fear. Sarah and other vulnerable students suffer because of the environment you helped create. This ending serves as a reminder that our choices have real consequences for others.",
    music: "bad_music",
  },
  redemption: {
    title: "Second Chances",
    badge: "🔄",
    type: "neutral",
    message:
      "Despite some poor initial choices, you found the strength to do what's right when it mattered most. Everyone deserves a second chance, and you've proven that people can change and grow. Your journey shows that it's never too late to choose compassion over cruelty.",
    music: "good_music",
  },
};

// GAME FUNCTIONS
function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("dialogue-container").classList.remove("hidden");
  document.getElementById("moral-indicator").classList.remove("hidden");

  // Start background music
  const music = document.getElementById("background-music");
  music.volume = 0.3;
  music.play().catch((e) => console.log("Music autoplay blocked"));

  updateMoralIndicator();
  loadScene("intro");
}

function loadScene(sceneId) {
  const scene = scenes.find((s) => s.id === sceneId);
  if (!scene) {
    endGame(sceneId);
    return;
  }

  // Update background
  setBackground(scene.background);

  // Update character
  if (scene.character) {
    setCharacter(scene.character.name, scene.character.emotion);
  }

  // Update dialogue
  document.getElementById("nameplate").textContent = scene.speaker;

  // Typewriter effect for text
  typeText(scene.text, () => {
    showChoices(scene.choices);
  });
}

function setBackground(backgroundKey) {
  const bg = document.getElementById("background");
  const imagePath = ASSETS.backgrounds[backgroundKey];
  bg.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${imagePath}')`;
  bg.style.backgroundColor = "#0f0f23";
}

function setCharacter(characterName, emotion) {
  const portrait = document.getElementById("character-portrait");
  const container = document.getElementById("character-container");

  if (
    ASSETS.characters[characterName] &&
    ASSETS.characters[characterName][emotion]
  ) {
    const imagePath = ASSETS.characters[characterName][emotion];
    portrait.style.backgroundImage = `url('${imagePath}')`;
    container.classList.add("character-enter");

    setTimeout(() => {
      container.classList.remove("character-enter");
    }, 700);
  }
}

function typeText(text, callback) {
  const textElement = document.getElementById("dialogue-text");
  textElement.innerHTML = "";

  let i = 0;
  const speed = 25;

  function typeChar() {
    if (i < text.length) {
      textElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeChar, speed);
    } else if (callback) {
      callback();
    }
  }

  typeChar();
}

function showChoices(choices) {
  const container = document.getElementById("choices-container");
  container.innerHTML = "";

  choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = `choice-button fade-in ${choice.type}-choice`;
    button.textContent = choice.text;
    button.style.animationDelay = `${index * 0.15}s`;

    button.onclick = () => {
      if (choice.moral) {
        gameData.moralScore += choice.moral;
        gameData.moralScore = Math.max(
          -100,
          Math.min(100, gameData.moralScore)
        );
        updateMoralIndicator();
      }

      gameData.choices.push({
        text: choice.text,
        moral: choice.moral || 0,
        type: choice.type,
      });

      container.innerHTML = "";
      setTimeout(() => {
        loadScene(choice.next);
      }, 600);
    };

    container.appendChild(button);
  });
}

function updateMoralIndicator() {
  const fill = document.getElementById("moral-fill");
  const indicator = document.getElementById("moral-indicator");

  // Convert score to percentage (0-100)
  const percentage = ((gameData.moralScore + 100) / 200) * 100;
  fill.style.width = `${percentage}%`;

  // Update color based on moral alignment
  if (gameData.moralScore > 20) {
    fill.style.background = "linear-gradient(90deg, #00b894, #00cec9)";
  } else if (gameData.moralScore < -20) {
    fill.style.background = "linear-gradient(90deg, #d63031, #e17055)";
  } else {
    fill.style.background = "linear-gradient(90deg, #fdcb6e, #f39c12)";
  }

  indicator.classList.add("moral-pulse");
  setTimeout(() => {
    indicator.classList.remove("moral-pulse");
  }, 600);
}

function determineEnding() {
  if (gameData.moralScore >= 30) {
    return "good_ending";
  } else if (gameData.moralScore <= -30) {
    return "bad_ending";
  } else {
    return "neutral_ending";
  }
}

function endGame(endingKey) {
  // Determine ending based on moral score if not specified
  if (!endings[endingKey]) {
    endingKey = determineEnding();
  }

  const ending = endings[endingKey];
  gameData.currentEnding = ending.type;

  // Stop background music and play ending music
  document.getElementById("background-music").pause();
  if (ending.music && ending.music !== "background") {
    const endingMusic = document.getElementById(ending.music.replace("_", "-"));
    if (endingMusic) {
      endingMusic.volume = 0.4;
      endingMusic.play().catch((e) => console.log("Ending music blocked"));
    }
  }

  // Update end screen
  document.getElementById("end-title").textContent = ending.title;
  document.getElementById("end-message").textContent = ending.message;

  const badge = document.getElementById("end-badge");
  badge.textContent = ending.badge;
  badge.className = `${ending.type}`;

  // Update final stats
  document.getElementById("final-moral").textContent = gameData.moralScore;
  document.getElementById("final-path").textContent =
    ending.type.charAt(0).toUpperCase() + ending.type.slice(1);

  // Show end screen
  document.getElementById("dialogue-container").classList.add("hidden");
  document.getElementById("moral-indicator").classList.add("hidden");
  document.getElementById("end-screen").style.display = "flex";
}

function restartGame() {
  // Stop all audio
  document.getElementById("background-music").pause();
  document.getElementById("good-music").pause();
  document.getElementById("bad-music").pause();
}
