// js/main.js

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// 1) Dados e slideshow principal
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const jogos = [
    {
        nome: "Horizon Chase Turbo",
        desc: "Jogo de corrida arcade com inspiração nos clássicos dos anos 90.",
        preco: "R$ 19,99",
        capa: "/images/horizon.jpg"
    },
    {
        nome: "Dandara",
        desc: "Metroidvania com arte incrível e jogabilidade desafiadora.",
        preco: "R$ 27,99",
        capa: "/images/Dandara.jpg"
    },
    {
        nome: "Fobia - St. Dinfna Hotel",
        desc: "Survival horror nacional com ambientação tensa e enredo misterioso.",
        preco: "R$ 29,99",
        capa: "/images/Fobia - St. Dinfna Hotel.jpg"
    },
    {
        nome: "A Lenda do Herói",
        desc: "Narrado com música cantada, misturando aventura e comédia.",
        preco: "R$ 34,99",
        capa: "/images/A Lenda do Heroi.avif"
    }
];

let jogoAtual = 0;
let intervalo;

// Atualiza a exibição do slide
function exibirJogo(index) {
    const jogo = jogos[index];
    document.getElementById("imagem-destaque").src = jogo.capa;
    document.getElementById("nome-destaque").textContent = jogo.nome;
    document.getElementById("desc-destaque").textContent = jogo.desc;
    document.getElementById("preco-destaque").textContent = jogo.preco;

    document.querySelectorAll('.miniatura').forEach((mini, i) => {
        mini.classList.toggle('ativa', i === index);
    });
}

// Seleciona manualmente um slide
function selecionarJogo(index) {
    jogoAtual = index;
    exibirJogo(index);
    resetarIntervalo();
}

// Avança automaticamente
function avancarJogo() {
    jogoAtual = (jogoAtual + 1) % jogos.length;
    exibirJogo(jogoAtual);
}

// Reinicia o timer
function resetarIntervalo() {
    clearInterval(intervalo);
    intervalo = setInterval(avancarJogo, 5000);
}

// Inicia o slideshow assim que o DOM carrega
document.addEventListener('DOMContentLoaded', () => {
    exibirJogo(jogoAtual);
    intervalo = setInterval(avancarJogo, 5000);
});



// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// 2) Carrossel de “Jogos para você”
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
document.addEventListener("DOMContentLoaded", () => {
    const carrossel = document.querySelector(".carrosel");
    const cards = document.querySelectorAll(".jogosCard");
    const btnEsquerda = document.querySelector(".seta-esquerda");
    const btnDireita = document.querySelector(".seta-direita");

    const visiveis = 3;
    let scrollIndex = 0;

    function rolarPara(idx) {
        const gap = 20; // mesmo gap do CSS
        const largura = cards[0].offsetWidth + gap;
        const maxIdx = cards.length - visiveis;
        const destino = Math.min(idx * largura, maxIdx * largura);
        carrossel.scrollTo({ left: destino, behavior: "smooth" });
    }

    btnDireita.addEventListener("click", () => {
        scrollIndex++;
        if (scrollIndex > cards.length - visiveis) scrollIndex = 0;
        rolarPara(scrollIndex);
    });

    btnEsquerda.addEventListener("click", () => {
        scrollIndex--;
        if (scrollIndex < 0) scrollIndex = cards.length - visiveis;
        rolarPara(scrollIndex);
    });
});



// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// 3) Menu hamburger + dots do slideshow (mobile)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
document.addEventListener("DOMContentLoaded", () => {
    // 1) Toggle do menu
    document.querySelector('.menu-toggle')
        .addEventListener('click', e => e.currentTarget.classList.toggle('active'));

    // 2) Dots do carrossel principal
    const dotsContainer = document.querySelector('.carousel-dots');

    function initDots() {
        dotsContainer.innerHTML = '';
        jogos.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.addEventListener('click', () => selecionarJogo(i));
            dotsContainer.appendChild(dot);
        });
    }

    function updateDots() {
        document.querySelectorAll('.carousel-dots .dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === jogoAtual);
        });
    }

    // 3) Integra dots à exibirJogo
    const originalExibir = exibirJogo;
    exibirJogo = function (index) {
        originalExibir(index);
        updateDots();
    };

    initDots();
    updateDots();
});
