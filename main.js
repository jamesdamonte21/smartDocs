function deselect() {
  gridOptions.api.deselectAll();
}

class StatusCellRenderer {
  init(params) {
    this.eGui = document.createElement("div");
    this.eGui.innerHTML = `${params.value.name}`;
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    return false;
  }
}

const SimpleComp = params => "<span class='material-icons' style='margin-top:8px;color:#333'>picture_as_pdf</span>"


// The expanded row details area
class DetailCellRenderer {
  init(params) {
    this.eGui = document.createElement("div");
    this.eGui.innerHTML =
      '<h2 style="padding: 20px;">Certificate Details for UL-US-L19189-31--90011391-0</h2><button type="button" style="float:right;margin-right:2rem;min-height:2rem;">Documents quick look</button><br><h3 style="margin-left:5rem;">Details info goes down here...</h3>';
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    return false;
  }
}
// Grid Options are properties passed to the grid
const gridOptions = {
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    filter: true,
    sortable: true,
    resizable: true,
    floatingFilter: true, 
  },

  sideBar: {
    toolPanels: [
      {
        id: "filters",
        labelDefault: "Filters",
        labelKey: "filters",
        iconKey: "filter",
        toolPanel: "agFiltersToolPanel",
        minWidth: 180,
        maxWidth: 400,
        width: 250,
      },
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        minWidth: 225,
        maxWidth: 225,
        width: 225,
      },
    ],
    position: "left", //Change position of tool panels from right to left
    defaultToolPanel: "filters",
  },
  enableRangeSelection: true,
  /*   rowSelection: "multiple", */
  statusBar: {
    statusPanels: [
      { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
      /*  { statusPanel: 'agTotalRowCountComponent', align: 'center' }, */
      { statusPanel: "agFilteredRowCountComponent" },
      { statusPanel: "agSelectedRowCountComponent", align: "left" },
      { statusPanel: "agAggregationComponent" },
    ],
  },

  // each entry here represents one column
  columnDefs: [
    { field: "", cellRenderer: SimpleComp,
    suppressFiltersToolPanel: true,
     maxWidth: 60
     },
   /*  {
      field: "status",
      resizable: true,
      filter: "agMultiColumnFilter",
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      cellRenderer: "agGroupCellRenderer",
      cellStyle: function (params) {
        if (params.value == "Expired") {
          return {
            color: "white",
            backgroundColor: "rgba(119, 136, 153, 1)",
            
            
          };
        }

        if (params.value == "Active") {
          return {
            color: "#4C9E45",
            backgroundColor: "rgba(76, 158, 69, 0.3)",
          };
        }

        if (params.value == "Withdrawn") {
          return {
            color: "#778899",
            backgroundColor: "rgba(119, 136, 153, 0.3)",
          };
        } else {
          return null;
        }
      },
    },
 */

    {
      field: "name",
      resizable: true,
      editable: true,
      width: 850,
      suppressSizeToFit: true,
      filter: "agMultiColumnFilter",
      cellRenderer: function (params) {
        return '<a href="#" target="_blank">' + params.value + "</a>";
      },
    },
    { field: "posted", resizable: true, filter: "agDateColumnFilter" },

    {
      field: "linkedProduct",
      resizable: true,
      filter: "agTextColumnFilter",
        floatingFilter: true,
   
    },
   
    {
      field: "scheme",
      resizable: true,
      filter: "agMultiColumnFilter",
      editable: true,
    },
    {
      field: "partySiteNoPSN",
      resizable: true,
      filter: "agNumberColumnFilter",
      suppressMenu: true,
      filter:true,
      floatingFilter: true,
    },
    
    {
      field: "managedBy",
      resizable: true,
      chartDataType: "category",
      filter: "agMultiColumnFilter",

    
      cellStyle: function (params) {
        if (params.value == "Self Managed") {
          return {
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
          };
        } else {
          return null;
        }
      },
    },
    {
      field: "withdrawn date",
      resizable: true,
      filter: "agDateColumnFilter",
      editable: true,
    },
    { field: "revision date", resizable: true, filter: "agDateColumnFilter" },
    { field: "issued date", resizable: true, filter: "agDateColumnFilter" },
    { field: "expiration date", resizable: true, filter: "agDateColumnFilter" },

    {
      field: "actions",
      suppressFiltersToolPanel: true,
      cellRenderer: (p) => '<a href="http://www.ul.com">View</a>',
    },
  ],

  // default col def properties get applied to all columns
  defaultColDef: {
    flex: 1,
    sortable: true,
    minWidth: 120,
    filter: true,
    filter: "agDateColumnFilter",
    enableValue: true,
    enablePivot: true,
    enableRowGroup: true,
    getDetailRowData: (params) => {
      params.successCallback(params.data.callRecords);
    },
    template:
      '<div style="height: 100%; background-color: #edf6ff; padding: 20px; box-sizing: border-box;">' +
      '  <div style="height: 10%; padding: 2px; font-weight: bold;">###### Call Details</div>' +
      '  <div ref="eDetailGrid" style="height: 90%;"></div>' +
      '</div>',
    /* filterParams: {
      buttons: ["apply", "clear", "cancel", "reset"],
    }, */
    animateRows: true,
    /* floatingFilter: true, */
    onFirstDataRendered: onFirstDataRendered,
  },
  
  masterDetail: true,
  detailCellRenderer: DetailCellRenderer,
  rowGroupPanelShow: "always",
  rowSelection: "multiple", // allow rows to be selected
  animateRows: true, // have rows animate to new positions when sorted

  // example event handler
  onCellClicked: (params) => {
    console.log("cell was clicked", params);
  },
};
function sizeToFit() {
  gridOptions.api.sizeColumnsToFit();
}
function onFirstDataRendered(params) {
  params.api.forEachNode(function (node) {
    node.setExpanded(node.id === "1");
  });
}

function onFilterTextBoxChanged() {
  gridOptions.api.setQuickFilter(
    document.getElementById('filter-text-box').value
  );
}

function onPrintQuickFilterTexts() {
  gridOptions.api.forEachNode(function (rowNode, index) {
    console.log(
      'Row ' +
        index +
        ' quick filter text is ' +
        rowNode.quickFilterAggregateText
    );
  });
}
// get div to host the grid
const eGridDiv = document.getElementById("myGrid");
// new grid instance, passing in the hosting DIV and Grid Options
new agGrid.Grid(eGridDiv, gridOptions);

// Fetch data from server
fetch('./certificates.json')
  .then((response) => response.json())
  .then((data) => {
    // load fetched data into grid
    gridOptions.api.setRowData(data);
  });
