let actions = [];
let currentPage = 1;
const itemsPerPage = 5;
const apiUrl = "https://meu-backend.railway.app/api/acoes-sustentaveis"; // URL da API no Railway

// Carrega ações do backend
async function loadActions() {
    try {
        const response = await fetch(apiUrl);
        actions = await response.json();
        updateTable();
    } catch (error) {
        console.error("Erro ao carregar ações:", error);
    }
}

// Abre o modal
function openModal() {
    const modal = document.getElementById("modal");
    if (!modal.classList.contains("show")) {
        modal.classList.add("show");
    }
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (modal.classList.contains("show")) {
        modal.classList.remove("show");
    }
}

// Fecha o modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
};

// Adiciona ação na API
document.getElementById("actionForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value;
    const points = parseInt(document.getElementById("points").value, 10);

    if (!title || points < 0 || isNaN(points)) {
        alert("Preencha corretamente! O campo 'pontos' deve ser um número positivo.");
        return;
    }

    const newAction = { title, category, points };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAction)
        });

        if (response.ok) {
            loadActions();
            closeModal();
            document.getElementById("actionForm").reset();
        } else {
            alert("Erro ao cadastrar ação.");
        }
    } catch (error) {
        console.error("Erro ao cadastrar ação:", error);
    }
});

// Atualiza a tabela
function updateTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = actions.slice(start, end);

    paginatedItems.forEach((action) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${action.title}</td>
            <td>${action.category}</td>
            <td>${action.points}</td>
            <td>
                <button onclick="editAction(${action.id})">Editar</button>
                <button onclick="deleteAction(${action.id})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    updatePagination();
}

// Função de pesquisa
function searchTable() {
    const filter = document.getElementById("search").value.toUpperCase();
    const rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(row => {
        row.style.display = row.innerText.toUpperCase().includes(filter) ? "" : "none";
    });
}

// Ordenar tabela
function sortTable(columnIndex) {
    actions.sort((a, b) => {
        const valA = Object.values(a)[columnIndex];
        const valB = Object.values(b)[columnIndex];
        return valA > valB ? 1 : -1;
    });
    updateTable();
}

// Editar ação
async function editAction(id) {
    const action = actions.find(item => item.id === id);
    if (!action) return;

    document.getElementById("title").value = action.title;
    document.getElementById("category").value = action.category;
    document.getElementById("points").value = action.points;
    
    deleteAction(id); // Remove antes de re-adicionar atualizado
    openModal();
}

// Excluir ação
async function deleteAction(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

        if (response.ok) {
            loadActions();
        } else {
            alert("Erro ao excluir ação.");
        }
    } catch (error) {
        console.error("Erro ao excluir ação:", error);
    }
}

// Paginação
function updatePagination() {
    const totalPages = Math.ceil(actions.length / itemsPerPage);
    const paginationDiv = document.getElementById("pagination");

    paginationDiv.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        btn.onclick = function () {
            currentPage = i;
            updateTable();
        };
        paginationDiv.appendChild(btn);
    }
}

// Carregar ações ao iniciar
loadActions();
