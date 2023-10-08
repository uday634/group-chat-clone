const usermessage = document.getElementById("chatinputmessage");
const chatContainer = document.getElementById("chat-messages");
const sendbtn = document.getElementById("messagesend");
const token = localStorage.getItem("token");
var Name = "";

const sendmessage = async (messagedata) => {
  let div = document.createElement("div");
  const obj = {
    message: messagedata,
  };
  div.setAttribute("class", "sent-message"); // Corrected this line
  div.innerHTML = `<p><p class="username">${Name} :</p>${messagedata}</p>`;
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

const fetchMessages = () => {
    setInterval(async () => {
      try {
        const messagesResponse = await axios.get("http://localhost:4000/message/fetchmessage", {
          headers: { Authorization: token },
        });
        const messages = messagesResponse.data.messages;
        const id = messagesResponse.data.userId;
        let Name = messagesResponse.data.name;
        chatContainer.innerHTML = '';
  
        messages.forEach((data) => {
          let div = document.createElement("div");
          let senderName = data.name;
          let message = data.message;
          let userId = data.userId;
          if (userId === id) {
            div.setAttribute("class", "sent-message");
            div.innerHTML = `<p><p class="username">${senderName}:</p>${message}</p>`;
            chatContainer.appendChild(div);
          } else {
            div.setAttribute("class", "received-message");
            div.innerHTML = `<p><p class="username">${senderName}:</p>${message}</p>`;
            chatContainer.appendChild(div);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }, 5000); // Set the interval time in milliseconds (e.g., 5000 ms = 5 seconds)
  };
  
  // Call the function to start fetching messages
  fetchMessages();
  

sendbtn.addEventListener("click", () => {
  const message = usermessage.value;

  sendmessage(message);
  usermessage.value = "";
});

const currentmessage = async () => {
  try {
    const messages = await axios.get(
      "http://localhost:4000/message/fetchmessage",
      {
        headers: { Authorization: token },
      }
    );
    let id = messages.data.userId;
    let name = messages.data.name;
  } catch (err) {
    console.log(err);
  }
};

fetchMessages();
console.log(name);
