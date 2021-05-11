// React Components
import React, { useState } from "react";
import PropTypes from "prop-types";

// Custom Components
import Input from "../../components/Input";
import Button from "../../components/Button";

// Multilanguage
import { withNamespaces } from "react-i18next";

// Validation
import { isTenant } from "./validation";

// Reducer
import { UPDATE_TENANT_CONTACT_INFO } from "./constants";

// Styles
import styles from "./register-user.module.scss";

const TenantDetails = ({ step, setStep, tenancy, setTenancy, t }) => {
  const [errors, setErrors] = useState({});

  // Handle on change
  const handleTenant = ({ target }) => {
    setTenancy({
      type: UPDATE_TENANT_CONTACT_INFO,
      payload: { [target.name]: target.value },
    });
  };

  // Hanlde con next / continue
  const handleContinue = (e) => {
    e.preventDefault();
    const errors = isTenant(tenancy.tenantContactDetails);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setStep(step + 1);
  };

  return (
    <form onSubmit={handleContinue}>
      <div className={styles.FormIntern}>
        <div className={styles.GroupInput}>
          <div className={styles.FormLeft}>
            <Input
              type="text"
              name="tenantName"
              value={tenancy.tenantContactDetails.tenantName}
              label={t("F1SC.stepOne.tenantName")}
              placeholder={t("F1SC.stepOne.tenantNamePL")}
              onChange={(e) => handleTenant(e)}
              error={errors.tenantName}
            />
          </div>
          <div className={styles.FormLeft}>
            <Input
              type="email"
              name="tenantEmail"
              value={tenancy.tenantContactDetails.tenantEmail}
              label={t("F1SC.stepOne.tenantEmail")}
              placeholder={t("F1SC.stepOne.tenantEmailPL")}
              onChange={(e) => handleTenant(e)}
              error={errors.tenantEmail}
            />
          </div>
        </div>
        <div className={styles.GroupInputAlone}>
          <div className={styles.FormLeft}>
            <Input
              type="text"
              name="tenantPhone"
              value={tenancy.tenantContactDetails.tenantPhone}
              label={t("F1SC.stepOne.tenantPhone")}
              placeholder={t("F1SC.stepOne.tenantPhonePL")}
              onChange={(e) => handleTenant(e)}
              error={errors.tenantPhone}
            />
          </div>
        </div>
      </div>

      <div className={styles.ButtonContainer}>
        <Button onClick={() => setStep(step - 1)} type="button">
          {t("prevStepButton")}
        </Button>
        <Button type="submit">{t("nextStepButton")}</Button>
      </div>
    </form>
  );
};

TenantDetails.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  tenancy: PropTypes.object,
  setTenancy: PropTypes.func,
};

export default withNamespaces()(TenantDetails);
