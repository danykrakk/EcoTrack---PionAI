document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("content");
    const logoutButton = document.getElementById("logout");

    // Alterna o menu lateral
    menuToggle.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
        content.classList.toggle("expanded");
    });

    // Logout do usuário
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("token");
        window.location.href = "https://github.com/danykrakk/EcoTrack---PionAI/blob/main/index.html"; // Redireciona para login
    });

    // Carregar seção ao clicar no menu
    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", function () {
            const section = this.dataset.section;
            loadSection(section);
        });
    });

    function loadSection(section) {
        content.innerHTML = `<h2>${section}</h2><p>Conteúdo da seção ${section}.</p>`;
    }

    // Verifica se o usuário está autenticado
    if (!localStorage.getItem("token")) {
        window.location.href = "https://github.com/danykrakk/EcoTrack---PionAI/blob/main/index.html";
    }
});
