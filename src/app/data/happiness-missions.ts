export interface HappinessMission {
  id: number;
  title: string;
  description: string;
  emoji: string;
  category: 'physical' | 'mental' | 'care' | 'study';
  rewardMessage: string;
}

export const HAPPINESS_MISSIONS: HappinessMission[] = [
  {
    id: 1,
    title: "Hydration Check 💧",
    description: "Drink one full glass of water slowly. Hydrate that brilliant brain before it files another complaint.",
    emoji: "💧",
    category: "physical",
    rewardMessage: "Hydration level restored! Your brain cells are officially celebrating with a mini party."
  },
  {
    id: 2,
    title: "The 5 Slow Breaths Protocol 🌬️",
    description: "Inhale slowly for 4 seconds, hold for 2, exhale gently for 6. Repeat five times. Drop your shoulders on each exhale.",
    emoji: "🌬️",
    category: "mental",
    rewardMessage: "Mission accomplished! Your nervous system just whispered: 'Thank you, Drashti.'"
  },
  {
    id: 3,
    title: "Play Your Comfort Song 🎵",
    description: "Put on headphones and play one song that always makes you feel calm, energized, or nostalgic.",
    emoji: "🎵",
    category: "mental",
    rewardMessage: "Vibe restored! Good music is 100% scientifically proven to elevate serotonin."
  },
  {
    id: 4,
    title: "Two-Minute Desk Stretch 🧘‍♀️",
    description: "Roll your shoulders backward 5 times, tilt your neck gently side to side, and reach your arms up towards the ceiling.",
    emoji: "🧘‍♀️",
    category: "physical",
    rewardMessage: "Aah! Neck and shoulders unlocked. You just saved yourself future postural therapy."
  },
  {
    id: 5,
    title: "Snack Appreciation Moment 🍎",
    description: "Eat something you actually enjoy — fruit, biscuit, chocolate, or a warm snack — without scrolling through notes while chewing.",
    emoji: "🍎",
    category: "care",
    rewardMessage: "Snack mission successful! Fueling the future MD is of national strategic importance."
  },
  {
    id: 6,
    title: "Fresh Air Reset 🌿",
    description: "Step out onto the balcony, porch, or near an open window for 60 seconds. Feel the cool breeze on your face.",
    emoji: "🌿",
    category: "physical",
    rewardMessage: "Oxygen recharged! Sometimes five seconds of fresh air resets three hours of foggy thinking."
  },
  {
    id: 7,
    title: "Micro-Study Sprint 📖",
    description: "Read just one single paragraph, review one drug card, or look at one anatomical diagram. Just one! Then stop.",
    emoji: "📖",
    category: "study",
    rewardMessage: "Boom! That's one more piece of knowledge locked in. Small drops make the entire ocean."
  },
  {
    id: 8,
    title: "Guilt-Free 5-Minute Pause ☕",
    description: "Close your eyes or look away from all screens for five full minutes. Do absolutely nothing productive on purpose.",
    emoji: "☕",
    category: "care",
    rewardMessage: "Guilt-free pause unlocked! Rest is not something you negotiate for; it's a vital nutrient."
  },
  {
    id: 9,
    title: "Acknowledge One Win Today 🌟",
    description: "Identify one thing — however tiny — that you handled well or showed up for today. Give yourself credit for it.",
    emoji: "🌟",
    category: "mental",
    rewardMessage: "Well deserved! Recognizing your own strength is the highest form of self-kindness."
  },
  {
    id: 10,
    title: "Cool Water Face Wash 🌊",
    description: "Splash cold or cool water on your face, dry with a soft towel, and take one deep breath in the mirror.",
    emoji: "🌊",
    category: "physical",
    rewardMessage: "Instant brain reboot activated! Look at that capable face ready to take on the world."
  },
  {
    id: 11,
    title: "Tidy One Square Foot 🧹",
    description: "Clear just one tiny corner of your study desk — arrange the pens, stack two books, or throw away empty wrappers.",
    emoji: "🧹",
    category: "care",
    rewardMessage: "Visual clutter reduced! A clean micro-space brings unexpected peace of mind."
  },
  {
    id: 12,
    title: "Send a Friendly Ping 💬",
    description: "Drop a quick 'hey, thinking of you' or a silly meme to someone you trust and feel comfortable with.",
    emoji: "💬",
    category: "care",
    rewardMessage: "Connection sent! You never have to isolate yourself during demanding exam seasons."
  }
];
