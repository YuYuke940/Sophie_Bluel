let categories=[];
let works =[];
const gallery = document.querySelector('.gallery');
const filters = document.querySelector('.filters');

async function fetchWorks() {
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'GET',
           
        });
        if (!response.ok) {
            throw new Error('Erreur HTTP : ' + response.status);
        }
        const worksList = await response.json();
        console.log('Travaux récupérés :', worksList);
        works=worksList;
        displayWorks(0);

        //generateCategoryMenu(works); // Appeler la génération du menu de catégories après avoir récupéré les travaux
    } catch (error) {
        console.error('Erreur lors de la récupération des travaux:', error);
    }
}
async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories', {
            method: 'GET',
           
        });
        if (!response.ok) {
            throw new Error('Erreur HTTP : ' + response.status);
        }
        const categoriesList = await response.json();
        console.log('Catégories récupérés :', categoriesList);//A enlever plus tt
        categories=categoriesList;
        displayCategories();

        //generateCategoryMenu(works); // Appeler la génération du menu de catégories après avoir récupéré les travaux
    } catch (error) {
        console.error('Erreur lors de la récupération des travaux:', error);
    }
}

function displayWorks(categoryId) {
    let filteredWorks=[];
    if (categoryId===0){
        filteredWorks=works
    }
    else {
        filteredWorks=works.filter(work=>work.categoryId===categoryId);
    }
    gallery.innerHTML = ''; // Vider le contenu existant
    filteredWorks.forEach(work => {

        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src=work.imageUrl;
        img.alt=work.title;
        const figcaption = document.createElement('figcaption');
        figcaption.innerHTML=work.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

function displayCategories() {
    let filteredCategories = [...categories];
    filteredCategories.push ({
        "id": 0,
        "name": "Tous"
    })
    filteredCategories.sort((a,b) => a.id - b.id);
    filteredCategories.forEach(category => {
        const button = document.createElement('button');
        button.innerHTML=category.name;
        button.addEventListener('click', ()=>displayWorks(category.id))
        filters.appendChild(button);
    });

}

// Appel de la fonction pour récupérer et afficher les travaux
fetchCategories();
fetchWorks();