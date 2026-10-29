export interface PersonalNote {
  id: number;
  title: string;
  body: string[];
  signoffTitle: string;
  signoffName: string;
  dateTag?: string;
}

export const INITIAL_JAY_NOTE: PersonalNote = {
  id: 0,
  title: "A Small Note From Your Friend 💌",
  body: [
    "Hey Drashti,",
    "I know some days can feel a little too much, and sometimes even explaining what's going on inside your head feels exhausting.",
    "So, I made you this tiny corner of the internet. It won't solve every problem, and unfortunately it cannot bring you chai through the screen 😭, but it can remind you to pause, breathe, and smile a little.",
    "You don't have to pretend to be okay all the time. If you feel like talking, you can reach out. If you need quiet time, that's okay too.",
    "And yes, madam, your MD preparation still matters — but so do you. Take it one day at a time. You don't need to be perfect to keep moving forward.",
    "Whenever your brain starts opening unnecessary tabs, remember that even the best doctors need breaks."
  ],
  signoffName: "Jay",
  signoffTitle: "Chief Engineer of Unnecessary Jokes and Emergency Motivation 💻😂",
  dateTag: "Special Edition"
};

export const SILLY_JAY_NOTES: PersonalNote[] = [
  {
    id: 1,
    title: "Note #2: On the Subject of Overthinking 🧠",
    body: [
      "Dear Drashti,",
      "If overthinking burned actual calories, you would have vanished into thin air by now.",
      "Just reminding you: whatever scenario you're currently constructing in your head at high definition with 4K surround sound? 99% chance it won't happen that way.",
      "Close the overthinking app. Restart your mental device. Grab some water, please."
    ],
    signoffName: "Jay",
    signoffTitle: "Self-Appointed IT Support for Drashti's Brain"
  },
  {
    id: 2,
    title: "Note #3: The Chai Guarantee ☕",
    body: [
      "Hey Drashti,",
      "I tried writing a script to physically teleport a piping hot cup of adrak chai to your study table, but Angular threw a compilation error saying 'PhysicalRealityService not found'.",
      "So until technology catches up, please make or grab yourself a cup, sit back for ten minutes, and let your mind completely idle.",
      "You are doing great, even when you feel stuck."
    ],
    signoffName: "Jay",
    signoffTitle: "Frontend Developer & Honorary Chai Advocate"
  },
  {
    id: 3,
    title: "Note #4: The Future MD Reality Check 🩺",
    body: [
      "Drashtii,",
      "Think about this: In a few years, patients will walk into your clinic nervous, and your calm voice is going to reassure them that everything will be fine.",
      "Remember to offer that very same calm reassurance to yourself today.",
      "You've worked so hard for this path. Trust your preparation. One concept at a time!"
    ],
    signoffName: "Jay",
    signoffTitle: "Proud Friend & Cheerleader-in-Chief"
  },
  {
    id: 4,
    title: "Note #5: No Pressure Protocol 🕊️",
    body: [
      "Quick reminder from headquarters:",
      "You don't have to prove anything to anyone today. You don't have to be productive for 14 hours straight to earn the right to sleep peacefully.",
      "It's completely okay to have an off day where the biggest achievement is just being kind to yourself.",
      "Take your time. You are surrounded by people who care about you unconditionally."
    ],
    signoffName: "Jay",
    signoffTitle: "Department of Realistic Expectations"
  },
  {
    id: 5,
    title: "Note #6: The Emergency Chuckle Warranty 😂",
    body: [
      "Hey Drashti,",
      "This website comes with a lifetime smile warranty. If a joke fails to produce at least a faint smirk, please file an official bug report with Jay.",
      "Terms and conditions: Jay reserves the right to deliver even sillier jokes until a smile is successfully detected.",
      "Keep shining, Drashti. You've got this!"
    ],
    signoffName: "Jay",
    signoffTitle: "Your Friend, Always"
  }
];
