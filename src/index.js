import MyApp from "./myApp";
import React from "react";
import { createRoot } from "react-dom/client";
import transformData from "./transformData";

window.getTransformedData = (data) => {
    const json = JSON.parse(data)
    const custObj = json.custObj
    const wsArray = json.wsArray
    const currentState = json.currentState
    const wsData = transformData(custObj, currentState, wsArray)
    // console.log(wsData)
    return wsData
}

window.loadMyApp = (data) => {
    try {
        const container = document.getElementById("root");
        if (!container) {
            console.error("Element with id 'root' not found");
            return;
        }
        const root = createRoot(container);
        root.render(<MyApp data={data}/>);
    } catch (e) {
        console.error("Error loading app:", e);
    }
};



