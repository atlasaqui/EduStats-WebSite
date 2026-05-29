// external-api.js - API do IBGE para enriquecer os dados do dashboard
const IBGE_BASE = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

export async function buscarEstados() {
    const resposta = await fetch(IBGE_BASE);
    if (!resposta.ok) throw new Error("Falha na API do IBGE");
    const estados = await resposta.json();
    return estados
        .map(e => ({ sigla: e.sigla, nome: e.nome, regiao: e.regiao.nome }))
        .sort((a, b) => a.nome.localeCompare(b.nome));
}

export async function buscarCidades(siglaEstado) {
    const resposta = await fetch(`${IBGE_BASE}/${siglaEstado}/municipios`);
    if (!resposta.ok) throw new Error(`Falha ao buscar cidades de ${siglaEstado}`);
    const cidades = await resposta.json();
    return cidades
        .map(c => ({ id: c.id, nome: c.nome }))
        .sort((a, b) => a.nome.localeCompare(b.nome));
}