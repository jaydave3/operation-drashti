export interface LabJoke {
  id: number;
  setup: string;
  punchline: string;
  field: 'Medicine' | 'Tech' | 'Everyday Nonsense' | 'Hinglish';
}

export const LAB_JOKES: LabJoke[] = [
  {
    id: 1,
    setup: "Why did the developer bring a notebook to the hospital?",
    punchline: "To document the patient's critical issues and submit a pull request.",
    field: "Tech"
  },
  {
    id: 2,
    setup: "Doctor: 'You desperately need more rest and 8 hours of sleep.'",
    punchline: "Medical student Drashti: 'Understood. Can I get that prescription downloaded in PDF with syllabus notes attached?'",
    field: "Medicine"
  },
  {
    id: 3,
    setup: "Why don't Angular developers have emotional mood swings?",
    punchline: "Because we have OnPush change detection and signal reactivity to stabilize our state.",
    field: "Tech"
  },
  {
    id: 4,
    setup: "Why did the medical student have 20 tabs and 4 textbooks open simultaneously?",
    punchline: "Because page 1 said: 'For further context, please see references.'",
    field: "Medicine"
  },
  {
    id: 5,
    setup: "Jay's jokes are scientifically proven to be like software bugs...",
    punchline: "Completely unexpected, persistently stubborn, and somehow still running in production without crashing.",
    field: "Tech"
  },
  {
    id: 6,
    setup: "Why was the stethoscope feeling underappreciated?",
    punchline: "Because it spent 6 hours listening to Drashti's stomach growl for momos during night shift.",
    field: "Medicine"
  },
  {
    id: 7,
    setup: "What is an MD student's favorite fairytale?",
    punchline: "'Once upon a time, she finished the entire syllabus on time and slept for 10 uninterrupted hours.'",
    field: "Medicine"
  },
  {
    id: 8,
    setup: "How do programmers comfort their doctor friends?",
    punchline: "'Don't worry! There is no bug that a system restart and some chai can't temporarily suppress.'",
    field: "Tech"
  },
  {
    id: 9,
    setup: "Why did the neuron file a police complaint?",
    punchline: "It was assaulted with 400 pages of neuroanatomy in a single evening.",
    field: "Medicine"
  },
  {
    id: 10,
    setup: "Doctor's advice: 'Limit your salt intake.'",
    punchline: "Drashti looking at unsolicited opinions: 'Can I also limit salty comments from society?'",
    field: "Everyday Nonsense"
  },
  {
    id: 11,
    setup: "Why did the CSS code break down in tears?",
    punchline: "Because it couldn't find its center without adding three parent divs with flexbox.",
    field: "Tech"
  },
  {
    id: 12,
    setup: "What is the official incubation period for a brilliant medical doctor?",
    punchline: "5.5 years of MBBS + countless cups of chai + approximately 1,420 moments of 'main kya kar rahi hoon'.",
    field: "Hinglish"
  },
  {
    id: 13,
    setup: "Patient: 'Doctor, will this injection hurt?'",
    punchline: "Drashti: 'Sir, have you ever seen the size of Harrison's Internal Medicine? That hurts more.'",
    field: "Medicine"
  },
  {
    id: 14,
    setup: "Why did the ECG machine start dancing?",
    punchline: "Because it detected a heart rate that matches the rhythm of a Bollywood celebration song.",
    field: "Medicine"
  },
  {
    id: 15,
    setup: "What did the frontal lobe say to the amygdala at midnight?",
    punchline: "'Bro, please shut up. Drashti needs to sleep. We will worry about tomorrow, tomorrow.'",
    field: "Medicine"
  },
  {
    id: 16,
    setup: "Why is Git like an understanding friend?",
    punchline: "Because whenever things go wrong, it lets you `revert` to a safe state without judgment.",
    field: "Tech"
  },
  {
    id: 17,
    setup: "Why did the skeleton decline to go to the exam hall?",
    punchline: "Because he didn't have the guts to face the viva examiner.",
    field: "Medicine"
  },
  {
    id: 18,
    setup: "Doctor: 'Your vitals are completely stable.'",
    punchline: "Drashti: 'Great, but is my sanity stable? Please check that too.'",
    field: "Hinglish"
  }
];
