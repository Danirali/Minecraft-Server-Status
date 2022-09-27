<?php
$live = "images/up.png";
$dead = "images/down.png";

$serverip = $_SERVER["REMOTE_ADDR"];
$server = $_GET['server'].":";
$s_server = str_replace("::", ":", $server);
list($addr,$port)= explode (':',"$s_server");
if (empty($port)){
    $port = 90;
}
$fp = @fsockopen(serverip, 80, $errno, $errstr, 6);
             if (!$fp){
               header("Location: $dead");
                }
             else {
                   header("Location: $live");             
          }
function server($addr){
         if(strstr($addr,"/")){$addr = substr($addr, 0, strpos($addr, "/"));}
         return $addr;
}
?>

<-- Thanks to Spiceworks for code! https://community.spiceworks.com/how_to/2254-how-to-show-server-status-on-your-portal -->