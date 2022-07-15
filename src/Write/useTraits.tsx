import { useState } from "react";
import { togglableTraitsList } from "../Comments";

export type TraitsStatus = {
  [key in keyof typeof togglableTraitsList]: number;
};

export interface UseTraits {
  traitsStatus: TraitsStatus;
  handleTraitsChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  clearTraits: () => void;
}

const defaultStatus = Object.fromEntries(
  Object.entries(togglableTraitsList)
    /* treat topic and skill traits from separate inputs */
    .filter(([key, _val]) => !["acad-xx-topi", "acad-xx-skil"].includes(key))
    .map(([key, _val]) => [key, 1])
) as TraitsStatus;

export default function useTraits(): UseTraits {
  /* traitsStatus = {
   *   [trait-id]: 0 (negative) | 1 (indeterminate) | 2 (positive),
   *   ...
   * }
   * default is always "indeterminate"
   */
  const [traitsStatus, setTraitsStatus] = useState<TraitsStatus>(defaultStatus);

  function handleTraitsChange(event: React.SyntheticEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    setTraitsStatus({
      ...traitsStatus,
      [target.id]: (traitsStatus[target.id as keyof TraitsStatus] + 1) % 3,
    });
  }
  function clearTraits() {
    setTraitsStatus(defaultStatus);
  }

  return { traitsStatus, handleTraitsChange, clearTraits };
}
