/*const phones = [
    { label: 'Main', number: '(778) 678-3674', ID: 'UUID1' },
    { label: 'Work', number: '(250) 360-0666)', ID: 'UUID2'  },
    { label: 'Sherry', number: '(604) 256-2243', ID: 'UUID3'  },
    ]*/
    
dialPhone = function(number) {
        const obj = {number, function: "dialNumber"}
        FileMaker.PerformScript("receiveJavascript", JSON.stringify(obj));
    };   
    
onRowClick = function(ID) {
        const obj = {ID, function: "editPhone"}
        FileMaker.PerformScript("receiveJavascript", JSON.stringify(obj));
    }; 
    export default function PhoneTable({phones}) {
        return (
            <div className="grow overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div id="tableWrapper" className="shadow ring-1 ring-black ring-opacity-5"  style={{maxHeight: '204px'}}>
                        <table className="min-w-full divide-y divide-gray-300 ">
                            <thead className="sticky top-0 bg-gray-100">
                                <tr>
                                    <th scope="col" className="sticky top-0 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 z-50">
                                        Phones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white overflow-y-auto">
                                {phones.map((phone) => (
                                    <tr key={phone.ID}>
                                        <td onClick={() => onRowClick(phone.ID)} className="whitespace-nowrap py-4 pl-4 pr-4 text-md font-medium text-gray-900 sm:pl-6 cursor-pointer">
                                            {phone.label}
                                        </td>
                                        <td onClick={() => onRowClick(phone.ID)} className="whitespace-nowrap py-4 pl-4 pr-4 text-md font-light text-gray-900 sm:pl-6 cursor-pointer">
                                            {phone.number}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-md font-light text-gray-900 sm:pl-6">
                                            <button onClick={() => dialPhone(phone.number)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
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
