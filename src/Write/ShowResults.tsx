import { useEffect, useState } from "react";
import { Button } from "../components";
import { round, sum } from "../util";
import AdjustComments from "./AdjustComments";

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
  const {
    sortedComments,
    chosenComments,
    setChosenComments,
    decoratedComments,
  } = decoCommentsState;
  const { effortGrades } = effortGradeState;
  const { clearGender, clearTraits, clearTopicSkills } = clearingFunctions;
  const [commentsShown, setCommentsShown] = useState<string>("");
  const [effortValues, setEffortValues] = useState<Array<number>>([
    3, 3, 3, 3, 60,
  ]);
  const [roundEffort, setRoundEffort] = useState<boolean>(true);
  const [adjust, setAdjust] = useState<boolean>(false);

  /* copy the comments */
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
    setCommentsShown(decoratedComments.sort().join("\n"));
  }, [decoratedComments]);

  /* round the effort grades */
  useEffect(() => {
    if (!effortGrades) {
      return;
    }
    const roundedEffortGrades = Object.entries(effortGrades).map(
      // round to the nearest integer if asked to round
      ([_strand, value]) => round(value, roundEffort ? 0 : 1)
    );
    // append the averages
    roundedEffortGrades.push(sum(roundedEffortGrades) * 5);

    setEffortValues(roundedEffortGrades);
  }, [roundEffort, effortGrades]);

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
      <h2>Results</h2>
      <h3>Effort grades</h3>
      <div className="ml-8">
        <div className="my-4 flex flex-row gap-2">
          <Button
            variant={roundEffort ? "solid" : "outline"}
            onClick={() => setRoundEffort(!roundEffort)}
          >
            Round grades
          </Button>
          <Button variant="solid" color="primary" onClick={() => copyEfforts()}>
            Copy
          </Button>
        </div>
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
      </div>

      <h3>Comments</h3>
      <div className="ml-8">
        <div className="mb-4 flex flex-row gap-2">
          <Button
            variant={adjust ? "solid" : "outline"}
            color="default"
            onClick={() => setAdjust(!adjust)}
          >
            Adjust
          </Button>
          <Button
            variant="solid"
            color="primary"
            onClick={() => copyComments()}
          >
            Copy
          </Button>
        </div>
        <textarea
          className="textarea w-full text-lg overflow-x-hidden"
          placeholder="comments will be populated here..."
          rows={decoratedComments.length * 1.125 || 2.25}
          value={commentsShown}
          onChange={(e) => setCommentsShown(e.target.value)}
        />
        {adjust && (
          <AdjustComments
            {...{ sortedComments, chosenComments, setChosenComments }}
          />
        )}
      </div>
    </>
  );
}
