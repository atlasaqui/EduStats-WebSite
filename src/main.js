// main.js - Ponto de entrada: inicializa dashboard
import { criarGraficoRegioes, criarGraficoHistorico, criarGraficoDisciplinas, criarGraficoDoughnut } from "./charts.js";
import { buscarEstados, buscarCidades } from "./external-api.js";
import { mediaPorEstado, evolucaoPorInscricao } from "../data/dataset.js";

document.addEventListener("DOMContentLoaded", async () => {
    // KPIs
    const totalInscricoes = evolucaoPorInscricao.at(-1).inscricoes;
    const mediaGeral = mediaPorEstado.reduce((s, d) => s + d.media, 0) / mediaPorEstado.length;

    const kpiEl = document.querySelector("#kpi-inscricoes");
    const kpiMedia = document.querySelector("#kpi-media");
    const kpiEstados = document.querySelector("#kpi-estados");
    const kpiAno = document.querySelector("#kpi-ano");

    if (kpiEl)      kpiEl.textContent      = (totalInscricoes / 1_000_000).toFixed(2) + "M";
    if (kpiMedia)   kpiMedia.textContent   = mediaGeral.toFixed(1);
    if (kpiEstados) kpiEstados.textContent = mediaPorEstado.length;
    if (kpiAno)     kpiAno.textContent     = "2025";

    // Gráficos
    criarGraficoRegioes();
    criarGraficoHistorico();
    criarGraficoDisciplinas();
    criarGraficoDoughnut();

    // Filtro de região
    const filtroRegiao = document.querySelector("#filtroRegiao");
    if (filtroRegiao) {
        filtroRegiao.addEventListener("change", (e) => {
            criarGraficoRegioes(e.target.value);
        });
    }

    // Filtros de estado e cidade via IBGE
    const filtroEstado = document.querySelector("#filtroEstado");
    const filtroCidade = document.querySelector("#filtroCidade");

    if (filtroEstado) {
        const ibgeBadge = document.querySelector("#ibge-badge");
        try {
            const estados = await buscarEstados();
            estados.forEach(e => {
                const option = document.createElement("option");
                option.value = e.sigla;
                option.textContent = `${e.nome} (${e.sigla})`;
                filtroEstado.appendChild(option);
            });
            if (ibgeBadge) {
                ibgeBadge.textContent = "✓ IBGE conectado";
                ibgeBadge.classList.add("text-emerald-400");
                ibgeBadge.classList.remove("text-slate-500");
            }
        } catch {
            if (ibgeBadge) ibgeBadge.textContent = "⚠ API indisponível";
        }

        filtroEstado.addEventListener("change", async (e) => {
            const sigla = e.target.value;

            // atualiza gráfico
            if (!sigla) {
                criarGraficoRegioes(filtroRegiao?.value || "Todos");
            } else {
                const estadoDado = mediaPorEstado.find(d => d.estado === sigla);
                if (estadoDado) criarGraficoRegioes(estadoDado.regiao);
            }

            // popula cidades
            if (filtroCidade) {
                filtroCidade.innerHTML = '<option value="">Todas as cidades</option>';
                filtroCidade.disabled = !sigla;
                if (sigla) {
                    try {
                        const cidades = await buscarCidades(sigla);
                        cidades.forEach(c => {
                            const option = document.createElement("option");
                            option.value = c.id;
                            option.textContent = c.nome;
                            filtroCidade.appendChild(option);
                        });
                    } catch {
                        // silencioso: campo fica sem opções
                    }
                }
            }
        });
    }
});