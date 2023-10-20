import React, { useState } from 'react';
    
deleteRow = function(ID) {
        const obj = {ID, function: "deleteWsRecord"}
        FileMaker.PerformScript("receiveJavascript", JSON.stringify(obj));
    };
edit = function(ID) {
        const obj = {ID, function: "editWs"}
        FileMaker.PerformScript("receiveJavascript", JSON.stringify(obj));
    }; 
showInfo = function(ID) {
        const obj = {ID, function: "popWsInfo"}
        FileMaker.PerformScript("receiveJavascript", JSON.stringify(obj));
    }; 
showSideBar = function(ID) {
        const obj = {ID, function: "popWsSideBar"}
        FileMaker.PerformScript("receiveJavascript", JSON.stringify(obj));
    }; 
    

    export default function WorksheetTable({ records, setRecords }) {
        return (
            <div className="grow overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div id="tableWrapper" className="shadow ring-1 ring-black ring-opacity-5"  style={{maxHeight: '308px'}}>
                        <table className="min-w-full divide-y divide-gray-300 ">
                            <tbody className="divide-y divide-gray-200 bg-white overflow-y-auto">
                                {records.map((record) => (
                                    <tr key={record.ID}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-md font-medium text-gray-900 sm:pl-6">
                                            <div onClick={() => edit(record.ID)} className="cursor-pointer">
                                                {record.area}
                                                <p className="text-sm font-light text-gray-600" >{record.frequency}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-md font-light text-gray-900 sm:pl-6">
                                            {record.rate} x {record.eot} mins
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-md font-light text-gray-900 sm:pl-6">
                                            <button onClick={() => deleteRow(record.ID)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>        
        )
    }

