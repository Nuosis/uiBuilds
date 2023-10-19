const email = [
    { label: 'Main', address: 'mspsi@me.com', ID: 'UUID1' },
    { label: 'Alt', address: 'me@you.com', ID: 'UUID2'  },
    { label: 'Bob', address: 'bob@you.com', ID: 'UUID3'  },
    // More people...
    ]
sendMail = function(input) {
        const obj = {input, function: "sendMail"}
        FileMaker.PerformScript("receiveJavascript", JSON.stringify(obj));
    }; 

onRowClick = function(ID) {
        const obj = {ID, function: "editEmail"}
        FileMaker.PerformScript("receiveJavascript", JSON.stringify(obj));
    }; 

    export default function EmailTable() {
        return (
            <div className="grow overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div id="tableWrapper" className="shadow ring-1 ring-black ring-opacity-5"  style={{maxHeight: '204px'}}>
                        <table className="min-w-full divide-y divide-gray-300 ">
                            <thead className="sticky top-0 bg-gray-100">
                                <tr>
                                    <th scope="col" className="sticky top-0 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 z-50">
                                        Emails
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white overflow-y-auto">
                                {email.map((mail) => (
                                    <tr key={mail.ID}>
                                        <td onClick={() => onRowClick(mail.ID)} className="whitespace-nowrap py-4 pl-4 pr-4 text-md font-medium text-gray-900 sm:pl-6 cursor-pointer">
                                            {mail.label}
                                        </td>
                                        <td onClick={() => onRowClick(mail.ID)} className="whitespace-nowrap py-4 pl-4 pr-4 text-md font-light text-gray-900 sm:pl-6 cursor-pointer">
                                            {mail.address}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-md font-light text-gray-900 sm:pl-6">
                                            <button onClick={() => sendMail(mail.address)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
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
