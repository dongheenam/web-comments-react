import { Outlet } from "react-router-dom";
import FirebaseProvider from "./firebase";

/* effort grades */
export const effortStrands = ["po", "eu", "ia", "md"] as const;
export type EffortGrades = {
  [strand in typeof effortStrands[number]]: number;
};

/* description of traits */
export const tonesList = {
  "+": "positive",
  "-": "negative",
} as const;
export const typesList = {
  acad: "academic",
  asse: "assessment",
  beha: "behaviour",
  pers: "personality",
  othe: "other",
} as const;
export const traitsList = {
  "acad-xx-topi": [
    "Improve on a certain topic",
    "Knows a certain topic well?",
    "Knows a certain topic well",
  ],
  "acad-xx-skil": [
    "Practise a certain skill",
    "Has a specific skill set?",
    "Has a specific skill set",
  ],
  "acad-xx-word": [
    "Practise word problems",
    "Solves word problems?",
    "Solves word problems",
  ],
  "acad-ia-enri": [
    "Try enrichment tasks",
    "Works on enrichment tasks?",
    "Works on enrichment tasks",
  ],
  "acad-ia-revi": [
    "Revise regularly",
    "Revises regularly?",
    "Revises regularly",
  ],
  "acad-ia-inqu": [
    "Improve inquiry skills",
    "Has good inquiry skills?",
    "Has good inquiry skills",
  ],
  "asse-xx-resu": [
    "Disappointing assessment result",
    "Got a good assessment result?",
    "Got a good assessment result",
  ],
  "asse-xx-solu": [
    "Present detailed solutions",
    "Presents detailed solutions?",
    "Presents detailed solutions",
  ],
  "asse-xx-erro": [
    "Develop strategies for minimising errors",
    "Minimises errors during exam?",
    "Makes no errors during exam",
  ],
  "asse-xx-time": [
    "Develop strategies for time management",
    "Works well under time pressure?",
    "Works well under time pressure",
  ],
  "asse-xx-cour": [
    "Follow the course requirements",
    "Follows HSC/IB course requirements?",
    "Follows HSC/IB course requirements",
  ],
  "asse-po-port": [
    "Need more effort towards portfolio",
    "Maintains portfolio?",
    "Maintains portfolio well",
  ],
  "asse-ia-feed": [
    "Seek feedback from teacher",
    "Seeks feedback on assessment?",
    "Seeks feedback on assessment",
  ],
  "asse-ia-refl": [
    "Act on the feedback given",
    "Acts on assessment feedback?",
    "Acts on assessment feedback",
  ],
  "asse-md-time": [
    "Submit work on time",
    "Submits work on time?",
    "Submits work on time",
  ],
  "asse-md-prep": [
    "Spend time preparing for tests",
    "Prepares for assessments?",
    "Prepares for assessments",
  ],
  "beha-eu-clti": [
    "Be productive in class",
    "Uses class time effectively?",
    "Uses class time effectively",
  ],
  "beha-eu-acti": [
    "Be active during activities",
    "Engages in activities?",
    "Engages in activities",
  ],
  "beha-eu-cont": [
    "Be vocal during discussions",
    "Contributes to discussions?",
    "Contributes to discussions",
  ],
  "beha-eu-note": [
    "Maintain better notes",
    "Maintains a detailed note?",
    "Maintains a detailed note",
  ],
  "beha-eu-coll": [
    "Talk to classmates",
    "Works collaboratively?",
    "Works collaboratively",
  ],
  "beha-eu-tech": [
    "Don't be distracted by devices",
    "Uses technology appropriately?",
    "Uses technology appropriately",
  ],
  "beha-md-home": [
    "Complete homework",
    "Completes all homework?",
    "Completes all homework",
  ],
  "pers-xx-resp": [
    "Talk less in class",
    "Respectful and quiet?",
    "Respectful and quiet",
  ],
  "pers-xx-posi": [
    "Stay positive while studying",
    "Shows positive attitude?",
    "Shows positive attitude",
  ],
  "pers-po-punc": [
    "Come to class on time",
    "Comes to class on time?",
    "Comes to class on time",
  ],
  "pers-po-equi": [
    "Bring equipments more often",
    "Brings equipments?",
    "Brings equipments",
  ],
  "pers-po-catc": [
    "Catch up on the missed work",
    "Catches up on missed work?",
    "Catches up on missed work",
  ],
  "pers-eu-pace": [
    "Work faster",
    "Works at a reasonable pace?",
    "Works at a reasonable pace",
  ],
  "pers-eu-askq": [
    "Ask teacher for help",
    "Asks help in class?",
    "Asks help in class",
  ],
  "pers-eu-hpot": [
    "Help other students",
    "Helps others in class?",
    "Helps others in class",
  ],
  "pers-ia-appl": [
    "Stay committed to studies",
    "Applies themself?",
    "Applies themself",
  ],
  "pers-ia-askh": [
    "Attend Maths Tutorials",
    "Seeks help outside class?",
    "Seeks help outside class",
  ],
  "pers-ia-resi": [
    "Show more resilience",
    "Shows resilience?",
    "Shows resilience",
  ],
  "othe-xx-undi": [
    "Undefined trait with status 0",
    "Undefined trait with status 1",
    "Undefined trait with status 2",
  ],
} as const;

export type Trait = keyof typeof traitsList;

/* topics and skills are not set by button inputs */
const topicTraits = ["acad-xx-topi", "acad-xx-skil", "othe-xx-undi"];
export const togglableTraitsList = Object.fromEntries(
  Object.entries(traitsList).filter(([key, _val]) => !topicTraits.includes(key))
);

/* single comment */
export type Comment = {
  id: string;
  text: string;
  tone: keyof typeof tonesList | "";
  type: keyof typeof typesList;
  trait: Trait;
};

export type CommentsCount = {
  [trait in Trait]: number;
};

/* decorators for the comment */
export type Gender = "male" | "female" | "other";
export interface CommentDecorator {
  topic: string;
  academic: 5 | 4 | 3 | 2 | 1;
  frequency: "always" | "usually" | "sometimes";
}

export function makePronouns(gender: Gender) {
  switch (gender) {
    case "male":
      return {
        subject: "he",
        object: "him",
        possessive: "his",
        reflexive: "himself",
      };
    case "female":
      return {
        subject: "she",
        object: "her",
        possessive: "her",
        reflexive: "herself",
      };
    case "other":
      return {
        subject: "they",
        object: "them",
        possessive: "their",
        reflexive: "themself",
      };
  }
}

export default function Comments() {
  return (
    <FirebaseProvider>
      <Outlet />
    </FirebaseProvider>
  );
}
