const usermessage = document.getElementById("chatinputmessage");
const chatContainer = document.getElementById("chat-messages");
const sendbtn = document.getElementById("messagesend");
const token = localStorage.getItem("token");
var Name='';

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

const fetchMessages = async () => {
  try {
    const messages = await axios.get(
      "http://localhost:4000/message/fetchmessage",
      {
        headers: { Authorization: token },
      }
    );
    let id = messages.data.userId;
    Name = messages.data.name;
    messages.data.messages.forEach((data) => {
      let div = document.createElement("div");
      let name = data.name;
      let message = data.message;
      let userId = data.userId;
      if (userId === id) {
        div.setAttribute("class", "sent-message"); // Corrected this line
        div.innerHTML = `<p><p class="username">${name}:</p>${message}</p>`;
        chatContainer.appendChild(div);
      } else {
        div.setAttribute("class", "received-message"); // Corrected this line
        div.innerHTML = `<p><p class="username">${name}:</p>${message}</p>`;
        chatContainer.appendChild(div);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

sendbtn.addEventListener("click", () => {
  const message = usermessage.value;

  sendmessage(message);
  usermessage.value = "";
});

const currentmessage= async ()=> {
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
}

fetchMessages();
console.log(name)