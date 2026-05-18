// charts.js - Gráficos do dashboard com Chart.js
import { mediaPorEstado, evolucaoPorInscricao, mediaPorDisciplina } from "../data/dataset.js";

const COLORS = {
    norte:       { bg: "rgba(56,189,248,0.7)",   border: "#0ea5e9" },
    nordeste:    { bg: "rgba(251,146,60,0.7)",   border: "#f97316" },
    centroOeste: { bg: "rgba(163,230,53,0.7)",   border: "#84cc16" },
    sudeste:     { bg: "rgba(167,139,250,0.7)",  border: "#7c3aed" },
    sul:         { bg: "rgba(52,211,153,0.7)",   border: "#10b981" },
};

function corPorRegiao(regiao) {
    const mapa = {
        "Norte": COLORS.norte,
        "Nordeste": COLORS.nordeste,
        "Centro-Oeste": COLORS.centroOeste,
        "Sudeste": COLORS.sudeste,
        "Sul": COLORS.sul,
    };
    return mapa[regiao] || { bg: "rgba(148,163,184,0.7)", border: "#64748b" };
}

let graficoEstados = null;
let graficoHistorico = null;
let graficoDisciplinas = null;
let graficoDoughnut = null;

export function criarGraficoRegioes(filtroRegiao = "Todos") {
    const canvas = document.querySelector("#grafico-regioes");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const dados = filtroRegiao === "Todos"
        ? mediaPorEstado
        : mediaPorEstado.filter(d => d.regiao === filtroRegiao);

    const labels = dados.map(d => d.estado);
    const values = dados.map(d => d.media);
    const bgs    = dados.map(d => corPorRegiao(d.regiao).bg);
    const borders= dados.map(d => corPorRegiao(d.regiao).border);

    if (graficoEstados) graficoEstados.destroy();

    graficoEstados = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Média ENEM por Estado",
                data: values,
                backgroundColor: bgs,
                borderColor: borders,
                borderWidth: 2,
                borderRadius: 6,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        afterLabel: (ctx) => {
                            const d = dados[ctx.dataIndex];
                            return `Região: ${d.regiao}\nInscritos: ${d.inscricoesConfi.toLocaleString("pt-BR")}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 490,
                    grid: { color: "rgba(255,255,255,0.05)" },
                    ticks: { color: "#94a3b8" }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: "#94a3b8", font: { size: 11 } }
                }
            }
        }
    });
}

export function criarGraficoHistorico() {
    const canvas = document.querySelector("#grafico-historico");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (graficoHistorico) graficoHistorico.destroy();

    graficoHistorico = new Chart(ctx, {
        type: "line",
        data: {
            labels: evolucaoPorInscricao.map(d => d.ano),
            datasets: [{
                label: "Inscrições ENEM",
                data: evolucaoPorInscricao.map(d => d.inscricoes),
                borderColor: "#f97316",
                backgroundColor: "rgba(249,115,22,0.15)",
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "#f97316",
                pointRadius: 5,
                pointHoverRadius: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    grid: { color: "rgba(255,255,255,0.05)" },
                    ticks: {
                        color: "#94a3b8",
                        callback: v => (v / 1_000_000).toFixed(1) + "M"
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: "#94a3b8" }
                }
            }
        }
    });
}

export function criarGraficoDisciplinas() {
    const canvas = document.querySelector("#grafico-disciplinas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (graficoDisciplinas) graficoDisciplinas.destroy();

    graficoDisciplinas = new Chart(ctx, {
        type: "bar",
        data: {
            labels: mediaPorDisciplina.map(d => d.disciplina),
            datasets: [{
                label: "Média 2025",
                data: mediaPorDisciplina.map(d => d.media),
                backgroundColor: [
                    "rgba(56,189,248,0.7)",
                    "rgba(251,146,60,0.7)",
                    "rgba(163,230,53,0.7)",
                    "rgba(167,139,250,0.7)",
                    "rgba(52,211,153,0.7)",
                ],
                borderColor: ["#0ea5e9","#f97316","#84cc16","#7c3aed","#10b981"],
                borderWidth: 2,
                borderRadius: 6,
            }]
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    min: 470,
                    grid: { color: "rgba(255,255,255,0.05)" },
                    ticks: { color: "#94a3b8" }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: "#94a3b8", font: { size: 11 } }
                }
            }
        }
    });
}

export function criarGraficoDoughnut() {
    const canvas = document.querySelector("#grafico-doughnut");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (graficoDoughnut) graficoDoughnut.destroy();

    const regioes = ["Norte","Nordeste","Centro-Oeste","Sudeste","Sul"];
    const totais = regioes.map(r =>
        mediaPorEstado
            .filter(d => d.regiao === r)
            .reduce((s, d) => s + d.inscricoesConfi, 0)
    );

    graficoDoughnut = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: regioes,
            datasets: [{
                data: totais,
                backgroundColor: [
                    "rgba(56,189,248,0.8)",
                    "rgba(251,146,60,0.8)",
                    "rgba(163,230,53,0.8)",
                    "rgba(167,139,250,0.8)",
                    "rgba(52,211,153,0.8)",
                ],
                borderColor: "#0f172a",
                borderWidth: 3,
                hoverOffset: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: { color: "#94a3b8", padding: 16, font: { size: 12 } }
                },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const total = totais.reduce((a,b)=>a+b,0);
                            const pct = ((ctx.raw / total)*100).toFixed(1);
                            return ` ${ctx.raw.toLocaleString("pt-BR")} inscritos (${pct}%)`;
                        }
                    }
                }
            }
        }
    });
}
