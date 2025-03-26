type PillButtonProps = {
  id: string;
  label: string;
  value: string;
  currentValue: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PillButton({
  id,
  label,
  value,
  currentValue,
  onChange,
}: PillButtonProps) {
  return (
    <>
      <input
        type="radio"
        id={id}
        className="appearance-none"
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className={`border-1 px-4 py-1.5 rounded-2xl font-semibold text-sm transition duration-200 ease-in-out
                ${
                  value == currentValue
                    ? "text-blue-900 border-blue-900 bg-blue-100"
                    : "text-gray-900 border-gray-100 bg-white"
                }`}>
        {label}
      </label>
    </>
  );
}
