// dataset.js - Dados educacionais do ENEM para o frontend

export const mediaPorEstado = [
    { estado: "SP", regiao: "Sudeste", media: 565, inscricoesConfi: 751648 },
    { estado: "MG", regiao: "Sudeste", media: 562, inscricoesConfi: 464994 },
    { estado: "RJ", regiao: "Sudeste", media: 557, inscricoesConfi: 329001 },
    { estado: "ES", regiao: "Sudeste", media: 560, inscricoesConfi: 85920 },
    { estado: "GO", regiao: "Centro-Oeste", media: 545, inscricoesConfi: 166761 },
    { estado: "MT", regiao: "Centro-Oeste", media: 533, inscricoesConfi: 80429 },
    { estado: "MS", regiao: "Centro-Oeste", media: 538, inscricoesConfi: 57941 },
    { estado: "DF", regiao: "Centro-Oeste", media: 565, inscricoesConfi: 82975 },
    { estado: "PR", regiao: "Sul", media: 552, inscricoesConfi: 195870 },
    { estado: "RS", regiao: "Sul", media: 550, inscricoesConfi: 186541 },
    { estado: "SC", regiao: "Sul", media: 562, inscricoesConfi: 110465 },
    { estado: "RO", regiao: "Norte", media: 525, inscricoesConfi: 46801 },
    { estado: "AC", regiao: "Norte", media: 540, inscricoesConfi: 28962 },
    { estado: "AP", regiao: "Norte", media: 514, inscricoesConfi: 33193 },
    { estado: "AM", regiao: "Norte", media: 505, inscricoesConfi: 110842 },
    { estado: "PA", regiao: "Norte", media: 511, inscricoesConfi: 289392 },
    { estado: "TO", regiao: "Norte", media: 520, inscricoesConfi: 37652 },
    { estado: "RR", regiao: "Norte", media: 525, inscricoesConfi: 14162 },
    { estado: "AL", regiao: "Nordeste", media: 523, inscricoesConfi: 96448 },
    { estado: "BA", regiao: "Nordeste", media: 552, inscricoesConfi: 428019 },
    { estado: "CE", regiao: "Nordeste", media: 538, inscricoesConfi: 275937 },
    { estado: "MA", regiao: "Nordeste", media: 513, inscricoesConfi: 211383 },
    { estado: "PB", regiao: "Nordeste", media: 537, inscricoesConfi: 142050 },
    { estado: "PE", regiao: "Nordeste", media: 536, inscricoesConfi: 272299 },
    { estado: "PI", regiao: "Nordeste", media: 525, inscricoesConfi: 120040 },
    { estado: "RN", regiao: "Nordeste", media: 542, inscricoesConfi: 113229 },
    { estado: "SE", regiao: "Nordeste", media: 535, inscricoesConfi: 78344 },
];

export const evolucaoPorInscricao = [
    { ano: 2020, inscricoes: 5825370 },
    { ano: 2021, inscricoes: 3444178 },
    { ano: 2022, inscricoes: 3547835 },
    { ano: 2023, inscricoes: 4018414 },
    { ano: 2024, inscricoes: 4325962 },
    { ano: 2025, inscricoes: 4811338 },
];

export const mediaPorDisciplina = [
    { disciplina: "Linguagens", media: 528 },
    { disciplina: "Ciências Humanas", media: 517 },
    { disciplina: "Ciências da Natureza", media: 495 },
    { disciplina: "Matemática", media: 529 },
    { disciplina: "Redação", media: 669 },
];
