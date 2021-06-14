// React Components
import React from "react";

// Styles
import styles from "./success.module.scss";

const Success = (props) => {
  return (
    <div className={styles.SuccessPageContainer}>
      <div className={styles.SuccessPageText}>
        {props.children}
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
        <p>{props.paragraph}</p>
        <img src={props.image} alt="" />
      </div>
    </div>
  );
};

export default Success;
