import { IntervalSelectProps } from "./IntervalSelect.type";
import "./IntervalSelect.css";

export const IntervalSelect = ({
  intervalName,
  isActive,
  onClick,
}: IntervalSelectProps) => (
  <button
    className={`interval-active__button ${
      isActive && "interval-select__button--active"
    }`}
    onClick={onClick}
  >
    {intervalName}
  </button>
);
