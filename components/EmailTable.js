/*
const email = [
    { label: 'Main', address: 'mspsi@me.com', ID: 'UUID1' },
    { label: 'Alt', address: 'me@you.com', ID: 'UUID2'  },
    { label: 'Bob', address: 'bob@you.com', ID: 'UUID3'  },
    // More people...
    ]*/
sendMail = (input) => {
        const obj = {input, function: "sendMail"}
        FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
    }; 

newMail = (input) => {
    const obj = {input, function: "newMail"}
    FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
};

onRowClick = (ID) => {
        const obj = {ID, function: "editEmail"}
        FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
    }; 

export default EmailTable = ({email}) => {
    return (
        <div className="grow overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
                <div id="tableWrapper" className="shadow ring-1 ring-black ring-opacity-5"  style={{maxHeight: '204px'}}>
                    <div className="min-w-full divide-y divide-gray-300">
                        <div className="sticky top-0 flex flew-row columns-2 justify-between bg-gray-100 rounded-top-right">
                            <div className="sticky top-0 py-3.5 px-4 text-left text-sm font-semibold text-gray-900">
                                Emails
                            </div>
                            <button className="w-12 flex justify-center items-center" onClick={() => newMail()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="divide-y divide-gray-200 bg-white overflow-y-auto">
                            {email.map((mail) => (
                            <div key={mail.ID} style={{height: "77px"}} className="flex flex-row justify-between items-center">
                                <div onClick={() => onRowClick(mail.ID)} className="whitespace-nowrap py-4 px-4 text-md font-medium capitalize text-gray-900 cursor-pointer">
                                    {mail.label}
                                </div>
                                <div onClick={() => sendMail(mail.ID)} className="py-4 px-4 text-md font-light text-gray-900 cursor-pointer">
                                    {mail.address}
                                </div>
                                <div className="whitespace-nowrap py-4 px-4 text-md font-light text-gray-900">
                                    <button onClick={() => sendMail(mail.address)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
}
