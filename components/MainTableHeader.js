/*
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
    totalTime: {default: 90, "weekly: Friday": 20}
};
*/

import React, { useState } from "react";

const getInfo = function(table) {

    if (table.org === table.contractOrg)
        {
        const obj = {
            subCompany: table.provider,
            subStartDate: table.providerStartDate,
            contractValue: table.contractValue,
            payValue: table.providerValue,
            percent: (table.providerValue / table.contractValue * 100).toFixed(2) + '%'
        }
        return obj
    } else {
        const obj = {
            subCompany: table.cleaner,
            subStartDate: table.cleanerStartDate,
            contractValue: table.providerValue,
            payValue: table.cleanerValue,
            percent: (table.cleanerValue / table.providerValue * 100).toFixed(2) + '%'
        }
        return obj

    }
};


edit = function(ID) {
        const obj = {ID, function: "edit"}
        FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
    }; 
showInfo = function(ID) {
        const obj = {ID, function: "popInfo"}
        FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
    }; 
showSideBar = function(ID) {
        const obj = {ID, function: "popSideBar"}
        FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
    }; 
    

export default function MainTableHeader({tableInfo, open, setOpen}) {// If tableInfo is null or empty, we return null or some placeholder
    if (!tableInfo || Object.keys(tableInfo).length === 0) {
      return null; // or <div>No data available</div> or some other placeholder component
    }
    console.log("wsHeader",tableInfo)
    const displayInfo = getInfo(tableInfo);
    const selectedId = tableInfo.ID;
    const totalTime = tableInfo.totalTime;
    // console.log("totalTime",totalTime)
    const groupedTime = {
        'Monday': 0,
        'Tuesday': 0,
        'Wednesday': 0,
        'Thursday': 0,
        'Friday': 0,
        'Saturday': 0,
        'Sunday': 0,
    };
    const e = Object.keys(totalTime).filter((key) => 
        key.includes("Weekly") || key.includes("Bi Weekly") || key.includes("Semi Weekly")
        );

        // Loop through the keys in totalTime and sum the times based on your conditions
        Object.keys(totalTime).forEach((key) => {
            let time = totalTime[key];
            const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            //console.log("key", key)
            if (key === "Weekly: Weekdays") {
                // console.log("Weekly Weekdays")
                weekdays.forEach((day) => {
                    if (!groupedTime[day]) {
                        groupedTime[day] = 0;
                    }
                    groupedTime[day] += time;
                });
            } else if (key.startsWith("Weekly")) {
                // console.log("Weekly")
                daysOfWeek.forEach((day) => {
                    if (key.includes(day)) {
                        if (!groupedTime[day]) {
                            groupedTime[day] = 0;
                        }
                        groupedTime[day] += time;
                    }
                });
            }
        
            if (key.startsWith("Weekly")) {
                daysOfWeek.forEach((day) => {
                    if (key.includes(day)) {
                        groupedTime[day] += time;
                    }
                });
            }
        
            if (key.startsWith("Bi Weekly") || key.startsWith("Semi Weekly")) {
                daysOfWeek.forEach((day) => {
                    if (key.includes(day)) {
                        groupedTime[day] += Math.ceil(time / 2);
                    }
                });
            }
    });
    const nonZeroKeys = Object.keys(groupedTime).filter(key => groupedTime[key] !== 0);
    const sum = nonZeroKeys.reduce((acc, key) => acc + groupedTime[key], 0);
    const average = nonZeroKeys.length > 0 ? sum / nonZeroKeys.length : 0;
    const finalAverage = (average === 0 ? (tableInfo.totalTime.default == null ? tableInfo.totalTime : tableInfo.totalTime.default) : average);
    // console.log("time",finalAverage)
    return (
        <div id="headerWrapper" className="w-full columns-2 flex flex-col gap-2">
                <div className="columns-2 flex flex-row gap-2 font-bold text-lg ">
                    <div onClick={() => edit(selectedId)} className="w-1/2 font-serif grow-0 pr-8 cursor-pointer">
                        {tableInfo.name}
                        <p className="font-serif font-light text-xs leading-4">
                            {tableInfo.startDate}    {tableInfo.endDate}
                        </p>
                    </div>
                    <div className="w-1/2 columns-3 flex flex-row gap-2 justify-between">
                        <div className="w-52 columns-2 flex flex-row gap-2 font-serif text-base justify-start items-center"> 
                            <div className="w-12">Total</div>
                            <div>${parseFloat(displayInfo.contractValue).toFixed(2)}</div>
                        </div>
                        <div className="w-52 columns-2 flex flex-row gap-1 font-serif text-base justify-start items-center">
                            <div className="w-12">Time</div>
                            <div>
                                {`${Math.floor(finalAverage / 60)}hrs ${Math.round(finalAverage % 60/5) * 5}mins`}
                            </div>
                        </div>
                        <div className="w-16 columns-2 flex flex-row gap-2">
                            <button className="w-1/2" onClick={() => setOpen(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bar-chart-line-fill" viewBox="0 0 16 16">
                                    <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z"/>
                                </svg>
                            </button>
                            <button className="w-1/2" onClick={() => showInfo(selectedId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            <div className="columns-2 flex flex-row gap-2 ">
                <div className="w-1/2 font-serif grow-0 pr-8"> 
                    {displayInfo.subCompany}
                    <p className="font-serif font-light text-xs">{displayInfo.subStartDate}</p>
                </div>
                <div className="w-1/2 columns-3 flex flex-row gap-2 justify-between">
                        <div className="w-52 columns-2 flex flex-row gap-2 font-serif text-base justify-start items-center"> 
                            <div className="w-12">Pays</div>
                            <p>${parseFloat(displayInfo.payValue).toFixed(2)}</p>
                        </div>
                        <div className="w-52 columns-2 flex flex-row gap-1 font-serif text-base justify-start items-center"> 
                            Rate (%)
                            <p>{parseFloat(displayInfo.percent).toFixed(2)}</p>
                        </div>
                        <div className="w-16 columns-2 flex flex-row gap-2">
                            <div className="w-1/2"></div>
                            <button className="w-1/2" onClick={() => showSideBar(selectedId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                            </button>
                        </div>
                </div>
            </div>
        </div>       
    )
}

