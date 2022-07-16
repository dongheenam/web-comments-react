import { useState } from "react";
import { Gender } from "../Comments";

export interface UseGender {
  gender: Gender;
  handleGenderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearGender: () => void;
}

export default function useGender(): UseGender {
  /* gender input */
  const [gender, setGender] = useState<Gender>("other");

  function clearGender() {
    setGender("other");
  }

  function handleGenderChange({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) {
    if (["male", "female", "other"].includes(value)) {
      setGender(value as Gender); // stupid TypeScript
    }
  }

  return { gender, handleGenderChange, clearGender };
}
