document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.jogo-card');
    const tudoBtn = document.querySelector('.filtro-ativo');
    const favoritosBtn = document.querySelector('.favorito-ativo');
    const searchInput = document.querySelector('.custom-search input');

    // ————— Favoritos —————
    cards.forEach(card => {
        const heartIcon = card.querySelector('.bi-heart');
        const title = card.querySelector('.card-title').innerText;

        heartIcon.addEventListener('click', function () {
            if (heartIcon.classList.contains('favorito')) {
                heartIcon.classList.remove('favorito');
                heartIcon.classList.replace('bi-heart-fill', 'bi-heart');
                localStorage.removeItem(title);
            } else {
                heartIcon.classList.add('favorito');
                heartIcon.classList.replace('bi-heart', 'bi-heart-fill');
                localStorage.setItem(title, 'favorito');
            }
        });

        if (localStorage.getItem(title) === 'favorito') {
            heartIcon.classList.add('favorito');
            heartIcon.classList.replace('bi-heart', 'bi-heart-fill');
        }
    });

    // ————— Abas “Tudo” / “Favoritos” —————
    tudoBtn.addEventListener('click', function () {
        cards.forEach(card => card.parentElement.style.display = 'block');
        tudoBtn.classList.add('ativo');
        favoritosBtn.classList.remove('ativo');
    });

    favoritosBtn.addEventListener('click', function () {
        cards.forEach(card => {
            const title = card.querySelector('.card-title').innerText;
            const isFavorito = localStorage.getItem(title) === 'favorito';
            card.parentElement.style.display = isFavorito ? 'block' : 'none';
        });
        favoritosBtn.classList.add('ativo');
        tudoBtn.classList.remove('ativo');
    });

    // ————— Filtro de Busca —————
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        cards.forEach(card => {
            const title = card.querySelector('.card-title').innerText.toLowerCase();
            card.parentElement.style.display = title.includes(query)
                ? 'block'
                : 'none';
        });
    });
});

// ————— Filtrar completo via dropdown “Filtrar” —————
document.querySelectorAll('a.dropdown-item').forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();

        // 0) Sempre começa mostrando tudo
        document.querySelectorAll('section.row .col')
            .forEach(col => col.style.display = 'block');

        // 1) Mostrar Favoritos
        if (item.dataset.action === 'show-fav') {
            document.querySelectorAll('.jogo-card').forEach(card => {
                const title = card.querySelector('.card-title').innerText;
                card.parentElement.style.display =
                    localStorage.getItem(title) === 'favorito' ? 'block' : 'none';
            });
        }

        // 2) Filtrar por Gênero
        if (item.dataset.genre) {
            document.querySelectorAll('.jogo-card').forEach(card => {
                card.parentElement.style.display =
                    card.dataset.genre === item.dataset.genre ? 'block' : 'none';
            });
        }

        // 3) Filtrar por Plataforma
        if (item.dataset.platform) {
            document.querySelectorAll('.jogo-card').forEach(card => {
                card.parentElement.style.display =
                    card.dataset.platform === item.dataset.platform ? 'block' : 'none';
            });
        }

        // 4) Filtrar por Data (“Mais recentes” / “Mais antigas”)
        if (item.dataset.added) {
            const container = document.querySelector('section.row');
            Array.from(container.children)
                .sort((a, b) => {
                    const dA = new Date(a.querySelector('.jogo-card').dataset.added);
                    const dB = new Date(b.querySelector('.jogo-card').dataset.added);
                    return item.dataset.added === 'new' ? dB - dA : dA - dB;
                })
                .forEach(col => container.appendChild(col));
        }

        // 5) Ordenar A→Z / Z→A
        if (item.dataset.order) {
            sortCards(item.dataset.order);
        }

        // 6) Fecha o dropdown
        const btn = document.getElementById('filtrarDropdown');
        const inst = bootstrap.Dropdown.getInstance(btn);
        if (inst) inst.hide();
    });
});

// ————— Função que faltava —————
/**
 * Ordena todas as colunas pelo título A→Z ou Z→A
 * @param {'az'|'za'} order
 */
function sortCards(order) {
    const container = document.querySelector('section.row');
    const cols = Array.from(container.children);
    cols.sort((a, b) => {
        const aText = a.querySelector('.card-title').innerText.toLowerCase();
        const bText = b.querySelector('.card-title').innerText.toLowerCase();
        // Usa localeCompare para lidar melhor com acentos
        return order === 'az'
            ? aText.localeCompare(bText)
            : bText.localeCompare(aText);
    });
    cols.forEach(col => container.appendChild(col));
}
