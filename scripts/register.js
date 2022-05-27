document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        fetch(`${API_URL}/register`, {
            method: "post",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(formData)
        }).then(data => data.json()).then(data => {
            if (data.status === "ok") {
                displayAlert("success", "Gratulacje! Za chwilę zostaniesz przekierowany do strony logowania.");
                setTimeout(() => {
                    hideAlert();
                    location.href = "/login.html";
                }, 5000);
            } else {
                displayAlert("error", "Nie udało się zarejestrować")
                setTimeout(hideAlert, 5000)
            }
        });
    })
})