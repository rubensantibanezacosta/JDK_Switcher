const { ipcRenderer } = require('electron');

const refreshCurrentButton = document.getElementById('refresh-current');
const refreshListButton = document.getElementById('refresh-list');
const currentVersion = document.getElementById('current-version');
const list = document.getElementById('list');


refreshCurrentButton.addEventListener('click', getCurrentVersion);
refreshListButton.addEventListener('click', addItems);


ipcRenderer.on("version", (event, arg) => currentVersion.innerText = arg);
ipcRenderer.on("list", (event, arg) => {

    list.innerHTML = "";
    arg.forEach(element => {
        console.log({ element })
        list.innerHTML += `<li id="${element.path}" class="list-group-item list-group-item-action bg-dark  text-light">${element.name}</li>`;
    });
})

function getCurrentVersion() {
    currentVersion.innerText = "";
    ipcRenderer.send('getversion', true);
}


function addItems() {
    list.innerHTML = "";
    ipcRenderer.send('getlist', true);
}