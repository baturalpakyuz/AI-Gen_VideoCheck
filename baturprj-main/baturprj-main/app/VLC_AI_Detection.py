
import os
import glob
import subprocess
import requests
import json
from flask import Flask, request, jsonify
import logging

app = Flask(__name__)

# Configure logging
logging.basicConfig(filename='process_video.log', level=logging.DEBUG, format='%(asctime)s %(message)s')


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
    logging.info("Function is called")

    output_directory = r"C:\Users\asus\Desktop\VLCProject\Frames\\"

    def get_video_duration(input_file):
        """Get the duration of the video in seconds."""
        result = subprocess.run(
            ['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 
             'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', input_file],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT
        )
        return float(result.stdout)

    def process_video(input_file, output_directory, num_frames=20):
        """Extract a fixed number of frames from the video."""
        try:
            duration = get_video_duration(input_file)
        except ValueError as e:
            logging.error(f"Error getting video duration: {e}")
            return False

        interval = duration / num_frames

        ffmpeg_command = [
            'ffmpeg', '-i', input_file,
            '-vf', f'fps=1/{interval}', '-vsync', 'vfr',
            os.path.join(output_directory, 'frame_%04d.png')
        ]

        process = subprocess.Popen(ffmpeg_command, stderr=subprocess.PIPE)
        stderr_output, _ = process.communicate()
        if process.returncode != 0:
            logging.error("ffmpeg error: %s", stderr_output.decode())
            return False
        return True

    # Process video into frames
    if not process_video(input_file, output_directory):
        return jsonify({'error': 'Failed to process video.'}), 500

    # Sightengine API parameters
    params = {
        'models': 'genai',
        'api_user': '819870886',
        'api_secret': 'Ev7qjY9qPvxBR3P5TjzcnQPK5FJptQsy'
    }

    # List to store results and errors for all frames
    all_results = []

    logging.info("Program is working...")

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

    sum_values = sum(ai_generated_values)
    array_size = len(ai_generated_values)
    average = sum_values / array_size if array_size > 0 else 0

    logging.info("Aggregated JSON response written to: %s", output_file_path)
    logging.info("Average value is: %f", average)
    
    return jsonify({'average': average})


if __name__ == '__main__':
    app.run(debug=True)
