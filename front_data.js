sendbtn.addEventListener('click', () => {
  console.log(currentgroupId,Name,usermessage.value)
  const div = document.createElement('div')
  let message = usermessage.value;
  div.setAttribute('class', 'sent-message');
  div.innerHTML = `<p><p class="username">${Name} :</p>${usermessage.value}</p>`;
  chatContainer.appendChild(div)
  if(message && message.trim().length>0){
    axios.post('http://localhost:4000/message/sendgroupmessage',{
      groupId: currentgroupId,
      message: message
    }, {headers: {Authorization: token }} ).then(result=> console.log('message sent successfuly')).catch(err => console.log(err))

    usermessage.value = '';
  }else{
    console.err('message box cant be empty')
    alert('message cant be emepty')
  }
})

const updateUI = (messages, id, Name) => {
  // Clear the chat container
  chatContainer.innerHTML = '';

  messages.messages.forEach(data => {
    let div = document.createElement('div');
    let message = data.message;
    let name = data.name;
    let userid = data.userId;
    console.log(message)
    if(id === userid){
      div.setAttribute('class', 'sent-message');
      div.innerHTML = `<p><p class="username">${name} :</p>${message}</p>`;
    }else{
      div.setAttribute('class', 'received-message');
      div.innerHTML = `<p><p class="username">${name} :</p>${message}</p>`;
    }
    chatContainer.appendChild(div);
  });
  chatContainer.scrollTop = chatContainer.scrollHeight;
};



function groupUI(Id, groupName) {
  let li = document.createElement('li');
  const button = document.createElement('button');
  button.textContent = groupName;
  button.addEventListener('click', () => {
    
    currentgroupId = Id;
    axios.get(`http://localhost:4000/message/${Id}`, {
      headers: { Authorization: token },
    }).then(res => {
      chatbox.removeAttribute('hidden');
      
      updateUI(res.data, res.data.userId, Name);
      
    }).catch(err => console.log(err));
  });
  li.appendChild(button);
  groupList.appendChild(li);
}


const groups = async () => {
  try {
    const response = await axios.get("http://localhost:4000/message/groups", {
      headers: { Authorization: token },
    });
    

    if (response.status === 200) {
      const data = response.data.groups;
      Name = response.data.user.name
      data.forEach((group) => {
        let groupId = group.groupId;
        let groupName = group.name;
        groupUI(groupId, groupName);
      });
    } else {
      console.error("Failed to fetch groups with status:", response.status);
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

groups();
deleteGroup.addEventListener('click', async() => {
  try{
    const deletegroup = await axios.delete(`http://localhost:4000/message/group/${groupId}`, {headers : { Authorization: token }})
  }catch(err){
    console.log(err)
  }
})