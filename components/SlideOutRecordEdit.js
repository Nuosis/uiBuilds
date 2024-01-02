import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function RecordEdit({recordEditOpen, setRecordEditOpen, selectedRecord, setSelectedRecord}) {
    console.log("selectedRecord", selectedRecord)
    const [area, setArea] = useState(selectedRecord.area);
    const [eot, setEot] = useState(Math.round(selectedRecord.eot));
    const [rate, setRate] = useState(Math.round(selectedRecord.rate*100)/100);
    const [frequency, setFrequency] = useState(selectedRecord.frequency.split(': ')[0]);
    //console.log("frequency", frequency)
    const [dayOrMonth, setDayOrMonth] = useState(frequency.includes("Weekly") ? "day":"month");
    //console.log("dayMonth", dayOrMonth)
    const initDayValue = selectedRecord.frequency.split(': ')[1];
    const initDayArray = initDayValue.split(', '); //used to designate "selectsDay(s) or Weekdays, Weekend, Everyday"
    //console.log("daySelection", daySelection)
    const [selectedFrequencyValues, setSelectedFrequencyValues] = useState(setFrequencyValues(initDayArray));
    const initDaySelection = function getInitialDaySelection() {
        if (initDayArray[0].includes('Weekdays')) return 'Weekdays';
        if (initDayArray[0].includes('Weekend')) return 'Weekend';
        if (initDayArray[0].includes('Everyday')) return 'Everyday';
        if (dayOrMonth==="day") return "Select Day(s)";
        return null; // default case
    }
    const [daySelection, setDaySelection] = useState(initDaySelection);
    function setFrequencyValues(value) {
        if (value[0].includes('Weekdays')) return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        if (value[0].includes('Weekend')) return ["Saturday"];
        if (value[0].includes('Everyday')) return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        return value; // default case
    };

    useEffect(() => {
        setArea(selectedRecord.area);
        setEot(Math.round(selectedRecord.eot));
        setRate(Math.round(selectedRecord.rate*100)/100);
        setFrequency(selectedRecord.frequency.split(': ')[0]);
        setDayOrMonth(frequency.includes("Weekly") ? "day":"month");
        setDaySelection(initDaySelection);
        setSelectedFrequencyValues(setFrequencyValues(initDayArray));
        console.log("selectedFrequencyValues", selectedFrequencyValues)
    }, [selectedRecord]);

    // Options based on frequency
    const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Weekdays", "Weekend", "Everyday"];
    const monthOptions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleFrequencyChange = (value) => {
        setFrequency(value)
        if (value.includes('Weekly')) {
            setDayOrMonth('day');
            setSelectedFrequencyValues([]);
        } else {
            setDayOrMonth('month');
            setSelectedFrequencyValues([]);
        };
    };
    
    const handleCheckboxChange = (value) => {
        const i = selectedFrequencyValues(prev => {
            if (prev.includes(value)) {
                prev.filter(item => item !== value); // Uncheck the checkbox
            } else {
                [...prev, value]; // Check the checkbox
            }
        setSelectedFrequencyValues(i);
        return i
    })};

    const handleRadioChange = (value) => {
        setDaySelection(value);
        const e = setFrequencyValues(value)
        setSelectedFrequencyValues(e);
    };

    const formRecordObj = () => {
        const selectedValues = () => {
            if (daySelection==='Weekdays') return 'Weekdays';
            if (daySelection==='Weekend') return 'Weekend';
            if (daySelection==='Everyday') return 'Everyday';
            return selectedFrequencyValues;
        }
        const newObj = {
            'ID': selectedRecord.ID, 
            'area': area,
            'eot': eot,
            'frequency': frequency + ': ' + selectedValues(),
            'rate': rate
        }

        // Compare the serialized objects
        newObj.modified = JSON.stringify(newObj) !== JSON.stringify(selectedRecord);
        console.log("formObj", newObj);
        setRecordEditOpen(false)
    };

    return (
        <Transition.Root show={recordEditOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setRecordEditOpen}>
                <div className="fixed inset-0" />
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                                        <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                                            <div className="px-4 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                        Edit Record
                                                    </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                        type="button"
                                                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onClick={() => setRecordEditOpen(false)}
                                                        >
                                                        <span className="absolute -inset-2.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6 gap-1">
                                                {/* Form start */}
                                                <form>
                                                    {/* Area field */}
                                                    <label className="block text-sm font-medium text-gray-700">Area</label>
                                                    <input
                                                    type="text"
                                                    value={area}
                                                    onChange={(e) => setArea(e.target.value)}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    />

                                                    {/* EOT field */}
                                                    <label className="block text-sm font-medium text-gray-700 mt-4">Est. of Time (minutes)</label>
                                                    <input
                                                    type="number"
                                                    value={eot}
                                                    onChange={(e) => setEot(e.target.value)}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    />

                                                    {/* Rate field */}
                                                    <label className="block text-sm font-medium text-gray-700 mt-4">Rate</label>
                                                    <input
                                                    type="text"
                                                    value={rate}
                                                    onChange={(e) => setRate(e.target.value)}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="$0.00"
                                                    />

                                                    {/* Frequency dropdown */}
                                                    <label className="block text-sm font-medium text-gray-700 mt-4">Frequency</label>
                                                    <select
                                                        value={frequency}
                                                        onChange={(e) => handleFrequencyChange(e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        >
                                                        <option value="Weekly">Weekly</option>
                                                        <option value="Semi-Weekly">Semi-Weekly</option>
                                                        <option value="Monthly">Monthly</option>
                                                        <option value="Semi-Monthly">Semi-Monthly</option>
                                                        <option value="Quarterly">Quarterly</option>
                                                        <option value="Tri-Annually">Tri-Annually</option>
                                                        <option value="Bi-Annually">Bi-Annually</option>
                                                        <option value="Annually">Annually</option>
                                                    </select>

                                                    {/* Radio buttons for Day selection */}
                                                    {dayOrMonth === 'day' && (
                                                    <fieldset>
                                                    <legend className="block text-sm font-medium text-gray-700 mt-4">Select Frequency</legend>
                                                    <div className="mt-4 space-y-4">
                                                        {['Select Day(s)', 'Weekend', 'Weekdays', 'Everyday'].map((option) => (
                                                        <div key={option} className="flex items-center">
                                                            <input
                                                            id={`radio-${option}`}
                                                            name="daySelection"
                                                            type="radio"
                                                            value={option}
                                                            checked={daySelection === option}
                                                            onChange={() => handleRadioChange(option)}
                                                            className="h-4 w-4 text-indigo-600 border-gray- 300 focus:ring-indigo-500"
                                                            />
                                                            <label htmlFor={`radio-${option}`} className="ml-3 text-sm text-gray-700">
                                                            {option}
                                                            </label>
                                                        </div>
                                                        ))}
                                                    </div>
                                                    </fieldset>
                                                    )}

                                                    {/* Checkboxes for individual days, shown only when 'Select Day(s)' is chosen */}
                                                    {daySelection === 'Select Day(s)' && dayOrMonth === 'day' && (
                                                    <fieldset>
                                                        <legend className="block text-sm font-medium text-gray-700 mt-4">Select Day(s)</legend>
                                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                                            <div key={day} className="flex items-center">
                                                            <input
                                                                id={`checkbox-${day}`}
                                                                name="selectedDays"
                                                                type="checkbox"
                                                                value={day}
                                                                checked={selectedFrequencyValues.includes(day)}
                                                                onChange={() => handleCheckboxChange(day)}
                                                                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                                            />
                                                            <label htmlFor={`checkbox-${day}`} className="ml-3 text-sm text-gray-700">
                                                                {day}
                                                            </label>
                                                            </div>
                                                        ))}
                                                        </div>
                                                    </fieldset>
                                                    )}

                                                    {/* Checkboxes for months, shown only when 'Select Day(s)' is chosen */}
                                                    {dayOrMonth === 'month' && (
                                                    <fieldset>
                                                        <legend className="block text-sm font-medium text-gray-700 mt-4">Select Month(s)</legend>
                                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {monthOptions.map((month) => (
                                                            <div key={month} className="flex items-center">
                                                            <input
                                                                id={`checkbox-${month}`}
                                                                name="selectedMonths"
                                                                type="checkbox"
                                                                value={month}
                                                                checked={selectedFrequencyValues.includes(month)}
                                                                onChange={() => handleCheckboxChange(month)}
                                                                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                                            />
                                                            <label htmlFor={`checkbox-${month}`} className="ml-3 text-sm text-gray-700">
                                                                {month}
                                                            </label>
                                                            </div>
                                                        ))}
                                                        </div>
                                                    </fieldset>
                                                    )}
                                                </form>
                                                {/* Form end */}
                                            </div>
                                        </div>
                                        <div className="flex flex-shrink-0 justify-end px-4 py-4">
                                            <button
                                                type="button"
                                                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                                                onClick={() => formRecordObj()}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
