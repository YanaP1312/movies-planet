import RingLoader from "react-spinners/RingLoader";
import s from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={s.loader}>
      <RingLoader color="rgb(243, 251, 6)" size={100} />
    </div>
  );
}
