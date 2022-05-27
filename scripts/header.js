let loggedInUser;
const logOut = () => {
    eraseCookie("AuthToken");
    location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
    const AuthToken = getCookie("AuthToken");
    fetch(`${API_URL}/whoami`, {
        headers: {
            'Content-Type': "application/json"
        },
        method: "post",
        body: JSON.stringify({ AuthToken })
    }).then(data => data.json()).then(me => {
        const userContainer = document.getElementById("user-container");
        loggedInUser = me;
        if (me) {
            const logOutButton = document.createElement("button");
            logOutButton.setAttribute("class", "button");
            logOutButton.innerText = "wyloguj się";
            logOutButton.addEventListener("click", logOut);
            userContainer.appendChild(logOutButton);

            const myFavourites = document.createElement("li");
            myFavourites.setAttribute("class", "menu-item");
            const linkToFavourites = document.createElement("a");
            linkToFavourites.setAttribute("href", "/favourites.html");
            linkToFavourites.innerText = "moje ulubione";
            myFavourites.appendChild(linkToFavourites);
            document.getElementById("header-menu").appendChild(myFavourites);

            if(me.role === "admin") {
                const adminButton = document.createElement("button");
                adminButton.setAttribute("class", "button");
                adminButton.setAttribute("href", "/admin.html")
                adminButton.innerText = "panel admina";
                adminButton.style.marginLeft = "20px";
                adminButton.addEventListener("click", () => location.href = "/admin.html")
                userContainer.appendChild(adminButton);
            }
        } else {
            // <a href="/login.html" class="button log-in">zaloguj się</a>
            const linkToLogin = document.createElement("a");
            linkToLogin.setAttribute("class", "button log-in");
            linkToLogin.setAttribute("href", "/login.html");
            linkToLogin.innerText = "zaloguj się"
            userContainer.appendChild(linkToLogin);
        }
        console.log(me)
    });
})