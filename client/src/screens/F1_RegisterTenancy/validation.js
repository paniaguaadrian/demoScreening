export const isProperty = (values) => {
  let errors = {};

  if (!values.room) {
    errors.room = "Enter a room for the tenant.";
  }

  if (!values.rentAmount) {
    errors.rentAmount = "Monthly Rent is required.";
  }

  if (!values.rentStartDate) {
    errors.rentStartDate = "Choose a rent start date";
  }

  if (!values.rentEndDate) {
    errors.rentEndDate = "Choose a rent end date";
  }

  return errors;
};

export const isTenant = (values) => {
  let errors = {};
  if (!values.tenantName) {
    errors.tenantName = "Tenant name is required";
  }
  if (!values.tenantPhone) {
    errors.tenantPhone = "Phone number is required";
  }
  if (values.tenantPhone && values.tenantPhone.length < 9) {
    errors.tenantPhone = "Enter valid phone number";
  }
  if (!values.tenantEmail) {
    errors.tenantEmail = "Tenant email address is required";
  } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.tenantEmail = "Email address is invalid";
  }
  return errors;
};

export const isMoreTenant = (values) => {
  let errors = {};

  if (!values.monthlyNetIncome) {
    errors.monthlyNetIncome = "Monthly net income is required";
  }

  if (!values.jobType) {
    errors.jobType = "Job type is required";
  }

  if (!values.documentType) {
    errors.documentType = "Document Type is required";
  }

  if (!values.documentNumber) {
    errors.documentNumber = "Document number is required";
  }

  if (values.documentNumber && values.documentNumber.length < 8) {
    errors.tenadocumentNumberntPhone = "Enter valid document number";
  }

  return errors;
};
