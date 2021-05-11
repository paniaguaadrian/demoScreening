// React Components
import React, { useReducer, useState } from "react";

// Custom Components
import FormSteps from "./form-steps";
import Footer from "../../components/Footer/Footer";
import CustomHelmet from "../../components/Helmet/CustomHelmet";
import NavBar from "../../components/NavBar/NavBar";
import WhatsappBubble from "../../components/WhatsappBubble/WhatsappBubble";

// Reducer import
import { TenancyReducer, DefaultTenancy } from "./tenancy-reducer";

// Styles imported
import styles from "./register-user.module.scss";

// Multilanguage
import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";

const RegisterTenancy = ({ t }) => {
  let [step, setStep] = useState(0);

  const [tenancy, setTenancy] = useReducer(TenancyReducer, DefaultTenancy);

  let steps = FormSteps(step, setStep, tenancy, setTenancy);

  return (
    <>
      <CustomHelmet header={t("F1SC.helmet")} />
      <NavBar agencyNameLogo={tenancy.agencyName} />
      <WhatsappBubble />
      <div className={styles.RegisterContainer}>
        {step === 1 || step === 2 || step === 3 ? (
          <div className={styles.Register}>
            <h1>{t("F1SC.header.title")}</h1>
            <div className={styles.ExtraInfoContainer}>
              <p>{t("F1SC.header.subtitleOne")}</p>
              <p>{t("F1SC.header.subtitleTwo")}</p>
            </div>
            {i18n.language === "es" ? (
              <h4>
                Paso {step} / {steps.length - 2} -{" "}
                <span>{steps[`${step}`].titleEs}</span>
              </h4>
            ) : (
              <h4>
                Step {step} / {steps.length - 2} -{" "}
                <span>{steps[`${step}`].title}</span>
              </h4>
            )}
          </div>
        ) : null}

        <div className={styles.FormContent}>{steps[`${step}`].content}</div>
      </div>
      <Footer />
    </>
  );
};

export default withNamespaces()(RegisterTenancy);
