// crud.js - CRUD com Back4App (Parse REST API)
const BASE_URL = "https://parseapi.back4app.com/classes/Escola";
const HEADERS = {
    "X-Parse-Application-Id": "SUA_APP_ID_AQUI",
    "X-Parse-REST-API-Key": "SUA_REST_KEY_AQUI",
    "Content-Type": "application/json",
};

export async function criarEscola(dados) {
    const resposta = await fetch(BASE_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(dados)
    });
    if (!resposta.ok) throw new Error("Erro ao criar escola");
    return resposta.json();
}

export async function listarEscolas() {
    const resposta = await fetch(`${BASE_URL}?order=-createdAt`, { headers: HEADERS });
    if (!resposta.ok) throw new Error("Erro ao listar escolas");
    const dados = await resposta.json();
    return dados.results || [];
}

export async function atualizarEscola(id, dados) {
    const resposta = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(dados)
    });
    if (!resposta.ok) throw new Error("Erro ao atualizar escola");
    return resposta.json();
}

export async function deletarEscola(id) {
    const resposta = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: HEADERS
    });
    if (!resposta.ok) throw new Error("Erro ao deletar escola");
    return true;
}
