import React, { useState } from "react";

import Button from "../components/Button";
import GroupedRowTable from "../components/GroupedRowTable";
import ContactTable from "../components/ContactTable";

const MyApp = () => {
  const [btn, setBtn] = useState("");
  return (
    <div id="wrapper" className="container mx-auto my-6 max-w-7xl sm:px-6 lg:px-8 columns-2 flex flex-col bg-red-100">
      <div id="panelHeader" className="h-[10%] min-w-full mx-auto max-w-7xl bg-yellow-200"><p className="font-serif text-xl text-center text-transform: uppercase text-slate-700">Worksheets</p></div>
      <div id= "worksheetsContainer" className="h-[80%] w-full columns-2 flex flex-row bg-green-200">
        <div id="sidePanel" className="w-auto bg-blue-400" >
          <GroupedRowTable/>
        </div>
        <div id="mainPanel" className="container px-2 columns-3 flex flex-col bg-orange-400">
          <div id="customerinfo" className="container columns-3 flex flex-row gap-2 justify-between bg-slate-500">
            <ContactTable/>
            <ContactTable/>
            <ContactTable/>
          </div>
          <div id="mainPanelHeader" className="container mx-auto px-2 bg-gray-200">General Janitorial</div>
          <div id="mainPanelWorksheet" className="container mx-auto px-2 bg-slate-600">
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApp;
