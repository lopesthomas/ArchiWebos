
function checkLogin(donneesProjets) {
    if (localStorage.getItem('token')) {
        // Si l'utilisateur est connecté
        document.querySelector(".stickybar").innerHTML = "";
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
        a.addEventListener ("click", function() {
            editGallery(donneesProjets);
        });

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
        aIntro.href = "#";
        aIntro.style.textDecorationLine = "none";
        aIntro.innerHTML = '<i class="fa-regular fa-pen-to-square" style="color: #000000;"></i> modifier';
        aIntro.addEventListener ("click", function() {
            editGallery(donneesProjets);
        });
        cibleIntro.appendChild(aIntro);

        cibleProjet = document.querySelector(".h2-box");
        let aProjet = document.createElement("a");
        let linkProjet = document.createTextNode("Mode édition")
        aProjet.title = "Mode édition";
        aProjet.href = "#";
        aProjet.style.textDecorationLine = "none";
        aProjet.innerHTML = '<i class="fa-regular fa-pen-to-square" style="color: #000000;"></i> modifier';
        aProjet.addEventListener ("click", function() {
            editGallery(donneesProjets);
        });
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
    console.log(donneesProjets);
    categories(donneesProjets);
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

              
                //const categorieElement = document.createElement("p");
                //categorieElement.innerText = figure.category.id ?? "(aucune catégorie)";
                
                // On rattache la balise figure a la class gallery
                sectionFiches.appendChild(pieceElement);
                pieceElement.appendChild(imageElement);
                pieceElement.appendChild(nomElement);
                //pieceElement.appendChild(categorieElement);        
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
          
            //const categorieElement = document.createElement("p");
            //categorieElement.innerText = figure.category.id ?? "(aucune catégorie)";
            
            // On rattache la balise figure a la class gallery
            sectionFiches.appendChild(pieceElement);
            pieceElement.appendChild(imageElement);
            pieceElement.appendChild(nomElement);
            //pieceElement.appendChild(categorieElement);            
        }
    }
};
    
const setDonnees = new Set();
const setIter = setDonnees[Symbol.iterator]();
let id = 0;

function categories(donneesProjets){
    for (let i = 0; i < donneesProjets.length; i++) {
        let catname = donneesProjets[i].category.name;
        setDonnees.add(catname);
        console.log(setDonnees);
    };    
}    

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
                    
    // for (let i = 0; i < donneesProjets.length; i++) {
    //     let catname = donneesProjets[i].category.name;
    //     setDonnees.add(catname);
    //     setDonnees = setDonnees;
    //     console.log(setDonnees);
    //     // console.log(i);
    // };

    

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

const ouvrirModal = function (e) {
    console.log("open modal");
    let modal = document.querySelector(".modal");
    modal.style.display = null;
    modal.setAttribute("aria-hidden", false);
    let buttonCloseModal = document.querySelector(".closemodalbutton");
    buttonCloseModal.addEventListener("click", function(){
        fermerModal();
    })
    // modal.addEventListener("click", function(event){
    //     if (!event.target.closest(".modalWindow")) {
    //         fermerModal();
    //     }
    // });
    window.onclick = function(event) {
        if (event.target == modal) {
          fermerModal();
        }
      }

}

function fermerModal() {
    let modal = document.querySelector(".modal");
    modal.setAttribute("aria-hidden", true);
    modal.style.display = "none";
    let container1 = document.querySelector(".container1");
    let container2 = document.querySelector(".container2");
    container1.innerHTML = "";
    container2.innerHTML = "";
    if(document.querySelector(".retour")) {
        console.log("Oui il y a la class retour")
        document.getElementById("retour").remove();
        
    }
    //titreProjet.removeEventListener("keyup");


}

