import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import FMGofer from 'fm-gofer';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"; 

export default function RecordEdit({recordEditOpen, setRecordEditOpen, selectedRecord, setSelectedRecord}) {
    console.log("selectedRecord", selectedRecord);
    if (!selectedRecord) {
        // Handle the case where selectedRecord is null.
        // You might want to return null or some placeholder UI here.
        return (
            <div className="p-4 flex justify-center items-center">
                <div className="text-center p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold text-gray-800">No line items available</p>
                </div>
            </div>
        );
        
        
    }
    const [multiplier, setMultiplier] = useState(selectedRecord.multiplier);
    const [tasks, setTasks] = useState([]);
    const [area, setArea] = useState(selectedRecord.area);
    const [eot, setEot] = useState(Math.round(selectedRecord.eot));
    const [rate, setRate] = useState(Math.round(selectedRecord.rate*100)/100);
    const [frequency, setFrequency] = useState(selectedRecord.frequency.split(': ')[0]);
    const [dayOrMonth, setDayOrMonth] = useState(frequency.includes("Weekly") ? "day":"month");
    const initDayValue = selectedRecord.frequency && selectedRecord.frequency.includes(': ') ? selectedRecord.frequency.split(': ')[1] : '';
    const initDayArray = typeof initDayValue === 'string' ? initDayValue.split(', ') : [];
    const [selectedFrequencyValues, setSelectedFrequencyValues] = useState(setFrequencyValues(initDayArray));
    const initDaySelection = function getInitialDaySelection() {
        if (initDayArray.length > 0 && typeof initDayArray[0] === 'string') {
            if (initDayArray[0].includes('Weekdays')) return 'Weekdays';
            if (initDayArray[0].includes('Weekend')) return 'Weekend';
            if (initDayArray[0].includes('Everyday')) return 'Everyday';
        }
        if (dayOrMonth === "day") return "Select Day(s)";
        return null; // default case, when initDayArray is empty or its first element is not a string
    }
    const [daySelection, setDaySelection] = useState(initDaySelection);

    function setFrequencyValues(value) {
        if (value.length > 0 && typeof value[0] === 'string') {
            if (value[0].includes('Weekdays')) return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            if (value[0].includes('Weekend')) return ["Saturday"];
            if (value[0].includes('Everyday')) return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        }
        return value; // default case, returns the original array if the first element is not a string or array is empty
    };
    

    useEffect(() => {
        async function fetchTasks() {
            if (selectedRecord) {
                setMultiplier(selectedRecord.multipier || 1);
                setArea(selectedRecord.area || '');
                setEot(selectedRecord.eot ? Math.round(selectedRecord.eot) : 0);
                setRate(selectedRecord.rate ? Math.round(selectedRecord.rate * 100) / 100 : 0);
                setFrequency(selectedRecord.frequency ? selectedRecord.frequency.split(': ')[0] : 'Weekly');
                setDayOrMonth(frequency.includes("Weekly") ? "day" : "month");
                setDaySelection(initDaySelection());
                setSelectedFrequencyValues(setFrequencyValues(initDayArray));
                try {
                    const tasksResponse = await FMGofer.PerformScript("customers * FMgofer * callback", JSON.stringify({"path": "getTasks", "ID": selectedRecord.ID}));
                    const taskObj = JSON.parse(tasksResponse)
                    console.log("tasks: ", taskObj.result);
                    const taskFmError = taskObj.error
                    const tasks = taskObj.result
                    setTasks(tasks)

                } catch (error) {
                    console.error('Error fetching tasks:', error);
                    // Handle errors as needed
                }
            }
                
        }
        
        fetchTasks()

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

    const handleMultiplierChange = (value) => {
        setMultiplier(value);
    };

    const handleRadioChange = (value) => {
        setDaySelection(value);
        const e = setFrequencyValues(value)
        setSelectedFrequencyValues(e);
    };

    const handleFormSubmit = () => {
        console.log("formSubmitted")
        const obj = formRecordObj();
        if(obj.modified == true){
            obj.function = "wsSaveArea"
            FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
        }
    };

    const formRecordObj = () => {
        const selectedValues = () => {
            if (daySelection === 'Weekdays') return 'Weekdays';
            if (daySelection === 'Weekend') return 'Weekend';
            if (daySelection === 'Everyday') return 'Everyday';
            return selectedFrequencyValues.join(', '); // Assuming array needs to be string
        };
    
        const newObj = {
            'ID': selectedRecord.ID, 
            'area': area,
            'eot': eot,
            'frequency': frequency + ': ' + selectedValues(),
            'multiplier': multiplier,
            'rate': rate
        };
    
        // Manual comparison for each property
        const hasChanged =  newObj.area !== selectedRecord.area ||
                            newObj.eot !== selectedRecord.eot ||
                            newObj.frequency !== selectedRecord.frequency ||
                            newObj.multiplier !== selectedRecord.multiplier ||
                            newObj.rate !== selectedRecord.rate;
        
        const areaHasChanged =  newObj.area !== selectedRecord.area;
        const eotHasChanged =  newObj.eot !== selectedRecord.eot;
        const frequencyHasChanged =  newObj.frequency !== selectedRecord.frequency;
        const multiplierHasChanged =  newObj.multiplier !== selectedRecord.multiplier;
        const rateHasChanged =  newObj.rate !== selectedRecord.rate;

        newObj.modified = hasChanged;
        newObj.modification = {areaHasChanged,eotHasChanged,frequencyHasChanged, multiplierHasChanged, rateHasChanged};
        // console.log("Comparison result", newObj.modified);
        setTasks([])
        setRecordEditOpen(false);
        return newObj
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
    
        const reorderedTasks = Array.from(tasks);
        const [removed] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, removed);
    
        setTasks(reorderedTasks);
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
                                            <div id = "recordEditForm" className="relative mt-6 flex-1 px-4 sm:px-6 gap-1">
                                                {/* Form start */}
                                                <form>
                                                    <div className="flex items-center space-x-6 my-2">
                                                        {/* Area field */}
                                                        <div className="flex-1">
                                                            <label className="block text-sm font-medium text-gray-700">Area</label>
                                                            <input
                                                            type="text"
                                                            value={area}
                                                            onChange={(e) => setArea(e.target.value)}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-6 mt-4">
                                                        {/* Multiplier field */}
                                                        <div className="flex-1">
                                                            <label className="block text-sm font-medium text-gray-700">Multiplier</label>
                                                            <input
                                                            type="number"
                                                            value={multiplier}
                                                            onChange={(e) => setMultiplier(e.target.value)}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            />
                                                        </div>
                                                        {/* EOT field */}
                                                        <div className="flex-1">
                                                            <label className="block text-sm font-medium text-gray-700">Minutes</label>
                                                            <input
                                                            type="number"
                                                            value={eot}
                                                            onChange={(e) => setEot(e.target.value)}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            />
                                                        </div>
                                                        {/* Rate field */}
                                                        <div className="flex-1">
                                                            <label className="block text-sm font-medium text-gray-700">Rate</label>
                                                            <input
                                                                type="text"
                                                                value={`$${rate}`}
                                                                onChange={(e) => setRate(e.target.value.replace(/[^0-9.]/g, ''))}
                                                                onBlur={() => setRate(parseFloat(rate).toFixed(2))}
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                placeholder="$0.00"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Frequency dropdown */}
                                                    <label className="block text-lg font-semibold text-gray-700 mt-4">Frequency</label>
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

                                                    {/* Frequency Pattern */}
                                                    {dayOrMonth === 'day' && (
                                                        <div className="mt-4">
                                                            <select
                                                            value={daySelection}
                                                            onChange={(e) => handleRadioChange(e.target.value)}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            >
                                                            {['Select Day(s)', 'Weekend', 'Weekdays', 'Everyday'].map((option) => (
                                                                <option key={option} value={option}>
                                                                {option}
                                                                </option>
                                                            ))}
                                                            </select>
                                                        </div>
                                                    )}


                                                    {/* Checkboxes for individual days, shown only when 'Select Day(s)' is chosen */}
                                                    {daySelection === 'Select Day(s)' && dayOrMonth === 'day' && (
                                                    <fieldset>
                                                    
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
                                                                className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
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
                                                {/* TASK TABLE */}
                                                <label className="block text-lg font-semibold text-gray-700 mt-4">Tasks</label>
                                                <DragDropContext onDragEnd={onDragEnd}>
                                                    <Droppable droppableId="tasksDroppable">
                                                        {(provided) => (
                                                            <div
                                                                {...provided.droppableProps}
                                                                ref={provided.innerRef}
                                                                className="grow overflow-x-auto"
                                                            >
                                                                <div className="inline-block min-w-full align-middle">
                                                                    <div className="shadow ring-1 ring-black ring-opacity-5" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                                                                        <div className="min-w-full divide-y divide-gray-300">
                                                                            <section className="divide-y divide-gray-200 bg-white overflow-y-auto">
                                                                                {tasks.map((task, index) => (
                                                                                    <Draggable key={task.fieldData.__ID} draggableId={task.fieldData.__ID.toString()} index={index}>
                                                                                        {(provided) => (
                                                                                            <div
                                                                                                ref={provided.innerRef}
                                                                                                {...provided.draggableProps}
                                                                                                {...provided.dragHandleProps}
                                                                                                className="flex flex-row justify-between items-center py-4"
                                                                                            >
                                                                                                <div className="pl-4 text-md font-medium text-gray-900">
                                                                                                    <span className="pr-2">{task.fieldData.Action}</span>
                                                                                                    <span className="pr-2">{task.fieldData.Object}</span>
                                                                                                </div>
                                                                                                <div className="flex-1 text-sm font-light text-gray-600">
                                                                                                    <span className="pr-2">{task.fieldData['Extra details']}</span>
                                                                                                    <span className="pr-2">{task.fieldData.Comment}</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        )}
                                                                                    </Draggable>
                                                                                ))}
                                                                                {provided.placeholder}
                                                                            </section>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Droppable>
                                                </DragDropContext>
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
                                                type="button"
                                                className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                                onClick={() => handleFormSubmit()}
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
