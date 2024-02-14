// Função para inicializar a API do Google Sheets
function initGoogleSheetsApi() {
  gapi.client.init({
    apiKey: 'AIzaSyARGYc6I4c43n6WlpPU4n1Uon2_Aj0lGBk',
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    loadProfessoresFromGoogleSheet();
  });
}

// Função para carregar os dados dos professores da planilha
function loadProfessoresFromGoogleSheet() {
  const spreadsheetId = '1bnIVpHL_md8u_XXo-zA3ZJGbA2J_ijj0XtlJJjOPzvk'; 
  const sheetName = 'professores';
  
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: sheetName
  }).then(function(response) {
    const data = response.result.values;

    if (data.length > 0) {
      const carouselInner = document.querySelector('#carouselProfessores .carousel-inner');

      data.forEach(function(row, index) {
        const [nome, curso, periodo, depoimento, imagem] = row;

        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item' + (index === 0 ? ' active' : '');

        const cardHtml = `
          <div class="row">
            <div class="col-md-6">
              <div class="card text-center border-0"> 
                <img src="${imagem}" class="card-img-top rounded-circle mx-auto mt-3" alt="${nome}" style="max-width: 180px; max-height: 180px;">
                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                  <h5 class="card-title">${nome}</h5>
                  <p class="card-text">Curso: ${curso}</p>
                  <p class="card-text">Ano/Período: ${periodo}</p>
                  <p class="card-text">${depoimento}</p>
                </div>
              </div>
            </div>
          </div>
        `;

        carouselItem.innerHTML = cardHtml;
        carouselInner.appendChild(carouselItem);
      });
    }
  });
}

gapi.load('client', initGoogleSheetsApi);
