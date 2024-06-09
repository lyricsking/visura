import Button from "~/shared/components/button";
import { Question } from "./quiz.provider";
import { useCallback } from "react";
import { RadioGroup, RadioGroupItem } from "~/shared/components/radio";
import { Label } from "~/shared/components/label";
import { Checkbox } from "~/shared/components/checkbox";

type QuestionHandlerProps = {
  question: Question;
  isLastQuestion: boolean;
  onSave: (questionId: string, answer: string) => void;
};

export default function QuestionHandler({
  question: { id, question, type, options },
  isLastQuestion,
  onSave,
}: QuestionHandlerProps) {
  const switchType = useCallback(() => {
    switch (type) {
      case "single":
        return <Single options={options} />;
      case "multiple":
        return <Multiple options={options} />;
      default:
        return null;
    }
  }, [type, options]);

  return (
    <div className="flex flex-col items-center justify-center h-full py-8 px-6">
      <h3 className="text-3xl font-bold tracking-tight text-center my-4 mx-auto">
        {question}
      </h3>

      <div className="flex-1 my-6 p-2 w-full">{switchType()}</div>

      <Button
        variant={"fill"}
        radius={"full"}
        className="fixed z-40 bottom-6 h-12 w-2/3 text-xl text-white text-center bg-indigo-400"
        onClick={() => onSave(id, "Answer")}
      >
        {isLastQuestion ? "Finish" : "Next"}
      </Button>
    </div>
  );
}

function Single({ options }: { options: string[] }) {
  return (
    <RadioGroup>
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

function Multiple({ options }: { options: string[] }) {
  return (
    <div className="flex flex-col space-y-2">
      {options.map((option) => (
        <div
          key={option}
          className="flex items-center space-x-4 py-6 px-6 border rounded-md bg-indigo-400 text-white"
        >
          <Checkbox id={option} className="h-5 w-5 rounded-none" />
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
