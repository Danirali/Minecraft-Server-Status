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
      console.log("Cookie found!")
      const cookies = document.cookie.split(';');
  
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        for (const user of usersList) {
          if (cookieName === user.username || cookieValue === user.password) {
            isAuthenticated = true;
            console.log('User is authenticated:', cookieValue);
            authenicateSession(true);
            break;
          }
        }
      }
    }

    for (const user of usersList) {
      if (user.username === username && user.password === password) {
        isAuthenticated = true;
        break; 
      }
    }    

    if (adminUsername === username && adminPassword === password) {
      isAuthenticated = true;
      console.log('Admin Login successful!');
      authenicateSession(true);
    }
    
  })
  .catch(error => {
    console.error('Error fetching credentials file:', error);
  });
  
  function authenicateSession(auth) {
    if (auth === true) {
      isAuthenticated = true;
    }
    if (isAuthenticated === true) {
      console.log(isAuthenticated,"Login authenticated")
            
      const today = new Date();
      const expirationDate = new Date(today);
      expirationDate.setDate(today.getDate() + 7);
      const formattedDate = expirationDate.toUTCString();

      document.cookie = `${username}=${password}; expires=${formattedDate}`;
      
      $('#login-container').hide();
    }
  }
}
