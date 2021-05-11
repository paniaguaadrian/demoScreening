// Styles
import styles from "./Home.module.scss";

const Home = (props) => {
  return (
    <>
      <div className={styles.HomePageContainer}>
        <div className={styles.HomePageText}>
          <h1>{props.title}</h1>
          <h2>{props.subtitle}</h2>
          <p>{props.text}</p>
          <img src={props.imageSRC} alt={props.imageAlt} />
        </div>
      </div>
    </>
  );
};

export default Home;
