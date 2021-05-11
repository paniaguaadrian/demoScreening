// React Components
import React from "react";
import PropTypes from "prop-types";

// Custom Components
import Success from "../../components/Success/Success";

// Multi language
import { withNamespaces } from "react-i18next";

const Completed = ({ tenancy, t }) => {
  return (
    <>
      <Success
        title={t("F1SC.completed.title")}
        subtitle={t("F1SC.completed.subtitle")}
      />
    </>
  );
};

Completed.propTypes = {
  tenancy: PropTypes.object,
};

export default withNamespaces()(Completed);
