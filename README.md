Project Overview
AI Video Detection System is a web-based solution designed for real-time identification of AI-generated videos. By combining the high‐performance Nginx web server, Sightengine’s AI detection API, and a versatile backend stack (PHP, Python, and Flask), this system delivers accurate, low-latency detection suitable for security, content-moderation, and abuse-prevention scenarios.

Features
Real-Time Detection: Streams video frames through Sightengine for on-the-fly analysis.

Modular Architecture:

Nginx serves static assets and proxies API calls.

PHP handles front-end routing and HTML rendering.

Flask (Python) exposes a REST API that wraps Sightengine’s detection endpoints.

Scalable Design: Easily swap Sightengine for another AI service or deploy behind a load balancer.

Intuitive UI: Simple web interface lets users upload or stream videos and view detection results live.

System Architecture
text
Copy
Edit
┌──────────┐     ┌───────────┐     ┌─────────────┐
│  Browser │←───▶│   Nginx   │←───▶│   PHP/UI    │
└──────────┘     └───────────┘     └────┬────────┘
                                           │
                                           ▼
                                    ┌─────────────┐
                                    │  Flask API  │
                                    └────┬────────┘
                                           │
                                           ▼
                                    ┌─────────────┐
                                    │ Sightengine │
                                    └─────────────┘
Installation & Execution
Before running, ensure you have Nginx, PHP-CGI, and Python 3.8+ installed on your Windows machine.

1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/AI-Gen_VideoCheck.git
cd AI-Gen_VideoCheck
2. Step 5.1 – Start Nginx
Nginx is installed in C:\nginx (adjust if yours differs).

Open Visual Studio PowerShell and run:

powershell
Copy
Edit
cd C:\nginx
.\nginx.exe
Figure 5.1: Nginx execution in PowerShell.

3. Step 5.2 – Launch PHP-CGI
PHP-CGI is bundled inside your Nginx folder.

Open an Administrator CMD and run:

cmd
Copy
Edit
cd C:\nginx
php-cgi.exe -b 127.0.0.1:9123
This binds PHP processing to port 9123.
Figure 5.2: php-cgi.exe execution.

4. Step 5.3 – Run the Flask App
Ensure your Python virtual environment is activated and dependencies installed (pip install -r requirements.txt). Then:

bash
Copy
Edit
cd backend
python app.py
This starts the Flask API on its configured host/port.
Figure 5.3: Flask application startup.

Usage
Open your browser to http://127.0.0.1:80 (or custom Nginx port).

Upload or stream a video file via the web interface.

Watch real-time AI-detection results appear below the video.

Further Improvements
6.1 Web-Accessible Deployment
Deploy on a public-facing server or use tunneling tools (e.g., LocalTunnel, ngrok) to expose your local Nginx securely. Consider purchasing a domain and obtaining SSL certificates.

6.2 Enhance API Throughput
Sightengine’s free tier limits you to 500 frames/day (~15 s of video). To handle longer videos, upgrade to a paid API plan or integrate additional detection engines for load-sharing.

6.3 User Interface & Documentation
Add dedicated pages for About, How It Works, Contact Us, and Disclaimer to guide end users and clarify AI-detection accuracy and limitations.

License
This project is licensed under the MIT License. See LICENSE for details.

Acknowledgments
Sightengine for the powerful AI-detection API

Nginx for reliable web serving

Open-source communities for PHP, Flask, and PyPI packages used throughout this system
