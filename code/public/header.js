document.addEventListener("DOMContentLoaded", function () {
    const headerContent = localStorage.getItem('headerContent');

    if (headerContent) {
        const headerContainer = document.createElement('div');
        headerContainer.innerHTML = headerContent;

        const headerElement = headerContainer.querySelector('header');
        document.body.insertBefore(headerElement, document.body.firstChild);
    } else {
        console.error('Header não encontrado no local storage.');
    }
});