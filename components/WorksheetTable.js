import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
    
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

        const onDragEnd = (result) => {
            const { destination, source } = result;
            if (!destination) {
                return;
            }
        
            const reorderedRecords = Array.from(records);
            const [removed] = reorderedRecords.splice(source.index, 1);
            reorderedRecords.splice(destination.index, 0, removed);
        
            setRecords(reorderedRecords);
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
                                            {records.map((record, index) => (
                                                <Draggable key={record.ID} draggableId={record.ID.toString()} index={index}>
                                                    {(provided) => (
                                                        <tr
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                        >
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-md font-medium text-gray-900 sm:pl-6">
                                                                <div onClick={() => edit(record.ID)} className="cursor-pointer">
                                                                    {record.area}
                                                                    <p className="text-sm font-light text-gray-600">{record.frequency}</p>
                                                                </div>
                                                            </td>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-md font-light text-gray-900 sm:pl-6">
                                                                {record.rate} x {record.eot} mins
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

