i wil be so happy if i complete this toDay.

<div id = "message-container"></div>
<form id = "send-container">
   <input type="text" id="message-input">
   <butto type="submit" id="send-button">send</button>
</form>

install few dependcies:

npm init //setup our project

npm i socket.io //real time web socket communication

npm i --save-dev nodemon //they both would have to togehter since it shoudl dev (check it on chatgpt once)

inside the package.json file-> script objects , edit it to this  "devstart":"nodemon server.js"
by removing tests

create server.js file

npm run devstart //run nodemon on server.js

to create server using socket.io is easy


const io = require('socket.io')(3000)

io.on('connection', socket => {
console.log("new user") 
socket.emit('chat-message','Hello World') // when you inspect it will show hellp wprl in the console
socket.on('send-chat-message',message =>{
console.log(message)
socket.broadcast.emit
})

})



create script.js //client side of js is going to be here. we can host it on differetnt sever it will be fine


const socket = io('http://localhost:3000') //hosting our socket app
const messageForm = document.getElementbyId('send-container')
const messageInput  = document.getLementbyId('message-input')

socket.on('chat-message', data=>{
console.log(data)
})

messageForm.addEventListener('submit',e=>{
e.preventDefault()
const message = meesageInput.value
socket.emit("send-chat-message",message) //send info frmo client to server
messaggeInput.value = ''
})


inside the html dile



<script defer src="http://localhost:3000/socket.io/socket.io.js">  </script>

<script defer src="script.js">


where users can communicate back and worth.
send it to the server instead of form.




WEBSOCKET IS SOMETHING THAT ALLWOS REAL TIME COMMUNICATION BETWEEN BROWSER AND SERVER


