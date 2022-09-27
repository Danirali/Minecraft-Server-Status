<?php
if ($_GET['start']) {
  exec("start-server.sh");
}
if ($_GET['stop']) {
  exec("stop-server.sh")
}
?>

<a href="?start=true">Start Server</a>
<a href="?stop=true">Stop Server</a>
