let permissionInterval;
const localGames = [];
const localUsers = [];

const saveGame = (row) => {
    const gameToSave = localGames[row];
    if (gameToSave.id) {
        fetch(`${API_URL}/games/${gameToSave.id}`, {
            method: "put", headers: {
                'Content-Type': "application/json",
                AuthToken: getCookie("AuthToken")
            }, body: JSON.stringify(gameToSave)
        }).then(data => data.json()).then(() => location.reload())
    } else {
        // new game
        fetch(`${API_URL}/games/`, {
            method: "post", headers: {
                'Content-Type': "application/json",
                AuthToken: getCookie("AuthToken")
            }, body: JSON.stringify(gameToSave)
        }).then(data => data.json()).then(() => location.reload())
    }
}

const saveUser = (row) => {
    const userToSave = localUsers[row];
    console.log

    fetch(`${API_URL}/users/${userToSave.id}`, {
        method: "put", headers: {
            'Content-Type': "application/json",
            AuthToken: getCookie("AuthToken")
        }, body: JSON.stringify(userToSave)
    }).then(data => data.json()).then(() => location.reload())
}

const deleteUser = (row) => {
    const userToDelete = localUsers[row];

    fetch(`${API_URL}/users/${userToDelete.id}`, {
        method: "delete", headers: {
            'Content-Type': "application/json",
            AuthToken: getCookie("AuthToken")
        }
    }).then(data => data.json()).then(() => location.reload())
}

const deleteGame = (row) => {
    const gameToDelete = localGames[row];
    if(gameToDelete.id) {
        fetch(`${API_URL}/games/${gameToDelete.id}`, {
            method: "delete", headers: {
                'Content-Type': "application/json",
                AuthToken: getCookie("AuthToken")
            }
        }).then(data => data.json()).then(() => location.reload())
    } else {
        delete localGames[row];
        location.reload()
    }
}

const handleGameValueChange = (row, fieldName, newValue) => {
    localGames[row][fieldName] = newValue;
}

