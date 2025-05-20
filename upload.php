<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Design and Application Website</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
        }

        header {
            background-color: #333;
            color: #fff;
            padding: 10px 0;
            text-align: center;
            width: 100%;
            position: fixed;
            top: 0;
        }

       .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            align-items: center; /* Center align items horizontally */
}

        .content {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        footer {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 10px 0;
            position: fixed;
            bottom: 0;
            width: 100%;
        }

        #runScriptButton {
            font-size: 24px; /* Makes the button text bigger */
            padding: 15px 30px; /* Adds padding to the button */
            cursor: pointer; /* Changes the cursor to a pointer on hover */
        }

        #averageDisplay {
            margin-top: 20px; /* Adds some space between the button and the display text */
            font-size: 20px; /* Adjust the font size of the display text */
            text-align: center;
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <header>
        <h1>AI GENERATED VIDEO DETECTION</h1>
    </header>
    <div class="container">
    <button id="runScriptButton">Detect the Video</button>
 

   <script>
        $(document).ready(function() {
            $('#runScriptButton').click(function() {
                // Display a message when the button is clicked
                 $('#averageDisplay').text('Please wait while it is loading');
     
                // Make a POST request to the Flask server when the button is clicked
                 $.ajax({
                    type: 'POST',
                    url: '/run_script',
                    success: function(response) {
                        // Display the average value on the screen
                        if (response.average*100 > 50) {
                        $('#averageDisplay').text('The average value is: ' + response.average*100+'%. It is likely an AI video.');
                        }else {
                        $('#averageDisplay').text('The average value is: ' + response.average*100+'%. It is not likely an AI video.');
                        }
                        
                        alert('Program executed successfully!');
                    },
                    error: function(xhr, status, error) {
                        alert('Error executing the program ' + error);
                    }
                });
            });
        });
   </script>
   
        <div id="averageDisplay"></div>
    </div>
<?php
$targetDirectory = "C:/nginx/php/uploads/"; // Directory where uploaded videos will be saved
$targetFile = $targetDirectory . basename($_FILES["videoFile"]["name"]); // Path to the uploaded file
 // Attempt to move the uploaded file to the specified directory
    if (move_uploaded_file($_FILES["videoFile"]["tmp_name"], $targetFile)) {
        
        }
?>
<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $average = isset($_POST['average']) ? $_POST['average'] : 'No average value received';
} 
?>
   
    <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
     
</body>
</html>