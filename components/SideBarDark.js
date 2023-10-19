
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
]
    
function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    
    export default function SideBarDark() {
        return (
        <div className="flex grow flex-col gap-y-5 overflow-y-auto h-full bg-gray-900 px-6">
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                            <li key={item.name}>
                                <a
                                href={item.href}
                                className={classNames(
                                    item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                                >
                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                {item.name}
                                {item.count ? (
                                    <span
                                    className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
                                    aria-hidden="true"
                                    >
                                    {item.count}
                                    </span>
                                ) : null}
                                </a>
                            </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
        )
    }