import { useEffect, useRef, useState } from "react";
import type { EffortGrades } from "../Comments";
import Button from "../components/Button";
import { round, sum } from "../util";

import { UseDecoComments } from "./useDecoComments";
import { UseEffortGrades } from "./useEffortGrades";

interface ResultsProps {
  decoCommentsState: UseDecoComments;
  effortGradeState: UseEffortGrades;
  setAppStatus: (appStatus: string) => void;
  clearingFunctions: {
    clearGender: () => void;
    clearTraits: () => void;
    clearTopicSkills: () => void;
  };
}

export default function ShowResults({
  decoCommentsState,
  effortGradeState,
  setAppStatus,
  clearingFunctions,
}: ResultsProps) {
  const { decoratedComments } = decoCommentsState;
  const { effortGrades } = effortGradeState;
  const { clearGender, clearTraits, clearTopicSkills } = clearingFunctions;
  const [commentsShown, setCommentsShown] = useState<string>("");
  const [effortValues, setEffortValues] = useState<Array<number>>([
    3, 3, 3, 3, 60,
  ]);
  const [roundEG, setRoundEG] = useState<boolean>(true);

  /* copy the comments */
  const taRef = useRef(null);
  function copyComments() {
    navigator.clipboard
      .writeText(commentsShown)
      .then(() => {
        setAppStatus("Comments copied to clipboard");
        if (confirm("Copied the comments to clipboard! Reset the traits?")) {
          setCommentsShown("");
          clearGender();
          clearTopicSkills();
          clearTraits();
          setAppStatus("Traits cleared! Awaiting new submission...");
        }
      })
      .catch((error) => {
        setAppStatus("Error copying the comments: " + error);
      });
  }

  /* populate the textarea */
  useEffect(() => {
    setCommentsShown(decoratedComments.join("\n"));
  }, [decoratedComments]);

  /* round the effort grades */
  useEffect(() => {
    if (!effortGrades) {
      return;
    }
    const roundedEffortGrades = Object.entries(effortGrades).map(
      // round to the nearest integer if asked to round
      ([_strand, value]) => round(value, roundEG ? 0 : 1)
    );
    // append the averages
    roundedEffortGrades.push(sum(roundedEffortGrades) * 5);

    setEffortValues(roundedEffortGrades);
  }, [roundEG, effortGrades]);

  /* copy the effort grades */
  function copyEfforts() {
    const effortValuesText = effortValues.slice(0, -1).join("\t");
    navigator.clipboard
      .writeText(effortValuesText)
      .then(() => alert("Effort grades are copied! Paste them in Excel."))
      .catch((error) => {
        setAppStatus("Error copying the comments: " + error);
      });
  }

  return (
    <>
      <h3>Effort grades</h3>
      <table className="bg-transparent">
        <thead>
          <tr>
            <th>Strand</th>
            <th>PO</th>
            <th>EU</th>
            <th>IA</th>
            <th>MD</th>
            <th>Effort%</th>
          </tr>
        </thead>
        <tbody className="text-right">
          <tr>
            <td className="text-left font-bold">Grade</td>
            <td>{effortValues[0]}</td>
            <td>{effortValues[1]}</td>
            <td>{effortValues[2]}</td>
            <td>{effortValues[3]}</td>
            <td>{effortValues[4]}</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4 flex flex-row gap-2">
        <Button
          variant={roundEG ? "solid" : "outline"}
          onClick={() => setRoundEG(!roundEG)}
        >
          Round grades
        </Button>
        <Button variant="solid" color="primary" onClick={() => copyEfforts()}>
          Copy
        </Button>
      </div>

      <h3>Generated comments</h3>
      <textarea
        ref={taRef}
        className="textarea w-full text-lg overflow-x-hidden"
        placeholder="comments will be populated here..."
        rows={decoratedComments.length * 1.125 || 2.25}
        value={commentsShown}
        onChange={(e) => setCommentsShown(e.target.value)}
      />
      <div className="mt-4 flex gap-2">
        <Button variant="solid" color="primary" onClick={() => copyComments()}>
          Copy
        </Button>
      </div>
    </>
  );
}
