const socket = io();
const form = document.getElementById('btn');
const input = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container')
let audio = new Audio('../../ting.mp3');
const appended = (message, posstion) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message
    messageElement.classList.add(posstion)
    messageElement.classList.add('message')
    messageContainer.append(messageElement)
    if (position == 'left') {
        console.log('sound is playing');
        audio.play();
    }
}
form.addEventListener('click', (e) => {
    e.preventDefault();
    if (input.value) {
        append(`You:${input.value}`, right)
        socket.emit('send', input.value);
        input.value = '';
    }
});
const name = prompt("Enter the Name?")
socket.emit('new-user-join', name)
socket.on('user-joined', (name) => {
    apppend(`${name} joined the chat`, 'left')
})

socket.on('message', (data) => {
    const { name, message } = data;
    append(`${name}:${message}`, 'left');
})
socket.on('left', name => {
    append(`${name} left the chat`, 'left');
})