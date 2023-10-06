const name = document.getElementById('name');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phone');
const password = document.getElementById('password');
const signupbtn = document.getElementById('signup');
const error = document.getElementById('error');

const SignupData = async (data) => {
    try {
        const postSignData = await axios.post('http://localhost:4000/user/signup', data); // Use axios.post instead of axios
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

signupbtn.addEventListener('click', async() => {
    const obj = {
        name: name.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
    };
    SignupData(obj);
});
