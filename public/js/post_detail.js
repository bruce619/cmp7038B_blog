const deleteBtn = document.querySelector('#delete');
const confirmDelete = document.querySelector('#confirm_delete');
const popup = document.querySelector('.delete__popup');
const close = document.querySelector('.close');
const close_ = document.querySelector('#close');

deleteBtn.addEventListener('click', (e) => {
popup.classList.remove('hidden')
})

confirmDelete.addEventListener('click', (e) => {
popup.classList.add('hidden')
})

close.addEventListener('click', (e) => {
popup.classList.add('hidden')
})

close_.addEventListener('click', (e) => {
    popup.classList.add('hidden')
    })