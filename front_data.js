const fetchMessages = () => {
    setInterval(async () => {
      try {
        const messagesResponse = await axios.get('http://localhost:4000/message/fetchmessage', {
          headers: { Authorization: token },
          params: { latestMessageId },
        });
  
        if (messagesResponse.status === 200) {
          const newMessages = messagesResponse.data.messages;
          const id = messagesResponse.data.userId;
          Name = messagesResponse.data.name;
  
          const loadmessage = localStorage.getItem('messages');
          const oldMessages = JSON.parse(loadmessage || '[]');
  
          const messagesToAdd = newMessages.filter(newMessage => !oldMessages.some(oldMessage => oldMessage.id === newMessage.id));
  
          const allMessages = [...oldMessages, ...messagesToAdd];
  
          if (messagesToAdd.length > 0) {
            latestMessageId = messagesToAdd[messagesToAdd.length - 1].id;
            localStorage.setItem('latestMessageId', latestMessageId);
          }
  
          localStorage.setItem('messages', JSON.stringify(allMessages));
  
          updateUI(allMessages, id, Name);
        } else {
          console.error('Failed to fetch messages with status:', messagesResponse.status);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    }, 2000);
  };
  
  const updateUI = (messages, id, Name) => {
    chatContainer.innerHTML = "";
  
    const messageHTML = messages
      .map((data) => {
        const senderName = data.name;
        const message = data.message;
        const userId = data.userId;
        const messageTypeClass =
          userId === id ? "sent-message" : "received-message";
  
        return `<div class="${messageTypeClass}">
                <p class="username">${userId === id ? Name : senderName}:</p>
                ${message}
              </div>`;
      })
      .join("");
  
    chatContainer.innerHTML = messageHTML;
  
    // Scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };
  
  const sendmessage = async (messagedata) => {
    let div = document.createElement("div");
    const obj = {
      message: messagedata,
    };
    div.setAttribute("class", "sent-message");
    div.innerHTML = `<p class="username">${Name}:</p>${messagedata}`;
    chatContainer.appendChild(div);
  
    try {
      await axios.post("http://localhost:4000/message/messagedata", obj, {
        headers: { Authorization: token },
      });
  
      // Scroll to the bottom of the chat container
      chatContainer.scrollTop = chatContainer.scrollHeight;
    } catch (err) {
      console.error("Error:", err);
    }
  };
  
  sendbtn.addEventListener("click", () => {
    const message = usermessage.value;
  
    if (message) {
      sendmessage(message);
      usermessage.value = "";
    } else {
      console.error("Message cannot be empty");
    }
  });


  function groupUI(Id, groupName) {
    let li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = groupName;
    li.appendChild(button);
    groupList.appendChild(li);
  }