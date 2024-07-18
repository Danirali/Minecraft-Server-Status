<?php

if (isset($_GET['start-server']) || $_GET['start-server'] === 'true') {

  $filePath = __DIR__ . "/settings.json"; 
  $scriptPath = __DIR__ . "/start.sh"; 

  // Check for settings.json first
  if (file_exists($filePath)) {
    $output = shell_exec('start.sh 2>&1');
    if ($output !== null) {
      echo "Error starting server: " . $output;
    } else {
      echo "Server started successfully!";
    }
  }


} else if (isset($_GET['stop-server']) || $_GET['stop-server'] === 'true') {
  $output = shell_exec('start.sh 2>&1');
  if ($output !== null) {
    echo "Error stopping server: " . $output;
  } else {
    echo "Server stopped successfully!";
  }
}

?>