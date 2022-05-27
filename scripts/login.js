document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(formData)
        }).then(data => data.json()).then(data => {
            console.log(data)
            if(data.token) {
                setCookie("AuthToken", data.token, 30);
                displayAlert("success", "Udało Ci się zalogować, za chwilę zostaniesz przekierowany...");
                setTimeout(() => {
                    location.href = '/';
                    hideAlert();
                }, 5000);
            } else {
                displayAlert("error", "Niestety nie udało Ci się zalogować")
                setTimeout(hideAlert, 5000);
            }
        })
    })
})