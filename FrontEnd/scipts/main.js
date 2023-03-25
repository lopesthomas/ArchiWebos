
function checkLogin(donneesProjets) {
    if (localStorage.getItem('token')) {
        // Si l'utilisateur est connecté
        // document.querySelector(".sticky-bar").innerHTML = "";
        document.body.style.marginTop = "90px";
        //Cible la balise pour inserer les elements
        const cibleBar = document.querySelector(".stickybar");      

        let a = document.createElement("a");
        let link = document.createTextNode("Mode édition")
        a.title = "Mode édition";
        a.href = "#";
        a.innerHTML = '<i class="fa-regular fa-pen-to-square" style="color: #ffffff;"></i> Mode édition';
        a.style.textDecorationLine = "none";
        cibleBar.appendChild(a);

        //Creation du button
        let buttonn = document.createElement("button");
        buttonn.innerHTML = "publier les changements";
        //Placer en element "Child" a la cible
        cibleBar.appendChild(buttonn);
        //Evenement au Click du button
        buttonn.addEventListener ("click", function() {
            // alert("alert");
            console.log("button click");
        });

        let login = document.getElementById("login");
        login.innerHTML = "logout";
        login.addEventListener("click", function() {
            localStorage.removeItem('token');
            document.location.href="./index.html";
        });

        cibleIntro = document.querySelector("#intro-figure")
        let aIntro = document.createElement("a");
        let linkIntro = document.createTextNode("Mode édition")
        aIntro.title = "Mode édition";
        aIntro.innerHTML = '<i class="fa-regular fa-pen-to-square" style="color: #000000;"></i> modifier';
        cibleIntro.appendChild(aIntro);

        cibleProjet = document.querySelector(".h2-box");
        let aProjet = document.createElement("a");
        let linkProjet = document.createTextNode("Mode édition")
        aProjet.title = "Mode édition";
        aProjet.innerHTML = '<i class="fa-regular fa-pen-to-square" style="color: #000000;"></i> modifier';
        cibleProjet.appendChild(aProjet);

    } else {

        // Si l'utilisateur n'est pas connecté
        login.innerHTML = "login";
        login.addEventListener("click", function() {
            localStorage.removeItem('token');
            document.location.href="./login.html";
        });
        document.getElementById("stickbar").style.display = "none";
        console.log("pas connecte");
        genererButtons(donneesProjets);
    }
}



//Recuperation des donnees des Projets serveur
function init(){
    console.log("Initialisation");
  
    fetch('http://localhost:5678/api/works')
    .then(response =>(response.json()))
    .then(data => sendData(data));
};
init();
    
function sendData(donneesProjets) {

    genererProjet(donneesProjets);
    checkLogin(donneesProjets);
    
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
    });
}

