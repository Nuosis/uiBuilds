const people = [
    { name: 'Lindsay Walton', role: 'Primary Contact', ID: 'UUID1' },
    { name: 'Tom Steele', role: 'Owner', ID: 'UUID2'  },
    { name: 'Jenn Wright', role: 'Secondary Contact', ID: 'UUID3'  },
    // More people...
    ]
onRowClick = function(ID) {
        const obj = {ID, function: "editContact"}
        FileMaker.PerformScript("receiveJavascript", JSON.stringify(obj));
    }; 

    export default function ContactTable() {
        return (
            <div className="grow overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div id="tableWrapper" className="shadow ring-1 ring-black ring-opacity-5"  style={{maxHeight: '204px'}}>
                        <table className="min-w-full divide-y divide-gray-300 ">
                            <thead className="sticky top-0 bg-gray-100">
                                <tr>
                                    <th scope="col" className="sticky top-0 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 z-50">
                                        Name
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white overflow-y-auto">
                                {people.map((person) => (
                                    <tr key={person.ID}>
                                        <td onClick={() => onRowClick(person.ID)} className="whitespace-nowrap py-4 pl-4 pr-4 text-md font-medium text-gray-900 sm:pl-6 cursor-pointer">
                                            {person.name}
                                            <p className="text-sm font-light text-gray-600">{person.role}</p>
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
