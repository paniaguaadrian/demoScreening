// React Components
import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Stripe Components
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// Reduce & Constants
import { TenantStripeReducer, DefaultTenant } from "./tenantStripe-reducer";
import { UPDATE_NEWTENANT_INFO } from "./tenantStripe-constants";

// Multi language
import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";

// Custom Components
import NavBar from "../../components/NavBarCentered/NavBar";
import CustomHelmet from "../../components/Helmet/CustomHelmet";
import WhatsappBubble from "../../components/WhatsappBubble/WhatsappBubble";

// Images
import RimboLogo from "../../images/rimbo-logo.png";
import StripeLogo from "../../images/secure-payments.png";
import SuccessImage from "../../images/undraw_sweet_home_dkhr.svg";

// Styles
import Loader from "react-loader-spinner";
import style from "./register-card.module.scss";
import "./CardSection.css";
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "14px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCY,
  REACT_APP_BASE_URL_EMAIL,
  REACT_APP_BASE_URL_STRIPE,
  REACT_APP_API_RIMBO_TENANT_STRIPE,
} = process.env;

const RegisterTenantCard = ({ t }) => {
  let { randomID } = useParams();
  const tenancyID = randomID;

  const [tenant, setTenant] = useReducer(TenantStripeReducer, DefaultTenant);

  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const [tenancyData, setTenancyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null); //eslint-disable-line

  // ! Fetch data from DB to autocomplete input form
  useEffect(() => {
    const getData = () => {
      fetch(`${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}`)
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!" + res.status);
          }
          return res.json();
        })
        .then(
          (tenancyData) => {
            setTenancyData(tenancyData);
            setIsLoaded(true);
            setLoading(false);
          },
          (err) => {
            setErr(err);
            setLoading(false);
          }
        );
    };
    getData();
  }, [tenancyID]);

  // Handle on change
  const handleNewTenant = ({ target }) => {
    setTenant({
      type: UPDATE_NEWTENANT_INFO,
      payload: { [target.name]: target.value },
    });
  };

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    const tenantsEmail = document.getElementById("email").value;
    const tenantsName = document.getElementById("name").value;
    const tenantsPhone = document.getElementById("phone").value;
    const timestamps = new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");

    const cardElement = elements.getElement("card");

    setProcessingTo(true);

    try {
      // ! Post a el backend de stripe en formularios
      const { data: client_secret } = await axios.post(
        `${REACT_APP_BASE_URL_STRIPE}/card-wallet`,
        {
          tenantsName,
          tenantsEmail,
        }
      );

      const { error } = await stripe.confirmCardSetup(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: tenantsName,
            email: tenantsEmail,
            phone: tenantsPhone,
          },
        },
      });

      if (error) {
        setCheckoutError("* Rellena todos los campos del formulario.");
        setProcessingTo(false);
        return;
      } else {
        setIsSuccessfullySubmitted(true);
        setIsLoaded(true);

        // ! post a nuestra BDD
        await axios.post(
          `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT_STRIPE}/${randomID}`,
          {
            isAcceptedGC: tenant.isAcceptedGC,
            randomID: randomID,
          }
        );

        await axios.post(
          `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}/rimbo/start-service`,
          { tenancyID: tenancyID, rentStart: tenant.rentStart }
        );

        // ! Post to Email service

        if (i18n.language === "en") {
          await axios.post(`${REACT_APP_BASE_URL_EMAIL}/en/e3`, {
            tenantsName,
            tenantsEmail,
            tenantsPhone,
            timestamps,
            agencyName: tenancyData.agent.agencyName,
            agencyEmailPerson: tenancyData.agent.agencyEmailPerson,
            rentalAddress: tenancyData.property.rentalAddress,
            rentStartDate: tenancyData.rentStartDate,
            rentEndDate: tenancyData.rentEndDate,
          });
        } else {
          await axios.post(`${REACT_APP_BASE_URL_EMAIL}/e3`, {
            tenantsName,
            tenantsEmail,
            tenantsPhone,
            timestamps,
            agencyName: tenancyData.agent.agencyName,
            agencyEmailPerson: tenancyData.agent.agencyEmailPerson,
            rentalAddress: tenancyData.property.rentalAddress,
            rentStartDate: tenancyData.rentStartDate,
            rentEndDate: tenancyData.rentEndDate,
          });
        }
      }
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  return (
    <>
      <CustomHelmet header={t("F2TT.header")} />
      {isLoaded === true ? (
        <NavBar agencyNameLogo={tenancyData.agent.agencyName} />
      ) : (
        <NavBar agencyNameLogo="Agency Logo" />
      )}

      <WhatsappBubble />
      {!isSuccessfullySubmitted ? (
        <div>
          {loading ? (
            <div>
              <Loader
                type="Puff"
                color="#01d2cc"
                height={100}
                width={100}
                timeout={6000} //6 secs
              />
            </div>
          ) : (
            <>
              <div className={style.BackgroundImage}>
                <div className={style.HeaderContainer}>
                  <h1>
                    <span>{t("F2TT.titleOne")}</span>
                    {t("F2TT.titleTwo")}
                    <span>!</span>
                  </h1>
                </div>
                <div className={style.ContainerCard}>
                  <div className={style.Form_header_left}>
                    <p>
                      {t("F2TT.leftTextOne")}
                      {tenancyData.agent.agencyName}
                      {t("F2TT.leftTextOnePartTwo")}
                    </p>
                    <p className={style.important_p}>{t("F2TT.leftTextTwo")}</p>
                    <p>{t("F2TT.leftTextThree")}</p>
                    <div className={style.rimbo_sign}>
                      <h4>Powered by</h4>
                      <img src={RimboLogo} alt="Rimbo Rent Logo" />
                    </div>
                  </div>

                  <form onSubmit={handleFormSubmit}>
                    <div className={style.Form_container}>
                      <div className={style.DataContainer}>
                        <div className={style.Form_element}>
                          <h4>{t("F2TT.name")}</h4>
                          <input
                            id="name"
                            type="text"
                            value={tenancyData.tenant.tenantsName}
                            disabled
                          />
                        </div>
                        <div className={style.Form_element}>
                          <h4>{t("F2TT.email")}</h4>{" "}
                          <input
                            id="email"
                            type="text"
                            value={tenancyData.tenant.tenantsEmail}
                            disabled
                          />
                        </div>

                        <div className={style.Form_element}>
                          <h4>{t("F2TT.phone")}</h4>
                          <input
                            id="phone"
                            type="text"
                            value={tenancyData.tenant.tenantsPhone}
                            disabled
                          />
                        </div>
                      </div>

                      <label className={style.StripeCard}>
                        <h3>{t("F2TT.creditCard")}</h3>
                        <h4>{t("F2TT.subcreditcard")}</h4>
                        <CardElement
                          options={CARD_ELEMENT_OPTIONS}
                          onChange={handleCardDetailsChange}
                          className={style.tarjeta}
                        />
                        <p>{t("F2TT.warningcreditcard")}</p>
                      </label>

                      <div className={style.ErrorInput}>
                        <p className="error-message">{checkoutError}</p>
                      </div>

                      <div className={style.TermsContainerStripe}>
                        <input
                          type="checkbox"
                          required
                          name="isAcceptedGC"
                          id="terms"
                          value={tenant.isAcceptedGC}
                          onChange={(e) => handleNewTenant(e)}
                        />
                        <p>
                          {t("F2TT.checkBoxOne")}{" "}
                          <a
                            href="/terms"
                            target="_blank"
                            rel="noreferrer"
                            className="link-tag"
                          >
                            {t("F2TT.checkBoxTwo")}
                          </a>
                          ,
                          <a
                            href={t("F1SC.stepZero.linkPrivacy")}
                            target="_blank"
                            rel="noreferrer"
                            className="link-tag"
                          >
                            {" "}
                            {t("F2TT.checkBoxThree")}
                          </a>
                          ,
                          <a
                            href={t("F1SC.stepZero.linkCookies")}
                            target="_blank"
                            rel="noreferrer"
                            className="link-tag"
                          >
                            {" "}
                            {t("F2TT.checkBoxFour")}
                          </a>{" "}
                          {t("F2TT.checkBoxFive")}
                        </p>
                      </div>
                      <div className={style.buttonContainer}>
                        {isProcessing ? (
                          <Loader
                            type="Puff"
                            color="#01d2cc"
                            height={50}
                            width={50}
                            timeout={6000} //6 secs
                          />
                        ) : (
                          <button disabled={isProcessing || !stripe}>
                            {t("authorize")}
                          </button>
                        )}
                      </div>
                      <div className={style.security_container}>
                        <img
                          className={style.stripe_logo}
                          src={StripeLogo}
                          alt="Stripe Security Payment Logo"
                        />
                      </div>
                      <div className={style.rimbo_mobile}>
                        <h4>Powered by</h4>
                        <img src={RimboLogo} alt="Rimbo Rent Logo" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={style.success}>
          <>
            <div className={style.hero_section_container}>
              <h1>
                {t("cardsuccess.title")} {tenancyData.agent.agencyName}!
              </h1>
            </div>
            <main className={style.form_full_container_success}>
              <div className={style.form_header_left_success}>
                <p>{t("cardsuccess.textOne")}</p>
                <p>{t("cardsuccess.textTwo")}</p>
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
      )}
    </>
  );
};

export default withNamespaces()(RegisterTenantCard);
