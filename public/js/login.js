
const loginFormHandler =  (event) => {
  event.preventDefault();
  try {
    const name = document.querySelector('#username-login').value.trim();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim(); 
    if (name && email && password) {
      // Send a POST request to the API endpoint
      $.post('/api/user/login', { name, email, password })
      .then((response) => {
        console.log(response)
        document.location.replace('/dashboard');  
      });
    }
  } catch {
    alert("Incorrect email or password. Try again.")
  }
 
};
  

$('.login-form').on('submit', loginFormHandler);