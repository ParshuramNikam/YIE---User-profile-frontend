// import Image from 'next/image'

import Head from 'next/head'
import UserProfileSection from '../Components/UserProfileSection'

export default function Home() {
	return (
		<>
			<Head>
				<title>School Admin Dashboard - User Profile Section</title>
				<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
			</Head>

			<h1 className="text-3xl uppercase my-4 text-center font-semibold">School Admin Dashboard</h1>
			<UserProfileSection />
		</>
	)
}
