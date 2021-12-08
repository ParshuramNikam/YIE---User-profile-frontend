import { useState } from 'react'

const MyProfileTab = () => {
    const [data, setData] = useState({
        name: "",
        school: "",
        schoolId: "",
        adminId: ""
    })

    const [makeEditable, setEditable] = useState(false);

    const getSchoolProfile = () => {
        console.log("getting profile");
        fetch('http://localhost:5000/profile/school/102')
            .then((res) => res.json())
            .then((profile) => setData({
                name: profile.name,
                school: profile.school,
                schoolId: profile.schoolId,
                adminId: profile.adminId
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

    return (
        <>
            <div className="mx-3 mt-3 text-left">
                <div className="flex gap-5 mb-7">
                    <h1 className="w-4/12 text-blue-600 text-lg font-bold underline">My School</h1>
                    {/* <input type='text' placeholder="Enter your input here" className={`w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white disabled:bg-white`}
                        disabled={!makeEditable}
                        value={data.mySchool} onChange={(e) => makeEditable ? setData({ ...data, mySchool: e.target.value }) : null}
                    /> */}
                </div>

                <div className="flex justify-center gap-5 mb-3">
                    <h1 className="w-4/12 text-blue-600 font-medium">Name</h1>
                    <input type='text' placeholder="Enter your input here" className={`w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white`}
                        disabled={!makeEditable}
                        value={data.name} onChange={(e) => makeEditable ? setData({ ...data, name: e.target.value }) : null}
                    />
                </div>

                <div className="flex justify-center gap-5 mb-3">
                    <h1 className="w-4/12 text-blue-600 font-medium">School</h1>
                    <input type='text' placeholder="Enter your input here" className={`w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white`}
                        disabled={!makeEditable}
                        value={data.school} onChange={(e) => makeEditable ? setData({ ...data, school: e.target.value }) : null}
                    />
                </div>

                <div className="flex justify-center gap-5 mb-3">
                    <h1 className="w-4/12 text-blue-600 font-medium">Admin ID</h1>
                    <input type='text' placeholder="Enter your input here" className={`w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white`}
                        disabled={!makeEditable}
                        value={data.adminId} onChange={(e) => makeEditable ? setData({ ...data, adminId: e.target.value }) : null}
                    />
                </div>

                <div className="flex justify-center gap-5 mb-3">
                    <h1 className="w-4/12 text-blue-600 font-medium">School ID</h1>
                    <input type='text' placeholder="Enter your input here" className={`w-full mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white`}
                        disabled={!makeEditable}
                        value={data.schoolId} onChange={(e) => makeEditable ? setData({ ...data, schoolId: e.target.value }) : null}
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

        </>
    )
}

export default MyProfileTab
