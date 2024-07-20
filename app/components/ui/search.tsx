import { ChangeEvent } from "react";
import { CommonProps } from "~/Shared/types/common.props";

type Props = CommonProps & {
  inputClass: string;
  name: string;
  defaultValue: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Search(props: Props) {
  const { id, className, inputClass, ...attrs } = props;

  return (
    <div className={className}>
      <input id={id} {...attrs} className={inputClass} />
    </div>
  );
}
