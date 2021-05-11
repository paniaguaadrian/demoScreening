// React components
import React from "react";
import PropTypes from "prop-types";

// Custom Components
import Input from "../../components/Input";
import Button from "../../components/Button";

// ! No need validation on this case

// Constants
import { UPDATE_DEMO_DETAILS } from "./constants";

// Styles imported
import styles from "./register-user.module.scss";

// Multilanguage
import { withNamespaces } from "react-i18next";

const setDemo = ({ step, setStep, tenancy, setTenancy, t }) => {
  // Handle on change
  const handleDemoDetails = ({ target }) => {
    setTenancy({
      type: UPDATE_DEMO_DETAILS,
      payload: { [target.name]: target.value },
    });
  };

  // Hanlde con next / continue
  const handleContinue = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };
  return (
    <div>
      <div className={styles.HeaderDemo}>
        <h1>{t("F1SC.setDemo.hello")}</h1>
        <p>{t("F1SC.setDemo.subtitleOne")}</p>
        <p>{t("F1SC.setDemo.subtitleTwo")}</p>
      </div>
      <form onSubmit={handleContinue}>
        <div className={styles.FormIntern}>
          <div className={styles.GroupInput}>
            <div className={styles.FormLeft}>
              <Input
                type="text"
                name="agencyName"
                value={tenancy.agencyName}
                label={t("F1SC.setDemo.agencyName")}
                placeholder={t("F1SC.setDemo.agencyNamePL")}
                onChange={(e) => handleDemoDetails(e)}
                required
              />
            </div>
            <div className={styles.FormLeft}>
              <Input
                type="email"
                name="agencyEmailPerson"
                value={tenancy.agencyEmailPerson}
                label={t("F1SC.setDemo.agencyEmail")}
                placeholder={t("F1SC.setDemo.agencyEmailPL")}
                onChange={(e) => handleDemoDetails(e)}
                required
              />
            </div>
          </div>
        </div>

        <div className={styles.AloneButtonContainer}>
          <Button type="submit">{t("nextStepButton")}</Button>
        </div>
      </form>
    </div>
  );
};

setDemo.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  tenancy: PropTypes.object,
  setTenancy: PropTypes.func,
};

export default withNamespaces()(setDemo);
