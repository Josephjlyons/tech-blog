document.onload = function() {
  inactivityTime(); 
}
 function logout() {
    $.post('/api/user/logout')//, {
      // method: 'get',
      // headers: { 'Content-Type': 'application/json' }
    //})
    .then((response) => {
        if (response.ok) {
      // document.location.replace('/');
    } else {
      alert(response.statusText);
    }
    });
  
  
    
  }
  
  document.querySelector('#logout').addEventListener('click', logout);

//   var inactivityTime = function () {
//     var time;
//     window.onload = resetTimer;
//     // DOM Events
//     document.onmousemove = resetTimer;
//     document.onkeypress = resetTimer;

//     function logout() {
//         alert("You are now logged out.")
//         //location.href = 'logout.html'
//     }

//     function resetTimer() {
//         clearTimeout(time);
//         time = setTimeout(logout, 3000)
//         // 1000 milliseconds = 1 second
//     }
// };