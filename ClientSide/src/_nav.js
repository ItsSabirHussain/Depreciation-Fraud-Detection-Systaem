export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Documents',
      wrapper: {            
        element: '',        
        attributes: {}        
      },
      class: ''             
    },
    {
      name: 'Upload',
      url: '/upload',
      icon: 'icon-drop',
    },
    {
      name: 'Manage',
      url: '/manage',
      icon: 'icon-pencil',
      children: [
        {
        name: 'View All',
        url: '/manage/viewall',
        icon: 'icon-puzzle',
      },
      {
        name: 'View Specific',
        url: '/manage/viewspecific',
        icon: 'icon-puzzle',
      },],
    },
    {
      title: true,
      name: 'Processing Data',
      wrapper: {            
        element: '',        
        attributes: {}        
      },
      class: ''             
    },
        {
        name: 'Depreciation Report',
        url: '/depreciationreport',
        icon: 'icon-puzzle',
        children: [{
          name: 'Extract Documented',
          url: '/depreciationreport/extractdocumented',
          icon: 'icon-puzzle',
        },
        {
          name: 'Generate New',
          url: '/depreciationreport/generatenew',
          icon: 'icon-puzzle',
        },]
      },
      {
        name: 'Salvage Report',
        url: '/salvagereport',
        icon: 'icon-puzzle',
        children: [{
          name: 'Extract Documented',
          url: '/salvagereport/extractdocumented',
          icon: 'icon-puzzle',
        },
        {
          name: 'Generate New',
          url: '/salvagereport/generatenew',
          icon: 'icon-puzzle',
        },]
      },
      {
        name: 'Rates Report',
        url: '/ratesreport',
        icon: 'icon-puzzle',
        children: [{
          name: 'Extract Documented',
          url: '/ratesreport/extractdocumented',
          icon: 'icon-puzzle',
        },
        {
          name: 'Generate New',
          url: '/ratesreport/generatenew',
          icon: 'icon-puzzle',
        },]
      },
      {
        name: 'Comparison Report',
        url: '/comparisonreport',
        icon: 'icon-puzzle',
        children: [{
          name: 'Depreciations',
          url: '/comparisonreport/depreciations',
          icon: 'icon-puzzle',
        },
        {
          name: 'Salvages',
          url: '/comparisonreport/salvages',
          icon: 'icon-puzzle',
        },
        {
          name: 'Rates',
          url: '/comparisonreport/rates',
          icon: 'icon-puzzle',
        },
        {
          name: 'Red Flags',
          url: '/comparisonreport/redflags',
          icon: 'icon-puzzle',
        },]
      },
      {
        title: true,
        name: 'Processed Data',
        wrapper: {            
          element: '',        
          attributes: {}        
        },
        class: ''             
      },
      {
        name: 'Depreciation Reports',
        url: '/depreciationreports',
        icon: 'icon-puzzle',
        children: [{
          name: 'View All',
          url: '/depreciationreports/viewall',
          icon: 'icon-puzzle',
        },
        {
          name: 'View Specific',
          url: '/depreciationreports/viewspecific',
          icon: 'icon-puzzle',
        },
        {
          name: 'View Specific Asset',
          url: '/depreciationreports/viewspecificasset',
          icon: 'icon-puzzle',
        },]
      },
      {
        name: 'Salvage Reports',
        url: '/salvagereports',
        icon: 'icon-puzzle',
        children: [{
          name: 'View All',
          url: '/salvagereports/viewall',
          icon: 'icon-puzzle',
        },
        {
          name: 'View Specific',
          url: '/salvagereports/viewspecific',
          icon: 'icon-puzzle',
        },
        {
          name: 'View Specific Asset',
          url: '/salvagereports/viewspecificasset',
          icon: 'icon-puzzle',
        },]
      },
      {
        name: 'Rates Reports',
        url: '/ratesreports',
        icon: 'icon-puzzle',
        children: [{
          name: 'View All',
          url: '/ratesreports/viewall',
          icon: 'icon-puzzle',
        },
        {
          name: 'View Specific',
          url: '/ratesreports/viewspecific',
          icon: 'icon-puzzle',
        },
        {
          name: 'View Specific Asset',
          url: '/ratesreports/viewspecificasset',
          icon: 'icon-puzzle',
        },]
      },
      {
        name: 'Comparison Reports',
        url: '/comparisonreports',
        icon: 'icon-puzzle',
        children: [{
          name: 'Depreciations',
          url: '/comparisonreports/depreciations',
          icon: 'icon-puzzle',
          children: [{
            name: 'View All',
            url: '/comparisonreports/depreciations/viewall',
            icon: 'icon-puzzle',
          },
          {
            name: 'View Specific',
            url: '/comparisonreports/depreciations/viewspecific',
            icon: 'icon-puzzle',
          },
          {
            name: 'View Specific Asset',
            url: '/comparisonreports/depreciations/viewspecificasset',
            icon: 'icon-puzzle',
          },]
        },
        {
          name: 'Salvages',
          url: '/comparisonreports/salvages',
          icon: 'icon-puzzle',
          children: [{
            name: 'View All',
            url: '/comparisonreports/salvages/viewall',
            icon: 'icon-puzzle',
          },
          {
            name: 'View Specific',
            url: '/comparisonreports/salvages/viewspecific',
            icon: 'icon-puzzle',
          },
          {
            name: 'View Specific Asset',
            url: '/comparisonreports/salvages/viewspecificasset',
            icon: 'icon-puzzle',
          },]
        },
        {
          name: 'Rates',
          url: '/comparisonreports/rates',
          icon: 'icon-puzzle',
          children: [{
            name: 'View All',
            url: '/comparisonreports/rates/viewall',
            icon: 'icon-puzzle',
          },
          {
            name: 'View Specific',
            url: '/comparisonreports/rates/viewspecific',
            icon: 'icon-puzzle',
          },
          {
            name: 'View Specific Asset',
            url: '/comparisonreports/rates/viewspecificasset',
            icon: 'icon-puzzle',
          },]
        },
        {
          name: 'Red Flags',
          url: '/comparisonreports/redflags',
          icon: 'icon-puzzle',
          children: [{
            name: 'View All',
            url: '/comparisonreports/redflags/viewall',
            icon: 'icon-puzzle',
          },
          {
            name: 'View Specific',
            url: '/comparisonreports/redflags/viewspecific',
            icon: 'icon-puzzle',
          },
          {
            name: 'View Specific Asset',
            url: '/comparisonreports/redflags/viewspecificasset',
            icon: 'icon-puzzle',
          },]
        },]
      },
    ],
};
