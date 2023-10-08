const email = document.getElementById('email');
const password = document.getElementById('password');
const loginbtn = document.getElementById('login');
const error = document.getElementById('error');

const loginData = async (data) => {
    try {
        const postSignData = await axios.post('http://localhost:4000/user/login', data); // Use axios.post instead of axios
        let err = postSignData.data.message
        const token = postSignData.data.token
        console.log(token);
        localStorage.setItem('token', token)
        error.innerText = err; // Display error message from the server
        alert(err)
        setTimeout(() => {
            error.innerText = '';
        }, 4000);
        if(postSignData.status === 200){
            alert('successfuly login')
            window.location.href = '../userinterface/index.html'
        }else{
            alert('credestials are wrong')
        }
    } catch (err) {
        error.innerText = err.response.data.message; // Display error message from the server
        setTimeout(() => {
            error.innerText = '';
        }, 4000);
        alert('something went wrong can not login')
        console.error(err);
    }
};

loginbtn.addEventListener('click', async() => {
    const obj = {
        email: email.value,
        password: password.value,
    };
    loginData(obj);
});
