import { Fragment } from "react";
import { Comment, Trait, traitsList } from "../Comments";
import { Checkbox, LabelButton } from "../components";
import { choice } from "../util";
import { SortedComments } from "./useDecoComments";

interface AdjustCommentsProp {
  sortedComments: SortedComments;
  chosenComments: Comment[];
  setChosenComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}
export default function AdjustComments({
  sortedComments,
  chosenComments,
  setChosenComments,
}: AdjustCommentsProp) {
  let usedTraits = chosenComments.map((comment) => comment.trait);

  function EditTrait(trait: Trait, tone: "+" | "-") {
    function toggleTrait(trait: Trait) {
      if (usedTraits.includes(trait)) {
        setChosenComments(
          chosenComments.filter((comment) => comment.trait !== trait)
        );
      } else {
        setChosenComments([
          ...chosenComments,
          choice(sortedComments[tone][trait]!)[0],
        ]);
      }
    }

    if (!(trait in sortedComments[tone])) {
      return <></>;
    }

    return (
      <Fragment key={trait}>
        <LabelButton
          key={`${trait}-check`}
          className="w-full h-full rounded-md flex items-center"
          input={
            <Checkbox
              checked={usedTraits.includes(trait)}
              id={`${trait}-check`}
              onChange={() => toggleTrait(trait)}
            />
          }
        >
          <span className="truncate">
            {traitsList[trait as Trait][tone === "+" ? 2 : 0]}
          </span>
        </LabelButton>
        <select
          className="select w-full rounded-md truncate"
          name={`${trait}-text`}
          key={`${trait}-text`}
          value={chosenComments.filter((c) => c.trait === trait)[0]?.id}
          onChange={(e) =>
            setChosenComments([
              ...chosenComments.filter((c) => c.trait !== trait),
              sortedComments[tone][trait]!.filter(
                (c) => c.id === e.target.value
              )[0],
            ])
          }
        >
          {sortedComments[tone][trait]?.map((comment) => (
            <option key={comment.id} value={comment.id}>
              {comment.text}
            </option>
          ))}
        </select>
      </Fragment>
    );
  }

  return (
    <>
      <div className="font-semibold mt-4">Commending</div>
      <div className="my-2 grid grid-cols-[12rem,auto] text-base gap-2">
        {Object.keys(sortedComments["+"]).map((key) =>
          EditTrait(key as Trait, "+")
        )}
      </div>
      <div className="font-semibold mt-4">Suggesting</div>
      <div className="my-2 grid grid-cols-[12rem,auto] text-base gap-2">
        {Object.keys(sortedComments["-"]).map((key) =>
          EditTrait(key as Trait, "-")
        )}
      </div>
    </>
  );
}
