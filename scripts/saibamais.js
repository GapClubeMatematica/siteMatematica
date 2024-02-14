function initGoogleSheetsApi() {
    gapi.client.init({
    apiKey: 'AIzaSyARGYc6I4c43n6WlpPU4n1Uon2_Aj0lGBk',
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
      loadProfessoresFromGoogleSheet();
      loadBolsistasFromGoogleSheet();
    });
  }

  function loadProfessoresFromGoogleSheet() {
    
    const spreadsheetId = '1bnIVpHL_md8u_XXo-zA3ZJGbA2J_ijj0XtlJJjOPzvk'; 
    const sheetName = 'professores'; 
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: sheetName
    }).then(function(response) {
      const data = response.result.values;

      if (data.length > 0) {
        const professoresContainer = document.getElementById('professores-container');
        data.forEach(function(row) {
          
          const nome = row[0];
          const area = row[1];
          const grauInstrucao = row[2];
          const foto = row[3];
          const professorDiv = document.createElement('div');
          professorDiv.className = 'col-md-4';
          professorDiv.innerHTML = `
            <div class="card">
              <img src="${foto}" alt="${nome}" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${nome}</h5>
                <p class="card-text"><strong>Área:</strong> ${area}</p>
                <p class="card-text"><strong>Grau de Instrução:</strong> ${grauInstrucao}</p>
              </div>
            </div>
          `;
          professoresContainer.appendChild(professorDiv);
        });
      }
    });
  }

  function loadBolsistasFromGoogleSheet() {
    
    const spreadsheetId = '1bnIVpHL_md8u_XXo-zA3ZJGbA2J_ijj0XtlJJjOPzvk'; 
    const sheetName = 'bolsistas'; 
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: sheetName
    }).then(function(response) {
      const data = response.result.values;

      if (data.length > 0) {
        const bolsistasContainer = document.getElementById('bolsistas-container');
        data.forEach(function(row) {
          
          const nome = row[0];
          const area = row[1];
          const anoPeriodo = row[2];
          const foto = row[3];
          const bolsistaDiv = document.createElement('div');
          bolsistaDiv.className = 'col-md-4';
          bolsistaDiv.innerHTML = `
            <div class="card">
              <img src="${foto}" alt="${nome}" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${nome}</h5>
                <p class="card-text"><strong>Curso:</strong> ${area}</p>
                <p class="card-text"><strong>Ano/Período:</strong> ${anoPeriodo}</p>
              </div>
            </div>
          `;
          bolsistasContainer.appendChild(bolsistaDiv);
        });
      }
    });
  }

  gapi.load('client', initGoogleSheetsApi);

