String.prototype.hashString = function() {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
      const charCode = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + charCode;
      hash |= 0; 
  }
  return hash;
  };

const loginForm = document.getElementById('loginForm');
const loginContainer = document.getElementById('login-container')
let isAuthenticated = false;

$('#login-container').show();
$('#portal').hide();

if (document.cookie.length > 0) {
  processForm()
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  processForm()
})

const autoLoginCheckbox = document.getElementById("remember-me");
const logoutBtn = document.getElementById('logout');

autoLoginCheckbox.addEventListener("change", function() {
  console.log("Checkbox state changed!");
  if (autoLoginCheckbox.checked) {
    alert('Using auto login creates a security risk as cookies can be used to gain unathorized access! Only use this setting if you are running a LAN server and not exposing it to the wider internet. Auto Login is enabled and can be disabled via settings.')
  }
});

logoutBtn.addEventListener("click", function() {
  processForm("logout")
});

function processForm(data) {
  const formData = new FormData(document.getElementById('loginForm'));
  const username = formData.get('username');
  const password = formData.get('password').hashString();

  if (data === "logout") {
    authenicateSession(false);
  }

  fetch('./data/credentials.json')
  .then(response => response.json())
  .then(data => {
    const usersList = data; 
    const adminUsername = usersList[0]['username'];
    const adminPassword = usersList[0]['password'];

    if (document.cookie.length > 0) {
      const cookies = document.cookie.split(';');
  
      fetch('./data/settings.json')
      .then(response => response.json())
      .then(settings => {
        const autoLoginEnabled = settings[0].autologin;
        if (autoLoginEnabled === "true") {
          for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            for (const user of usersList) {
              if (cookieName === user.username || cookieValue === user.password) {
                isAuthenticated = true;
                authenicateSession(true);
                break;
              }
            }
          }
        }

        document.getElementById('server-name').innerHTML = settings[0]['Server Name'];
      })
    }

    const loginErrorBox = document.getElementById('login-error-message')

    for (const user of usersList) {
      if (user.username === username && user.password === password) {
        isAuthenticated = true;
        authenicateSession(true);
        break; 
      }
    }    

    if (adminUsername === username && adminPassword === password) {
      isAuthenticated = true;
      authenicateSession(true);
    } else {
      loginErrorBox.innerHTML = 'Error: Incorrect username or password.'
      loginErrorBox.style.color = 'yellow';
    }

  })
  .catch(error => {
    console.error('Error fetching credentials file:', error);
    loginErrorBox.innerHTML = 'Fatal Error: ' + error;
    loginErrorBox.style.color = 'red';  
  });
  
  function authenicateSession(auth) {
    if (auth === true) {
      isAuthenticated = true;
    }
    if (auth === false) {
      isAuthenticated = false;
      deleteAllCookies();
      window.location.reload();
    }
    if (isAuthenticated === true) {
      console.log(isAuthenticated,"Login authenticated")
      $('#login-container').hide();
      $('#portal').show();
      if (document.cookie.length <= 0 && autoLoginCheckbox.checked) {
        genCookie()
      }
    }
    if (auth === 'genCookie') {
      genCookie()
    }
    function genCookie() {
      const today = new Date();
      const expirationDate = new Date(today);
      expirationDate.setDate(today.getDate() + 7);
      const formattedDate = expirationDate.toUTCString();

      document.cookie = `${username}=${password}; expires=${formattedDate}`;
    }
    function deleteAllCookies() {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
      }
    }
  }
}

const javaServerStatus = document.getElementById("java-server-status");
const bedrockServerStatus = document.getElementById("bedrock-server-status");

function fetchJavaServerStatus() {
  fetch("data/java-server-status.php")
    .then(response => response.text())
    .then(javaStatus => {
      javaServerStatus.textContent = javaStatus;
      if (javaStatus === "Online") {
        document.getElementById('java-server-status-img').src = 'icons/up.png';
      } else {
        document.getElementById('java-server-status-img').src = 'icons/down.png';
      }
    })
    .catch(error => {
      console.error("Error fetching server status:", error);
      javaServerStatus.textContent = "Error";
    });
}
function fetchBedrockServerStatus() {
    fetch("data/bedrock-server-status.php")
    .then(response => response.text())
    .then(bedrockStatus => {
      bedrockServerStatus.textContent = bedrockStatus;
      if (bedrockStatus === "Online") {
        document.getElementById('bedrock-server-status-img').src = 'icons/up.png';
      } else {
        document.getElementById('bedrock-server-status-img').src = 'icons/down.png';
      }
    })
    .catch(error => {
      console.error("Error fetching server status:", error);
      bedrockServerStatus.textContent = "Error";
    });
}

const startBtn = document.getElementById("start-server");
const stopBtn = document.getElementById("start-server");

startBtn.addEventListener("click", function() {
  // Send a request to file.php with the parameter "request=true"
  fetch("data/server-control.php?start-server=true")
    .then(response => response.text())
    .then(data => {
      console.log("Response from file:", data);
    })
    .catch(error => {
      console.error("Error sending request:", error);
    });
});


fetchBedrockServerStatus()
fetchJavaServerStatus()
