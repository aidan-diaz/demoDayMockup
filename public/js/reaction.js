  // Player clicks start button
  document.querySelector('#startGame').addEventListener('click', startGame)
  document.querySelector('#startGame').addEventListener('click', targetFlip)
  
    // Trigger start of game
  // Timer starts, counting down from 60sec to 0
  let countdown = 60
  let highScoreValue = 0
  function startGame(){
    const scoreElement = document.querySelector('#count');
    const interval = setInterval(() => {
    document.querySelector('.timer').innerHTML = 'Time Left: <span id="clock">`${countdown}`</span>'
    document.querySelector('#startGame').style.display = 'none'
    document.querySelector('.timer').style.color = 'inherit'
    document.querySelector('#clock').innerText = countdown
    
    
    countdown--;
    if (countdown < -1) {
      // Stop the interval
      clearInterval(interval);
      document.querySelector('.timer').innerHTML = '!!!TEST OVER!!!'
      document.querySelector('.timer').style.color = 'red'
      document.querySelector('#startGame').style.display = 'block'
      document.querySelector('#startGame').innerText = 'TEST AGAIN'
      scoreElement.innerText = 0
      countdown = 60
      //REPLACE CONSOLE LOG WITH FETCH REQUEST
      // console.log(highScoreValue)
      updateUserScore(highScoreValue)
    } 
    
  }, 1000);
  
  }
  
  function targetFlip() {
    const tarNum = Math.floor(Math.random() * 25) + 1;
    const scoreElement = document.querySelector('#count');
    const highScore = document.querySelector('#highScore');
    if (countdown > -1) {
      // Reset the color of all target elements
      document.querySelectorAll('.target').forEach(element => {
        element.style.background = 'radial-gradient(circle, #0D446C, #167DC6)';
        // Remove click event listener from all elements
        element.removeEventListener('click', handleClick);
      });
  
      // Set the color of the random target to red
      document.querySelector(`.tar${tarNum}`).style.background = 'red';
      document.querySelector(`.tar${tarNum}`).classList.add('flipped');
    
      
      // Add a click event listener to the red target element
      document.querySelector(`.tar${tarNum}`).addEventListener('click', handleClick);
      document.querySelector(`.tar${tarNum}`).addEventListener('animationend', function() {
        this.classList.remove('flipped');
      }, {once: true});
    } 
  
    function handleClick() {
      // Increment the score
      let score = parseInt(scoreElement.innerText) + 1;
      scoreElement.innerText = score;
  
      // Update the high score if the current score exceeds the high score
      if (score > highScoreValue) {
        highScoreValue = score;
        highScore.innerText = highScoreValue;
      }
      document.querySelector(`.tar${tarNum}`).removeEventListener('click', handleClick);
      
      // Call targetFlip again to show a new red target
      targetFlip();
    }
  }

  function updateUserScore(highScoreValue) {
    fetch('updateReactionGameScore', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        reactionGameScore: parseFloat(highScoreValue)
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  }



//   var thumbUp = document.getElementsByClassName("fa-thumbs-up");
// var thumbDown = document.getElementsByClassName("fa-thumbs-down");
// var trash = document.getElementsByClassName("fa-trash-o");

// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('messagesUp', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

// Array.from(thumbDown).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//     fetch('messagesDown', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg,
//         'thumbUp':thumbUp
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json()
//     })
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
//   });
// });

// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });