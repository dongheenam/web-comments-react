import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { FirebaseProvider } from "./firebase";

/* effort grades */
export interface Effort {
  po?: 1 | 2 | 3 | 4 | 5;
  eu?: 1 | 2 | 3 | 4 | 5;
  ia?: 1 | 2 | 3 | 4 | 5;
  md?: 1 | 2 | 3 | 4 | 5;
  ap?: 1 | 2 | 3 | 4 | 5;
}

/* description of traits */
export const tonesList = {
  "+": "positive",
  "-": "negative",
} as const;
export const typesList = {
  acad: "academic",
  pers: "personality",
  beha: "behaviour",
  asse: "assessment",
} as const;
export const traitsList = {
  "acad-xx-topi": "Knows a certain topic well",
  "acad-xx-skil": "Has a specific skill set",
  "acad-xx-erro": "Minimises errors",
  "acad-xx-enri": "Works on enrichment tasks",
  "pers-xx-resp": "Respectful and quiet",
  "pers-po-punc": "Punctual",
  "pers-po-equi": "Brings equipments",
  "pers-po-catc": "Catches up on missed work",
  "pers-ia-appl": "Applies consistently",
  "pers-ia-askh": "Seeks help outside class",
  "pers-ia-resi": "Shows resilience",
  "pers-ia-feed": "Seeks feedback on assessment",
  "beha-eu-clti": "Uses class time effectively",
  "beha-eu-acti": "Engages in classroom activities",
  "beha-eu-cont": "Contributes to class discussions",
  "beha-eu-disc": "Focuses in classes discussions",
  "beha-eu-note": "Maintains a detailed note",
  "beha-eu-coll": "Works collaboratively",
  "beha-eu-tech": "Uses technologies appropriately",
  "beha-eu-askq": "Asks help in class",
  "beha-md-home": "Completes all homework",
  "asse-md-time": "Submits work on time",
  "asse-md-prep": "Prepares for assessments",
  "asse-md-plan": "Plans for assessments",
} as const;

/* single comment */
export type Comment = {
  id: string;
  text: string;
  tone: keyof typeof tonesList;
  type: keyof typeof typesList;
  trait?: keyof typeof traitsList;
};

/* decorators for the comment */
type gender = "male" | "female" | "other";
export interface CommentDecorator {
  gender: gender;
  topic: string;
  academic: 5 | 4 | 3 | 2 | 1;
  strength: "always" | "usually" | "sometimes";
}

export function pronouns(gender: gender) {
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
    <Suspense fallback={<span>Loading database...</span>}>
      <FirebaseProvider>
        <Outlet />
      </FirebaseProvider>
    </Suspense>
  );
}