
    //Recuperation des donnees des Projets serveur
async function Init(Valeur){
    console.log("Initialisation");
  
    const reponse = await fetch('http://localhost:5678/api/works');
    let Projet = await reponse.json();
    console.log(Projet);
  
    tableau(Projet);
    genererProjet(Projet);
  
    return Valeur = Projet;
  };
Init();



  