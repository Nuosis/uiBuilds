
/*
const custEmail = [
  { label: 'Main', address: 'mspsi@me.com', ID: 'UUID1' },
  { label: 'Alt', address: 'me@you.com', ID: 'UUID2'  },
  { label: 'Bob', address: 'bob@you.com', ID: 'UUID3'  },
  // More people...
  ]

const custRelated = [
    { name: 'Lindsay Walton', role: 'Primary Contact', ID: 'UUID1' },
    { name: 'Tom Steele', role: 'Owner', ID: 'UUID2'  },
    { name: 'Jenn Wright', role: 'Secondary Contact', ID: 'UUID3'  },
    // More people...
  ]

const custPhones = [
      { label: 'Main', number: '(778) 678-3674', ID: 'UUID1' },
      { label: 'Work', number: '(250) 360-0666', ID: 'UUID2'  },
      { label: 'Sherry', number: '(604) 256-2243', ID: 'UUID3'  },
  ]

const worksheets = [
  { name: 'Worksheets', href: '#', current: true },
  {
      name: 'Active',
      current: true,
      children: [
      { name: 'General Janitorial 2021', href: '#', ID: "UUID9" },
      { name: 'Periodic Tasks', href: '#', ID: "UUID10" },
      ],
  },
  {
      name: 'Inactive',
      current: false,
      children: [
      { name: 'General Janitorial', href: '#', ID: "UUID11" },
      ],
  },
]

const worksheet = {
  ID: "UUID9",
  org: "UUID1", // the current getOrg state
  contractOrg: "UUID1", // eg Select Janitorial UUID
  name: "General Janitorial 2021",
  startDate: "Aug 01, 2021",
  endDate: null,
  provider: "Preferred Workforce Management Services",
  providerStartDate: "Jul 28, 2021",
  providerID: "UUID2",
  cleaner: "Aiza Parez",
  cleanerStartDate: "Jul 28, 2021",
  cleanerID: "UUID3",
  contractValue: 577.42,
  providerValue: 493.69,
  cleanerValue: 370.27
};

const worksheetRecords = [
  { area: 'Main', frequency: 'Weekly: Tuesday, Friday', rate: '30.75', eot: '24 min', ID: 'UUID1' },
  { area: 'Stairwell', frequency: 'Weekly: Tuesday, Friday', rate: '30.75', eot: '3 min', ID: 'UUID2'  },
  { area: 'Kitchen', frequency: 'Weekly: Tuesday, Friday', rate: '30.75', eot: '27 min', ID: 'UUID3'  },
  { area: 'Kitchen', frequency: 'Weekly: Tuesday, Friday', rate: '30.75', eot: '27 min', ID: 'UUID4'  },
  { area: 'Kitchen', frequency: 'Weekly: Tuesday, Friday', rate: '30.75', eot: '27 min', ID: 'UUID5'  },
  { area: 'Kitchen', frequency: 'Weekly: Tuesday, Friday', rate: '30.75', eot: '27 min', ID: 'UUID6'  },
  { area: 'Kitchen', frequency: 'Weekly: Tuesday, Friday', rate: '30.75', eot: '27 min', ID: 'UUID7'  },
  ]
  */

import React, { useState, useEffect } from "react";
import ContactTable from "../components/ContactTable";
import EmailTable from "../components/EmailTable";
import PhonesTable from "../components/PhonesTable";
import WorksheetTable from "../components/WorksheetTable";
import WorksheetHeader from "../components/WorksheetHeader";
import SideBar from "../components/SideBarAccordian";
import transformData from "./transformData";
import ShowTime from "../components/SlideOut";

const MyApp = ({data}) => {
  // console.log(data)
  const json = JSON.parse(data);
  // console.log(json)
  const custObj = json.custObj;
  const wsArray = json.wsArray;
  const currentState = json.currentState;
  const wsData = transformData(custObj, currentState, wsArray);
  const custEmail = wsData.emails;
  const custRelated = wsData.people;
  const custPhones = wsData.phones;
  const worksheets = wsData.navigation;
  const worksheet = wsData.worksheet;
  const worksheetRecords = wsData.worksheetRecords;
  const [wsInfo, setWsInfo] = useState(worksheet);
  // console.log(wsInfo);
  const [records, setRecords] = useState(worksheetRecords);
  const [selectedWorksheetID, setSelectedWorksheetID] = useState(worksheet.ID);
  const [open, setOpen] = useState(false); // for side panel open/closed state

  useEffect(() => {
    // Fetch new worksheet data, update state, etc.
    // This will re-render the associated components.
    const newWsData = transformData(custObj, currentState, wsArray);
    setWsInfo(newWsData.worksheet);
    setRecords(newWsData.worksheetRecords);
  }, [selectedWorksheetID]);

  return (
    <div id="wrapper" className="container mx-auto max-w-7xl sm:px-6 lg:px-8 columns-2 flex flex-col">
      <div id="panelHeader" className="min-h-max min-w-full mx-auto max-w-7xl "><p className="font-serif text-xl text-center text-transform: uppercase text-slate-700">Worksheets</p></div>
      <div id= "worksheetsContainer" className="w-full pt-2 columns-2 flex flex-row">
        <div id="sidePanel" className="w-auto bg-white" >
          <SideBar navigation = {worksheets} selectedWorksheetID={selectedWorksheetID} setSelectedWorksheetID={setSelectedWorksheetID}/>
        </div>
        <div id="mainPanel" className="container columns-3 flex flex-col">
          <div id="customerinfo" className="container columns-3 flex flex-row gap-2 justify-between">
            <ContactTable people = {custRelated}/>
            <PhonesTable phones = {custPhones}/>
            <EmailTable email = {custEmail}/>
          </div>
          <div id="mainPanelHeader" className="container mx-auto p-4 bg-gray-100">
            <WorksheetHeader wsInfo={wsInfo} open={open} setOpen={setOpen}/>
          </div>
          <div id="mainPanelWorksheet" className="container mx-auto bg-slate-600">
            <WorksheetTable records={records} setRecords={setRecords}/>
          </div>
        </div>
        <div>
          <ShowTime wsInfo={wsInfo} setWsInfo={setWsInfo} open={open} setOpen={setOpen}/>
        </div>
      </div>
    </div>
  );
};

export default MyApp;

