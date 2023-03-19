
    //Recuperation des donnees des Projets serveur
async function Init(Valeur){
    console.log("Initialisation");
  
    const reponse = await fetch('http://localhost:5678/api/works');
    let Projet = await reponse.json();
    console.log(Projet);
  
    tableau(Projet);
    genererProjet(donneesProjets);
  
    return Valeur = Projet;
  };
let donneesProjets;
Init();

//Tranforme les donnees Projets en un tableau
function tableau(Projet){donneesProjets = Projet; console.log(donneesProjets)};

function genererProjet(donneesProjets){
    document.querySelector(".gallery").innerHTML = "";
      for (let i = 0; i < donneesProjets.length; i++) {
    
        
        const figure = donneesProjets[i];
        // Récupération de l'élément du DOM qui accueillera les projets
        const sectionFiches = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet
        const pieceElement = document.createElement("figure");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = figure.title;
      
        const categorieElement = document.createElement("p");
        categorieElement.innerText = figure.category.id ?? "(aucune catégorie)";
        
        // On rattache la balise figure a la class gallery
        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(categorieElement);
    
      }
       
    };



  