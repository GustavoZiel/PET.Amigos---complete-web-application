document.addEventListener("DOMContentLoaded", function()
{
    const headerContent = localStorage.getItem('headerContent');

    if (headerContent) 
    {
        const headerContainer = document.createElement('div');
        headerContainer.innerHTML = headerContent;
        document.body.insertBefore(headerContainer, document.body.firstChild);
    } 
    else
        console.error('Header nao encontrado no local storage.');            
});