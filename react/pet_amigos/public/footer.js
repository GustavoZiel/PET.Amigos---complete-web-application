document.addEventListener("DOMContentLoaded", function () {
    const footerContent = localStorage.getItem('footerContent');

    if (footerContent) {
        const footerContainer = document.createElement('div');
        footerContainer.innerHTML = footerContent;
        document.body.insertAdjacentHTML('beforeend', footerContent);
    }
    else
        console.error('Footer nao encontrado no local storage.');
});
