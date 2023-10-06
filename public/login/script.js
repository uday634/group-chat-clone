const email = document.getElementById('email');
const password = document.getElementById('password');
const loginbtn = document.getElementById('login');
const error = document.getElementById('error');

const loginData = async (data) => {
    try {
        const postSignData = await axios.post('http://localhost:4000/user/login', data); // Use axios.post instead of axios
        let err = postSignData.data.message
        error.innerText = err; // Display error message from the server
        alert(err)
        setTimeout(() => {
            error.innerText = '';
        }, 4000);
    } catch (err) {
        error.innerText = err.response.data.message; // Display error message from the server
        setTimeout(() => {
            error.innerText = '';
        }, 4000);
        alert('something went wrong ' + err )
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