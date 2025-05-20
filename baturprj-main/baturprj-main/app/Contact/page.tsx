// pages/HowItWorks.tsx

"use client"; // Add this line to mark the component as a client component

import Navbar from "@/app/components/Navbar"; // Adjust the path as necessary
import Footer from "@/app/components/Footer"; // Adjust the path as necessary
import Link from "next/link";
import { useState } from "react";

if (typeof window !== 'undefined') {
    // This code runs only in the browser
    console.log("This runs in the client");
}

export default function HowItWorks() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., sending data to an API)
        console.log('Form submitted:', formData);
        // Reset the form
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">


            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Contact Information</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto text-justify mb-8">
                    We would love to hear from you! Please fill out the form below to get in touch with us.
                </p>

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Send Message
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <Link href="/" className="text-blue-500 underline">
                        Go Back to Home
                    </Link>
                </div>
            </main>

        </div>
    );
}
