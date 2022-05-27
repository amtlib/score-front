document.addEventListener("DOMContentLoaded", async () => {
    const today = new Date();
    const imgSrc = `https://dgrela.pl/kalendarz/${getFormattedDate(today)}.png`
    const dateElements = [...document.getElementsByClassName("today")];
    dateElements.map(element => element.setAttribute("src", imgSrc))

    // names scrollbar
    const names = await getNames();
    const nameDayElement = document.getElementById("name-day");
    nameDayElement.innerText = names[`${getFormattedNumber(today.getDate())}${getFormattedNumber(today.getMonth() + 1)}`]
})