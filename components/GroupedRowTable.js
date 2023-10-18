import { Fragment } from 'react'

const worksheets = [
    {
        state: 'Active',
        details: [
            { name: 'General Janitorial', ID: 'UUID1', startDate: '10-23-2020' },
            { name: 'Periodic Tasks', ID: 'UUID2', startDate: '01-01-2021'  },
        ],
    },
    {
        state: 'Inactive',
        details: [
            { name: 'General Janitorial', ID: 'UUID3', startDate: '08-13-2018' },
        ],
    },
    // More people...
    ]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function GroupedRowTable() {
    return (
    <div className="pr-px sm:pr-4 lg:pr-6">
        <table className="min-w-full divide-y divide-gray-300">
            <tbody className=" bg-white">
                {worksheets.map((worksheet) => (
                <Fragment key={worksheet.state}>
                    <tr className="border-t border-gray-200">
                        <th
                            colSpan={5}
                            scope="colgroup"
                            className="bg-gray-200 py-3.5 px-4 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                        >
                            {worksheet.state}
                        </th>
                    </tr>
                    {worksheet.details.map((detail, worksheetIdx) => (
                    <tr
                        key={detail.ID}
                        className={classNames(worksheetIdx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                    >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-md font-medium text-gray-900 sm:pl-3">
                        {detail.name}
                        <p className="text-sm font-light text-gray-500">{detail.startDate}</p>
                        </td>
                    </tr>
                    ))}
                </Fragment>
                ))}
            </tbody>
        </table>
    </div>
    )
}