function editGallery(donneesProjets) {
    let container1 = document.querySelector(".container1");
    let container2 = document.querySelector(".container2");
    container1.innerHTML = "";
    container2.innerHTML = "";
    titleModal = document.getElementById("titlemodal");
    titleModal.innerHTML = "Galerie photo";
    container1.style.display = "grid"
    container1.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr";
    container1.style.gridColumnGap = "9px"
    container1.style.gridRowGap = "9px"

    for (let i = 0; i < donneesProjets.length; i++) {        
            
        const figure = donneesProjets[i];
        // Création d’une balise dédiée à un projet
        const pieceElement = document.createElement("figure");
        pieceElement.style.width = "inherit";
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        imageElement.style.width = "inherit";

        const buttonSup = document.createElement("button");
        buttonSup.innerHTML = '<i class="fa-solid fa-trash-can fa-2xs" style="color: #ffffff;"></i>'
        buttonSup.style.position = "relative";
        buttonSup.style.top = "-85%";
        buttonSup.style.left = "25%";
        buttonSup.style.width = "17px";
        buttonSup.style.height = "17px";
        buttonSup.style.padding = "0";
        buttonSup.style.backgroundColor = "#000000";
        buttonSup.style.border = "transparent";
        buttonSup.style.borderRadius = "2px";
        buttonSup.addEventListener("click", function(){
            console.log("Delete project: ",donneesProjets[i].id)
            fetch(`http://localhost:5678/api/works/${donneesProjets[i].id}`, {
                method: 'delete',
                headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}
            })
            updateData();
        })

        const editText = document.createElement("a");
        editText.href = "#";
        editText.innerHTML = "éditer";
        editText.style.textDecorationLine = "none";

        
        // On rattache la balise figure a la class container1
        container1.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        
        pieceElement.appendChild(editText);
        pieceElement.appendChild(buttonSup);
    }
    container2.style.marginTop = "38px";
    container2.style.marginBottom = "38px";
    const buttonAjouter = document.createElement("button")
    buttonAjouter.innerHTML = "Ajouter une photo";
    buttonAjouter.style.backgroundColor = "#1D6154";
    buttonAjouter.style.border = "transparent";
    buttonAjouter.style.borderRadius = "60px";
    buttonAjouter.style.fontFamily = "Syne";
    buttonAjouter.style.color = "white";
    buttonAjouter.style.height = "36px";
    buttonAjouter.style.padding = "0px 49px";
    buttonAjouter.addEventListener("click", function(){
        console.log("test");
        ajoutProjet(donneesProjets);
    });

    const toutSup = document.createElement("a");
    toutSup.innerHTML = "Supprimer la galerie";
    toutSup.style.textDecorationLine = "none";
    toutSup.style.color = "#D65353";
    toutSup.style.marginTop = "23px";
    toutSup.style.fontFamily = "Syne";


    container2.appendChild(buttonAjouter);
    container2.appendChild(toutSup);
    if(document.querySelector(".retour")) {
        console.log("Oui il y a la class retour")
        document.getElementById("retour").remove();
        
    }
    ouvrirModal();
}

