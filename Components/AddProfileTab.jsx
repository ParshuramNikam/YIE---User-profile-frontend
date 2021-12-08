import { useState, useEffect } from 'react'


const AddProfileTab = () => {

    const [userType, setUserType] = useState("");
    const [userDetails, setUserDetails] = useState({});
    const [savedUserDetails, setSavedUserDetails] = useState({});

    const [showSavedUser, setShowSavedUser] = useState(false);

    const addUserHandler = async () => {

        if (!userType) return alert("Select user type")

        let url;
        if (userType.toLowerCase() === 'teacher') {
            url = `http://localhost:5000/profile/teacher`
            if (userDetails.subjects && userDetails.subjects.length > 0) {
                setUserDetails({ ...userDetails, subjects: userDetails.subjects.split(',') });
            }
        }
        else if (userType.toLowerCase() === 'student') {
            url = `http://localhost:5000/profile/student`
        }

        fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        }).then((res) => res.json())
            .then((result) => {
                if (result.status === 'failed') {
                    const message = result.message;
                    alert(message)
                    return 
                }
                setShowSavedUser(true);
                setSavedUserDetails(result)
            }).catch((err) => console.log(err))
    }

    return (
        <section className="flex flex-wrap md:flex-nowrap">
            <div className="w-full md:w-1/2 px-5 rounded py-5 m-5">
                <h1 className="uppercase text-2xl font-semibold text-indigo-600">
                    Add User
                </h1>

                {/* ===================== */}

                <div className="relative border-none w-full mb-2 mt-5">
                    <select className="cursor-pointer bg-white leading-5 text-gray-500 appearance-none border-none inline-block py-3 pl-3 pr-10 rounded leading-tight w-full"
                        onChange={(e) => { setUserType(e.target.value); setUserDetails({}); }}
                    >
                        <option selected disabled > -- Add User Type -- </option>
                        <option className="py-2" value="teacher">Teacher</option>
                        <option className="py-2" value="student">Student</option>
                    </select>
                    <div className="text-gray-500 pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                {/* ===================== */}

                {
                    userType === 'teacher' &&
                    <>
                        <input type='text' placeholder="Add Name of Teacher" className="w-full my-6 px-4 py-2 border-2 rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white"
                            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                        />
                        <input type='text' placeholder="Teacher Id" className="w-full my-6 px-4 py-2 border-2 rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white"
                            onChange={(e) => setUserDetails({ ...userDetails, id: e.target.value })}
                        />
                        <input type="number" placeholder="Add Contact" className="w-full mt-2 mb-6 px-4 py-2 border-2 rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white"
                            onChange={(e) => setUserDetails({ ...userDetails, contact: e.target.value })}
                        />
                        <p>Enter '<strong>,</strong>'(comma) separated subject names:</p>
                        <input type="text" placeholder="English, Maths, Science" className="w-full mt-2 mb-6 px-4 py-2 border-2 rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white"
                            onChange={(e) => setUserDetails({ ...userDetails, subjects: e.target.value })}
                        />
                        <input type='text' placeholder="Add School ID" className="w-full mt-2 mb-6 px-4 py-2 border-2 rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white"
                            onChange={(e) => setUserDetails({ ...userDetails, schoolId: e.target.value })}
                        />
                        <input type='text' placeholder="Delegation" className="w-full mt-2 mb-6 px-4 py-2 border-2 rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white"
                            onChange={(e) => setUserDetails({ ...userDetails, delegation: e.target.value })}
                        />

                        <div className="relative border-none w-full mb-6">
                            <select className="cursor-pointer bg-white leading-5 text-gray-500 appearance-none border-none inline-block py-3 pl-3 pr-10 rounded leading-tight w-full"
                                onChange={(e) => setUserDetails({ ...userDetails, rights: e.target.value })}
                            >
                                <option disabled > -- Access Rights -- </option>
                                <option className="py-2" value="Right1">Right1</option>
                                <option className="py-2" value="Right2">Right2</option>
                            </select>
                            <div className="text-gray-500 pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <button className="my-3 mb-5 bg-blue-500 text-white rounded px-7 text-lg py-2 hover:bg-blue-600"
                            onClick={() => addUserHandler()}
                        >
                            Add User
                        </button>
                    </>
                }

                {
                    userType === 'student' &&
                    <>
                        <input type='text' placeholder="Add Name of Student" className="w-full my-6 px-4 py-2 border-2 rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white"
                            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                        />
                        <input type='text' placeholder="Student Id" className="w-full my-6 px-4 py-2 border-2 rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white"
                            onChange={(e) => setUserDetails({ ...userDetails, id: e.target.value })}
                        />
                        <input type="number" placeholder="Contact" className="w-full mt-2 mb-6 px-4 py-2 border-2 rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white"
                            onChange={(e) => setUserDetails({ ...userDetails, contact: e.target.value })}
                        />
                        <input type="text" placeholder="Add User profile URL" className="w-full mt-2 mb-6 px-4 py-2 border-2 rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white"
                            onChange={(e) => setUserDetails({ ...userDetails, profileUrl: e.target.value })}
                        />
                        <input type='text' placeholder="Add School ID" className="w-full mt-2 mb-6 px-4 py-2 border-2 rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white"
                            onChange={(e) => setUserDetails({ ...userDetails, schoolId: e.target.value })}
                        />

                        <div className="relative border-none w-full mb-6">
                            <select className="cursor-pointer bg-white leading-5 text-gray-500 appearance-none border-none inline-block py-3 pl-3 pr-10 rounded leading-tight w-full"
                                onChange={(e) => setUserDetails({ ...userDetails, rights: e.target.value })}
                            >
                                <option disabled > -- Access Rights -- </option>
                                <option className="py-2" value="Right1">Right1</option>
                                <option className="py-2" value="Right2">Right2</option>
                            </select>
                            <div className="text-gray-500 pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <button className="my-3 mb-5 bg-blue-500 text-white rounded px-7 text-lg py-2 hover:bg-blue-600"
                            onClick={() => addUserHandler()}
                        >
                            Add User
                        </button>
                    </>
                }

            </div>

            {/* ----------------------------------------------------------------------------------------------------- */}

            {
                showSavedUser
                    ? <div className="w-full md:w-1/2 px-5 rounded py-5 m-5 ">
                        <h1 className="uppercase text-2xl font-semibold text-indigo-600">
                            User Created
                        </h1>
                        <div className="text-blue-500 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                            </svg>
                        </div>
                        {
                            Object.keys(savedUserDetails).map((key, index) => {
                                return (
                                    key !== "_id" || key !== "__v"
                                        ? key === "school"
                                            ? <div key={index}>
                                                <p class="text-indigo-500 capitalize text-sm mt-2">School ID</p>
                                                <input disabled value={savedUserDetails["school"].schoolId} type='text' placeholder="" className="w-full mb-3 mt-0.5 px-4 py-2 border-2 rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white" />
                                            </div>
                                            : <div key={index}>
                                                <p class="text-indigo-500 text-sm mt-2">{key}</p>
                                                <input disabled value={savedUserDetails[key]} type='text' placeholder="" className="w-full mb-3 mt-0.5 px-4 py-2 border-2 rounded-lg text-gray-700 focus:outline-none focus:border-black focus:shadow bg-white" />
                                            </div>
                                        : null
                                )
                            })
                        }
                    </div>
                    : null
            }
        </section>
    )
}

export default AddProfileTab
