import React from "react";

//Documents

//Upload
const Upload = React.lazy(() => import("./views/Documents/Upload/Upload"));

//Manage
const D_M_ViewSpecific = React.lazy(() =>
  import("./views/Documents/Manage/ViewSpecific")
);
const D_M_ViewAll = React.lazy(() =>
  import("./views/Documents/Manage/ViewAll")
);

//ProcessedData

//ComparisonReports
const PD_C_D_ViewAll = React.lazy(() =>
  import("./views/ProcessedData/ComparisonReports/Depreciations/ViewAll")
);
const PD_C_D_ViewSpecific = React.lazy(() =>
  import("./views/ProcessedData/ComparisonReports/Depreciations/ViewSpecific")
);
const PD_C_D_ViewSpecificAsset = React.lazy(() =>
  import(
    "./views/ProcessedData/ComparisonReports/Depreciations/ViewSpecificAsset"
  )
);

const PD_C_S_ViewAll = React.lazy(() =>
  import("./views/ProcessedData/ComparisonReports/Salvages/ViewAll")
);
const PD_C_S_ViewSpecific = React.lazy(() =>
  import("./views/ProcessedData/ComparisonReports/Salvages/ViewSpecific")
);
const PD_C_S_ViewSpecificAsset = React.lazy(() =>
  import("./views/ProcessedData/ComparisonReports/Salvages/ViewSpecificAsset")
);

const PD_C_R_ViewAll = React.lazy(() =>
  import("./views/ProcessedData/ComparisonReports/Rates/ViewAll")
);
const PD_C_R_ViewSpecific = React.lazy(() =>
  import("./views/ProcessedData/ComparisonReports/Rates/ViewSpecific")
);
const PD_C_R_ViewSpecificAsset = React.lazy(() =>
  import("./views/ProcessedData/ComparisonReports/Rates/ViewSpecificAsset")
);

const PD_C_RF_ViewAll = React.lazy(() =>
  import("./views/ProcessedData/ComparisonReports/RedFlags/ViewAll")
);
const PD_C_RF_ViewSpecific = React.lazy(() =>
  import("./views/ProcessedData/ComparisonReports/RedFlags/ViewSpecific")
);
const PD_C_RF_ViewSpecificAsset = React.lazy(() =>
  import("./views/ProcessedData/ComparisonReports/RedFlags/ViewSpecificAsset")
);

//DepreciationReports
const PD_DR_ViewAll = React.lazy(() =>
  import("./views/ProcessedData/DepreciationReports/ViewAll")
);
const PD_DR_ViewSpecific = React.lazy(() =>
  import("./views/ProcessedData/DepreciationReports/ViewSpecific")
);
const PD_DR_ViewSpecificAsset = React.lazy(() =>
  import("./views/ProcessedData/DepreciationReports/ViewSpecificAsset")
);

//SalvageReports
const PD_SR_ViewAll = React.lazy(() =>
  import("./views/ProcessedData/SalvageReports/ViewAll")
);
const PD_SR_ViewSpecific = React.lazy(() =>
  import("./views/ProcessedData/SalvageReports/ViewSpecific")
);
const PD_SR_ViewSpecificAsset = React.lazy(() =>
  import("./views/ProcessedData/SalvageReports/ViewSpecificAsset")
);

//RatesReports
const PD_RR_ViewAll = React.lazy(() =>
  import("./views/ProcessedData/RatesReports/ViewAll")
);
const PD_RR_ViewSpecific = React.lazy(() =>
  import("./views/ProcessedData/RatesReports/ViewSpecific")
);
const PD_RR_ViewSpecificAsset = React.lazy(() =>
  import("./views/ProcessedData/RatesReports/ViewSpecificAsset")
);

//ProcessingData

//ComparisonReports
const P_C_Depreciations = React.lazy(() =>
  import("./views/ProcessingData/ComparisonReport/Depreciations")
);
const P_C_Salvages = React.lazy(() =>
  import("./views/ProcessingData/ComparisonReport/Salvages")
);
const P_C_Rates = React.lazy(() =>
  import("./views/ProcessingData/ComparisonReport/Rates")
);
const P_C_RedFlags = React.lazy(() =>
  import("./views/ProcessingData/ComparisonReport/RedFlags")
);

//DepreciationReport
const P_D_ExtractDocumented = React.lazy(() =>
  import("./views/ProcessingData/DepreciationReport/ExtractDocumented")
);
const P_D_GenerateNew = React.lazy(() =>
  import("./views/ProcessingData/DepreciationReport/GenerateNew")
);

//SalvageReport
const P_S_ExtractDocumented = React.lazy(() =>
  import("./views/ProcessingData/SalvageReport/ExtractDocumented")
);
const P_S_GenerateNew = React.lazy(() =>
  import("./views/ProcessingData/SalvageReport/GenerateNew")
);

//RatesReport
const P_R_ExtractDocumented = React.lazy(() =>
  import("./views/ProcessingData/RatesReport/ExtractDocumented")
);
const P_R_GenerateNew = React.lazy(() =>
  import("./views/ProcessingData/RatesReport/GenerateNew")
);

