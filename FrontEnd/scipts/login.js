document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.querySelector('#login-form');

    form.addEventListener('submit', (event) => {

        event.preventDefault(); // Empêche le formulaire de se soumettre
  
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#mdp').value;
  
        // Appel de l'API externe pour se connecter
        fetch('http://localhost:5678/api/users/login', {

            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            // Traitement de la réponse de l'API
            if(data.userId == 1) {

                const token = data.token;
                localStorage.setItem("token", token);
                console.log("user connect");
                console.log(localStorage.getItem('token'));
                document.location.href="./index.html";
            } else {
                console.log("user unknow")
                alert("Erreur dans l’identifiant ou le mot de passe");
            }

            console.log(data);
            //  alert('Connexion réussie!');
        })

        .catch(error => {
            // Gestion des erreurs de l'API
            console.error(error);
            alert('Erreur de connexion!');
        });
    });
});