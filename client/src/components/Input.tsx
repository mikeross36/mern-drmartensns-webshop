type PropsType = {
  type: string;
  name: string;
  id?: string;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  placeHolder?: string;
  required?: boolean;
  disabled?: boolean;
  accept?: string;
};

export default function Input({
  type,
  name,
  autoComplete,
  minLength,
  maxLength,
  placeHolder,
  required,
  disabled,
  accept,
}: PropsType) {
  return (
    <input
      type={type}
      name={name}
      autoComplete={autoComplete}
      minLength={minLength}
      maxLength={maxLength}
      placeholder={placeHolder}
      required={required}
      disabled={disabled}
      accept={accept}
      className="form__input"
    />
  );
}
