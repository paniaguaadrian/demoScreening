import SetDemo from "./setDemo";
import TenantContactDetails from "./tenant-contact-details";
import TenantPersonalDetails from "./tenant-personal-details";
import PropertyDetails from "./property-information";
import Completed from "./completed";

const FormSteps = (step, setStep, tenancy, setTenancy) => [
  {
    title: "Demo configuration",
    titleEs: "Configuración de la Demo",
    content: (
      <SetDemo
        setStep={setStep}
        step={step}
        tenancy={tenancy}
        setTenancy={setTenancy}
      />
    ),
  },
  {
    title: "Apartment Details",
    titleEs: "Detalles de la propiedad",
    content: (
      <PropertyDetails
        setStep={setStep}
        step={step}
        tenancy={tenancy}
        setTenancy={setTenancy}
      />
    ),
  },
  {
    title: "Tenant's contact information",
    titleEs: "Información de contacto del inquilino",
    content: (
      <TenantContactDetails
        setStep={setStep}
        step={step}
        tenancy={tenancy}
        setTenancy={setTenancy}
      />
    ),
  },
  {
    title: "Tenant's personal information",
    titleEs: "Información personal del inquilino",
    content: (
      <TenantPersonalDetails
        setStep={setStep}
        step={step}
        tenancy={tenancy}
        setTenancy={setTenancy}
      />
    ),
  },
  {
    title: "Listing Complete",
    content: <Completed tenancy={tenancy} />,
  },
];

export default FormSteps;
