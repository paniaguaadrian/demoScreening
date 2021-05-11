// React Components
import React from "react";

// Custom Components
import WhatsappBubble from "../../components/WhatsappBubble/WhatsappBubble";
import Component404 from "../../components/404/Component404";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import CustomHelmet from "../../components/Helmet/CustomHelmet";

// Multi language
import { withNamespaces } from "react-i18next";

// Images
import Image404 from "../../images/undraw_warning_cyit.svg";

const Page404 = ({ t }) => {
  return (
    <>
      <CustomHelmet header={t("404Page.header")} />
      <NavBar />
      <Component404
        title={t("404Page.title")}
        subtitle={t("404Page.subtitle")}
        paragraphEmail={t("404Page.paragraphEmail")}
        paragraphPhone={t("404Page.paragraphPhone")}
        imageSRC={Image404}
        imageAlt="404 error image"
      />
      <WhatsappBubble />
      <Footer />
    </>
  );
};

export default withNamespaces()(Page404);
