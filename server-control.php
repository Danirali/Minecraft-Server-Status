<?php

 if (isset($_GET['start-server']) || $_GET['start-server'] === 'true') {
  
//   $filePath = __DIR__ . "/settings.json";
//   $workingDir = __DIR__ . "/status/start.sh";
    
//   if (file_exists($filePath)) {
//     $jsonData = json_decode(file_get_contents($filePath), true);

//     if (json_last_error() === JSON_ERROR_NONE) {
//       if (isset($jsonData['serverFilename'])) {
//         $serverFilename = $jsonData['serverFilename'];
//         echo "java -Xmx2048M -jar " . $serverFilename > "start.sh";
//       }
//     }
//   }
  

  exec('status/start.sh');
} else if (isset($_GET['stop-server']) || $_GET['stop-server'] === 'true') {
    exec('status/stop.sh');
}
?>
