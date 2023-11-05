
/*
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


import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";   

deleteRow = function(ID) {
        const obj = {ID, function: "deleteWsRecord"}
        FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
    };
edit = function(ID) {
        const obj = {ID, function: "editWs"}
        FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
    }; 
showInfo = function(ID) {
        const obj = {ID, function: "popWsInfo"}
        FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
    }; 
showSideBar = function(ID) {
        const obj = {ID, function: "popWsSideBar"}
        FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
    }; 
    

export default function MainTable({ records, setRecords }) {

    const onDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) {
            return;
        }
    
        const reorderedRecords = Array.from(records);
        const [removed] = reorderedRecords.splice(source.index, 1);
        reorderedRecords.splice(destination.index, 0, removed);
    
        setRecords(reorderedRecords);
        const obj = {reorderedRecords, function: "wsReorderRecords"}
        FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
    };

    return (
        <div className="grow overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
                <div id="tableWrapper" className="shadow ring-1 ring-black ring-opacity-5" style={{maxHeight: '308px'}}>
                    <table className="min-w-full divide-y divide-gray-300 ">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="table">
                                {(provided) => (
                                    <tbody {...provided.droppableProps} ref={provided.innerRef} className="divide-y divide-gray-200 bg-white overflow-y-auto">
                                        {(records || []).map((record, index) => (
                                            <Draggable key={record.ID} draggableId={record.ID.toString()} index={index}>
                                                {(provided) => (
                                                    <tr
                                                        className="flex flex-row columns-3 items-center"
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                    >
                                                        <td className="w-1/2 whitespace-nowrap py-4 pl-4 pr-4 text-md font-medium text-gray-900 sm:pl-6">
                                                            <div onClick={() => edit(record.ID)} className="cursor-pointer">
                                                                {record.area}
                                                                <p className="text-sm font-light text-gray-600">{record.frequency}</p>
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap py-4 gap-2 text-md font-light text-gray-900">
                                                            ${parseFloat(record.rate).toFixed(2)} x {record.eot} mins
                                                        </td>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-md font-light text-gray-900 sm:pl-6">
                                                            <button onClick={() => deleteRow(record.ID)}>
                                                                {/* SVG for delete icon */}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </tbody>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </table>
                </div>
            </div>
        </div>
    );
}

