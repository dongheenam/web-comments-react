import { useState } from "react";
import { Gender } from "../Comments";

export interface UseGender {
  gender: Gender;
  handleGenderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function useGender(): UseGender {
  /* gender input */
  const [gender, setGender] = useState<Gender>("male");
  function handleGenderChange({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) {
    setGender(value as Gender);
  }

  return { gender, handleGenderChange };
}
