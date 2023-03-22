
    //Recuperation des donnees des Projets serveur
    async function init(){
        console.log("Initialisation");
      
        fetch('http://localhost:5678/api/works')
        .then(response =>(response.json()))
        .then(data => sendData(data));
      
    
      
    
      };
    init();
    
    function sendData(donneesProjets) {
    
     genererProjet(donneesProjets);
     genererButtons(donneesProjets);
     }
    
    
    
    function genererProjet(donneesProjets, x){
    
        if(x > 0) {
            console.log("valeur de x ", x);
            document.querySelector(".gallery").innerHTML = "";
            for (let i = 0; i < donneesProjets.length; i++) {
                if(x == donneesProjets[i].category.id){
        
            
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
              }
    
        } else {
    
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
    
            function generateClickFunction(buttonNumber) {
                return function() {
                    genererProjet(donneesProjets, buttonNumber)
                  console.log("Vous avez cliqué sur le bouton " + buttonNumber);
                };
              }
    
          //  for (let j = 0; j < set1.size; j++) 
            setDonnees.forEach(function(value) {
              let recup = setIter.next().value;
              
              id = id + 1;  
              button = document.createElement("button");
              button.innerHTML = recup;
              button.className = id; 
              button.addEventListener("click", generateClickFunction(id));
    
              cibleHTML.appendChild(button);
    
              
    
              console.log(" valeur ", );
          
            });
          
          }
    
    
    
      