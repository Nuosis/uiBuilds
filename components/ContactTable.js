const people = [
    { name: 'Lindsay Walton', role: 'Primary Contact', ID: 'UUID1' },
    { name: 'Tom Steele', role: 'Owner', ID: 'UUID2'  },
    { name: 'Jenn Wright', role: 'Secondary Contact', ID: 'UUID3'  },
    // More people...
    ]
    
    export default function ContactTable() {
        return (
            <div className="grow -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th scope="col" className="sticky top-0 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 z-50">
                                        Name
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white overflow-y-auto max-h-3.5">
                                {people.map((person) => (
                                    <tr key={person.ID}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-md font-medium text-gray-900 sm:pl-6">
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
