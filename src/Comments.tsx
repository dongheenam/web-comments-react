import React from "react";
import { Outlet } from "react-router-dom";
import FirebaseProvider from "./firebase";

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
  asse: "assessment",
  beha: "behaviour",
  pers: "personality",
} as const;
export const traitsList = {
  "acad-xx-topi": "Knows a certain topic well",
  "acad-xx-skil": "Has a specific skill set",
  "acad-xx-word": "Solves word problems",
  "acad-ia-addi": "Completes optional components",
  "acad-ia-enri": "Works on enrichment tasks",
  "acad-ia-revi": "Revises regularly",
  "acad-ia-inqu": "Delves into problems",
  "asse-xx-resu": "Got a good assessment result",
  "asse-xx-solu": "Presents detailed solutions",
  "asse-xx-erro": "Minimises errors during exam",
  "asse-xx-time": "Works well under time pressure",
  "asse-xx-cour": "Follows HSC/IB course requirements",
  "asse-ia-feed": "Seeks feedback on assessment",
  "asse-ia-refl": "Acts on assessment feedback",
  "asse-md-time": "Submits work on time",
  "asse-md-prep": "Prepares for assessments",
  "asse-md-plan": "Plans for assessments",
  "beha-eu-clti": "Uses class time effectively",
  "beha-eu-acti": "Engages in classroom activities",
  "beha-eu-cont": "Contributes to class discussions",
  "beha-eu-note": "Maintains a detailed note",
  "beha-eu-coll": "Works collaboratively",
  "beha-eu-tech": "Uses technologies appropriately",
  "beha-md-home": "Completes all homework",
  "pers-xx-resp": "Respectful and quiet",
  "pers-xx-posi": "Positive",
  "pers-po-punc": "Comes to class on time",
  "pers-po-equi": "Brings equipments",
  "pers-po-catc": "Catches up on missed work",
  "pers-eu-pace": "Works at a reasonable pace",
  "pers-eu-askq": "Asks help in class",
  "pers-eu-hpot": "Helps others in class",
  "pers-ia-appl": "Applies themself",
  "pers-ia-askh": "Seeks help outside class",
  "pers-ia-resi": "Shows resilience",
} as const;

/* single comment */
export type Comment = {
  id: string;
  text: string;
  tone: keyof typeof tonesList;
  type: keyof typeof typesList;
  trait?: keyof typeof traitsList;
};

export type CommentsCount = {
  [trait in keyof typeof traitsList]: number;
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
