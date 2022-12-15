apt install apache2
apt install php
mv panel/index.php *
mv panel/ports.conf /etc/apache2/
systemctl restart apache2
