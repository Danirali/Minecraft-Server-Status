<?php
if ($_GET['start']) {
  exec("start-server.sh");
}
if ($_GET['stop']) {
  exec("stop-server.sh");
}
?>

<head>
  <title>Minecraft Server Controls</title>
  <link rel="stylesheet" href="style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link id="quicksand" href="https://fonts.googleapis.com/css2?family=Quicksand:wght@600&amp;display=swap" rel="stylesheet">
</head>

<h1>Server Controls</h1>

<div class="center">
  <div class="box">
    <a class="start-btn" href="?start=true">Start Server</a>
  </div>
  <p class="space"></p>
  <div class="box">
    <a class="stop-btn" href="?stop=true">Stop Server</a>
  </div>
  <p class="space"></p>
</div>
