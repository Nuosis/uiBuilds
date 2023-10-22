const phones = [
    { label: 'Main', number: '(778) 678-3674', ID: '76056625-6607-4B88-8CD8-ABE97C57FA20' },
    { label: 'Work', number: '(250) 360-0666)', ID: '76056625-6607-4B88-8CD8-ABE97C57FA21'  },
    { label: 'Sherry', number: '(604) 256-2243', ID: '76056625-6607-4B88-8CD8-ABE97C57FA22'  },
    ]

dialPhone = (phoneNumber) => {
    // Validate the phone number if necessary
    if (isValidPhoneNumber(phoneNumber)) {
        // Use the 'tel:' scheme to initiate a call
        window.location.href = `tel:${phoneNumber}`;
        } else {
        alert("Invalid phone number");
        }
    }
    

isValidPhoneNumber = (phoneNumber) => {
    // Remove any non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, '');

    // Check if the number of digits is correct (assuming 10 for the US)
    if (digitsOnly.length === 10) {
        return true;
    } else {
        // Remove any leading country codes (like +1 for US)
        const removedCountryCode = phoneNumber.replace(/^\+?1/, '');

        // Remove any other non-digit characters
        const digitsOnly = removedCountryCode.replace(/\D/g, '');

        // If we have 10 digits, then consider it valid
        if (digitsOnly.length === 10) {
            return {
            isValid: true,
            transformedNumber: digitsOnly
            };
        }

        // If the remaining number starts with a leading zero, remove it and re-check
        if (digitsOnly.startsWith('0')) {
            const removedLeadingZero = digitsOnly.substr(1);
            if (removedLeadingZero.length === 10) {
            return {
                isValid: true,
                transformedNumber: removedLeadingZero
            };
            }
        }

        return {
            isValid: false,
            transformedNumber: null
        };
    }
}         
    
onRowClick = (ID) => {
    const obj = {ID, function: "editPhone"}
    FileMaker.PerformScript("customers . loadWebViewer . worksheets . callbacks", JSON.stringify(obj));
};

export default function PhonesTable({phones}) {
    // console.log(phones)
    return (
        <div className="grow overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
                <div id="tableWrapper" className="shadow ring-1 ring-black ring-opacity-5"  style={{maxHeight: '204px'}}>
                    <div className="min-w-full divide-y divide-gray-300">
                        <div id = "headerWrapper" className="sticky min-w-full top-0 bg-gray-100">
                            <div id = "header" className="sticky top-0 min-w-full py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Phones
                            </div>
                        </div>
                        <div id = "bodyWrapper" className="divide-y divide-gray-200 bg-white overflow-y-auto justify-between">
                            {phones.map((phone) => (
                                <div key={phone.ID} className="flex">
                                    <div id = "tableRow.NoWrapp" onClick={() => onRowClick(phone.ID)} className="min-w-fit py-4 pl-4 pr-4 text-md font-medium text-gray-900 sm:pl-6 cursor-pointer">
                                        {phone.label}
                                    </div>
                                    <div id = "tableRow" onClick={() => dialPhone(phone.ID)} className="py-4 pl-4 pr-4 text-md font-light text-gray-900 sm:pl-6 cursor-pointer">
                                        {phone.number}
                                    </div>
                                    <div id = "buttonRow.NoWrapp" className="py-4 pl-4 pr-4 text-md font-light text-gray-900 sm:pl-6">
                                        <button className="cursor-pointer" onClick={() => dialPhone(phone.number)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                                                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
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
