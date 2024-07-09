import * as s from "./AlertStyle.css";

interface Props {
  text: string;
}

const AlertMainTextBox = ({ text }: Props) => {
  const sentences = text
    .split(".")
    .map((sentence) => sentence.trim() + ".")
    .filter((sentence) => sentence !== ".");

  return (
    <div className={s.AlertMainTextWrap}>
      {sentences.map((sentence, index) => (
        <p key={index} className={s.AlertMainText}>
          {sentence + (index === sentences.length - 1 ? "" : " ")}
        </p>
      ))}
    </div>
  );
};

export default AlertMainTextBox;
