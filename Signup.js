document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission
    const form = event.target;

    try {
        const response = await fetch(form.action, {
            method: form.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: form.username.value,
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                email: form.email.value,
                password: form.password.value
            })
        });

        if (response.ok) {
            alert('User created successfully!');
        } else {
            alert('Failed to create user.');
        }
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
});
