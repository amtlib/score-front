const removeFromFavouritesHandler = (gameId) => {
    fetch(`${API_URL}/games/${gameId}/favourites`, { method: "delete", headers: {
        'Content-Type': "application/json"
    }, body: JSON.stringify({
        AuthToken: getCookie("AuthToken")
    })}).then(data => data.json()).then(game => console.log(game))
    location.reload("/")
};
const addToFavouritesHandler = (gameId) => {
    fetch(`${API_URL}/games/${gameId}/favourites`, { method: "post", headers: {
        'Content-Type': "application/json"
    }, body: JSON.stringify({
        AuthToken: getCookie("AuthToken")
    })}).then(data => data.json()).then(game => console.log(game))
    location.reload("/")

};


document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search)
     // favourite buttons
     const addToFavourites = document.getElementById("add-to-favourites");
     const removeFromFavourites = document.getElementById("remove-from-favourites");
    if(!params.has("id")) {
        // id not provided
        location.replace("/");
    }
    fetch(`${API_URL}/games/${params.get("id")}`).then(data => data.json()).then(game => {
        console.log(game)
        if (!game.id) {
            location.replace("/");
        }
        document.getElementById("game-image").setAttribute("src", game.coverImageUrl);
        document.getElementById("game-name").innerText = game.name;
        document.getElementById("release-date").innerText = game.released;
        document.getElementById("made-by").innerText = game.producer;
        document.getElementById("description").innerText = game.description;
        const platformsList = document.getElementById("platforms-list");
        game.platforms.map(platform => {
            const platformLi = document.createElement("li");
            const platformImg = document.createElement("img");
            platformImg.setAttribute("src", `assets/platforms/${platform}.png`);
            platformImg.setAttribute("alt", platform);
            platformLi.appendChild(platformImg);
            platformsList.appendChild(platformLi);
        });
        const genresContainer = document.getElementById("genres");
        game.genres.map(genre => {
            const genreElement = document.createElement("div");
            genreElement.setAttribute("class", "genre");
            genreElement.innerText = genre;
            genresContainer.appendChild(genreElement);
        });
        const screenshotsGrid = document.getElementById("screenshots-grid");
        game.screenshots.map(screenshot => {
            const screenshotElement = document.createElement("img");
            screenshotElement.setAttribute("alt", "screenshot");
            screenshotElement.setAttribute("src", screenshot)
            screenshotsGrid.appendChild(screenshotElement)
        })

       
        removeFromFavourites.addEventListener("click", () => removeFromFavouritesHandler(game.id));
        addToFavourites.addEventListener("click", () => addToFavouritesHandler(game.id));
        // favourite
        const favouritesInterval = setInterval(() => {
            if (loggedInUser) {
                if( game.favouriteBy.includes(loggedInUser.id)) {
                    addToFavourites.style.display = "none";
                    removeFromFavourites.style.display = "block";
                } else {
                    removeFromFavourites.style.display = "none";
                    addToFavourites.style.display = "block";
                }
                clearInterval(favouritesInterval);
            } else {
                addToFavourites.style.display = "none";
                removeFromFavourites.style.display = "none";
            }
        }, 10)
        
    })
})