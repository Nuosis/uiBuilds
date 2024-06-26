
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
import ContactTable from "./ContactTable";
import EmailTable from "./EmailTable";
import PhonesTable from "./PhonesTable";
import MainTable from "./MainTable";
import MainTableHeader from "./MainTableHeader";
import SideBar from "./SideBarAccordian";
import transformData from "../src/transformData";
import ShowTime from "./SlideOut";
import RecordEdit from "./slideOutRecordEdit";

const WorksheetsDom = ({data}) => {
  //console.log('wsDomDataInit',data)
  const json = data;
  //console.log(json)
  const custObj = json.custObj;
  const currentOrg = json.currentState;
  const wsArray = json.dataArray;
  const wsID = json.selectedID;
  // console.log("initSelectedID", wsID)
  const [wsData, setWsData] = useState(transformData(custObj, currentOrg, wsArray, wsID));
  // console.log("wsData",wsData);
  const custEmail = wsData.emails;
  const custRelated = wsData.people;
  const custPhones = wsData.phones;
  const worksheet = wsData.worksheet;
  const worksheetRecords = wsData.worksheetRecords;
  const [selectedRecord, setSelectedRecord] = useState(worksheetRecords[0])
  const [tableInfo, setTableInfo] = useState(worksheet);
  const [records, setRecords] = useState(worksheetRecords);
  const [open, setOpen] = useState(false); // for side panel open/closed state
  const [recordEditOpen, setRecordEditOpen] = useState(false) // for record edit side panel open/closed state

  /*
  useEffect(() => {
    // Fetch new worksheet data, update state, etc.
    // This will re-render the associated components.
    // const newWsData = transformData(custObj, currentState, wsArray, selectedID);
    // setWsData(newWsData);
    console.log("newWsData",wsData);
    setTableInfo(wsData.worksheet);
    setRecords(wsData.worksheetRecords);
    setSelectedRecord(wsData.worksheetRecords[0]);
  }, [selectedID]);
  */

  return (
    <div id="wrapper" className="container min-h-max mx-auto max-w-7xl sm:px-6 lg:px-8 columns-2 flex flex-col" style={{ height: '100%' }}>
      <div id="panelHeader" className="min-h-max min-w-full mx-auto max-w-7xl "><p className="font-serif text-xl text-center text-transform: uppercase text-slate-700">Worksheets</p></div>
      <div id= "worksheetsContainer" className="w-full pt-2 columns-2 flex flex-row" style={{ height: '100%' }}>
        <div id="sidePanel" className="w-auto bg-white" >
          <SideBar navigation = {wsData.navigation} selectedID={wsID}/>
        </div>
        <div id="mainPanel" className="container columns-3 flex flex-col">
          <div id="customerinfo" className="container columns-3 flex flex-row gap-2 justify-between">
            <ContactTable people = {custRelated}/>
            <PhonesTable phones = {custPhones}/>
            <EmailTable email = {custEmail}/>
          </div>
          <div id="mainPanelHeader" className="container mx-auto p-4 bg-gray-100">
            <MainTableHeader tableInfo={tableInfo} open={open} setOpen={setOpen}/>
          </div>
          <div id="mainPanelWorksheet" className="container mx-auto bg-slate-600">
            <RecordEdit recordEditOpen={recordEditOpen} setRecordEditOpen={setRecordEditOpen} selectedRecord = {selectedRecord} setSelectedRecord={setSelectedRecord}/>
            <MainTable records={records} setRecords={setRecords} recordEditOpen={recordEditOpen} setRecordEditOpen={setRecordEditOpen} selectedRecord = {selectedRecord} setSelectedRecord={setSelectedRecord} selectedID={wsID} wsData={wsData} setWsData={setWsData}/>
          </div>
        </div>
        <div>
          <ShowTime tableInfo={tableInfo} setTableInfo={setTableInfo} open={open} setOpen={setOpen}/>
        </div>
      </div>
    </div>
  );
};

export default WorksheetsDom;