const Dashboard = React.lazy(() => import("./views/Dashboard"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },

  //Document

  //Upload
  { path: "/upload", exact: true, name: "Upload", component: Upload },

  //Manage

  //ViewAll
  { path: "/manage/viewall", name: "D_M_ViewAll", component: D_M_ViewAll },
  //ViewSpecific
  {
    path: "/manage/viewspecific",
    name: "D_M_ViewSpecific",
    component: D_M_ViewSpecific,
  },

  //PorcessedData

  //ComparisonReports

  //Depreciations
  {
    path: "/comparisonreports/depreciations/viewall",
    name: "PD_C_D_ViewAll",
    component: PD_C_D_ViewAll,
  },
  {
    path: "/comparisonreports/depreciations/viewspecific",
    name: "PD_C_D_ViewSpecific",
    component: PD_C_D_ViewSpecific,
  },
  {
    path: "/comparisonreports/depreciations/viewspecificasset",
    name: "PD_C_D_VewSpecificAsset",
    component: PD_C_D_ViewSpecificAsset,
  },
  //Salvages
  {
    path: "/comparisonreports/salvages/viewall",
    name: "PD_C_S_ViewAll",
    component: PD_C_S_ViewAll,
  },
  {
    path: "/comparisonreports/salvages/viewspecific",
    name: "PD_C_S_ViewSpecific",
    component: PD_C_S_ViewSpecific,
  },
  {
    path: "/comparisonreports/salvages/viewspecificasset",
    name: "PD_C_S_VewSpecificAsset",
    component: PD_C_S_ViewSpecificAsset,
  },

  //Rates
  {
    path: "/comparisonreports/rates/viewall",
    name: "PD_C_R_ViewAll",
    component: PD_C_R_ViewAll,
  },
  {
    path: "/comparisonreports/rates/viewspecific",
    name: "PD_C_R_ViewSpecific",
    component: PD_C_R_ViewSpecific,
  },
  {
    path: "/comparisonreports/rates/viewspecificasset",
    name: "PD_C_R_VewSpecificAsset",
    component: PD_C_R_ViewSpecificAsset,
  },

  //RedFlags
  {
    path: "/comparisonreports/redflags/viewall",
    name: "PD_C_RF_ViewAll",
    component: PD_C_RF_ViewAll,
  },
  {
    path: "/comparisonreports/redflags/viewspecific",
    name: "PD_C_RF_ViewSpecific",
    component: PD_C_RF_ViewSpecific,
  },
  {
    path: "/comparisonreports/redflags/viewspecificasset",
    name: "PD_C_RF_VewSpecificAsset",
    component: PD_C_RF_ViewSpecificAsset,
  },

  //DepreciationReports

  //ViewAll
  {
    path: "/depreciationreports/viewall",
    name: "PD_DR_ViewAll",
    component: PD_DR_ViewAll,
  },
  //ViewSpecific
  {
    path: "/depreciationreports/viewspecific",
    name: "PD_DR_ViewSpecific",
    component: PD_DR_ViewSpecific,
  },
  //ViewSpecificAsset
  {
    path: "/depreciationreports/viewspecificasset",
    name: "PD_DR_ViewSpecificAsset",
    component: PD_DR_ViewSpecificAsset,
  },

  //SalvageReports

  //ViewAll
  {
    path: "/salvagereports/viewall",
    name: "PD_SR_ViewAll",
    component: PD_SR_ViewAll,
  },
  //ViewSpecific
  {
    path: "/salvagereports/viewspecific",
    name: "PD_SR_ViewSpecific",
    component: PD_SR_ViewSpecific,
  },
  //ViewSpecificAsset
  {
    path: "/salvagereports/viewspecificasset",
    name: "PD_SR_ViewSpecificAsset",
    component: PD_SR_ViewSpecificAsset,
  },

  //RatesReports

  //ViewAll
  {
    path: "/ratesreports/viewall",
    name: "PD_RR_ViewAll",
    component: PD_RR_ViewAll,
  },
  //ViewSpecific
  {
    path: "/ratesreports/viewspecific",
    name: "PD_RR_ViewSpecific",
    component: PD_RR_ViewSpecific,
  },
  //ViewSpecificAsset
  {
    path: "/ratesreports/viewspecificasset",
    name: "PD_RR_ViewSpecificAsset",
    component: PD_RR_ViewSpecificAsset,
  },

  //Porcessing Data

  //ComparisonReport

  //Depreciations
  {
    path: "/comparisonreport/depreciations",
    name: "P_C_Depreciations",
    component: P_C_Depreciations,
  },
  //Salvages
  {
    path: "/comparisonreport/salvages",
    name: "P_C_Salvages",
    component: P_C_Salvages,
  },
  //Rates
  { path: "/comparisonreport/rates", name: "P_C_Rates", component: P_C_Rates },
  //Rates
  {
    path: "/comparisonreport/redflags",
    name: "P_C_RedFlags",
    component: P_C_RedFlags,
  },

  //DepreciationReport

  //ExtractDocumented
  {
    path: "/depreciationreport/extractdocumented",
    name: "P_D_ExtractDocumented",
    component: P_D_ExtractDocumented,
  },
  //GenerateNew
  {
    path: "/depreciationreport/generatenew",
    name: "P_D_GenerateNew",
    component: P_D_GenerateNew,
  },

  //SalvageReport

  //ExtractDocumented
  {
    path: "/salvagereport/extractdocumented",
    name: "P_S_ExtractDocumented",
    component: P_S_ExtractDocumented,
  },
  //GenerateNew
  {
    path: "/salvagereport/generatenew",
    name: "P_S_GenerateNew",
    component: P_S_GenerateNew,
  },

  //RatesReport

  //ExtractDocumented
  {
    path: "/ratesreport/extractdocumented",
    name: "P_R_ExtractDocumented",
    component: P_R_ExtractDocumented,
  },
  //GenerateNew
  {
    path: "/ratesreport/generatenew",
    name: "P_R_GenerateNew",
    component: P_R_GenerateNew,
  },
];

export default routes;
