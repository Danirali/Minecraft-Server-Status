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

$('#login-container').show();

if (document.cookie.length > 0) {
  processForm()
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  processForm()
})

const autoLoginCheckbox = document.getElementById("remember-me");

autoLoginCheckbox.addEventListener("change", function() {
  console.log("Checkbox state changed!");
  if (autoLoginCheckbox.checked) {
    alert('Using auto login creates a security risk as cookies can be used to gain unathorized access! Only use this setting if you are running a LAN server and not exposing it to the wider internet.')
  }
});

function processForm() {
  const formData = new FormData(document.getElementById('loginForm'));
  const username = formData.get('username');
  const password = formData.get('password').hashString();

  let isAuthenticated = false;

  fetch('./credentials.json')
  .then(response => response.json())
  .then(data => {
    const usersList = data; 
    const adminUsername = usersList[0]['username'];
    const adminPassword = usersList[0]['password'];

    let isAuthenticated = false;

    if (document.cookie.length > 0) {
      const cookies = document.cookie.split(';');
  
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

    const loginErrorBox = document.getElementById('login-error-message')

    for (const user of usersList) {
      if (user.username === username && user.password === password) {
        isAuthenticated = true;
        break; 
      }
    }    

    if (adminUsername === username && adminPassword === password) {
      isAuthenticated = true;
      authenicateSession(true);
    } else {
      loginErrorBox.innerHTML = 'Error: Incorrect username or password.'
      loginErrorBox.style.color = 'red';
    }

  })
  .catch(error => {
    console.error('Error fetching credentials file:', error);
    loginErrorBox.innerHTML = 'Error: ' + error;
    loginErrorBox.style.color = 'red';  
  });
  
  function authenicateSession(auth) {
    if (auth === true) {
      isAuthenticated = true;
    }
    if (isAuthenticated === true) {
      console.log(isAuthenticated,"Login authenticated")
      $('#login-container').hide();
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
  }
}
