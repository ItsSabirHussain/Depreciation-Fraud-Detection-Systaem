export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW",
      },
    },
    {
      title: true,
      name: "Documents",
      wrapper: {
        element: "",
        attributes: {},
      },
      class: "",
    },
    {
      name: "Upload",
      url: "/upload",
      icon: "icon-drop",
    },
    {
      name: "Manage",
      url: "/manage",
      icon: "icon-pencil",
      children: [
        {
          name: "View All",
          url: "/manage/viewall",
          icon: "icon-puzzle",
        },
        {
          name: "View Specific",
          url: "/manage/viewspecific",
          icon: "icon-puzzle",
        },
      ],
    },
    {
      title: true,
      name: "Processing Data",
      wrapper: {
        element: "",
        attributes: {},
      },
      class: "",
    },
    {
      name: "Depreciation Report",
      url: "/depreciationreport",
      icon: "icon-puzzle",
      children: [
        {
          name: "Extract Documented",
          url: "/depreciationreport/extractdocumented",
          icon: "icon-puzzle",
        },
        {
          name: "Generate New",
          url: "/depreciationreport/generatenew",
          icon: "icon-puzzle",
        },
      ],
    },
    {
      name: "Salvage Report",
      url: "/salvagereport",
      icon: "icon-puzzle",
      children: [
        {
          name: "Extract Documented",
          url: "/salvagereport/extractdocumented",
          icon: "icon-puzzle",
        },
        {
          name: "Generate New",
          url: "/salvagereport/generatenew",
          icon: "icon-puzzle",
        },
      ],
    },
    {
      name: "Rates Report",
      url: "/ratesreport",
      icon: "icon-puzzle",
      children: [
        {
          name: "Extract Documented",
          url: "/ratesreport/extractdocumented",
          icon: "icon-puzzle",
        },
        {
          name: "Generate New",
          url: "/ratesreport/generatenew",
          icon: "icon-puzzle",
        },
      ],
    },
    {
      name: "Comparison Report",
      url: "/comparisonreport",
      icon: "icon-puzzle",
      children: [
        {
          name: "Depreciations",
          url: "/comparisonreport/depreciations",
          icon: "icon-puzzle",
        },
        {
          name: "Salvages",
          url: "/comparisonreport/salvages",
          icon: "icon-puzzle",
        },
        {
          name: "Rates",
          url: "/comparisonreport/rates",
          icon: "icon-puzzle",
        },
        {
          name: "Red Flags",
          url: "/comparisonreport/redflags",
          icon: "icon-puzzle",
        },
      ],
    },
  ],
};
