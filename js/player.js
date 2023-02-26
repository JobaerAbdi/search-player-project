const searchAllCountry = (id) => {
  const searchField = document.getElementById("search-value");
  const searchFieldArea = searchField.value;
  searchField.value = "";
  document.getElementById('spinner').classList.remove('d-none');
  document.getElementById('single-player-details').innerHTML = '';
  const searchId = id || searchFieldArea;
  const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchId}`;
  //console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById('spinner').classList.add('d-none');
      playerData(data.player)
    })
    .catch((error) => console.log(error));
  //console.log(searchFieldArea);
};

const playerData = (allData) => {
  const parentContainer = document.getElementById("card-container");
  parentContainer.textContent = "";
  allData.forEach((singleData) => {
    const { strPlayer, strThumb, idPlayer } = singleData;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
                <div class="card">
                    <img src="${strThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Name : ${strPlayer}</h5>
                        <p class="card-text"></p>
                    </div>
                    <div>
                    <button onclick="playerDetails('${idPlayer}')" type="button" class=" ms-5 btn btn-warning">Details</button>
                    <button onclick="playerDeleted()" type="button" class="btn btn-info">Delete</button>
                    </div>
                </div>
        `;
    parentContainer.appendChild(div);
  });
};

const playerDetails = (id) => {
  const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showSinglePlayer(data.players[0]))
    .catch((error) => console.log(error));
};

const showSinglePlayer = (playerData) => {
    console.log(playerData);
    const {strThumb,strPlayer,strDescriptionEN} = playerData;
    const parentContainer = document.getElementById('single-player-details');
    parentContainer.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card mb-3 w-100 px-4 py-4">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${strThumb}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${strPlayer}</h5>
          <p>${strDescriptionEN.slice(0,100) + '...'}</p>
        </div>
      </div>
    </div>
  </div>
    `;
    parentContainer.appendChild(div);
  };

searchAllCountry("messi");



