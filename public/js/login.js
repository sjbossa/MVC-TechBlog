const loginFormHandler = async (event) => {
 
  event.preventDefault();

  const name = document.querySelector('#display_name').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (name && password) {
  
    const response = await fetch('/api/users/session', {
      method: 'POST',
      body: JSON.stringify({display_name:name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to log in, password or email are incorrect.');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);