function ajoutProjet(donneesProjets) {
    let modal = document.querySelector(".modal");
    let container1 = document.querySelector(".container1");
    let container2 = document.querySelector(".container2");
    let topModal = document.querySelector(".topmodal");
    container1.innerHTML = "";
    container2.innerHTML = "";

    const buttonRetour = document.createElement("button");
    buttonRetour.innerHTML = '<i class="fa-solid fa-arrow-left-long fa-xl" style="color: #000000;"></i>';
    buttonRetour.style.border = "none";
    buttonRetour.style.background = "transparent";
    buttonRetour.style.height = "24px";
    buttonRetour.classList.add("retour");
    buttonRetour.setAttribute("id","retour");
    buttonRetour.addEventListener("click", function(){
        editGallery(donneesProjets);
    })
    topModal.appendChild(buttonRetour);
    titleModal = document.getElementById("titlemodal");
    titleModal.innerHTML = "Ajout photo";

    container1.style.gridTemplateColumns = "1fr";
    container1.style.gridColumnGap = "0px"
    container1.style.gridRowGap = "0px"

    const divInsertImg = document.createElement("div");
    divInsertImg.setAttribute("id", "divPhoto");
    divInsertImg.style.height = "169px";
    divInsertImg.style.backgroundColor = "#E8F1F6";
    divInsertImg.style.borderRadius = "3px";
    divInsertImg.style.display = "flex";
    divInsertImg.style.flexDirection = "column";
    divInsertImg.style.justifyContent = "center";
    divInsertImg.style.alignItems = "center";
    //divInsertImg.innerHTML = '<i class="fa-regular fa-image fa-2xl" style="color: #B9C5CC;font-size: 58px;"></i>';

    const iconeImg = document.createElement("p");
    iconeImg.innerHTML = '<i class="fa-regular fa-image fa-2xl" style="color: #B9C5CC;font-size: 58px;"></i>';
    iconeImg.style.height = "41px"

    const inputFile = document.createElement("input");
    inputFile.setAttribute("type", "file");
    inputFile.setAttribute("hidden", true);
    inputFile.setAttribute("id", "input_file");
    inputFile.setAttribute("accept", "image/png, image/jpeg");
    inputFile.addEventListener("change", fichierImg, false);
    //inputFile.setAttribute("onchange", "showPreview(event)");
    
     function fichierImg() {
        let image = this.files;
        if(image.length > 0){
            let src = URL.createObjectURL(image[0]);
            document.getElementById("divPhoto").innerHTML = "";
            let img = document.createElement("img");
            img.src = src;
            img.style.height = "inherit";
            divInsertImg.appendChild(img);
        }
    //     
    //     document.getElementById("divPhoto").innerHTML = "";
    //     let img = document.createElement("img");
    //     img.src = image;
    //     console.log(image);
    //     console.log(FileReader(image));
    //     divInsertImg.appendChild(img);
     }
    

    const buttonAjouterPhoto = document.createElement("button")
    
    //buttonAjouterPhoto.setAttribute("id", "upload");
    buttonAjouterPhoto.setAttribute("title", "&nbsp;");
    buttonAjouterPhoto.innerHTML = "+ Ajouter photo";
    buttonAjouterPhoto.style.backgroundColor = "#CBD6DC";
    buttonAjouterPhoto.style.border = "transparent";
    buttonAjouterPhoto.style.borderRadius = "50px";
    buttonAjouterPhoto.style.fontFamily = "Work Sans";
    buttonAjouterPhoto.style.color = "#306685";
    buttonAjouterPhoto.style.height = "36px";
    buttonAjouterPhoto.style.padding = "0px 30px";
    //buttonAjouterPhoto.style.outline = "none";
    buttonAjouterPhoto.addEventListener("click", function(){
        document.getElementById("input_file").click();
        console.log("test");
        
    });

    const insertInfoText = document.createElement("p");
    insertInfoText.innerHTML = "jpg, png : 4mo max";
    insertInfoText.style.fontFamily = "Work Sans";
    insertInfoText.style.fontSize = "10px"
    insertInfoText.style.color = "#444444";
    insertInfoText.style.height = "12px";
    insertInfoText.style.marginTop = "7px";

    let formulaire = document.createElement("form");
    formulaire.setAttribute("id", "ajout-projet");
    formulaire.setAttribute("name", "fileinfo")

    let labelTritreProjet = document.createElement("label");
    labelTritreProjet.setAttribute("for", "Titre");
    labelTritreProjet.innerHTML = "Titre";
    let titreProjet = document.createElement("input");
    titreProjet.setAttribute("type", "text");
    titreProjet.setAttribute("name", "Titre");
    titreProjet.setAttribute("id", "Titre");
    
    titreProjet.addEventListener("change", function(){
        if(document.getElementById("categoriesList").value !== '' & document.getElementById("Titre").value !== ''){
            valider.style.backgroundColor = "#1D6154";
        } else {
            valider.style.backgroundColor = "#A7A7A7";
        }
    })

    let labelCategorieList = document.createElement("label");
    labelCategorieList.setAttribute("for", "categoriesList");
    labelCategorieList.innerHTML = "Catégorie";
    let categorieList = document.createElement("select");
  
    categorieList.setAttribute("name", "categories");
    categorieList.setAttribute("id", "categoriesList");

    const setCat = setDonnees[Symbol.iterator]();
    id = 0;
    setDonnees.forEach(function(value) {
        let recup = setCat.next().value;
        id = id + 1;
        let option = document.createElement("option");
        option.setAttribute("value", id);
        option.innerHTML = recup;

        categorieList.appendChild(option);
    });

    console.log(setDonnees);

    container1.appendChild(divInsertImg);
    divInsertImg.appendChild(iconeImg);
    divInsertImg.appendChild(buttonAjouterPhoto);
    divInsertImg.appendChild(insertInfoText);
    container1.appendChild(formulaire);
    formulaire.appendChild(labelTritreProjet);
    formulaire.appendChild(titreProjet);
    formulaire.appendChild(labelCategorieList);
    formulaire.appendChild(categorieList);
    formulaire.appendChild(inputFile);
    

    let valider = document.createElement("input");
    valider.setAttribute("type", "submit");
    valider.setAttribute("id", "submit");
    valider.innerHTML = "Valider";
    valider.style.backgroundColor = "#A7A7A7";
    valider.addEventListener("click", function(){
        if(document.getElementById("categoriesList").value !== '' & document.getElementById("Titre").value !== ''){
            console.log("check reussi");
            console.log(document.getElementById("Titre").value);
            console.log(document.getElementById("categoriesList").value);
            console.log(document.getElementById("input_file").files[0]);

            var form = document.forms.namedItem("fileinfo");

            oData = new FormData();
            //oData.append("id", donneesProjets.length + 1);
            oData.append("title", document.getElementById("Titre").value);
            
            oData.append("category", document.getElementById("categoriesList").value);
            oData.append("image", document.getElementById("input_file").files[0]);

            token = localStorage.getItem("token");
            console.log("token ",token);
            //oData.append("userid", "1");

            for (const value of oData.values()) {
                console.log("valeurs",value);
              }

             fetch('http://localhost:5678/api/works', {

             method: 'POST',
             headers: {
                
                'Authorization' : `Bearer ${token}`},
             body: oData
         })
         .then(updateData)
         .catch(error => {
        //     // Gestion des erreurs de l'API
             console.error(error);
             console.log(token);
        //     alert('Erreur de connexion!');
         });
         

        }else{
            console.log("check echoué");
            console.log(document.getElementById("Titre").value);
            console.log(document.getElementById("categoriesList").value);
            console.log(document.getElementById("input_file").value);
        }
    })

    container2.appendChild(valider);
    
}

function updateData(){
    fetch('http://localhost:5678/api/works')
    .then(response =>(response.json()))
    .then(data => envoieNouvelleData(data));
}

function envoieNouvelleData(nouvellesDonnees){
    genererProjet(nouvellesDonnees);
    editGallery(nouvellesDonnees);
}
