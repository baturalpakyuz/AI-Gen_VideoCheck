// pages/api/process_video_and_ai_detection.ts

import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Define the folder where uploads will be saved
const UPLOAD_FOLDER = path.join(process.cwd(), 'uploads');

export const config = {
    api: {
        bodyParser: false, // Disable body parsing so we can handle it ourselves
    },
};

// Function to process the video (you need to implement this)
const process_video_and_ai_detection = (videoFilePath: string) => {
    // Your video processing logic here
    console.log('Processing video:', videoFilePath);
};

const run_project = (req: NextApiRequest, res: NextApiResponse) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error parsing the files' });
        }

        // Retrieve the uploaded video file from the parsed files
        const videoFile = files.videoFile;

        // Check if a file was uploaded
        if (!videoFile || Array.isArray(videoFile) || videoFile.size === 0) {
            return res.status(400).json({ error: 'No selected file' });
        }

        // Ensure the upload folder exists
        if (!fs.existsSync(UPLOAD_FOLDER)) {
            fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
        }

        // Define the path to save the uploaded file
        const videoFilePath = path.join(UPLOAD_FOLDER, videoFile.originalFilename || 'uploaded_video.mp4');

        // Move the uploaded file to the specified directory
        fs.rename(videoFile.filepath, videoFilePath, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving the file' });
            }

            // Call your processing function
            process_video_and_ai_detection(videoFilePath);

            return res.status(200).json({ message: 'MyProject executed successfully!' });
        });
    });
};

export default run_project;
