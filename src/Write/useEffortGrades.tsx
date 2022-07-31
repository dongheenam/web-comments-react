import { useEffect, useState } from "react";
import { effortStrands } from "../Comments";
import type { EffortGrades } from "../Comments";
import type { TraitsStatus } from "./useTraits";
import { sum } from "../util";

interface EffortGradeProps {
  traitsStatus: TraitsStatus;
}

export interface UseEffortGrades {
  effortGrades: EffortGrades | undefined;
}

export default function useEffortGrades({ traitsStatus }: EffortGradeProps) {
  const [effortGrades, setEffortGrades] = useState<EffortGrades>();

  // find the grade for one strand
  function gradeOfStrand(strand: typeof effortStrands[number]) {
    const statusValues = Object.entries(traitsStatus)
      .filter(([trait, _status]) => trait.slice(5, 7) === strand)
      // positive has status of 2, negative has status of 0
      .map(([_trait, status]) => status - 1);

    const sumStatuses = sum(statusValues);
    // you only need 6 positive strands to get maximum effort grade;
    let count = statusValues.length;
    count = count > 6 ? 6 : count;

    // cap the grade between 1 and 5
    let grade = (sumStatuses / count) * 2 + 3;
    if (grade > 5) {
      grade = 5;
    }
    if (grade < 1) {
      grade = 1;
    }

    return grade;
  }

  // update effort grades based on the traits
  useEffect(() => {
    const newEffortGrades = Object.fromEntries(
      effortStrands.map((strand) => [strand, gradeOfStrand(strand)])
    );
    setEffortGrades(newEffortGrades as EffortGrades);
  }, [traitsStatus]);

  return { effortGrades };
}
