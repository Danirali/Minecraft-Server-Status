<?php

if (isset($_GET['start-server']) || $_GET['start-server'] === 'true') {

  $filePath = __DIR__ . "/settings.json"; // Replace with actual path if needed
  $scriptPath = __DIR__ . "/status/start.sh"; // Replace with actual path if needed

  // Check for settings.json first
  if (file_exists($filePath)) {
    $jsonData = json_decode(file_get_contents($filePath), true);

    if (json_last_error() === JSON_ERROR_NONE) {
      // Check for keys after successful JSON decode
        $serverFilename = $jsonData['Server Filename'];
        $maximumRAM = $jsonData['Maximum RAM'];

          $scriptContent = "java -Xmx{$maximumRAM}M -jar {$serverFilename}.jar";

          // Open the file for writing with overwrite (w+)
          $fileHandle = fopen($scriptPath, "w+") or die("Unable to open file!");

          fwrite($fileHandle, $scriptContent);
          fclose($fileHandle);

          // Execute start.sh with error handling (optional)
          $output = shell_exec('status/start.sh 2>&1');
          if ($output !== null) {
            echo "Error starting server: " . $output;
          } else {
            echo "Server started successfully!";
          }
    } else {
      echo "Error: Failed to decode JSON data: " . json_last_error_msg();
    }
  } else {
    echo "Error: settings.json file not found";
  }

  // Check for start.sh existence only if settings.json exists and script needs to be created
  if (file_exists($scriptPath)) {
    // ... (already handled above)
  }

} else if (isset($_GET['stop-server']) || $_GET['stop-server'] === 'true') {
  // Handle stop server logic with potential error handling for exec
  $output = shell_exec('status/stop.sh 2>&1');
  if ($output !== null) {
    echo "Error stopping server: " . $output;
  } else {
    echo "Server stopped successfully!";
  }
}
