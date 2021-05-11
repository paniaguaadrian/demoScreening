// React Components
import React from "react";
import PropTypes from "prop-types";

// Images
import RimboLogo from "../../images/rimbo-logo.png";
import SuccessImage from "../../images/undraw_server_status_5pbv.svg";

// Styles
import style from "./register-user.module.scss";

// Multi language
import { withNamespaces } from "react-i18next";

const Completed = ({ tenancy, t }) => {
  return (
    <>
      {/* <Success
        title={t("F1SC.completed.title")}
        subtitle={t("F1SC.completed.subtitle")}
      /> */}
      <div className={style.success}>
        <>
          <div className={style.hero_section_container}>
            <h1>{t("cardsuccessTwo.title")}</h1>
          </div>
          <main className={style.form_full_container_success}>
            <div className={style.form_header_left_success}>
              <p>{t("cardsuccessTwo.textOne")}</p>
              {/* <p>{t("cardsuccess.textTwo")}</p> */}
            </div>
            <div className={style.success_container_right}>
              <img src={SuccessImage} alt="finish success card" />
            </div>
          </main>
          <div className={style.rimbo_sign_success}>
            <h4>Powered by</h4>
            <img src={RimboLogo} alt="Rimbo Rent Logo" />
          </div>
        </>
      </div>
    </>
  );
};

Completed.propTypes = {
  tenancy: PropTypes.object,
};

export default withNamespaces()(Completed);
