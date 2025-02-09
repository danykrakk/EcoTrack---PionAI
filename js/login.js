document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch("https://ecotrack-api-pionai-2.onrender.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login bem-sucedido!");
            localStorage.setItem("token", data.token);
            window.location.href = "https://github.com/danykrakk/EcoTrack---PionAI/blob/main/paginas/dashboard.html"; // Redireciona para o dashboard
        } else {
            alert("Erro: " + (data.message || "Falha no login."));
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao conectar-se ao servidor.");
    }
});

// Função para mostrar/ocultar senha
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    if (passwordField.type === "password") {
        passwordField.type = "text";
        this.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passwordField.type = "password";
        this.classList.replace('fa-eye-slash', 'fa-eye');
    }
});
