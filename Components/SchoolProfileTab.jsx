import { useState, useEffect } from 'react'

const SchoolProfileTab = () => {
    const [data, setData] = useState({
        schoolName: "",
        schoolId: "",
        address: "",
        noOfEmp: "",
        totalClasses: "",
        overallCompletion: "",
    })

    const [makeEditable, setEditable] = useState(false);

    const getSchoolProfile = () => {
        console.log("getting profile");
        fetch('http://localhost:5000/profile/school/102')
            .then((res) => res.json())
            .then((profile) => setData({
                schoolName: profile.name,
                schoolId: profile.schoolId,
                address: profile.address,
                noOfEmp: profile.noOfEmp,
                totalClasses: profile.totalClasses,
                overallCompletion: profile.overallCompletion,
            }))
            .catch((err) => console.log(err))
    }

    const updateSchoolProfile = () => {
        console.log("updating");
        fetch('http://localhost:5000/profile/school/102', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PATCH",
            body: JSON.stringify(data)
        }).then((res) => res.json())
            .then((result) => {
                setEditable(false);
                setData({
                    name: result.updatedSchoolProfile.name,
                    school: result.updatedSchoolProfile.school,
                    schoolId: result.updatedSchoolProfile.schoolId,
                    adminId: result.updatedSchoolProfile.adminId
                })
            })
            .catch((err) => console.log(err))
    }

    useState(() => {
        getSchoolProfile();
    }, [])

    const [dropDownOptions] = useState(["Daily Attendace", "Average Scores", "Monthly Performance"]);

    return (
        <>
            <div className="mx-3 mt-5 text-left">
                <div className="flex gap-5 mb-3">
                    <h1 className="w-1/5 text-blue-600 text-lg font-bold underline">School Name</h1>
                    <input type='text' placeholder="Enter your input here" className={`w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white disabled:bg-white`}
                        disabled={!makeEditable}
                        value={data.schoolName} onChange={(e) => makeEditable ? setData({ ...data, schoolName: e.target.value }) : null}
                    />
                </div>

                <div className="flex gap-5 mb-3">
                    <h1 className="w-1/5 text-blue-600 font-medium">School ID</h1>
                    <input type='text' placeholder="Enter your input here" className={`w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white`}
                        disabled={!makeEditable}
                        value={data.schoolId} onChange={(e) => makeEditable ? setData({ ...data, schoolId: e.target.value }) : null}
                    />
                </div>

                <div className="flex gap-5 mb-3">
                    <h1 className="w-1/5 text-blue-600 font-medium">Address</h1>
                    <input type='text' placeholder="Enter your input here" className={`w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white`}
                        disabled={!makeEditable}
                        value={data.address} onChange={(e) => makeEditable ? setData({ ...data, address: e.target.value }) : null}
                    />
                </div>

                <div className="flex gap-5 mb-3">
                    <h1 className="w-1/5 text-blue-600 font-medium">No. of Employees</h1>
                    <input type='text' placeholder="Enter your input here" className={`w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white`}
                        disabled={!makeEditable}
                        value={data.noOfEmp} onChange={(e) => makeEditable ? setData({ ...data, noOfEmp: e.target.value }) : null}
                    />
                </div>

                <div className="flex gap-5 mb-3">
                    <h1 className="w-1/5 text-blue-600 font-medium">Total Classes</h1>
                    <input type='text' placeholder="Enter your input here" className={`w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white`}
                        disabled={!makeEditable}
                        value={data.totalClasses} onChange={(e) => makeEditable ? setData({ ...data, totalClasses: e.target.value }) : null}
                    />
                </div>

                <div className="flex gap-5 mb-3">
                    <h1 className="w-1/5 text-blue-600 font-medium">Overall Completion</h1>
                    <input type='text' placeholder="Enter your input here" className={`w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white`}
                        disabled={!makeEditable}
                        value={data.overallCompletion} onChange={(e) => makeEditable ? setData({ ...data, overallCompletion: e.target.value }) : null}
                    />
                </div>
            </div>

            <button className="my-3 mb-5 bg-blue-500 text-white rounded px-4 py-2.5"
                onClick={() => {
                    if (makeEditable) { updateSchoolProfile() }
                    else { getSchoolProfile(); }
                    setEditable(!makeEditable);
                }}
            >
                {makeEditable ? "Update Profile" : "Edit Profile"}
            </button>

            <div className="relative w-full border-none w-max">
                <select className="bg-white leading-5 text-gray-500 appearance-none border-none inline-block py-3 pl-3 pr-10 rounded leading-tight w-full"
                    onChange={(e) => { e.target.value !== 'Select Aggregate Profile' ? console.log(e.target.value) : null }}
                >
                    <option disabled > -- Select Aggregate Profile -- </option>
                    {
                        dropDownOptions.map((optionTitle, index) =>
                            <option className="py-2" key={index} value={optionTitle}>{optionTitle}</option>
                        )
                    }
                </select>
                <div className="text-gray-500 pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            <button className="my-4 md:w-96 w-3/5 xl:w-96 py-2.5 px-5 bg-blue-500 text-white rounded"
                onClick={() => alert("Report Generated")}
            >
                Generate Aggregate Report
            </button>


        </>
    )
}

export default SchoolProfileTab
