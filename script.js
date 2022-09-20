class Slave {
    constructor(age, weight, speak, price) {
        this.age =  age;
        this.weight= weight;
        this.speak = speak;
        this.price = price;
        this.id = age + weight + speak + price;
    };
};

let createButton = document.getElementById('create');
createButton.addEventListener('click', addSlave);

function addSlave() {
    let newSlave = new Slave(document.getElementById('age').value, document.getElementById('weight').value, document.getElementById('speak').checked, document.getElementById('price').value)
    
    arrMySlaves.push(newSlave);

    for (let elem of document.querySelectorAll('.form_field')) {
        if (elem.value == '' || elem.value < 0) {
            elem.style.border = '2px solid red';
            event.preventDefault();
        };
        if (elem.value !== '' && elem.value >= 0) {
            elem.style.border = '';
        };
    };

    for (let elem of document.querySelectorAll('.form_field')) {
        if (elem.style.border == '2px solid red') {
            return;
        };

    };
    
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');

    td.innerHTML = newSlave.age;
    td1.innerHTML = newSlave.weight;
    td2.innerHTML = newSlave.speak;
    td3.innerHTML = newSlave.price;
    let delBut = document.querySelector('[data-delete]').cloneNode(true);
    let selBut = document.querySelector('[data-sell]').cloneNode(true);
    let buyBut = document.querySelector('[data-buy]').cloneNode(true);
    delBut.className = 'createButton';
    selBut.className = 'createButton';
    td4.append(delBut);
    td4.append(selBut);
    td4.append(buyBut);


    tr.append(td);
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4)

    document.getElementById('age').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('speak').checked = false;
    document.getElementById('price').value = '';

    document.getElementById('mySlaves').append(tr);

    document.getElementById('speak').classList.add('check');

    event.preventDefault();
}

let deleteButton = document.getElementById('mySlaves');
deleteButton.addEventListener('click', deleteSlave);

function deleteSlave() {
    if (event.target.dataset.delete == undefined) return;
    
    let tr = event.target.closest('tr');
    let trCells = tr.cells;
    let textContent = trCells[0].textContent + trCells[1].textContent + trCells[2].textContent + trCells[3].textContent;

    if (arrMySlaves.find(obj => obj.id == (textContent)) !== undefined) {
        arrMySlaves.splice(arrMySlaves.findIndex(obj => obj.id == textContent), 1);
    }

    tr.remove();

    event.preventDefault();
}

let sellButton = document.getElementById('mySlaves');
sellButton.addEventListener('click', sellSlave);

function sellSlave() {
    event.preventDefault();
    if (event.target.dataset.sell == undefined) return;

    let tr = event.target.closest('tr');
    let trCells = tr.cells;
    let textContent = trCells[0].textContent + trCells[1].textContent + trCells[2].textContent + trCells[3].textContent;

    if (arrMySlaves.find(obj => obj.id == (textContent)) !== undefined) {
        arrSlavTrade.push(arrMySlaves.splice(arrMySlaves.findIndex(obj => obj.id == textContent), 1)[0])
    }

    let td = event.target.closest('td');

    td.querySelector('[data-delete]').className = 'defaultButton';
    td.querySelector('[data-sell]').className = 'defaultButton';
    td.querySelector('[data-buy]').className = 'createButton';

    let outer = tr.outerHTML;

    document.getElementById('slaveTrade').insertAdjacentHTML('beforeend', outer);

    event.target.closest('tr').remove();
}

let buyButton = document.getElementById('slaveTrade');
buyButton.addEventListener('click', buySlave);

function buySlave() {
    event.preventDefault();
    if (event.target.dataset.buy == undefined) return;

    let tr = event.target.closest('tr');
    let trCells = tr.cells;
    let textContent = trCells[0].textContent + trCells[1].textContent + trCells[2].textContent + trCells[3].textContent;

    if (arrSlavTrade.find(obj => obj.id == (textContent)) !== undefined) {
        arrMySlaves.push(arrSlavTrade.splice(arrSlavTrade.findIndex(obj => obj.id == textContent), 1)[0])
    }

    let td = event.target.closest('td');

    td.querySelector('[data-delete]').className = 'createButton';
    td.querySelector('[data-sell]').className = 'createButton';
    td.querySelector('[data-buy]').className = 'defaultButton';

    let outer = tr.outerHTML;

    document.getElementById('mySlaves').insertAdjacentHTML('beforeend', outer);

    event.target.closest('tr').remove();
}


let checkbox = document.getElementById('speak');
checkbox.addEventListener('change', newcheckbox);

function newcheckbox() {
    if (event.target.checked == true) {
        event.target.classList.remove('check');
        event.target.classList.add('newCheck');
    };
    if (event.target.checked == false) {
        event.target.classList.remove('newCheck');
        event.target.classList.add('check');    
    };
}

let arrMySlaves = [];
let arrSlavTrade = [];
console.log(arrMySlaves);
console.log(arrSlavTrade);