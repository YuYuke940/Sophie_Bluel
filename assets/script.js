const apiURL = 'http://localhost:5678/api/works'; // URL de l'API locale

async function fetchWorks() {
    try {
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Erreur HTTP : ' + response.status);
        }
        const works = await response.json();
        console.log('Travaux récupérés :', works);
        displayWorks(works);
        generateCategoryMenu(works); // Appeler la génération du menu de catégories après avoir récupéré les travaux
    } catch (error) {
        console.error('Erreur lors de la récupération des travaux:', error);
    }
}

function displayWorks(works) {
    const worksContainer = document.getElementById('works');
    worksContainer.innerHTML = ''; // Vider le contenu existant
    works.forEach(work => {
        const workElement = document.createElement('figure');
        workElement.innerHTML = `
            <img src="${work.image}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        `;
        worksContainer.appendChild(workElement);
        console.log('Ajouté au DOM :', workElement);
    });
}

function generateCategoryMenu(works) {
    const categories = new Set();
    works.forEach(work => {
        categories.add(work.category);
    });

    const menuContainer = document.getElementById('category-menu');
    categories.forEach(category => {
        const menuItem = document.createElement('button');
        menuItem.textContent = category;
        menuItem.addEventListener('click', () => filterWorksByCategory(category, works));
        menuContainer.appendChild(menuItem);
        console.log('Catégorie ajoutée :', category);
    });

    // Ajouter une option pour afficher tous les travaux
    const allWorksButton = document.createElement('button');
    allWorksButton.textContent = 'Tous';
    allWorksButton.addEventListener('click', () => displayWorks(works));
    menuContainer.appendChild(allWorksButton);
    console.log('Bouton pour tous les travaux ajouté');
}

function filterWorksByCategory(category, works) {
    const filteredWorks = works.filter(work => work.category === category);
    console.log('Travaux filtrés :', filteredWorks);
    displayWorks(filteredWorks);
}

// Appel de la fonction pour récupérer et afficher les travaux
fetchWorks();