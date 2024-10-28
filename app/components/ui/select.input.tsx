type SelectInputProps = {
  id: string;
  className: string;
  options: Option[];
};

export type Option = {
  disabled?: boolean;
  name?: string;
  selected?: boolean;
  value: string;
};

export default function SelectInput(params: SelectInputProps) {
  let defaultValue = "";

  return (
    <select
      className={params.className}
      id={params.id}
      defaultValue={defaultValue}
    >
      {params.options.map((option: Option) => {
        if (option.selected) defaultValue = option.value;
        return (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.name ?? option.value}
          </option>
        );
      })}
    </select>
  );
}
