// link API (https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter)
let rowData = document.getElementById('row-data');
let loding = document.getElementById('loding');
let section = document.getElementById('section');
let allLINK = document.querySelectorAll('.navbar .collapse li a');
let mainSection = document.getElementById('main-section');

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'aeea14e878msh6d64db4f66c5e32p13b7b7jsn0640063be048',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
    }
};

let dataAPI = [];
async function MianAPI(category = 'mmorpg') {
    try {
        loding.classList.add('d-none');

        const API = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
        const response = await API.json();
        dataAPI = response;
        dispalyDATA(response);
    } catch (error) {
        loding.classList.remove('d-none');
    }
}
MianAPI();



let click;
for (let i = 0; i < allLINK.length; i++) {
    allLINK[i].addEventListener('click', function (e) {
        click = e.target;
        MianAPI(click.id);
    })
}
let col_data
function dispalyDATA(dataAPI) {
    let contan = ``;
    for (let index = 0; index < dataAPI.length; index++) {
        contan += `
        <div id="${dataAPI[index].id}" class="col">
                            <div class="card bg-transparent text-light">
                                <div class="card-body p-3">
                                    <div class="position-relative">
                                        <img src="${dataAPI[index].thumbnail}" class="w-100 h-100" alt="${dataAPI[index].title}">
                                        <div class="img" id="img"></div>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-baseline mt-2">
                                        <h6 id="title"> ${dataAPI[index].title} </h6>
                                        <span class="free"> free </span>
                                    </div>
                                    <p id="desc" class="card-text small text-center opacity-50"  >
                                        ${dataAPI[index].short_description.split(' ').slice(0, 9).join(' ')}</p>
                                </div>
                                <div class="card-footer p-2">
                                    <div class="d-flex justify-content-between">
                                        <span id="badge1" class="badge badge-color"> ${dataAPI[index].genre} </span>
                                        <span id="badge2" class="badge badge-color">${dataAPI[index].platform} </span >
                                    </div >
                                </div >
                            </div >
                        </div > `;
    }
    rowData.innerHTML = contan;

    //////////////// على شان اخد ال id
    let col_data = document.querySelectorAll('.col');
    let DATA;
    for (let i = 0; i < col_data.length; i++) {
        col_data[i].addEventListener('click', function () {
            DATA = (this.id);
            DetailsAPI(DATA);
            mainSection.classList.add("d-none");
            detailsPage.classList.remove("d-none");
        })
    }
}



/***************************************************************selection details */
let img = document.getElementById('img');
let title = document.getElementById('title');
let Category = document.getElementById('Category');
let Platform = document.getElementById('Platform');
let Status = document.getElementById('Status');
let desc = document.getElementById('desc');
let link = document.getElementById('link');
let close = document.getElementById('close');
let detailsPage = document.getElementById('details-page');
/*api details */
const option = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'aeea14e878msh6d64db4f66c5e32p13b7b7jsn0640063be048',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

async function DetailsAPI(id) {
    console.log(id);
    const linkAPI = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, option);
    const response = await linkAPI.json();
    dispalyDetails(response);
}


close.addEventListener('click', function () {
    detailsPage.classList.add("d-none");
    mainSection.classList.remove("d-none");
})

function dispalyDetails(response) {
    console.log(response);
    title.innerHTML = response.title;
    img.setAttribute('src', `${response.thumbnail}`);
    img.setAttribute('alt', `${response.title}`);
    Category.innerHTML = response.genre;
    Status.innerHTML = response.status;
    Platform.innerHTML = response.platform;
    desc.innerHTML = response.description;
    link.setAttribute('href', `${response.game_url}`);
}