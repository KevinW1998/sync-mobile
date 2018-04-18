console.log('starting sync service!');


// Diffsync init code
let DiffSyncClient = require('diffsync').Client;
let socket = require('socket.io-client');
let client = new DiffSyncClient(socket('ws://127.0.0.1:3000'), 'form-data');

// Diffsync main data point
let data = {};
let isConnected = false;

// Definitions for each table element
const DATA_BUYLIST_NAME = 'buylist-name';
const DATA_BUYLIST_COUNT = 'buylist-count';
const DATA_BUYLIST_PRICE = 'buylist-price';
const DATA_ELEMENTS = [DATA_BUYLIST_NAME, DATA_BUYLIST_COUNT, DATA_BUYLIST_PRICE];

// Utils
function getElementIndex(node) {
    let index = 0;
    while ( (node = node.previousElementSibling) ) {
        index++;
    }
    return index;
}

// Main handling function
function updateViewFromData() {
    if(isConnected) {
        let dataTable = document.getElementById('buylist-data-table');
        let dataLines = document.getElementsByClassName('buylist-data-line');
        let inputLine = document.getElementById('buylist-input-line');

        // First remove all data-lines
        // Convert to raw array:
        let dataLinesConverted = [];

        for(let i = 0; i < dataLines.length; i++) {
            dataLinesConverted.push(dataLines[i]);
        }

        for(let i = 0; i < dataLinesConverted.length; i++) {
            let dataLine = dataLinesConverted[i];
            dataTable.removeChild(dataLine);
        }

        // Now add the rest
        if(data['data-lines'] instanceof Array) {
            let newDataLines = data['data-lines'];
            for(let newDataLine of newDataLines) {
                // Create tr element
                let newViewDataLine = document.createElement('tr');
                newViewDataLine.className = 'buylist-data-line';

                for(let nextDataElem of DATA_ELEMENTS) {
                    let tdElem = document.createElement('td');
                    tdElem.innerHTML = newDataLine[nextDataElem];
                    tdElem.className = 'class-' + nextDataElem;
                    newViewDataLine.appendChild(tdElem);
                }

                // Create delete button
                let deleteTd = document.createElement('td');
                deleteTd.className = 'text-center';
                let deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.className = 'btn';
                deleteButton.innerHTML = 'Löschen';
                deleteButton.addEventListener('click', () => {
                    // TODO: Add delete code
                    console.log("Index: " + getElementIndex(newViewDataLine));
                    data['data-lines'].splice(getElementIndex(newViewDataLine), 1);
                    client.sync();
                    updateViewFromData();
                });

                deleteTd.appendChild(deleteButton);
                newViewDataLine.appendChild(deleteTd);

                dataTable.insertBefore(newViewDataLine, inputLine);
            }
        }
    }

    // Update is connected text
    let connectionStatus = document.getElementById('buylist-connection-status');
    if(isConnected) {
        connectionStatus.innerHTML = 'Verbunden';
        connectionStatus.style.color = 'green';
        document.getElementById('button-add').disabled = false;
    } else {
        connectionStatus.innerHTML = 'Nicht Verbunden';
        connectionStatus.style.color = 'red';
        document.getElementById('button-add').disabled = false;
    }
}

function addTableLineFromInput() {
    // Validate
    let editName = document.getElementById('edit-name').value;
    let editCount = document.getElementById('edit-count').value;
    let editPrice = document.getElementById('edit-price').value;

    console.log(parseInt(editCount));
    console.log(parseFloat(editPrice))
    if(isNaN(parseInt(editCount))) {
        alert('Count is not a valid number');
        return false
    }
    if(isNaN(parseFloat(editPrice))) {
        alert('Price is not a valid number');
        return false;
    }

    // Modify data list
    let newDataObj = {};
    newDataObj[DATA_BUYLIST_NAME] = document.getElementById('edit-name').value;
    newDataObj[DATA_BUYLIST_COUNT] = document.getElementById('edit-count').value;
    newDataObj[DATA_BUYLIST_PRICE] = document.getElementById('edit-price').value;

    if(!(data['data-lines'] instanceof Array)) {
        data['data-lines'] = [];
    }

    data['data-lines'].push(newDataObj);

    // Execute sync
    client.sync();

    return true;
}

client.on('connected', function(){
    isConnected = true;

    // Die Datenreferenz, welche zum synchronisieren verwendet wird.
    data = client.getData();
    console.log('Verbunden!');
    console.log('Daten akutell:');
    console.log(data);

    updateViewFromData();

});

client.on('synced', function(){
    // Wird aufgerufen, wenn neue Daten vom Server reinkommen
    console.log('Neue Daten vom Server!');
    console.log('Synchronisierte Daten akutell:');
    console.log(data);


    updateViewFromData();

});

window.addEventListener('load', () => {
    let addButton = document.getElementById('button-add');
    addButton.addEventListener('click', () => {
        if(!addTableLineFromInput())
            return;

        updateViewFromData();
    });

    let specialButton = document.getElementById('special-mode');
    specialButton.addEventListener('click', () => {
        let sheet = document.createElement('style');
        sheet.setAttribute('id', 'secret-sheet');
        sheet.innerHTML = '* {\n' +
            '            -webkit-transition: -webkit-transform 1.5s ease-in-out;\n' +
            '            transition:         transform 1.5s ease-in-out;\n' +
            '        }\n' +
            '\n' +
            '        *:hover {\n' +
            '            -webkit-transform: rotate(720deg);\n' +
            '            transform: rotate(720deg);\n' +
            '        }';
        document.body.appendChild(sheet);
        specialButton.innerHTML = 'Have fun :D';
    });

    updateViewFromData();
});

client.initialize();
