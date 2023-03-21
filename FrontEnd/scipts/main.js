
    //Recuperation des donnees des Projets serveur
async function Init(Valeur){
    console.log("Initialisation");
  
    const reponse = await fetch('http://localhost:5678/api/works');
    let Projet = await reponse.json();
    console.log(Projet);
  
    tableau(Projet);
    genererProjet(donneesProjets);
    genererButtons(donneesProjets);
  
    return Valeur = Projet;
  };
let donneesProjets;
Init();

//Tranforme les donnees Projets en un tableau
function tableau(Projet){donneesProjets = Projet; console.log(donneesProjets)};


function genererProjet(donneesProjets, x){
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
    
        console.log("valeur de x ",x);
      }
       
    };

    const setDonnees = new Set();    

    function genererButtons(donneesProjets){

        //Cible la balise pour inserer les buttons
        const cibleHTML = document.querySelector(".buttons");  
        //Creation du button
        var button = document.createElement("button");
        button.innerHTML = "Tous";
        //Placer en element "Child" a la cible
        cibleHTML.appendChild(button);
        //Evenement au Click du button
        button.addEventListener ("click", function() {
         // alert("alert");
          genererProjet(donneesProjets);
          console.log("button click");
        });
      
      
      
      
        for (let i = 0; i < donneesProjets.length; i++) {
          let catname = donneesProjets[i].category.name;
          setDonnees.add(catname);
          console.log(setDonnees);    
      
          // console.log(i);
      
        };

        const setIter = setDonnees[Symbol.iterator]();
        let id = 0;
      //  for (let j = 0; j < set1.size; j++) 
        setDonnees.forEach(function(value) {
          let recup = setIter.next().value;
          let tb = [];
          id = id + 1;  
          tb.push(id);
          console.log("id ", id, tb); 
          tb[id] = document.createElement("button");
          tb[id].innerHTML = recup;
          cibleHTML.appendChild(tb[id]);

          tb[id].addEventListener ("click", function() {
             alert("alert");
             genererProjet(donneesProjets, id);
             console.log("button click");
           });

          console.log(" valeur ", );
      
        });
      
      }



  