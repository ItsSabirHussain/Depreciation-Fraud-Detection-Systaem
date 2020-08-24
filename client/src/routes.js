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
