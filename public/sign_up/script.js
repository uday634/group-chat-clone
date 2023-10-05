const name = document.getElementById('name');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phone');
const password = document.getElementById('password');
const signupbtn = document.getElementById('signup');
const error = document.getElementById('error');

const SignupData = async (data) => {
    try {
        const postSignData = await axios.post('http://localhost:3000/user/signup', data); // Use axios.post instead of axios
        console.log(postSignData);
        return 'success';
    } catch (err) {
        error.innerText = err.response.data.message; // Display error message from the server
        setTimeout(() => {
            error.innerText = '';
        }, 3000);

        console.error(err);
    }
};

signupbtn.addEventListener('click', () => {
    const obj = {
        name: name.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
    };
    console.log(obj);
    SignupData(obj);
});
