var socket = io.connect('localhost:6677', {'forceNew':true});

socket.on('messages', function (data) {
    render(data);
})

function render(data) {
    var html = data.map(function (message, index) {
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> say:
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

    document.getElementById('messages').innerHTML = html;
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}

function addMessage(e) {
    var message = {
        nickname : document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);
    return false;
}