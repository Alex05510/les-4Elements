// Gestion de la soumission du formulaire
document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault(); // Empêche le rechargement de la page
  
    // Récupération des valeurs
    const fullname = document.getElementById("fullname").value.trim();
    const adress = document.getElementById("adress").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const houseType = document.getElementById("houseType").value;
    const rooms = parseInt(document.getElementById("rooms").value) || 0;
    const people = parseInt(document.getElementById("people").value) || 1;
    const arrivalDate = new Date(document.getElementById("arrivalDate").value);
    const departDate = new Date(document.getElementById("departDate").value);
    const driver = document.getElementById("driver").checked;
    const breakfast = document.getElementById("breakfast").checked;
    const lunch = document.getElementById("lunch").checked;
    const guide = document.getElementById("guide").checked;
    const diet = document.getElementById("diet").value.trim();
  
    // Stocker les erreurs
    const errors = [];
  
    // Regex pour email et téléphone
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
  
    // Validation
    if (fullname.length < 3) errors.push("Nom complet invalide (entre 2 et 50 caractères).");
    if (adress.length < 5) errors.push("Adresse invalide (au moins 5 caractères).");
    if (!emailRegex.test(email)) errors.push("Format d'email invalide.");
    if (!phoneRegex.test(phone)) errors.push("Numéro de téléphone invalide (10 chiffre ou 14 carctères).");
    if (!arrivalDate || isNaN(arrivalDate)) errors.push("Date d'arrivée non spécifiée.");
    if (!departDate || isNaN(departDate) || departDate <= arrivalDate) {
      errors.push("Date de départ invalide.");
    }
    if (breakfast && diet.length === 0) {
      errors.push("Veuillez préciser votre régime alimentaire si vous prenez un petit-déjeuner.");
    }
  
    // Affichage des erreurs ou confirmation
    const errorBox = document.getElementById("errors");
    const resultBox = document.getElementById("result");
    if (errors.length > 0) {
      errorBox.innerHTML = `<strong>❌ Erreurs :</strong><br>${errors.join("<br>")}`;
      resultBox.innerHTML = ""; // Réinitialise l'affichage des résultats
    } else {
      errorBox.innerHTML = ""; // Réinitialise les erreurs
  
      // Calcul des nuits
      const oneDay = 24 * 60 * 60 * 1000;
      const nights = Math.round((departDate - arrivalDate) / oneDay);
  
      // Calcul du coût total
      let total = 0;
      if (houseType === "suiteLaponie") {
        total += nights * 850; // Prix par nuit pour une suite
      } else if (houseType === "igloo") {
        total += nights * 500; // Prix par nuit pour un igloo
      }
      total += driver ? nights * 11 : 0; // Chauffeur
      total += breakfast ? nights * people * 15 : 0; // Petit-déjeuner
      total += lunch ? nights * people * 25 : 0; // Repas
      total += guide ? 20 : 0; // Guide
      total += rooms ? rooms * 5 : 0; // Nombre de chambres
      total += diet ? nights * people * 5 : 0; // Régime alimentaire (supplément)
  
      // Affichage du résultat
      resultBox.innerHTML = `
        <strong>✅ Réservation validée :</strong><br>
        Nom complet : ${fullname}<br>
        Adresse : ${adress}<br>
        Email : ${email}<br>
        Téléphone : ${phone}<br>
        Type de logement : ${houseType}<br>
        Nombre de personnes : ${people}<br>
        Nombre de nuits : ${nights}<br>
        Date d'arrivée : ${arrivalDate.toLocaleDateString()}<br>
        Date de départ : ${departDate.toLocaleDateString()}<br>
        Services : ${driver ? "chauffeur, " : ""}${breakfast ? "petit-déjeuner, " : ""}${lunch ? "repas, " : ""}${guide ? "guide, " : ""}${diet ? "régime alimentaire" : ""}<br>
        <strong>Coût total estimé : ${total}€</strong>
      `;
    }
  });
  
 
  document.getElementById("houseType").addEventListener("change", function() {
    const specificOptions = document.getElementById("specificOptions");
    if (this.value === "igloo") {
      specificOptions.style.display = "block";
    } else {
      specificOptions.style.display = "none";
    }
  });
  
 
  document.getElementById("breakfast").addEventListener("change", function() {
    const dietOptions = document.getElementById("dietOptions");
    dietOptions.style.display = this.checked ? "block" : "none";
  });

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
});
