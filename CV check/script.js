let bouton = document.getElementById('analyzeButton');
// On ajoute un écouteur d'événement sur le bouton, il faut d'abord le récupérer
bouton.addEventListener('click', function() {
    // On récupère les valeurs ICI, au moment du clic et pas avant sinon on aurait des valeurs vides
    let cv = document.getElementById('cvInput').value;
    let job = document.getElementById('jobInput').value;
    console.log("CV:", cv);
    console.log("Job:", job);
    // On appelle la fonction de calcul du score
    let resultat = calculerScore(cv, job);

    console.log("Score:", resultat.score);
    console.log("Mots trouvés:", resultat.trouves);
    console.log("Mots manquants:", resultat.manquants);

    //  Afficher le score dans la console

    // On contruit le HTML pour afficher les mots trouvés, manquants et le score
    let html = "<h2>Résultat de l'analyse</h2>";
    html += "<p>Score ATS : <strong>" + resultat.score + "%</strong></p>";

    //On ajoute la barre de score
    html += '<div class="score-bar">';
    html += '<div class="score-fill" style="width: ' + resultat.score + '%;"></div>';
    html += '</div>';

    // On ajoute les mots trouvés
    html += "<h3>Mots trouvés ✅ :</h3>";
    html += "<ul>";
    for (let i =0; i < resultat.trouves.length; i++) {
        html += "<li>" + resultat.trouves[i] + "</li>";
    }
    html += "</ul>";

    // Maintenant on fait les mots manquants
    html += "<h3>Mots manquants ❌ :</h3>";
    html += "<ul>";
    for (let i =0; i < resultat.manquants.length; i++) {
        html += "<li>" + resultat.manquants[i] + "</li>";
    }
    html += "</ul>";

    // On insère le HTML dans la page
    document.getElementById('result').innerHTML = html;
});

function calculerScore(cv, job) {
    // 1. Transformer en mots
    let jobMots = job.toLowerCase().split(' ');
    let cvMots = cv.toLowerCase().split(' ');
    
    // 2. Compter les correspondances
    let motsCorrespondants = 0;
    let motsTrouves = []; // Pour stocker les mots trouvés
    let motsManquants = []; // Pour stocker les mots manquants
    
    // Pour chaque mot de l'offre d'emploi
    for (let i = 0; i < jobMots.length; i++) {
        let mot = jobMots[i];
        // Si ce mot existe dans le CV
        if (cvMots.includes(mot)) {
            motsCorrespondants = motsCorrespondants + 1;
            motsTrouves.push(mot); // Ajouter aux mots trouvés
        } else {
            motsManquants.push(mot); // Ajouter aux mots manquants
        }
    }
    
    // 3. Calculer le score
    let score = (motsCorrespondants / jobMots.length) * 100; 
    
    // 4. Retourner le score, les mots correspondants, et les mots manquants
    return {
        score: Math.round(score), // Arrondir le score
        trouves: motsTrouves,
        manquants: motsManquants
    }
}

let boutonTheme = document.getElementById('themeToggle');
boutonTheme.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
});