const handleUserValueChange = (row, fieldName, newValue) => {
    localUsers[row][fieldName] = newValue;
}
document.addEventListener("DOMContentLoaded", () => {
    permissionInterval = setInterval(checkPermission, 100);
    const table = document.getElementById("games-admin-tbody");
    const usersTable = document.getElementById("users-admin-tbody");

    const addNewRow = () => {
        const i = localGames.length
        const row = document.createElement("tr");
        localGames.push({});
        const nameTd = document.createElement("td")
        const name = document.createElement("input")
        name.addEventListener("change", (e) => handleGameValueChange(i, "name", e.target.value));
        name.setAttribute("type", "text");
        nameTd.appendChild(name)
        row.appendChild(nameTd)

        const producerTd = document.createElement("td")
        const producer = document.createElement("input")
        producer.addEventListener("change", (e) => handleGameValueChange(i, "producer", e.target.value));
        producer.setAttribute("type", "text");
        producerTd.appendChild(producer)
        row.appendChild(producerTd)

        const coverTd = document.createElement("td")
        const cover = document.createElement("input")
        cover.addEventListener("change", (e) => handleGameValueChange(i, "coverImageUrl", e.target.value.split(";")));
        cover.setAttribute("type", "text");
        coverTd.appendChild(cover)
        row.appendChild(coverTd)

        const descriptionTd = document.createElement("td")
        const description = document.createElement("textarea")
        description.addEventListener("change", (e) => handleGameValueChange(i, "description", e.target.value));
        descriptionTd.appendChild(description)
        row.appendChild(descriptionTd)

        const releasedTd = document.createElement("td")
        const released = document.createElement("input")
        released.addEventListener("change", (e) => handleGameValueChange(i, "released", e.target.value));
        released.setAttribute("type", "date");
        releasedTd.appendChild(released)
        row.appendChild(releasedTd)

        const generesTd = document.createElement("td")
        const genres = document.createElement("input")
        genres.addEventListener("change", (e) => handleGameValueChange(i, "genres", e.target.value.split(";")));
        genres.setAttribute("type", "text");
        generesTd.appendChild(genres)
        row.appendChild(generesTd)

        const platformsTd = document.createElement("td")
        const platforms = document.createElement("input")
        platforms.addEventListener("change", (e) => handleGameValueChange(i, "platforms", e.target.value.split(";")));
        platforms.setAttribute("data-row", i);
        platforms.setAttribute("type", "text");
        platformsTd.appendChild(platforms)
        row.appendChild(platformsTd)

        const screenshotsTd = document.createElement("td")
        const screenshots = document.createElement("input")
        screenshots.addEventListener("change", (e) => handleGameValueChange(i, "screenshots", e.target.value.split(";")));
        screenshots.setAttribute("type", "text");
        screenshots.setAttribute("data-row", i);
        screenshotsTd.appendChild(screenshots)
        row.appendChild(screenshotsTd)

        const deleteTd = document.createElement("td")
        const deleteButton = document.createElement("button")
        deleteButton.addEventListener("click", () => deleteGame(i))
        deleteButton.innerText = "usuń";
        deleteTd.appendChild(deleteButton);
        row.appendChild(deleteTd)

        const saveTd = document.createElement("td")
        const saveButton = document.createElement("button")

        saveButton.addEventListener("click", () => saveGame(i));
        saveButton.innerText = "zapisz";
        saveTd.appendChild(saveButton)
        row.appendChild(saveTd)

        table.appendChild(row)
    }

    const addNewGameButton = document.getElementById("add-new-game");
    addNewGameButton.addEventListener("click", addNewRow)

    fetch(`${API_URL}/games`).then(data => data.json()).then(games => {
        console.log(games)
        localGames.push(...games);

        games.map((game, i) => {
            const row = document.createElement("tr");

            const nameTd = document.createElement("td")
            const name = document.createElement("input")
            name.addEventListener("change", (e) => handleGameValueChange(i, "name", e.target.value));
            name.setAttribute("type", "text");
            name.setAttribute("value", game.name || "");
            nameTd.appendChild(name)
            row.appendChild(nameTd)

            const producerTd = document.createElement("td")
            const producer = document.createElement("input")
            producer.addEventListener("change", (e) => handleGameValueChange(i, "producer", e.target.value));
            producer.setAttribute("type", "text");
            producer.setAttribute("value", game.producer || "");
            producerTd.appendChild(producer)
            row.appendChild(producerTd)

            const coverTd = document.createElement("td")
            const cover = document.createElement("input")
            cover.addEventListener("change", (e) => handleGameValueChange(i, "coverImageUrl", e.target.value.split(";")));
            cover.setAttribute("type", "text");
            cover.setAttribute("value", game.coverImageUrl || "");
            coverTd.appendChild(cover)
            row.appendChild(coverTd)

            const descriptionTd = document.createElement("td")
            const description = document.createElement("textarea")
            description.addEventListener("change", (e) => handleGameValueChange(i, "description", e.target.value));
            description.innerText = game.description || "";
            descriptionTd.appendChild(description)
            row.appendChild(descriptionTd)

            const releasedTd = document.createElement("td")
            const released = document.createElement("input")
            released.addEventListener("change", (e) => handleGameValueChange(i, "released", e.target.value));
            released.setAttribute("type", "date");
            released.setAttribute("value", game.released || "");
            releasedTd.appendChild(released)
            row.appendChild(releasedTd)

            const generesTd = document.createElement("td")
            const genres = document.createElement("input")
            genres.addEventListener("change", (e) => handleGameValueChange(i, "genres", e.target.value.split(";")));
            genres.setAttribute("type", "text");
            genres.setAttribute("value", game.genres.join(";") || "");
            generesTd.appendChild(genres)
            row.appendChild(generesTd)

            const platformsTd = document.createElement("td")
            const platforms = document.createElement("input")
            platforms.addEventListener("change", (e) => handleGameValueChange(i, "platforms", e.target.value.split(";")));
            platforms.setAttribute("data-row", i);
            platforms.setAttribute("type", "text");
            platforms.setAttribute("value", game.platforms.join(";") || "");
            platformsTd.appendChild(platforms)
            row.appendChild(platformsTd)

            const screenshotsTd = document.createElement("td")
            const screenshots = document.createElement("input")
            screenshots.addEventListener("change", (e) => handleGameValueChange(i, "screenshots", e.target.value.split(";")));
            screenshots.setAttribute("type", "text");
            screenshots.setAttribute("data-row", i);
            screenshots.setAttribute("value", game.screenshots.join(";") || "");
            screenshotsTd.appendChild(screenshots)
            row.appendChild(screenshotsTd)

            const deleteTd = document.createElement("td")
            const deleteButton = document.createElement("button")
            deleteButton.addEventListener("click", () => deleteGame(i))
            deleteButton.innerText = "usuń";
            deleteTd.appendChild(deleteButton);
            row.appendChild(deleteTd)

            const saveTd = document.createElement("td")
            const saveButton = document.createElement("button")

            saveButton.addEventListener("click", () => saveGame(i));
            saveButton.innerText = "zapisz";
            saveTd.appendChild(saveButton)
            row.appendChild(saveTd)

            table.appendChild(row)
        })
    })

    fetch(`${API_URL}/users`, { headers: {
        AuthToken: getCookie("AuthToken")
    }}).then(data => data.json()).then(users => {
        console.log(users)
        localUsers.push(...users);

        users.map((user, i) => {
            if (user.email === loggedInUser.email) return;
            const row = document.createElement("tr");

            const emailTd = document.createElement("td")
            emailTd.innerText = user.email;
            row.appendChild(emailTd)

            const roleTd = document.createElement("td")
            const role = document.createElement("input")
            role.addEventListener("change", (e) => handleUserValueChange(i, "role", e.target.value));
            role.setAttribute("type", "text");
            role.setAttribute("value", user.role || "");
            roleTd.appendChild(role)
            row.appendChild(roleTd)

            const deleteTd = document.createElement("td")
            const deleteButton = document.createElement("button")
            deleteButton.addEventListener("click", () => deleteUser(i))
            deleteButton.innerText = "usuń";
            deleteTd.appendChild(deleteButton);
            row.appendChild(deleteTd)

            const saveTd = document.createElement("td")
            const saveButton = document.createElement("button")

            saveButton.addEventListener("click", () => saveUser(i));
            saveButton.innerText = "zapisz";
            saveTd.appendChild(saveButton)
            row.appendChild(saveTd)

            usersTable.appendChild(row)
        })
    })
})

const checkPermission = () => {
    if (loggedInUser) {
        if (loggedInUser.role !== "admin") {
            location.href = "/";
        }
    }
}