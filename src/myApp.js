import React, { useState } from "react";

import Button from "../components/Button";
import GroupedRowTable from "../components/GroupedRowTable";
import ContactTable from "../components/ContactTable";
import EmailTable from "../components/EmailTable";
import PhoneTable from "../components/PhoneTable";
import WorksheetTable from "../components/WorksheetTable";
import WorksheetHeader from "../components/WorksheetHeader";
import SideBar from "../components/SideBarAccordian";

const MyApp = () => {
  const [btn, setBtn] = useState("");
  return (
    <div id="wrapper" className="container mx-auto my-6 max-w-7xl sm:px-6 lg:px-8 columns-2 flex flex-col">
      <div id="panelHeader" className="h-[10%] min-w-full mx-auto max-w-7xl "><p className="font-serif text-xl text-center text-transform: uppercase text-slate-700">Worksheets</p></div>
      <div id= "worksheetsContainer" className="w-full columns-2 flex flex-row">
        <div id="sidePanel" className="w-auto bg-white" >
          <SideBar/>
        </div>
        <div id="mainPanel" className="container columns-3 flex flex-col">
          <div id="customerinfo" className="container columns-3 flex flex-row gap-2 justify-between">
            <ContactTable/>
            <EmailTable/>
            <PhoneTable/>
          </div>
          <div id="mainPanelHeader" className="container mx-auto p-4 bg-gray-100">
            <WorksheetHeader/>
          </div>
          <div id="mainPanelWorksheet" className="container mx-auto bg-slate-600">
            <WorksheetTable/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApp;
