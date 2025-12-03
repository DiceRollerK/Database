//import Database from "./database/nodejs-sqlite/index.mjs";
//const db = new Database('EpisodeDatabase.db');
console.log(encodeURI('abcdefghijklmnopqrstuvwxyz123456789,. !@#$%^&*()-_+=?/\|'));
console.log('abcdefghijklmnopqrstuvwxyz123456789,. ! @ # $ % ^ & * ( ) - _ + = ? / \ |')


document.getElementById("btn-all").addEventListener("click", () =>{
    fetch('/clicked', {method: 'GET'})
    .then(function(response) {
        if(response.ok) {
            return response.json();
        } 
        throw new Error('Request failed.');
    })
    .then(function(data) {
        document.getElementById('output').innerHTML = "";
        document.getElementById('output').style.display = 'flex';
        veidosana(data, false);
    })
    .catch(function(error) {
        console.log(error);
    });
})

document.getElementById("btn").addEventListener("click", () => {
    let textValue = document.getElementById('text-input').value;
    if (textValue == '') textValue = 'Pier Pressure';

   fetch(`/search?term=${textValue}`, {method: 'POST'})
    .then(function(response) {
        if(response.ok) {
            return response.json();
        } 
        throw new Error('Request failed.');
    })
    .then(function(data) {
        document.getElementById('output').innerHTML = "";
        document.getElementById('output').style.display = 'flex';

        if (data[0] === undefined) {
            neatrada();
        } else {
            veidosana(data, false);
        }
    })
    .catch(function(error) {
        console.log(error);
    });
});

function seriesEpisodes() {
    let textValue = this.alt;
    textValue = encodeURIComponent(textValue);

   fetch(`/search?showid=${textValue}`, {method: 'POST'})
    .then(function(response) {
        if(response.ok) {
            return response.json();
        } 
        throw new Error('Request failed.');
    })
    .then(function(data) {
        document.getElementById('output').innerHTML = "";
        document.getElementById('output').style.display = 'flex';

        if (data[0] === undefined) {
            neatrada();
        } else {
            //veidotSerialu(data);
            veidosana(data, true);
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

function neatrada() {
    document.getElementById('output').classList.add('bg-danger');
    let div = document.createElement("div");
    document.getElementById("output").appendChild(div);
    div.classList.add('output-inside')
    let text = document.createElement('p');
    div.appendChild(text);
    text.id = 'text-output'
    text.innerHTML = `Nevarēju atrast epizodi!`
}
/*
function veidotSerialu(data) {
    fetch(`/show?show_id=${data[0].show_id}`, {method: 'POST'})
        .then(function(response) {
        if(response.ok) {
            return response.json();
        } 
        throw new Error('Request failed.');
    })
    .then(function(data) {
        let div = document.createElement('div');
        document.getElementById('output').insertAdjacentElement('beforebegin', div);
        div.classList.add('card');

        let img = document.createElement("img");
        img.setAttribute('alt', `${data[i].name}`);
        img.classList.add('logo');
        div.appendChild(img);
    })
    .catch(function(error) {
        console.log(error);
    });
};
*/

function veidosana(data, serials) {
    document.getElementById('series').innerHTML = '';
    document.getElementById('series').style.display = 'none';
    document.getElementById('output').classList.remove('bg-danger');
    for (let i = 0; i < data.length; i++) {

    let div = document.createElement("div");
    document.getElementById("output").appendChild(div);
    div.classList.add('card', 'm-2')

    let img = document.createElement("img");
    img.setAttribute('alt', `${data[i].name}`)
    img.classList.add('logo');
    div.appendChild(img);

    let div2  = document.createElement("div");
    div.appendChild(div2);
    div2.classList.add('card-body', 'p-2');
            
    let h5 = document.createElement('h5');
    h5.classList.add("card-title", "fs-4'");
    let text = document.createElement('p');
    text.classList.add("card-text", "fs-5");
            
    div2.appendChild(h5);
    div2.appendChild(text);

    img.setAttribute("src", data[i].logo);

    h5.innerHTML = `&quot;${data[i].ename}&quot;`
    text.innerHTML = 
    `
    Sezona-epizode: ${data[i].season}-${data[i].episode}<br>
    Raidīšanas datums: ${data[i].date}<br>
    Žanrs: ${data[i].genre}
    `;
    img.addEventListener("click", (seriesEpisodes));
    };
    if (serials) {
        console.log(data[0]);
        div = document.getElementById('series');
        let img = document.createElement("img");
        img.setAttribute('alt', `${data[0].name}`);
        img.classList.add('logo');
        div.appendChild(img);
        div.classList.add('card')

        let div2  = document.createElement("div");
        div.appendChild(div2);
        div2.classList.add('card-body', 'p-2');
                
        let h5 = document.createElement('h5');
        h5.classList.add("card-title", "fs-4'");
        let text = document.createElement('p');
        text.classList.add("card-text", "fs-5");
                
        div2.appendChild(h5);
        div2.appendChild(text);

        img.setAttribute("src", `${data[0].logo}`);

        h5.innerHTML = `${data[0].name}`
        text.innerHTML = 
        `
        Žanri: ${data[0].genre1}${data[0].genre2 != null ? ', '+data[0].genre2.toLowerCase() : ''}${data[0].genre3 != null ? ', '+data[0].genre3.toLowerCase() : ''}<br>
        Tēmas: ${data[0].theme1}, ${data[0].theme2.toLowerCase()}, ${data[0].theme3.toLowerCase()}<br>
        `;
        div.style.display = 'flex';
        img.addEventListener("click", (seriesEpisodes));
    }
}