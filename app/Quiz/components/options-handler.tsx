import { RadioGroup, RadioGroupItem } from "~/Shared/components/radio";
import { Label } from "~/Shared/components/label";
import { Checkbox } from "~/Shared/components/checkbox";
import { AnswerType } from "../quiz.type";
import { Input } from "~/Shared/components/input";
import { cn } from "~/Shared/utils";

type OptionsType = {
  name: string;
  defaultValue: string | string[];
  onValueChange: (answer: string | string[]) => void;
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
  const switchType = () => {
    switch (answerType) {
      case "text":
        return (
          <TextInput
            name={name}
            defaultValue={defaultValue}
            onValueChange={onValueChange}
          />
        );
      case "number":
        return (
          <TextInput
            type="number"
            name={name}
            defaultValue={defaultValue}
            onValueChange={onValueChange}
          />
        );
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
            defaultValue={
              Array.isArray(defaultValue) ? defaultValue : [defaultValue]
            }
            onValueChange={onValueChange}
            options={options}
          />
        );
      case "single-tag":
        return (
          <Single
            type="flow"
            name={name}
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            options={options}
          />
        );
      case "multiple-tag":
        return (
          <Multiple
            type="flow"
            name={name}
            defaultValue={
              Array.isArray(defaultValue) ? defaultValue : [defaultValue]
            }
            onValueChange={onValueChange}
            options={options}
          />
        );
      default:
        return null;
    }
  };
  return switchType();
}

type TextType = {
  type?: "text" | "number";
};

function TextInput({
  name,
  defaultValue,
  type = "text",
}: OptionsType & TextType) {
  return (
    <Input
      className="capitalize h-20 text-2xl border-2"
      type={type}
      name={name}
      defaultValue={defaultValue}
      placeholder={name}
    />
  );
}

type SingleType = {
  type?: "flex" | "flow";
};

function Single({
  name,
  defaultValue,
  onValueChange,
  options,
  type = "flex",
}: OptionsType & SingleType) {
  return (
    <RadioGroup
      name={name}
      value={defaultValue as string}
      onValueChange={onValueChange}
      className={cn(
        "flex gap-2",
        type === "flex" && "flex-col",
        type === "flow" && "flex-row flex-wrap items-center justify-center"
      )}
    >
      {options &&
        options.map((option) => (
          <div key={option}>
            <Label
              className={cn(
                "items-center gap-4 p-6 border rounded-md bg-indigo-400 text-white",
                "w-full text-2xl font-bold capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                type === "flex" && "flex",
                type === "flow" && "inline-flex"
              )}
            >
              <RadioGroupItem
                className="h-5 w-6 rounded-none"
                value={option}
                id={option}
              />
              {option}
            </Label>
          </div>
        ))}
    </RadioGroup>
  );
}

function Multiple({
  name,
  defaultValue,
  options,
  type = "flex",
}: Omit<OptionsType, "defaultValue"> &
  SingleType & {
    defaultValue: string[];
  }) {
  return (
    <div
      className={cn(
        "flex gap-2",
        type === "flex" && "flex-col",
        type === "flow" && "flex-row flex-wrap items-center justify-center"
      )}
    >
      {options &&
        options.map((option) => (
          <div key={option}>
            <Label
              className={cn(
                "items-center gap-4 p-6 border rounded-md bg-indigo-400 text-white",
                "w-full text-2xl font-bold capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                type === "flex" && "flex",
                type === "flow" && "inline-flex"
              )}
            >
              <Checkbox
                className="h-5 w-5 rounded-none"
                id={name}
                name={name}
                value={option}
                defaultChecked={
                  defaultValue ? defaultValue.includes(option) : false
                }
              />
              {option}
            </Label>
          </div>
        ))}
    </div>
  );
}
