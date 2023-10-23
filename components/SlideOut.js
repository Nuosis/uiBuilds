import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'



export default function ShowTime({tableInfo, setTableInfo, open, setOpen}) {
    const totalTime = tableInfo.totalTime;
    const groupedTime = {
        'Monday': 0,
        'Tuesday': 0,
        'Wednesday': 0,
        'Thursday': 0,
        'Friday': 0,
        'Saturday': 0,
        'Sunday': 0,
    };
    const e = Object.keys(totalTime).filter((key) => 
        key.includes("Weekly") || key.includes("Bi Weekly") || key.includes("Semi Weekly")
        );

        // Loop through the keys in totalTime and sum the times based on your conditions
        Object.keys(totalTime).forEach((key) => {
            let time = totalTime[key];
            const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        
            if (key.startsWith("Weekly")) {
                daysOfWeek.forEach((day) => {
                    if (key.includes(day)) {
                        groupedTime[day] += time;
                    }
                });
            }
        
            if (key.startsWith("Bi Weekly") || key.startsWith("Semi Weekly")) {
                daysOfWeek.forEach((day) => {
                    if (key.includes(day)) {
                        groupedTime[day] += Math.ceil(time / 2);
                    }
                });
            }
    });

    return (
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-100" onClose={setOpen}>
            <div className="fixed inset-0" />
            <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            Time on Site
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                            <button
                                type="button"
                                className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-0"
                                style={{outline: 'none'}}
                                onClick={() => setOpen(false)}
                            >
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                            </div>
                        </div>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                            {/* Bar Chart for totalTime */}
                            <div>
                                {Object.keys(groupedTime).map((day) => (
                                    <div key={day} style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ flex: 1 }}>{day}</div>
                                        <div
                                            style={{
                                                height: '20px',
                                                background: '#334155',
                                                width: `${groupedTime[day]}px`,
                                                borderTopLeftRadius: '10px',
                                                borderBottomLeftRadius: '10px',
                                                borderBottomRightRadius: '10px',
                                                borderTopRightRadius: '10px'
                                            }}
                                        ></div><div className="w-32" style={{ marginLeft: '8px', color: (groupedTime[day] === 0 ? 'white' : 'inherit') }}>
                                            {`${Math.floor(groupedTime[day] / 60)}hrs ${groupedTime[day] % 60}mins`}
                                        </div>                                    
                                    </div>
                                ))}
                            </div>
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
