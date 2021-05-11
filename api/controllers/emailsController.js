import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import hbs from "nodemailer-express-handlebars";

// ? =======>  SPANISH VERSION START ==============================>

// ! F1SC Form => E2TT (email to Tenant) E1SC (email to Agency)
const sendF1SCFormEmails = async (req, res) => {
  const {
    agencyName,
    agencyEmailPerson,
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    monthlyNetIncome,
    jobType,
    documentImageFront,
    documentImageBack,
    randomID,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
    rentalAddress,
    room,
  } = req.body;

  const transporterE2TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterE1SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2TTEmail",
    },
    viewPath: "views/",
  };

  let optionsE1SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1SCEmail",
    },
    viewPath: "views/",
  };

  transporterE2TT.use("compile", hbs(optionsE2TT));
  transporterE1SC.use("compile", hbs(optionsE1SC));

  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // tenants Email
    subject: "Bienvenido a la revolución de los depósitos",
    template: "E2TTEmail",
    context: {
      tenantsName,
      tenantsEmail,
      randomID,
      agencyName,
      rentalAddress,
      room,
      tenancyID,
      rentStartDate,
      rentEndDate,
    },
  };

  const AgencyEmail = {
    from: "Rimbo info@rimbo.rent",
    to: agencyEmailPerson, // Agency Email
    subject: "Registro de inquilino correcto",
    template: "E1SCEmail",
    context: {
      agencyName,
      agencyEmailPerson,
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      rentalAddress,
      room,
    },
  };

  transporterE2TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE1SC.sendMail(AgencyEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! F2SC Form => E3 (tenant, Agency)
const sendF2SCFormEmails = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    agencyName,
    agencyEmailPerson,
    rentalAddress,
    rentStartDate,
    rentEndDate,
  } = req.body;

  const transporterE3TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE3TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3TTEmail",
    },
    viewPath: "views/",
  };
  let optionsE3SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3SCEmail",
    },
    viewPath: "views/",
  };

  transporterE3TT.use("compile", hbs(optionsE3TT));
  transporterE3SC.use("compile", hbs(optionsE3SC));

  // Tenant Email
  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // Tenant Email
    subject: `Bienvenido a ${agencyName} & Rimbo`,
    template: "E3TTEmail",
    context: {
      tenantsName,
      tenantsEmail,
      agencyName,
      rentalAddress,
      rentStartDate,
      rentEndDate,
    },
  };
  // Agency Email
  const AgencyEmail = {
    from: "Rimbo info@rimbo.rent",
    to: agencyEmailPerson, // Agency Email
    subject: `${tenantsName} Tarjeta registrada correctamente`,
    template: "E3SCEmail",
    context: {
      tenantsName,
      tenantsEmail,
      agencyName,
      rentalAddress,
      rentStartDate,
      rentEndDate,
    },
  };

  transporterE3TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3SC.sendMail(AgencyEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ? =======>  SPANISH VERSION END ==============================>

////////////////////////////////////////////////////////////////

// ? =======>  ENGLISH VERSION START ==============================>

// ! F1SC Form => E2TT (email to Tenant) E1SC (email to Agency)
const sendF1SCFormEmailsEn = async (req, res) => {
  const {
    agencyName,
    agencyEmailPerson,
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    tenantsAddress,
    tenantsZipCode,
    documentType,
    documentNumber,
    monthlyNetIncome,
    jobType,
    documentImageFront,
    documentImageBack,
    randomID,
    rentAmount,
    rentStartDate,
    rentEndDate,
    tenancyID,
    rentalAddress,
    room,
  } = req.body;

  const transporterE2TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterE1SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE2TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E2TTEmailEn",
    },
    viewPath: "views/",
  };

  let optionsE1SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E1SCEmailEn",
    },
    viewPath: "views/",
  };

  transporterE2TT.use("compile", hbs(optionsE2TT));
  transporterE1SC.use("compile", hbs(optionsE1SC));

  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // Rimbo Email
    subject: "Welcome to the deposit revolution",
    template: "E2TTEmailEn",
    context: {
      tenantsName,
      tenantsEmail,
      randomID,
      agencyName,
      rentalAddress,
      room,
      tenancyID,
      rentStartDate,
      rentEndDate,
    },
  };

  const AgencyEmail = {
    from: "Rimbo info@rimbo.rent",
    to: agencyEmailPerson, // Agency Email
    subject: "Tenant successfully registered",
    template: "E1SCEmailEn",
    context: {
      agencyName,
      agencyEmailPerson,
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      tenantsAddress,
      tenantsZipCode,
      documentType,
      documentNumber,
      monthlyNetIncome,
      jobType,
      documentImageFront,
      documentImageBack,
      randomID,
      rentAmount,
      rentStartDate,
      rentEndDate,
      tenancyID,
      rentalAddress,
      room,
    },
  };

  transporterE2TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE1SC.sendMail(AgencyEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! F2SC Form => E3 (tenant, Agency)
const sendF2SCFormEmailsEn = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    agencyName,
    agencyEmailPerson,
    rentalAddress,
    rentStartDate,
    rentEndDate,
  } = req.body;

  const transporterE3TT = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  const transporterE3SC = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsE3TT = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3TTEmailEn",
    },
    viewPath: "views/",
  };
  let optionsE3SC = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "E3SCEmailEn",
    },
    viewPath: "views/",
  };

  transporterE3TT.use("compile", hbs(optionsE3TT));
  transporterE3SC.use("compile", hbs(optionsE3SC));

  // Tenant Email
  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // Tenant Email
    subject: `Welcome to ${agencyName} & Rimbo`,
    template: "E3TTEmailEn",
    context: {
      tenantsName,
      tenantsEmail,
      agencyName,
      rentalAddress,
      rentStartDate,
      rentEndDate,
    },
  };
  // Agency Email
  const AgencyEmail = {
    from: "Rimbo info@rimbo.rent",
    to: agencyEmailPerson, // Agency Email
    subject: `${tenantsName} Card successfully registered`,
    template: "E3SCEmailEn",
    context: {
      tenantsName,
      tenantsEmail,
      agencyName,
      rentalAddress,
      rentStartDate,
      rentEndDate,
    },
  };

  transporterE3TT.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterE3SC.sendMail(AgencyEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};
// ? =======> ENGLISH VERSION END ==============================>

export {
  sendF1SCFormEmails,
  sendF2SCFormEmails,
  sendF1SCFormEmailsEn,
  sendF2SCFormEmailsEn,
};
