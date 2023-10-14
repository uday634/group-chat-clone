const usermessage = document.getElementById("chatinputmessage");
const groupList = document.getElementById("groupList");
const groupheadering = document.getElementById('group-name')
const groupaddbtn = document.getElementById("groupaddbtn");
const groupname = document.getElementById("groupName");
const chatContainer = document.getElementById("chat-messages");
const sendbtn = document.getElementById("messagesend");
const chatheading = document.getElementById("chatHeading");
const token = localStorage.getItem("token");
const chatbox = document.getElementById("chat");
let Name = "";
let latestMessageId = -1;
let currentgroupId = -1;
let currentUserId = -1;

function GroupUI(name) {
  let li = document.createElement("li");
  let joingroup = document.createElement("button");
  let joinchat = document.createElement("button");
  joingroup.innerText = "joingroup";
  joinchat.innerText = "chat";
  joingroup.setAttribute("id", "joingroup");
  joinchat.setAttribute("id", "joinchat");
  const p = document.createElement("p");
  p.innerHTML = name;
  p.appendChild(joingroup);
  p.appendChild(joinchat);
  li.appendChild(p);
  groupList.appendChild(li);
}

groupaddbtn.addEventListener("click", async () => {
  const obj = {
    groupName: groupname.value,
  };
  GroupUI(groupname.value);
  try {
    const token = localStorage.getItem("token"); // Make sure you have a valid token
    await axios.post("http://localhost:4000/message/group", obj, {
      headers: { Authorization: token },
    });
  } catch (err) {
    console.log(err);
  }
});

// Define your postMessage function
async function postMessage(message, groupId) {
  try {
    await axios.post("http://localhost:4000/message/message", {
      message: message,
      groupId: groupId,
    }, {
      headers: { Authorization: token },
    });
  } catch (err) {
    console.log(err);
  }
}

sendbtn.addEventListener("click", () => {
  const message = usermessage.value;
  const groupId = currentgroupId;
  const div = document.createElement("div");
  div.setAttribute("class", "sent-message");
  div.innerHTML = `<p class="username">${Name}:</p><p>${message}</p>`;
  chatContainer.appendChild(div);
  if (message !== '') {
    postMessage(message, groupId);
  }
});

function joinGroup(button, data, groupid) {
  button.addEventListener("click", async () => {
    chatbox.removeAttribute("hidden");
    try {
      await axios.post("http://localhost:4000/message/joingroup", { groupId: groupid }, {
        headers: { Authorization: token },
      });
      postMessage(chatContainer.value, groupid);
    } catch (err) {
      console.log(err);
    }
  });
}

function displayMessages(messages, username, userid, createdby) {
  chatContainer.innerHTML = '';

  messages.forEach((data) => {
    const messageId = data.id;
    const groupId = data.groupId;
    const message = data.message;
    const deletemessage = document.createElement('button');
    const name = data.name;
    const createdname = data.userId;
    const currentuser = userid;
    const div = document.createElement("div");
    deletemessage.innerHTML = 'Delete';

    if (userid === createdby) {
      if (userid === createdname) {
        div.setAttribute("class", "sent-message");
        div.innerHTML = `<p class="username">${name}:</p>
        <p>${message}</p>`;
      } else {
        div.setAttribute("class", "received-message");
        div.innerHTML = `<p class="username">${name}:</p>
        <p>${message}</p>`;
      }
      div.appendChild(deletemessage);
    } else {
      if (userid === createdname) {
        div.setAttribute("class", "sent-message");
        div.innerHTML = `<p class="username">${name}:</p>
        <p>${message}</p>`;
      } else {
        div.setAttribute("class", "received-message");
        div.innerHTML = `<p class="username">${name}:</p>
        <p>${message}</p>`;
      }
    }

    deletemessage.addEventListener('click', async () => {
      try {
        const admindelete = await axios.delete(`http://localhost:4000/message/message/${messageId}`, {
          headers: { Authorization: token },
        });
        console.log(admindelete);
      } catch (err) {
        console.log(err);
      }
    });

    chatContainer.appendChild(div);
  });

  chatContainer.scrollTop = chatContainer.scrollHeight;
}

let currentIntervalId = null;

function joinChat(button, username, userid, groupid, createdby, groupname) {
  chatbox.removeAttribute("hidden");
  groupheadering.innerText = groupname;

  while (chatContainer.firstChild) {
    chatContainer.removeChild(chatContainer.firstChild);
  }

  button.addEventListener("click", () => {
    if (currentIntervalId !== null) {
      clearInterval(currentIntervalId);
    }

    currentIntervalId = setInterval(async () => {
      try {
        const messages = await axios.get(`http://localhost:4000/message/${groupid}`, {
          headers: { Authorization: token },
        });
        displayMessages(messages.data, username, userid, createdby);
        currentgroupId = groupid;
        console.log(currentgroupId);
      } catch (err) {
        console.log(err);
      }
    }, 2000);
  });
}

function groupdelete(button, groupId){
  button.addEventListener('click',() => {
    axios.delete(`http://localhost:4000/message/group/${groupId}`, {headers : { Authorization: token }}).then(res =>{
      console.log(res)
    }).catch(err=> console.log(err))
  })
}

function GroupsUI(arr, currusername, curruserid) {
  arr.forEach((data) => {
    const createdby = data.createdby;
    const groupname = data.name;
    const groupId = data.groupId;
    const li = document.createElement("li");

    const joingroup = document.createElement("button");
    const joinchat = document.createElement("button");
    joingroup.innerText = "joingroup";
    joinchat.innerText = "chat";

    if (createdby === curruserid) {
      // Check if the current user created the group
      const deleteGroup = document.createElement("button");
      deleteGroup.innerText = `Delete Group: ${groupname}`;
      deleteGroup.addEventListener("click", async () => {
        try {
          const deletegroup = await axios.delete(`http://localhost:4000/message/group/${groupId}`, {
            headers: { Authorization: token },
          });
          console.log(deletegroup);
          
        } catch (err) {
          console.log(err);
        }
      });
      li.appendChild(deleteGroup);
    }

    const p = document.createElement("p");
    p.innerHTML = groupname;
    p.appendChild(joingroup);
    p.appendChild(joinchat);
    li.appendChild(p);
    groupList.appendChild(li);

    joinGroup(joingroup, currusername, curruserid, groupId);
    joinChat(joinchat, currusername, curruserid, groupId, createdby, groupname);
  });
}


async function fetchGroups() {
  try {
    const response = await axios.get("http://localhost:4000/message/groups", {
      headers: { Authorization: token },
    });
    Name = response.data.user.name;
    chatheading.innerHTML = Name;

    GroupsUI(response.data.groups, response.data.user.name, response.data.user.id);
    currentUserId = response.data.user.id;
  } catch (err) {
    console.log(err);
  }
}

fetchGroups();
