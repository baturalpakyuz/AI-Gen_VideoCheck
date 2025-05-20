import os
import glob
import subprocess
import requests
import json
from flask import Flask, request, jsonify
import threading
import logging
import sys

app = Flask(__name__)

# Configure logging
logging.basicConfig(filename='process_video.log', level=logging.DEBUG, format='%(asctime)s %(message)s')


#process_video_and_ai_detection()
@app.route('/run_script', methods=['POST'])
def run_script():
    logging.info("Program is working...")

    video_directory = r"C:\nginx\php\uploads"
    files = os.listdir(video_directory)
    if not files:
        logging.error("No video files found in the directory.")
        return jsonify({'error': 'No video files found in the directory.'}), 400

    
    video_name = files[0]
    input_file = os.path.join(video_directory, video_name)
    logging.info("Function is called ")

    output_directory = r"C:\Users\asus\Desktop\VLCProject\Frames" + "\\"
 
    def process_video():
        # Extract 30 frames evenly spaced from the video
        ffmpeg_command = [
            'ffmpe', '-i', input_file,
            '-vf', 'fps=2', '-vsync', 'vfr',
            os.path.join(output_directory, 'frame_%04d.png')
        ]
        process = subprocess.Popen(ffmpeg_command, stderr=subprocess.PIPE)
        stderr_output, _ = process.communicate()
        if process.returncode != 0:
            logging.error("ffmpeg error: %s", stderr_output.decode())
            return False
        return True

    # Process video into frames
    if not process_video():
        return jsonify({'error': 'Failed to process video.'}), 500

    # Sightengine API parameters
    params = {
        'models': 'genai',
        'api_user': '****',
        'api_secret': '*****'
    }

    # List to store results and errors for all frames
    all_results = []

    logging.info("Program is working...")

   

    # Process video into frames
    process_video()

    # Iterate over each frame
    for file in glob.glob(os.path.join(output_directory, '*.png')):

        with open(file, 'rb') as file_obj:
            image_data = file_obj.read()

        r = requests.post('https://api.sightengine.com/1.0/check.json', params=params, files={'media': image_data})

        # Check if the request was successful
        if r.status_code == 200:
            output = r.json()
            all_results.append({'result': output, 'error': None})

        else:
            all_results.append({'result': None, 'error': {'status_code': r.status_code, 'message': r.text}})

    output_file_path = os.path.join(output_directory, "All_Json_Values.json")

    with open(output_file_path, 'w') as f:
        json.dump(all_results, f, indent=4)


      
    ai_generated_values = []
    with open(output_file_path, 'r') as f:
        data = json.load(f)
        for body in data:
            ai_generated = body.get('result', {}).get('type', {}).get('ai_generated')
            if ai_generated is not None:
                ai_generated_values.append(ai_generated)

        sum_values = 0
        array_size = len(ai_generated_values)
        for value in ai_generated_values:
            sum_values += value

        average = sum_values / array_size


    logging.info("Aggregated JSON response written to: %s", output_file_path)
    logging.info("Average value is: %f", average)    
    average = float(average)
    return jsonify({'average': average})
   

if __name__ == '__main__':
    app.run(debug=True)

