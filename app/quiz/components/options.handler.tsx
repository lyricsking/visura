import { useCallback } from "react";
import { RadioGroup, RadioGroupItem } from "~/shared/components/radio";
import { Label } from "~/shared/components/label";
import { Checkbox } from "~/shared/components/checkbox";
import { AnswerType } from "../quiz.type";

type OptionsType = {
  currentAnswer: string|string[];
  onAnswerSelected: (answer: string|string[]) => void;
  options: string[];
};
type AnswerProps = OptionsType & {
  answerType: AnswerType;
};
export default function OptionsHandler({
  answerType,
  currentAnswer,
  onAnswerSelected,
  options,
}: AnswerProps) {
  const switchType = useCallback(() => {
    switch (answerType) {
      case "single":
        return (
          <Single
            options={options}
            currentAnswer={currentAnswer}
            onAnswerSelected={onAnswerSelected}
          />
        );
      case "multiple":
        return (
          <Multiple
            options={options}
            currentAnswer={currentAnswer}
            onAnswerSelected={onAnswerSelected}
          />
        );
      default:
        return null;
    }
  }, [currentAnswer, options]);

  return switchType();
}

function Single({ options, currentAnswer, onAnswerSelected }: OptionsType) {
  return (
    <RadioGroup
      value={currentAnswer as string}
      onValueChange={onAnswerSelected}
    >
      {options.map((option) => (
        <div
          key={option}
          className="flex items-center space-x-4 py-6 px-6 border rounded-md bg-indigo-400 text-white"
        >
          <RadioGroupItem
            className="h-5 w-6 rounded-none"
            value={option}
            id={option}
          />
          <Label
            className="w-full text-2xl font-bold capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor={option}
          >
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

function Multiple({ options, currentAnswer, onAnswerSelected }: OptionsType) {
  return (
    <div className="flex flex-col space-y-2">
      {options.map((option) => (
        <div
          key={option}
          className="flex items-center space-x-4 py-6 px-6 border rounded-md bg-indigo-400 text-white"
        >
          <Checkbox
            id={option}
            className="h-5 w-5 rounded-none"
            checked={currentAnswer?.includes(option)}
            onCheckedChange={(checked) => {
              const currentAnswers =
                currentAnswer && Array.isArray(currentAnswer)
                  ? [...currentAnswer]
                  : [];
              if (checked) {
                currentAnswers.push(option);
                onAnswerSelected(currentAnswers);
              }
            }}
          />
          <label
            htmlFor={option}
            className="w-full text-2xl font-bold capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}
