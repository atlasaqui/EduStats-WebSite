// crud-page.js - Lógica da página CRUD
import { criarEscola, listarEscolas, atualizarEscola, deletarEscola } from "./crud.js";

// Estado local em memória (funciona sem Back4App configurado)
let escolasLocais = [
    { objectId: "local_001", nome: "EEFM João Pessoa", estado: "PE", mediaEnem: 542, ano: 2025, tipo: "Pública" },
    { objectId: "local_002", nome: "Colégio Dom Bosco", estado: "SP", mediaEnem: 598, ano: 2025, tipo: "Privada" },
    { objectId: "local_003", nome: "CEFET-MG", estado: "MG", mediaEnem: 571, ano: 2024, tipo: "Federal" },
];
let editandoId = null;

function renderTabela(lista) {
    const tbody = document.querySelector("#tabela-escolas");
    if (!tbody) return;

    if (!lista.length) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-slate-500 py-10 font-mono text-sm">Nenhuma escola cadastrada.</td></tr>`;
        return;
    }

    tbody.innerHTML = lista.map(e => `
        <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
            <td class="px-4 py-3 font-semibold text-white">${e.nome}</td>
            <td class="px-4 py-3 text-slate-300">${e.estado}</td>
            <td class="px-4 py-3">
                <span class="inline-flex items-center gap-1">
                    <span class="font-mono font-bold text-orange-400">${e.mediaEnem}</span>
                    <span class="text-slate-500 text-xs">pts</span>
                </span>
            </td>
            <td class="px-4 py-3 text-slate-400 font-mono">${e.ano}</td>
            <td class="px-4 py-3">
                <span class="px-2 py-0.5 rounded-full text-xs font-bold ${tipoBadge(e.tipo)}">${e.tipo}</span>
            </td>
            <td class="px-4 py-3 flex gap-2">
                <button onclick="abrirEdicao('${e.objectId}')" class="btn-action btn-edit px-3 py-1.5 rounded-lg text-xs font-bold">Editar</button>
                <button onclick="confirmarDelete('${e.objectId}', '${e.nome}')" class="btn-action btn-delete px-3 py-1.5 rounded-lg text-xs font-bold">Excluir</button>
            </td>
        </tr>
    `).join("");
}

function tipoBadge(tipo) {
    const mapa = {
        "Pública": "bg-sky-500/20 text-sky-300",
        "Privada": "bg-violet-500/20 text-violet-300",
        "Federal": "bg-orange-500/20 text-orange-300",
    };
    return mapa[tipo] || "bg-slate-700 text-slate-300";
}

async function carregarEscolas() {
    const loadingEl = document.querySelector("#loading-indicator");
    if (loadingEl) loadingEl.classList.remove("hidden");

    try {
        const remota = await listarEscolas();
        if (remota.length) {
            escolasLocais = remota;
        }
    } catch {
        // usa dados locais silenciosamente
    } finally {
        if (loadingEl) loadingEl.classList.add("hidden");
    }

    renderTabela(escolasLocais);
    document.querySelector("#total-escolas").textContent = escolasLocais.length;
}

function getFormData() {
    return {
        nome:      document.querySelector("#campo-nome").value.trim(),
        estado:    document.querySelector("#campo-estado").value,
        mediaEnem: Number(document.querySelector("#campo-media").value),
        ano:       Number(document.querySelector("#campo-ano").value),
        tipo:      document.querySelector("#campo-tipo").value,
    };
}

function limparForm() {
    ["campo-nome","campo-estado","campo-media","campo-ano","campo-tipo"]
        .forEach(id => { document.querySelector(`#${id}`).value = ""; });
    editandoId = null;
    document.querySelector("#btn-submit").textContent = "Cadastrar Escola";
    document.querySelector("#btn-submit").classList.remove("btn-update");
    document.querySelector("#form-title").textContent = "Nova Escola";
}

function mostrarToast(msg, tipo = "success") {
    const toast = document.querySelector("#toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.className = `toast-msg ${tipo === "success" ? "toast-success" : "toast-error"}`;
    toast.classList.remove("hidden", "opacity-0");
    setTimeout(() => toast.classList.add("opacity-0"), 2500);
    setTimeout(() => toast.classList.add("hidden"), 3000);
}

window.abrirEdicao = (id) => {
    const escola = escolasLocais.find(e => e.objectId === id);
    if (!escola) return;
    editandoId = id;
    document.querySelector("#campo-nome").value    = escola.nome;
    document.querySelector("#campo-estado").value  = escola.estado;
    document.querySelector("#campo-media").value   = escola.mediaEnem;
    document.querySelector("#campo-ano").value     = escola.ano;
    document.querySelector("#campo-tipo").value    = escola.tipo;
    document.querySelector("#btn-submit").textContent = "Salvar Alterações";
    document.querySelector("#btn-submit").classList.add("btn-update");
    document.querySelector("#form-title").textContent = `Editando: ${escola.nome}`;
    document.querySelector("#campo-nome").focus();
    document.querySelector("#form-section").scrollIntoView({ behavior: "smooth" });
};

window.confirmarDelete = (id, nome) => {
    const modal = document.querySelector("#modal-confirm");
    document.querySelector("#modal-nome").textContent = nome;
    modal.classList.remove("hidden");
    document.querySelector("#btn-confirm-delete").onclick = async () => {
        try {
            await deletarEscola(id);
        } catch {
            // back4app não configurado, remove local
        }
        escolasLocais = escolasLocais.filter(e => e.objectId !== id);
        renderTabela(escolasLocais);
        document.querySelector("#total-escolas").textContent = escolasLocais.length;
        modal.classList.add("hidden");
        mostrarToast("Escola removida com sucesso");
    };
    document.querySelector("#btn-cancel-delete").onclick = () => modal.classList.add("hidden");
};

document.addEventListener("DOMContentLoaded", () => {
    carregarEscolas();

    document.querySelector("#form-escola").addEventListener("submit", async (e) => {
        e.preventDefault();
        const dados = getFormData();
        if (!dados.nome || !dados.estado || !dados.mediaEnem || !dados.ano) {
            mostrarToast("Preencha todos os campos!", "error");
            return;
        }

        const btnSubmit = document.querySelector("#btn-submit");
        btnSubmit.disabled = true;
        btnSubmit.textContent = "Salvando…";

        try {
            if (editandoId) {
                try { await atualizarEscola(editandoId, dados); } catch {}
                const idx = escolasLocais.findIndex(e => e.objectId === editandoId);
                if (idx !== -1) escolasLocais[idx] = { ...escolasLocais[idx], ...dados };
                mostrarToast("Escola atualizada!");
            } else {
                let novo;
                try {
                    novo = await criarEscola(dados);
                } catch {
                    novo = { objectId: "local_" + Date.now() };
                }
                escolasLocais.unshift({ ...dados, objectId: novo.objectId });
                mostrarToast("Escola cadastrada!");
            }
        } catch {
            mostrarToast("Erro ao salvar. Verifique o Back4App.", "error");
        }

        renderTabela(escolasLocais);
        document.querySelector("#total-escolas").textContent = escolasLocais.length;
        limparForm();
        btnSubmit.disabled = false;
        btnSubmit.textContent = "Cadastrar Escola";
    });

    document.querySelector("#btn-cancelar")?.addEventListener("click", limparForm);

    document.querySelector("#busca-escola")?.addEventListener("input", (e) => {
        const q = e.target.value.toLowerCase();
        const filtrado = escolasLocais.filter(es =>
            es.nome.toLowerCase().includes(q) || es.estado.toLowerCase().includes(q)
        );
        renderTabela(filtrado);
    });
});
