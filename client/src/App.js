// React Components
import { Route, Switch, Redirect } from "react-router-dom";

// Multilingual
import { withNamespaces } from "react-i18next";

// Custom Components

// General Screens
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";
import ApprovedTenantRimbo from "./screens/approvedTenantRimbo/ApprovedTenantRimbo.jsx";
import HomePage from "./screens/HomePage/HomePage";
import Page404 from "./screens/404/404";

// Form Screens
import RegisterTenancy from "./screens/F1_RegisterTenancy";
import StripeHandler from "./screens/F2_RegisterTenantCard/StripeHandlerComponent";

// Normalize & Generic styles
import "./styles/generic.scss";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/terms" component={TermsAndConditions} />
      <Route exact path="/register/tenancy" component={RegisterTenancy} />
      <Route
        path="/register/tenancy/:tenancyID/approved"
        component={ApprovedTenantRimbo}
      />
      <Route path="/register/card/:randomID" component={StripeHandler} />
      <Route path="/404" component={Page404} />
      <Redirect to="/404" />
    </Switch>
  );
};

export default withNamespaces()(App);
