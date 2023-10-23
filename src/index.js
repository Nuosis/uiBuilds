import WorksheetsDom from "../components/Worksheets";
import WorkordersDom from "../components/WorkOrders";
import React from "react";
import ReactDOM from 'react-dom';
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
    // Unmount existing React component if any
    try {
        if (root) {
            root.unmount();  // Use root.unmount() instead of ReactDOM.unmountComponentAtNode()
        } else {
            console.error("Root is undefined during unmount");
        }
    } catch (e) {
        console.error("Error during unmount:", e);
    }
    
    // Load the new React app
    try {
        const container = document.getElementById("root");
        if (container) {
            const root = ReactDOM.createRoot(container);
            root.render(<WorksheetsDom data={data} />);
        } else {
            console.error("Element with id 'root' not found during mount");
        }
    } catch (e) {
        console.error("Error loading app:", e);
    }
};

window.loadWorkorders = (data) => {
    // Unmount existing React component if any
    try {
        if (root) {
            root.unmount();  // Use root.unmount() instead of ReactDOM.unmountComponentAtNode()
        } else {
            console.error("Root is undefined during unmount");
        }
    } catch (e) {
        console.error("Error during unmount:", e);
    }

    // Load the new React app
    try {
        const container = document.getElementById("root");
        if (container) {
            root = ReactDOM.createRoot(container);  // Store the root for later unmounting
            root.render(<WorkordersDom data={data} />);
        } else {
            console.error("Element with id 'root' not found during mount");
        }
    } catch (e) {
        console.error("Error loading app:", e);
    }
};






