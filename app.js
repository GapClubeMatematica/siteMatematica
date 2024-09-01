(function () {
    var firebaseConfig = {
       apiKey: "AIzaSyDggpHuI9sdEQH0nGJTDy8JlRgqh54bMvQ",
       authDomain: "sis-matematica-ifmch.firebaseapp.com",
       databaseURL: "https://sis-matematica-ifmch-default-rtdb.firebaseio.com/",
       projectId: "sis-matematica-ifmch",
       storageBucket: "sis-matematica-ifmch.appspot.com",
       messagingSenderId: "585223237603",
       appId: "1:585223237603:web:296385fe6104132454bad6"
   };
   firebase.initializeApp(firebaseConfig);

   const database = firebase.database();
   const competicoesCards = document.getElementById('competicoesCards');
   const totalOuro = document.getElementById('totalOuro');
   const totalPrata = document.getElementById('totalPrata');
   const totalBronze = document.getElementById('totalBronze');
   const totalMencaoHonrosa = document.getElementById('totalMencaoHonrosa');
   const totalParticipacao = document.getElementById('totalParticipacao');

   // Inicializa as variáveis de totalização como números
   let ouro = 0;
   let prata = 0;
   let bronze = 0;
   let mencaoHonrosa = 0;
   let participacao = 0;

   database.ref('competicao').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var data = childSnapshot.val();

            // Converte valores para números e atualiza totais
            ouro += Number(data.quantMedalhaOuro) || 0;
            prata += Number(data.quantMedalhaPrata) || 0;
            bronze += Number(data.quantMedalhaBronze) || 0;
            mencaoHonrosa += Number(data.quantMencaoHonrosa) || 0;
            participacao += Number(data.quantMedalhaParticipacao) || 0;

            // Cria e adiciona card
            var card = document.createElement('div');
            card.className = 'card col-md-6 g-4';
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${data.nome}</h5>
                    <p class="card-text"><strong>Sigla:</strong> ${data.sigla}</p>
                    <p class="card-text"><strong>Edição:</strong> ${data.edicao}</p>
                    <p class="card-text"><strong>Quantidade de Medalhas:</strong> Ouro: ${data.quantMedalhaOuro}, Prata: ${data.quantMedalhaPrata}, Bronze: ${data.quantMedalhaBronze}</p>
                    <p class="card-text"><strong>Outras Premiações:</strong> Menção Honrosa: ${data.quantMencaoHonrosa}, Medalha de Participação: ${data.quantMedalhaParticipacao}</p>
                </div>
            `;
            competicoesCards.appendChild(card);
        });

        // Atualiza totais na página
        totalOuro.textContent = ouro;
        totalPrata.textContent = prata;
        totalBronze.textContent = bronze;
        totalMencaoHonrosa.textContent = mencaoHonrosa;
        totalParticipacao.textContent = participacao;
   });
})();
