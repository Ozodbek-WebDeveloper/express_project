document.addEventListener('DOMContentLoaded', () => {
    const modalBody = document.querySelector('.body_modal');
    const btns = document.querySelectorAll('.button-86.edit');
    const modal = document.querySelector('.modal');
    const modal_cancel = document.querySelector('.cancel')
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        
        const userId = JSON.parse(btn.getAttribute('data-user'));

        console.log('hello', userId);

        document.querySelector('.edit_login').value = userId.login;
        document.querySelector('.edit_password').value = userId.password
        document.querySelector('.user_id').value = userId.id
        // Modalni ochish uchun 'active' klass qo'shish
        modalBody.classList.add('active')
        modalBody.addEventListener('click', () =>{

            modal.addEventListener('click', (e) =>{
                e.stopPropagation()
            })
            modal_cancel.addEventListener('click', () =>{
              modalBody.classList.remove('active')
            })
            modalBody.classList.remove('active')
        })
      });
    });
  });
  
// send put method



document.querySelector('.put_method').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally
    
    let form = event.target;
    let formData = new FormData(form);

    fetch(form.action, {
        method: 'PUT',
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if (data.message === 'User updated successfully') {
          console.log('Success:', data);
          window.location.href = '/dashboard'; // Sahifani /dashboard ga yo'naltirish
      }
    })
    .catch(error => {
        console.error('Error:', error);
        // Add further logic to handle errors
    });
});

