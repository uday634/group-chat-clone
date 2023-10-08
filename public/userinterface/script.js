const usermessage = document.getElementById('chatinputmessage')
const sendbtn = document.getElementById('messagesend')
const token = localStorage.getItem('token')

const sendmessage = async (data) => {
    const obj = {
        message: data
    };

    try {
        await axios.post('http://localhost:4000/message/messagedata', obj, {
            headers: { Authorization: token }
        });
        // Clear the input field after sending the message
        usermessage.value = '';
    } catch (err) {
        console.log(err);
        // Handle the error, e.g., show an error message to the user
    }
};



sendbtn.addEventListener('click', () => {
    const message = usermessage.value;
    sendmessage (message)
   
})