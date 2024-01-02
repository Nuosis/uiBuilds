import WorksheetsDom from "../components/Worksheets";
import WorkordersDom from "../components/WorkOrders";
import React from "react";
import ReactDOM from 'react-dom/client';
import { createRoot } from "react-dom/client";
import transformData from "./transformData";
import transformWoData from "./transformWoData";

window.getTransformedData = (data) => {
    const json = JSON.parse(data)
    const custObj = json.custObj
    const dataArray = json.dataArray
    const currentState = json.currentState
    const selectedWorkOrderID = json.selectedWorkorderID
    const woData = transformWoData(custObj, currentState, dataArray, selectedWorkOrderID)
    // console.log(wsData)
    return woData
}

let root; // Store the root outside the function
window.loadWorksheets = (data) => {
    console.log('version', 0.01);
    console.log('data', data);
    const json = JSON.parse(data);
    console.log('initWsData', json);

    // Unmount existing React component if any
    try {
        if (root) {
                root.unmount();
                root = null; // Set root to null after unmounting
            }
    } catch (e) {
        console.error("Error during unmount:", e);
    }

    try {
        const container = document.getElementById("root");
        if (container) {
            if (!root) { // Only create root if it hasn't been created yet
                root = ReactDOM.createRoot(container);
            }
            root.render(<WorksheetsDom data={json} />);
        } else {
            console.error("Element with id 'root' not found during mount");
        }
    } catch (e) {
        console.error("Error loading app:", e);
    }
};

window.loadWorkorders = (data) => {
    console.log('version', 0.01);
    const json = JSON.parse(data);
    console.log('initWoData', json);

    // Unmount existing React component if any
    try {
        if (root) {
                root.unmount();
                root = null; // Set root to null after unmounting
            }
    } catch (e) {
        console.error("Error during unmount:", e);
    }

    // Load the new React app
    try {
        const container = document.getElementById("root");
        if (container) {
            if (!root) { // Only create root if it hasn't been created yet
                root = ReactDOM.createRoot(container);
            }
            root.render(<WorkordersDom data={json} />);
        } else {
            console.error("Element with id 'root' not found during mount");
        }
    } catch (e) {
        console.error("Error loading app:", e);
    }
};






