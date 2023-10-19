const worksheet = {
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
}

const getInfo = function(worksheet) {
    if (worksheet.org === worksheet.contractOrg)
        {
        const obj = {
            subCompany: worksheet.provider,
            subStartDate: worksheet.providerStartDate,
            contractValue: worksheet.contractValue,
            payValue: worksheet.providerValue,
            percent: (worksheet.providerValue / worksheet.contractValue * 100).toFixed(2) + '%'
        }
        return obj
    } else {
        const obj = {
            subCompany: worksheet.cleaner,
            subStartDate: worksheet.cleanerStartDate,
            contractValue: worksheet.providerValue,
            payValue: worksheet.cleanerValue,
            percent: (worksheet.cleanerValue / worksheet.providerValue * 100).toFixed(2) + '%'
        }
        return obj

    }
};
const displayInfo = getInfo(worksheet);

edit = function() {
        const obj = {function: "editWs"}
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
    

export default function WorksheetHeader() {
    return (
        <div id="headerWrapper" className="w-full columns-2 flex flex-col gap-2">
            <div onClick={() => edit()} className="font-serif font-bold text-lg cursor-pointer">
                {worksheet.name}
                <p className="font-serif font-light text-xs leading-4">
                    {worksheet.startDate}    {worksheet.endDate}
                </p>
            </div>
            <div className="columns-5 flex flex-row gap-2">
                <div className="font-serif grow-0 pr-8"> 
                    {displayInfo.subCompany}
                    <p className="font-serif font-light text-xs">{displayInfo.subStartDate}</p>
                </div>
                <div className="font-serif grow"> 
                    Total
                    <p>${displayInfo.contractValue}</p>
                </div>
                <div className="font-serif grow"> 
                    Pays
                    <p>${displayInfo.payValue}</p>
                </div>
                <div className="font-serif grow"> 
                    Rate
                    <p>{displayInfo.percent}</p>
                </div>
                <div id="headerButtons" className="columns-2 flex flex-col gap-2">
                    <button onClick={() => showInfo()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                        </svg>
                    </button>
                    <button onClick={() => showSideBar()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>       
    )
}

