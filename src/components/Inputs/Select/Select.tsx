import styles from "../Inputs.module.scss";

interface Option {
  value: string;
  label: string;
}

interface Props {
  title: string;
  id: string;
  options: Option[];
  onChange: (value: string) => void;
}

const Select = ({ title, id, options, onChange }: Props) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="period">
        {title}:
      </label>
      <select
        className={styles.input}
        name={title}
        id={id}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onChange(e.target.value)
        }
      >
        {options.length &&
          options.map((option: Option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
