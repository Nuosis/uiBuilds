import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

/*
const navigation = [
    { name: 'Worksheets', href: '#', current: true },
    {
        name: 'Active',
        current: false,
        children: [
        { name: 'General Janitorial 2021', href: '#' },
        { name: 'Periodic Tasks', href: '#' },
        ],
    },
    {
        name: 'Inactive',
        current: false,
        children: [
        { name: 'General Janitorial', href: '#' },
        ],
    },
]*/

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function setSelectedID(selectedID) {
    const obj = {selectedID, function: "select"}
    FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
}

const newOrder = (input) => {
    const obj = {input, function: "newOrder"}
    FileMaker.PerformScript("customers . loadWebViewer . callbacks", JSON.stringify(obj));
};

export default function SideBar({ navigation, selectedID }) {
    console.log("sideBar:",selectedID, "navigation:", navigation)
    return (
        <div className="flex grow flex-col gap-y-5 overflow-y-auto h-full rounded-l-lg border-r border-gray-200 bg-slate-900 px-6">
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                                <li key={item.ID}>
                                    {!item.children ? (
                                        <a
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-slate-900' : 'hover:bg-gray-50',
                                            'rounded-lg block mt-1.5 py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-300',
                                            'flex flew-row columns-2 justify-between'
                                        )}
                                        >
                                        {item.name}
                                            <button className="w-12 flex justify-center items-center" onClick={() => newOrder(item.name)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                </svg>
                                            </button>
                                        </a>
                                    ) : (
                                        <Disclosure as="div" defaultOpen={selectedID && item.children?.some(subItem => subItem.ID === selectedID)}>
                                        {({ open }) => (
                                            <>
                                            <Disclosure.Button
                                                className={classNames(
                                                item.current ? 'bg-slate-900' : 'hover:bg-slate-800',
                                                'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-400'
                                                )}
                                            >
                                                <ChevronRightIcon
                                                className={classNames(
                                                    open ? 'rotate-90 text-gray-400' : 'text-gray-400',
                                                    'h-5 w-5 shrink-0'
                                                )}
                                                aria-hidden="true"
                                                />
                                                {item.name}
                                            </Disclosure.Button>
                                            <Disclosure.Panel as="ul" className="mt-1 px-2">
                                                {item.children.map((subItem) => {
                                                    // console.log(subItem);
                                                    return (
                                                    <li key={subItem.ID}>
                                                        <Disclosure.Button
                                                        as="a"
                                                        href={subItem.href}
                                                        data-id={subItem.ID}
                                                        className={classNames(
                                                            subItem.ID === selectedID ? 'bg-slate-800' : 'hover:bg-slate-800',
                                                            'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-400'
                                                        )}
                                                        onClick={() => selectedID !== null && setSelectedID(subItem.ID)}
                                                        >
                                                        {subItem.name}
                                                        </Disclosure.Button>
                                                    </li>
                                                    );
                                                })}
                                            </Disclosure.Panel>
                                            </>
                                        )}
                                        </Disclosure>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );    
}
