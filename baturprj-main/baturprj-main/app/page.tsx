// pages/index.tsx

"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export default function HomePage() {
    const [dragActive, setDragActive] = useState(false);
    const [videoFile, setVideoFile] = useState<File | null>(null); // State to hold the video file
    const [videoUploaded, setVideoUploaded] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files[0];

        if (file && file.type.startsWith("video/")) {
            setVideoFile(file); // Store the video file
            setVideoUploaded(true);
            console.log("Video file dropped:", file.name);
        } else {
            alert("Please upload a video file.");
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file && file.type.startsWith("video/")) {
            setVideoFile(file); // Store the video file
            setVideoUploaded(true);
            console.log("Video file selected:", file.name);
        } else {
            alert("Please select a video file.");
        }
    };

    const handleCreate = async () => {
        if (videoFile) {
            // Create a FormData object
            const formData = new FormData();
            formData.append('video', videoFile); // Append the video file to the form data

            try {
                // Upload videoFile to the API
                const response = await fetch('/process_video_and_ai_detection', {
                    method: 'POST',
                    body: formData,
                });

                // Handle the response
                if (!response.ok) {
                    throw new Error('Failed to upload video');
                }

                const data = await response.json();
                console.log('Upload successful:', data);
                // Optionally, set state or show a message to the user
                setVideoUploaded(false); // Reset uploaded state if needed
                setVideoFile(null); // Clear the video file state if needed
            } catch (error) {
                console.error('Error uploading video:', error);
                alert('There was an error uploading the video. Please try again.');
            }
        }
    };




    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
            <main className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                        Quick Start by Uploading a Video
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        This is a detector for videos created by Artificial Intelligence. Upload your high-quality videos to see approximate results!
                    </p>
                </section>

                {/* Upload Section */}
                <section
                    className={`mb-16 p-8 border-2 border-dashed rounded-lg transition-colors ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                            Drag and drop your video here, or click to select files
                        </p>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="fileUpload"
                        />
                        <label htmlFor="fileUpload" className="mt-4 text-white font-semibold text-lg bg-blue-500 py-2 px-4 mx-auto rounded-full outline outline-white cursor-pointer">
                            Select Files
                        </label>
                    </div>

                    {/* Create Button */}
                    {videoUploaded && (
                        <div className="text-center mt-8">
                            <button
                                className="text-white font-semibold text-lg bg-green-500 py-2 px-6 rounded-full outline outline-white"
                                onClick={handleCreate} // Call the handleCreate function
                            >
                                Create
                            </button>
                        </div>
                    )}
                </section>
            </main>

            {/* Custom styling for background gradient animation */}
            <style jsx>{`
                @keyframes gradientAnimation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .bg-gradient-to-b {
                    background-size: 200% 200%;
                    animation: gradientAnimation 10s ease infinite;
                }
            `}</style>
        </div>
    );
}
