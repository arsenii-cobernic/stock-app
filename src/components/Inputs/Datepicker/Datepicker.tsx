import styles from "../Inputs.module.scss";

interface Props {
  title: string;
  id: string;
  value: string;
  min?: string;
  onChange: (value: string) => void;
}

const Datepicker = ({ title, id, value, min, onChange }: Props) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {title}:
      </label>
      <input
        id={id}
        className={styles.input}
        type="date"
        value={value}
        min={min}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
};

export default Datepicker;
