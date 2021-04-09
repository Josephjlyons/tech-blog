// async function signupFormHandler(event) {
//     event.preventDefault();


//     const username = document.querySelector('#username-signup').value.trim();
//     const password = document.querySelector('#password-signup').value.trim();

//     if (username && password) {
//         const response = await $post('/api/users', {name, password}
            
            
//         });
//         if (response.ok) {
//             console.log('success');


//             document.location.replace('/dashboard');

//         } else {
//             alert(response.statusText);
//         }
//     }
// }




const signupFormHandler = async (event) => {
  event.preventDefault();
  try {
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();   
    if (name && email && password) {
      const response = await $.post('/api/user', { name, email, password });
      (response) ? document.location.replace('/dashboard') : alert("Server Error. Sorry!");
    }
  } catch {
    alert("Failed to create user. Sorry! Try again later.")
  }

};
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);