import { useEffect, useState } from "react";
import { EffortGrades } from "../Comments";
import { Button } from "../components";
import { round, sum } from "../util";
import AdjustComments from "./AdjustComments";

import { UseChooseComments } from "./useChooseComments";
import { UseEffortGrades } from "./useEffortGrades";

interface ResultsProps {
  chooseCommentsState: UseChooseComments;
  effortGradeState: UseEffortGrades;
  setAppStatus: (appStatus: string) => void;
  clearingFunctions: {
    clearGender: () => void;
    clearTraits: () => void;
    clearTopicSkills: () => void;
  };
}

export default function ShowResults({
  chooseCommentsState,
  effortGradeState,
  setAppStatus,
  clearingFunctions,
}: ResultsProps) {
  const {
    sortedComments,
    chosenComments,
    setChosenComments,
    commentTextsList,
  } = chooseCommentsState;
  const { effortGrades } = effortGradeState;
  const { clearGender, clearTraits, clearTopicSkills } = clearingFunctions;
  const [commentsShown, setCommentsShown] = useState<string>("");
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
    setCommentsShown(commentTextsList.sort().join("\n"));
  }, [commentTextsList]);

  /* round the effort grades for display */
  function roundEG(effortGrades: EffortGrades | undefined) {
    if (!effortGrades) return [, , , ,];

    const rounded = Object.values(effortGrades).map((value) =>
      round(value, roundEffort ? 0 : 1)
    );
    rounded.push(sum(rounded) * 5);
    return rounded;
  }

  /* copy the effort grades */
  function copyEfforts() {
    const effortValuesText = roundEG(effortGrades).slice(0, -1).join("\t");
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
              {["Strand", "PO", "EU", "IA", "MD", "Effort%"].map((title) => (
                <th>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-right">
            <tr>
              <td className="text-left font-bold">Grade</td>
              {roundEG(effortGrades).map((item) => (
                <td>{item}</td>
              ))}
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
          rows={commentTextsList.length * 1.125 || 2.25}
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
