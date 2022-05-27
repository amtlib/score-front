const API_URL = "http://localhost:3000";

const getNames = () => {
    return fetch("../assets/names.json")
        .then(response => response.json())
}

const getFormattedNumber = (number) => ("0" + number).slice(-2);

const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = getFormattedNumber(date.getMonth() + 1);
    const day = getFormattedNumber(date.getDate());

    return `${year}-${month}-${day}`;
}

const turnOnModalEvents = () => {
    const modalCloseButton = document.getElementById("modal-close");
    const modalWrapper = document.getElementById("modal-wrapper");
    modalCloseButton.addEventListener("click", () => {
        const modalClasses = modalWrapper.getAttribute("class").split(" ");
        const filteredModalClasses = modalClasses.filter(className => className !== "visible");
        modalWrapper.setAttribute("class", filteredModalClasses.join(" "));
    });
    const guestbookOpenButton = document.getElementById("guestbook");
    guestbookOpenButton.addEventListener("click", () => {
        modalWrapper.setAttribute("class", `${modalWrapper.getAttribute("class")} visible`)
    })
    // adding an entry
    const form = document.getElementById("modal-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        fetch(`${API_URL}/guestbook`, {
            method: "POST", headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(formData)
        }).then(data => fetchGuestbook())
    })
    // display existing entries
    fetchGuestbook();
}

const fetchGuestbook = () => {
    const entriesWrapper = document.getElementById("entries");
    entriesWrapper.innerHTML = "";
    fetch(`${API_URL}/guestbook`).then(data => data.json()).then(entries => {
        entries.map(entry => {
            // <p><strong>Dominik napisał(a):</strong> Super stronka, pozdrawiam serdecznie</p>
            const entryWrapper = document.createElement("p");
            const nameWrapper = document.createElement("strong");
            nameWrapper.innerText = `${entry.guestName} napisał(a):`
            entryWrapper.appendChild(nameWrapper);
            const messageWrapper = document.createTextNode(entry.entry);
            entryWrapper.appendChild(messageWrapper);
            entriesWrapper.appendChild(entryWrapper);
        })
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    turnOnModalEvents();
})