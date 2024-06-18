// Função para carregar e exibir dados da planilha do Google Sheets
function loadGoogleSheetData() {
    // ID da planilha do Google Sheets
    const spreadsheetId = '1NZwkSZVlT6P0SRPq_IE20pJCT9eM0rfekUlq7DpdKBo';
    // Nome da aba que você deseja ler
    const sheetName = 'info'; // Altere para o nome correto da aba

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: sheetName
    }).then(function(response) {
        const data = response.result.values;
        const tableBody = document.querySelector('#actions-table tbody');

        // Limpar qualquer conteúdo existente na tabela
        tableBody.innerHTML = '';

        // Preencher a tabela com os dados da planilha
        data.forEach(function(row) {
            // Certificar-se de que temos exatamente 4 colunas de dados
            if (row.length === 4) {
                const tableRow = document.createElement('tr');

                // Iterar sobre cada célula da linha
                row.forEach(function(cellData) {
                    const cell = document.createElement('td');
                    cell.textContent = cellData;
                    tableRow.appendChild(cell);
                });

                tableBody.appendChild(tableRow);
            } else {
                console.error('Número incorreto de colunas:', row);
            }
        });
    }).catch(function(error) {
        console.error('Erro ao carregar dados da planilha:', error);
    });
}

// Função para inicializar a API do Google Sheets
function initGoogleSheetsApi() {
    gapi.client.init({
        apiKey: 'AIzaSyB2aWakhB1xE-PkHq81B0S7a_AuTHH_tiA',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        loadGoogleSheetData();
    }).catch(function(error) {
        console.error('Erro ao inicializar API do Google Sheets:', error);
    });
}

// Carregar a API do Google Sheets e iniciar a aplicação
gapi.load('client', initGoogleSheetsApi);
