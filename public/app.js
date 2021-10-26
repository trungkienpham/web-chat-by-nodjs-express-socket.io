const socket = io.connect('http://localhost:3000');
const msgText = document.querySelector('#msg')
const btnSend = document.querySelector('#btn-send')
const chatBox = document.querySelector('.chat-content')
const displayMsg = document.querySelector('.message')
console.log(io);
let name;

do{
    name = prompt('What is your name?')
}while(!name)

document.querySelector('#your-name').textContent = name

msgText.focus()

btnSend.addEventListener('click',(e) => {

        e.preventDefault()
        msgText.value=''
         sendMsg(msgText.value)  
})


const sendMsg = message => {
    let msg = {
        user: name  ,
        message: message.trim()
    }
    console.log(msg)
    display(msg, 'you-message')
    socket.emit('sendMessage', msg)
}

socket.on('sendToAll', msg=>{   
    display(msg, 'other-message')
})

const display = (msg, type) =>{
    const msgDiv = document.createElement('div')
    let className = type

    msgDiv.classList.add(className,'message-row')
    let times = new Date().toLocaleDateString()
    let innerText = `
        <div class="message-title">
        👻<span>${msg.user}</span>
        </div>
        <div class="message-text">
            ${msg.message}
        </div>
        <div class="message-time">
                ${times}
        </div>`;

    msgDiv.innerHTML = innerText;
    displayMsg.appendChild(msgDiv)
}