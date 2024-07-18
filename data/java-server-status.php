<?php

$serverIP = "127.0.0.1";
$Port = 25565;

$Socket = fsockopen($serverIP, $Port, $errno, $errstr, 5);

if ($Socket) {
  fclose($Socket);
  $Status = "Online";
} else {
  $Status = "Offline";
}

echo $Status

?>
