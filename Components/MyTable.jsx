import { useState, useEffect } from 'react'
import Link from 'next/link';

const MyTable = ({ tabTitle }) => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        let url;
        if (tabTitle === "Teacher Profile") url = `http://localhost:5000/profile/teacher`
        else if (tabTitle === "Student Profile") url = `http://localhost:5000/profile/student`

        fetch(url)
            .then((res) => res.json())
            .then((result) => setTableData(result))
            .catch((err) => console.log(err))
    }, [])

    return (
        <section>
            <div className="border-2 w-full">
                {
                    tableData.length > 0
                    && <>
                        <table className="w-full border-2 border-blue-500">
                            <thead className="">
                                {
                                    (tabTitle === "Teacher Profile") &&
                                    <tr>
                                        <th className="capitalize px-6 py-2 bg-blue-500 text-white">
                                            Name
                                        </th>
                                        <th className="capitalize px-6 py-2 bg-blue-500 text-white">
                                            ID
                                        </th>
                                        <th className="capitalize px-6 py-2 bg-blue-500 text-white">
                                            Subject
                                        </th>
                                        <th className="capitalize px-6 py-2 bg-blue-500 text-white">
                                            Delegation
                                        </th>


                                    </tr>
                                }
                                {
                                    (tabTitle === "Student Profile") &&
                                    <tr>
                                        <th className="capitalize px-6 py-2 bg-blue-500 text-white">
                                            Name
                                        </th>
                                        <th className="capitalize px-6 py-2 bg-blue-500 text-white">
                                            ID
                                        </th>
                                        <th className="capitalize px-6 py-2 bg-blue-500 text-white">
                                            Profile
                                        </th>
                                    </tr>
                                }
                            </thead>

                            <tbody>
                                {
                                    (tabTitle === "Teacher Profile") && tableData.length > 0 && tableData.map((rowData, index) => {
                                        return (
                                            <tr key={index} v-for="item in items" className={index % 2 === 1 ? 'bg-white' : null}>
                                                <th className="px-6 py-2 text-xs text-gray-500">
                                                    {rowData.name}
                                                </th>
                                                <th className="px-6 py-2 text-xs text-gray-500">
                                                    {rowData.id}
                                                </th>
                                                <th className="px-6 py-2 text-xs text-gray-500">
                                                    {rowData.subjects}
                                                </th>
                                                <th className="px-6 py-2 text-xs text-gray-500">
                                                    {rowData.delegation}
                                                </th>
                                            </tr>
                                        )
                                    })
                                }
                                {
                                    tabTitle === "Student Profile" && tableData.length > 0 && tableData.map((rowData, index) => {
                                        return (
                                            <tr key={index} v-for="item in items" className={index % 2 === 1 ? 'bg-white' : null}>
                                                <th className="px-6 py-2 text-xs text-gray-500">
                                                    {rowData.name}
                                                </th>
                                                <th className="px-6 py-2 text-xs text-gray-500">
                                                    {rowData.id}
                                                </th>
                                                {
                                                    rowData.profileUrl
                                                        ? <th className="px-6 py-2 text-xs underline text-indigo-500">
                                                            <Link href={rowData.profileUrl} className="">
                                                                Profile
                                                            </Link>
                                                        </th>
                                                        : "-"
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                        {/* Input tags for search by:- */}
                        {/* <div className='flex'>
                            input
                        </div> */}

                    </>
                }
            </div>
        </section>
    )
}

export default MyTable
