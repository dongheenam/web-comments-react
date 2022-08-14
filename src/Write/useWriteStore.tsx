import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import * as def from "../common/definitions";
import { filterKeys, choice } from "../common/util";
import { useFirebase } from "../firebase";

/* type definitions */
type TraitsState = { [key in def.Trait]: number };
interface WriteState {
  /* states */
  // user inputs
  gender: def.Gender;
  traitsState: TraitsState;
  // comments fetched from Firestore
  comments: def.Comment[];
  // status message
  message: string;

  /* actions */
  // user input changes
  setGender: (gender: def.Gender) => void;
  toggleTrait: (trait: def.Trait) => void;
  // server logics
  loadComments: () => void;
  // status message
  setMessage: (msg: string) => void;
  appendMessage: (msg: string) => void;
  // resets
  reset: () => void;
}

/* initial states */
const initialState = {
  gender: "other" as def.Gender,
  traitsState: Object.fromEntries(
    Object.keys(def.traitsList).map((key) => [key, 1])
  ) as TraitsState,
  message: "awaiting input...",
  comments: [],
};

/* helper functions */
async function fetchComments(traits: def.Trait[]): Promise<def.Comment[]> {
  return [];
}

/* store creation and export */
const useWriteStore = create<WriteState>()((set, get) => ({
  ...initialState,
  setGender: (newGender) => set({ gender: newGender }),
  toggleTrait: (trait) =>
    set((state) => ({
      traitsState: {
        ...state.traitsState,
        // 1 => 2 => 0 => 1 => ...
        trait: (state.traitsState[trait] + 1) % 3,
      },
    })),

  loadComments: async () => {
    try {
      get().setMessage("loading comments... ");
      const traitsState = get().traitsState;
      const traits = [
        // positive traits (up to 8)
        ...choice(filterKeys(traitsState, 2), 8),
        // negative traits (up to 8)
        ...choice(filterKeys(traitsState, 0), 8),
      ];
      if (traits.length === 0) {
        throw new Error("no traits selected!");
      }
      const fetchedComments = await fetchComments(traits);
      set({ comments: fetchedComments });
      get().appendMessage(`${fetchedComments.length} comments loaded!`);
    } catch (error) {
      get().appendMessage("Error: " + error);
    }
  },

  setMessage: (msg) => set({ message: msg }),
  appendMessage: (msg) => set((state) => ({ message: state.message + msg })),
  reset: () => set(initialState),
}));
// persist(useWriteStore, { name: "wcg-write" })
export default devtools(useWriteStore);
