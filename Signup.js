
document.addEventListener('DOMContentLoaded', function() {
    const loginFormContainer = document.querySelector('.login-form-container');
    const signupFormContainer = document.querySelector('.signup-form-container');

    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const closeLoginBtn = document.getElementById('close-login-btn');
    const closeSignupBtn = document.getElementById('close-signup-btn');
    const openSignupForm = document.getElementById('open-signup-form');
    const openLoginForm = document.getElementById('open-login-form');

    loginBtn.addEventListener('click', () => {
        loginFormContainer.style.display = 'block';
        signupFormContainer.style.display = 'none';
    });

    signupBtn.addEventListener('click', () => {
        signupFormContainer.style.display = 'block';
        loginFormContainer.style.display = 'none';
    });

    closeLoginBtn.addEventListener('click', () => {
        loginFormContainer.style.display = 'none';
    });

    closeSignupBtn.addEventListener('click', () => {
        signupFormContainer.style.display = 'none';
    });

    openSignupForm.addEventListener('click', (e) => {
        e.preventDefault();
        signupFormContainer.style.display = 'block';
        loginFormContainer.style.display = 'none';
    });

    openLoginForm.addEventListener('click', (e) => {
        e.preventDefault();
        loginFormContainer.style.display = 'block';
        signupFormContainer.style.display = 'none';
    });
});
