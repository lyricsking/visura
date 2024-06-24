import { useCallback } from "react";
import { RadioGroup, RadioGroupItem } from "~/shared/components/radio";
import { Label } from "~/shared/components/label";
import { Checkbox } from "~/shared/components/checkbox";
import { AnswerType } from "../quiz.type";
import { Input } from "~/shared/components/input";

type OptionsType = {
  name: string,
  defaultValue: string|string[];
  onValueChange: (answer: string|string[]) => void;
  options?: string[];
};
type AnswerProps = OptionsType & {
  answerType: AnswerType;
};
export default function OptionsHandler({
  answerType,
  name,
  defaultValue,
  onValueChange,
  options,
}: AnswerProps) {
  const switchType = useCallback(() => {
    switch (answerType) {
      case "text":
        return <TextInput name={name} defaultValue={defaultValue} onValueChange={onValueChange}/>;
      case "single":
        return (
          <Single
            name={name}
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            options={options}
          />
        );
      case "multiple":
        return (
          <Multiple
            name={name}
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            options={options}
          />
        );
      default:
        return null;
    }
  }, [answerType,name, defaultValue, options, onValueChange]);

  return switchType();
}

function TextInput({name, defaultValue}: OptionsType){
  return <Input name={name} defaultValue={defaultValue} />
}

function Single({ name, defaultValue, onValueChange, options}: OptionsType) {
  return (
    <RadioGroup
      name={name}
      value={defaultValue as string}
      onValueChange={onValueChange}
    >
      {options&&options.map((option) => (
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

function Multiple({ name, defaultValue, options }: OptionsType) {
  return (
    <div className="flex flex-col space-y-2">
      {options&&options.map((option) => (
        <div
          key={option}
          className="flex items-center space-x-4 py-6 px-6 border rounded-md bg-indigo-400 text-white"
        >
          <Checkbox
            id={option}
            className="h-5 w-5 rounded-none"
            name={name}
            value={option}
            checked={defaultValue?.includes(option)}
            required
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
