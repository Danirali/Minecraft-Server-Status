import os
import json
import requests
from bs4 import BeautifulSoup

output_file = "minecraft/server.jar"

with open('settings.json','r') as settingsFile:
    settingsFileJSON = json.load(settingsFile)
    serverPlatform = settingsFileJSON[0]['Server-Platform']

def getLatestVersion(platform):
    startServerFile = "minecraft/server.jar"
    global serverPlatform, serverFileDownloadURL

    if platform.lower() == 'paper':
        serverPlatform = 'paper'
        serverFileDownloadURL = 'https://papermc.io/downloads/paper'
        latest_version_url = getPaper()
        download_file(latest_version_url, output_file)
        
    elif platform.lower() == 'vanilla':
        serverPlatform = 'vanilla'
        serverFileDownloadURL = 'http://launchermeta.mojang.com/mc/game/version_manifest.json'
        latest_version_url = getVanilla()
        download_file(latest_version_url, output_file)

    if os.path.exists(startServerFile):
        print()
    else:
        getLatestVersion(serverPlatform)

def getPaper():
    response = requests.get(serverFileDownloadURL)
    latestPaperDownloadPage = response.text
    soup = BeautifulSoup(latestPaperDownloadPage, 'html.parser')
    downloadLatestButton = soup.select_one('#__next > main > header > div:nth-child(1) > div.flex.flex-col.gap-4.mt-8 > div > div')
    anchor_tag = downloadLatestButton.find('a')
    paperDownloadLink = anchor_tag.get('href')

    if paperDownloadLink:
        return paperDownloadLink

def getVanilla():
    response = requests.get(serverFileDownloadURL)
    minecraftVersionsFile = response.text
    minecraftVersions = json.loads(minecraftVersionsFile)
    latestRelease = minecraftVersions["latest"]["release"]

    for version_info in minecraftVersions["versions"]:
        if version_info["id"] == latestRelease:
            return version_info["url"]

    return None  # Return None if the version is not found

def download_file(url, output_file):
  response = requests.get(url, stream=True)
  response.raise_for_status()

  with open(output_file, 'wb') as f:
    for chunk in response.iter_content(chunk_size=8192):
      if chunk:
        f.write(chunk)

getLatestVersion(serverPlatform)