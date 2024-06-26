document.addEventListener("DOMContentLoaded", function () {
    const headerContent = localStorage.getItem('headerContent');

    if (headerContent) {
        const headerContainer = document.createElement('div');
        headerContainer.innerHTML = headerContent;

        const headerElement = headerContainer.querySelector('header');
        const linkperfil = headerElement.querySelector('.perfil')
        linkperfil.href = `signup.html`
        token = localStorage.getItem('token')
        if (token) {
            const parts = token.split('.');
            if (parts.length === 3) {
                const parts = token.split('.');
                const payload = parts[1];
                const decodedPayload = atob(payload);
                const attributes = JSON.parse(decodedPayload);
                console.log(attributes)
                const OngIdFromToken = attributes.sub;
                const OngEmailFromToken = attributes.email;
                console.log(OngEmailFromToken)
                console.log(OngIdFromToken)
                role = localStorage.getItem('role')
                if(role === "USER"){
                    linkperfil.href = `profile.html?id=${OngIdFromToken}`;
                }
                else{
                    linkperfil.href = `ong.html?id=${OngIdFromToken}`;
                }
            }
        }
        document.body.insertBefore(headerElement, document.body.firstChild);
    } else {
        console.error('Header não encontrado no local storage.');
    }
});