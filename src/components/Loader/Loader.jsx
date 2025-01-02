import RingLoader from "react-spinners/RingLoader";
import s from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={s.loader}>
      <RingLoader color="rgb(142, 235, 79)" size={100} />
    </div>
  );
}
