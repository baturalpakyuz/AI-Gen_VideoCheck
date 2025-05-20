AI Video Detection System

A web-based platform for real-time detection of AI-generated videos, combining Nginx, Sightengine's AI API, and a hybrid PHP/Python/Flask backend. Designed for security, content moderation, and abuse prevention. It is important that this project has not been proven to correctly evaluate all the videos. This project is decided in February 2024 and finished in May 2024.

Features
- Real-Time Analysis: Instant frame-by-frame AI detection via Sightengine
- Modular Architecture:
  * Nginx web server for static assets and reverse proxying
  * PHP frontend for UI rendering
  * Flask (Python) API wrapper for AI integration
- Low Latency: Optimized pipeline for rapid video processing
- Cross-Platform: Windows-compatible deployment
- 
Example:


![Image](https://github.com/user-attachments/assets/b6695ff9-192e-47f8-9e87-41b7aabcfab0)



Prerequisites
- Windows 10/11
- Nginx 1.18+
- PHP 8.1+ (CGI enabled)
- Python 3.8+
- Sightengine API credentials

Installation & Execution

1. Clone Repository
git clone https://github.com/baturalpakyuz/ai-video-detection.git
cd ai-video-detection

2. Configure Components

NGINX Setup
-----------------
1. Navigate to Nginx directory (default: C:/nginx)
cd C:/nginx

2. Start Nginx server
start nginx

[Image: nginx.exe Startup Commands]

PHP-CGI Initialization
----------------------
Run as Administrator in CMD:
php-cgi.exe -b 127.0.0.1:9123

[Image: PHP CGI Startup]

Flask API Launch
----------------
1. Install dependencies
pip install -r requirements.txt

2. Start Flask backend
python api/app.py

[Image: Flask API Startup]

3. Configure Environment
Create .env file with your Sightengine credentials:
SIGHTENGINE_USER=your_username
SIGHTENGINE_SECRET=your_api_secret

Usage Guide
1. Access the web interface at http://localhost
2. Upload video files (MP4, MOV, AVI)
3. View real-time detection results
4. Review analysis report with AI-generated content probability

[Image: Workflow Diagram - Upload → Analyze → Results]

Future Improvements
1. Cloud Deployment
   - Implement SSL/TLS via Let's Encrypt
   - Use tunneling tools (ngrok/LocalTonet) for secure web access

2. Enhanced API Capacity
   - Upgrade to Sightengine Premium (10,000+ frames/day)
   - Add multi-engine fallback support

3. UI/UX Expansion
   - Add informational pages:
     * /about - Project details
     * /how-it-works - Technical explanation
     * /disclaimer - Accuracy limitations
     * /contact - Support channels
   - Implement user authentication

License
This project is licensed under the MIT License - see LICENSE file for details.

Acknowledgments
- Sightengine for AI detection API
- Nginx team for high-performance web server
- Flask/PHP open-source communities
- Contributors to Python computer vision libraries

Important Note: Free-tier Sightengine accounts are limited to 500 frames/day. For commercial use, consider Sightengine enterprise plans.
