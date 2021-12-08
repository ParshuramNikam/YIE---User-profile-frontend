import { useState } from 'react'
import { Tab } from '@headlessui/react';
import MyProfileTab from './MyProfileTab';
import SchoolProfileTab from './SchoolProfileTab';
import TeacherProfilesTab from './TeacherProfilesTab';
import StudentProfileTab from './StudentProfileTab';
import AddProfileTab from './AddProfileTab';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function UserProfileSection() {
    const [currentTabIndex, setCurrentTabIndex] = useState(0)
    let [tabHeadng] = useState(["My Profile", "School Profile", "Teacher Profiles", "Student Profile", "Add Prodile"]);

    return (
        <div className="lg:w-4/5 lg:mx-auto px-2 mx-5 md:mx-10 lg:mx-14 mt-5 mb-10 sm:px-0">
            <Tab.Group
                onChange={(index) => setCurrentTabIndex(index)}
            >
                <Tab.List className="flex p-1.5 space-x-1 bg-blue-100 rounded-xl"
                    onChange={() => console.log("Change")}
                >
                    {tabHeadng.map((heading) => (
                        <Tab
                            onClick={() => console.log(heading)}
                            onChange={() => console.log("Change")}
                            key={heading}
                            className={({ selected }) =>
                                classNames(
                                    'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                                    selected
                                        ? 'bg-white shadow'
                                        : 'text-blue-700  hover:text-indigo-700'
                                )
                            }
                        >
                            {heading}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-3">
                    {tabHeadng.map((heading, idx) => (
                        <Tab.Panel
                            key={idx}
                            className={classNames(
                                'bg-blue-100 rounded-xl p-3 px-3 py-5 text-left',
                                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                            )}
                        >

                            { currentTabIndex === 0 ? <MyProfileTab /> : null }
                            { currentTabIndex === 1 ? <SchoolProfileTab /> : null }
                            { currentTabIndex === 2 ? <TeacherProfilesTab/> : null }
                            { currentTabIndex === 3 ? <StudentProfileTab/> : null }
                            { currentTabIndex === 4 ?<AddProfileTab/> : null }

                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

