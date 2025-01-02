import s from "./ThanksForTMDB.module.css";

export default function ThanksForTMDB() {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.logo}>
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt="TMDB logo"
          />
        </div>
        <p className={s.text}>
          This website uses TMDB and the TMDB APIs but is not endorsed,
          certified, or otherwise approved by TMDB.
        </p>
      </div>
    </footer>
  );
}
