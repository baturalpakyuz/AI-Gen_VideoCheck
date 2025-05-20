// pages/HowItWorks.tsx

import Navbar from "@/app/components/Navbar"; // Adjust the path as necessary
import Footer from "@/app/components/Footer"; // Adjust the path as necessary
import Link from "next/link";
if (typeof window !== 'undefined') {
    // This code runs only in the browser
    console.log("This runs in the client");
}

export default function HowItWorks() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
            
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">How It Works</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto text-justify mb-8">
                    The application is designed to process videos by dividing them into frames, analyzing these frames through an external API, and calculating an average score based on the results of the analysis. When a user uploads a video, the application extracts a specified number of frames from it, either at regular intervals or based on a defined frame rate. Each extracted frame is then sent to an external application via an API, which may involve converting the frames into a suitable format and constructing an HTTP request. This communication also includes handling any necessary authentication and headers as outlined in the API documentation.<br /><br />

                    Once the API receives the frames, it processes them using the algorithms that provided by the external API, evaluate the content for AI metrics.
                    The API returns a percentage score for each frame, indicating how much of it is approximately AI generated.
                    The application then sums these scores and calculates the average to provide a representation of the API's assessment of the video's overall content. Finally, this average score is displayed on the screen, allowing users to guess the possible percentage of the video as assessed by the ApI.
                    Throughout the process, the application includes error handling and user feedback mechanisms to ensure a smooth user experience.
                </p>
                <div className="text-center">
                    <Link href="/" className="text-blue-500 underline">
                        Go Back to Home
                    </Link>
                </div>
            </main>

        </div>
    );
}
