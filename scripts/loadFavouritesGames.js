const addGameCard = ({ id, coverImageUrl, description, released, genres, name }) => {    
    const wrapper = document.createElement("a");
    wrapper.setAttribute("class", "card");
    wrapper.setAttribute("href", `/game.html?id=${id}`);
    const imageWrapper = document.createElement("div");
    imageWrapper.setAttribute("class", "image-wrapper");
    const coverImage = document.createElement("img");
    coverImage.setAttribute("src", coverImageUrl);
    coverImage.setAttribute("alt", name);
    imageWrapper.appendChild(coverImage);
    wrapper.appendChild(imageWrapper);
    const nameHeader = document.createElement("h2");
    nameHeader.innerText = name;
    wrapper.appendChild(nameHeader);
    const genresWrapper = document.createElement("div");
    genresWrapper.setAttribute("class", "genres");
    genres.map(genre => {
        const genreElement = document.createElement("div");
        genreElement.setAttribute("class", "genre");
        genreElement.innerText = genre;
        genresWrapper.appendChild(genreElement);
    });
    wrapper.appendChild(genresWrapper);
    const releasedWrapper = document.createElement("h3");
    releasedWrapper.setAttribute("class", "release-date")
    releasedWrapper.innerText = released;
    const descriptionWrapper = document.createElement("p");
    descriptionWrapper.innerText = description.substring(0, 100) + "...";
    wrapper.appendChild(descriptionWrapper);

    document.getElementsByClassName("cards")[0].appendChild(wrapper)
}
let loadInterval;
const loadGames = () => {
    if (!loggedInUser) return;
    document.getElementsByClassName("cards")[0].innerHTML = "";
    fetch(`${API_URL}/games`).then(data => data.json()).then(games => {
        games.map(game => {
            const shouldAddGame = (platformFilter.value === "all" || game.platforms.includes(platformFilter.value)) && game.favouriteBy.includes(loggedInUser.id) ;
            if (shouldAddGame) {
                addGameCard(game)
            }
        })
        clearInterval(loadInterval)
    })
}
const platformFilter = document.getElementById("platform-select");

platformFilter.addEventListener("change", loadGames)

document.addEventListener("DOMContentLoaded", () => {
    loadInterval = setInterval(loadGames, 50);
})