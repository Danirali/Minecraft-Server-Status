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

<br>
<h2 class="server-ip-label">Server IP: <? echo $_SERVER["REMOTE_ADDR"]; ?></h2>

    <p class="center-txt check-status"><img border="0" alt="" src="status/check-status.php" /> <a>Java is running</a></p>

<div class="center">
  <div class="container">
    <a class="start-btn" href="?start=true">Start Server</a>
  </div>
  <p class="space"></p>
  <div class="container">
    <a class="stop-btn" href="?stop=true">Stop Server</a>
  </div>
  <p class="space"></p>
</div>

<footer id="bottom">
  <a class="site-byline" href="https://github.com/Danirali/Minecraft-Server-Status">Minecraft-Server-Status by Danirali</a>
</footer>
