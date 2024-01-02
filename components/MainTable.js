/*
const records = [
    { area: 'Main', frequency: 'Weekly: Tuesday, Friday', rate: '30.75', eot: '24 min', ID: 'UUID1' },
    { area: 'Stairwell', frequency: 'Weekly: Tuesday, Friday', rate: '30.75', eot: '3 min', ID: 'UUID2'  },
    { area: 'Kitchen', frequency: 'Weekly: Tuesday, Friday', rate: '30.75', eot: '27 min', ID: 'UUID3'  },
    { area: 'Kitchen', frequency: 'Weekly: Tuesday, Friday', rate: '30.75', eot: '27 min', ID: 'UUID4'  },
    { area: 'Kitchen', frequency: 'Weekly: Tuesday, Friday', rate: '30.75', eot: '27 min', ID: 'UUID5'  },
    { area: 'Kitchen', frequency: 'Weekly: Tuesday, Friday', rate: '30.75', eot: '27 min', ID: 'UUID6'  },
    { area: 'Kitchen', frequency: 'Weekly: Tuesday, Friday', rate: '30.75', eot: '27 min', ID: 'UUID7'  },
    ]
*/


import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";  
import RecordEdit from './slideOutRecordEdit';

export default function MainTable({ records, setRecords, selectedID, recordEditOpen, setRecordEditOpen, selectedRecord, setSelectedRecord, wsData, setWsData }) {
    const selectedRecordID = selectedRecord;
    console.log("selectedRecordID", selectedRecordID)
    const deleteRow = (ID) => {
        const obj = {ID, function: "deleteRecord"}
        FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
    };
    const edit = (record) => {
        //const selectedRecordObj = records.find(record => record.ID === ID);
        setSelectedRecord(record);
        setRecordEditOpen(true);
        // const obj = {ID, function: "editMainTable"}
        // FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
    };
    const onDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) {
            return;
        }
        console.log("wsData",wsData);
        const reorderedRecords = Array.from(records);
        const [removed] = reorderedRecords.splice(source.index, 1);
        reorderedRecords.splice(destination.index, 0, removed);
    
        setRecords(reorderedRecords);
        const updateWsData = (wsData, reorderedRecords) => {
            // Clone the original wsData object
            let updatedWsData = {...wsData};
            // Replace worksheetRecords with reorderedRecords
            updatedWsData.worksheetRecords = reorderedRecords;
            return updatedWsData;
        };
        const updatedWsData = updateWsData(wsData, reorderedRecords);
        setWsData(updatedWsData)
        const obj = {reorderedRecords, selectedID, function: "wsReorderRecords"}
        FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
    };

    return (
        <div className="grow overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
                <div id="tableWrapper" className="shadow ring-1 ring-black ring-opacity-5" style={{maxHeight: '60vh', overflowY: 'auto'}}>
                    <div className="min-w-full divide-y divide-gray-300 ">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="table">
                                {(provided) => (
                                    <section {...provided.droppableProps} ref={provided.innerRef} className="divide-y divide-gray-200 bg-white overflow-y-auto">
                                        {(records || []).map((record, index) => (
                                            <Draggable key={record.ID} draggableId={record.ID.toString()} index={index}>
                                                {(provided) => (
                                                    <header
                                                        className={`flex flex-row columns-2 justify-between items-center ${record.ID === selectedRecordID ? 'bg-slate-300' : ''}`}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                    >
                                                        <div className={`w-1/2 whitespace-nowrap py-4 pl-4 pr-4 text-md font-medium text-gray-900 sm:pl-6`}>
                                                            <div onClick={() => edit(record)} className="cursor-pointer">
                                                                {record.area}
                                                                <p className="text-sm font-light text-gray-600">{record.frequency}</p>
                                                            </div>
                                                        </div>
                                                        <div className="w-1/2 whitespace-nowrap flex flex-row columns-2 justify-between items-center">  
                                                            <div className="whitespace-nowrap py-4 gap-2 text-md font-light text-gray-900">
                                                                ${parseFloat(record.rate).toFixed(2)} x {Math.round(record.eot)} mins
                                                            </div>
                                                            <div className="whitespace-nowrap py-4 pl-4 pr-4 text-md font-light text-gray-900 sm:pl-6">
                                                                <button onClick={() => deleteRow(record.ID)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </header>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </section>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
            </div>
        </div>
    );
}

