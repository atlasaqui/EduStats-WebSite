// crud.js - CRUD com Back4App (Parse REST API)
// ─────────────────────────────────────────────────────────────
// Cole suas chaves abaixo (Back4App → App Settings → Security & Keys)
// ─────────────────────────────────────────────────────────────
const BACK4APP_APP_ID   = "SUA_APP_ID_AQUI";    // ← Application ID
const BACK4APP_REST_KEY = "SUA_REST_KEY_AQUI";  // ← REST API Key

const BASE_URL = "https://parseapi.back4app.com/classes/Escolas";
const HEADERS = {
    "X-Parse-Application-Id": BACK4APP_APP_ID,
    "X-Parse-REST-API-Key":   BACK4APP_REST_KEY,
    "Content-Type": "application/json",
};

export async function criarEscola(dados) {
    const resposta = await fetch(BASE_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(dados),
    });
    if (!resposta.ok) throw new Error(`Erro ao criar escola: ${resposta.status}`);
    return resposta.json();
}

export async function listarEscolas() {
    const resposta = await fetch(`${BASE_URL}?order=-createdAt&limit=200`, { headers: HEADERS });
    if (!resposta.ok) throw new Error(`Erro ao listar escolas: ${resposta.status}`);
    const dados = await resposta.json();
    return dados.results || [];
}

export async function atualizarEscola(id, dados) {
    const resposta = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(dados),
    });
    if (!resposta.ok) throw new Error(`Erro ao atualizar escola: ${resposta.status}`);
    return resposta.json();
}

export async function deletarEscola(id) {
    const resposta = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: HEADERS,
    });
    if (!resposta.ok) throw new Error(`Erro ao deletar escola: ${resposta.status}`);
    return true;
}
