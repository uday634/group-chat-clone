const usermessage = document.getElementById("chatinputmessage");
const chatContainer = document.getElementById("chat-messages");
const sendbtn = document.getElementById("messagesend");
const token = localStorage.getItem("token");
var Name = "";




let latestMessageId = -1; // Initialize latestMessageId from localStorage

const fetchMessages = () => {
  setInterval(async () => {
    try {
      const messagesResponse = await axios.get('http://localhost:4000/message/fetchmessage', {
        headers: { Authorization: token },
        params: { latestMessageId }, // Send the latestMessageId as a query parameter
      });
      const newMessages = messagesResponse.data.messages;
      const id = messagesResponse.data.userId;
      Name = messagesResponse.data.name;

      // Retrieve messages from localStorage
      const loadmessage = localStorage.getItem('messages');
      const oldMessages = JSON.parse(loadmessage || '[]'); // Use an empty array as a default if 'messages' is not found

      // Check if new messages are not already in the local message list
      const messagesToAdd = newMessages.filter(newMessage => !oldMessages.some(oldMessage => oldMessage.id === newMessage.id));

      // Merge old and new messages
      const allMessages = [...oldMessages, ...messagesToAdd];

      // Update latestMessageId if there are new messages
      if (messagesToAdd.length > 0) {
        latestMessageId = messagesToAdd[messagesToAdd.length - 1].id; // Update to the latest message ID
        localStorage.setItem('latestMessageId', latestMessageId); // Store the latest message ID in localStorage
      }

      // Store all messages in localStorage
      localStorage.setItem('messages', JSON.stringify(allMessages));

      // Update the UI with all messages
      updateUI(allMessages, id, Name);
    } catch (err) {
      console.log(err);
    }
  }, 2000);
};




const updateUI = (messages, id, Name) => {
  chatContainer.innerHTML = "";

  const messageHTML = messages.map((data) => {
    const senderName = data.name;
    const message = data.message;
    const userId = data.userId;
    const messageTypeClass = userId === id ? 'sent-message' : 'received-message';

    return `<div class="${messageTypeClass}">
              <p class="username">${userId === id ? Name : senderName}:</p>
              ${message}
            </div>`;
  }).join('');

  chatContainer.innerHTML = messageHTML;
};

// Initial fetch and update
fetchMessages();



//sending the new message to the server 
const sendmessage = async (messagedata) => {
  let div = document.createElement("div");
  const obj = {
    message: messagedata,
  };
  div.setAttribute("class", "sent-message"); // Corrected this line
  div.innerHTML = `<p><p class="username">${Name} :</p>${messagedata}</p>`;
  console.log(Name)
  chatContainer.appendChild(div);
  try {
    await axios.post("http://localhost:4000/message/messagedata", obj, {
      headers: { Authorization: token },
    });
  } catch (err) {
    console.log(err);
    // Handle the error, e.g., show an error message to the user
  }
};


// Initial fetch and update
fetchMessages();

// Call the function to start fetching messages

sendbtn.addEventListener("click", () => {
  const message = usermessage.value;

  sendmessage(message);
  usermessage.value = "";
});






