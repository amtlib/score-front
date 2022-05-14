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

document.addEventListener("DOMContentLoaded", async () => {
    // modal events
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
})