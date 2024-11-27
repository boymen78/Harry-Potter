const modal = document.querySelector('.modal')
const triggerButton = document.querySelector('#btn-get')
const closeButton = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block';
}

const closeModal = () => {
    modal.style.display = 'none';
}

setTimeout(() => {
    openModal();
}, 10000);

const onScrollToEnd = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        openModal();
        window.removeEventListener('scroll', onScrollToEnd);
    }
}

window.addEventListener('scroll', onScrollToEnd);

triggerButton.onclick = () => openModal()
closeButton.onclick = () => closeModal()