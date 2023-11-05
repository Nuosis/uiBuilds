/*
const people = [
    { name: 'Lindsay Walton', role: 'Primary Contact', ID: 'UUID1' },
    { name: 'Tom Steele', role: 'Owner', ID: 'UUID2'  },
    { name: 'Jenn Wright', role: 'Secondary Contact', ID: 'UUID3'  },
    ]
*/

const editRelated = (ID) => {
        const obj = {ID, function: "editRelated"}
        FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
    }; 

const newRelated = (ID) => {
    const obj = {ID, function: "newRelated"}
    FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
}; 

export default function ContactTable({people}) {
    return (
        <div className="grow overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
                <div id="tableWrapper" className="shadow ring-1 ring-black ring-opacity-5"  style={{maxHeight: '204px'}}>
                    <table className="min-w-full divide-y divide-gray-300 ">
                        <thead className="sticky top-0 bg-gray-100">
                            <tr className="flex flew-row columns-2 justify-between">
                                <th scope="col" className="sticky top-0 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 z-50">
                                    Name
                                </th>
                                <th scope="col" className="py-4 text-right">
                                    <button className="w-12 flex justify-center items-center" onClick={() => newRelated()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                        </svg>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white overflow-y-auto">
                            {people.map((person) => (
                                <tr key={person.ID}>
                                    <td onClick={() => editRelated(person.ID)} className="py-4 pl-4 pr-4 text-md font-medium text-gray-900 sm:pl-6 cursor-pointer">
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
