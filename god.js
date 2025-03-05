const gods = [
    { name: "พญานาค", effect: "หุ้นพลังงานพุ่ง!", img: "god1.png" },
    { name: "พระสารีบุตร", effect: "หุ้น VI พื้นฐานดี!", img: "god2.png" },
    { name: "ราหูอมจันทร์", effect: "ตลาดปั่นหนักมาก!", img: "god3.png" }
];

const godContainer = document.querySelector(".god-container");
const nextBtn = document.getElementById("nextBtn");
let selectedGod = null;

gods.forEach((god, index) => {
    let godCard = document.createElement("div");
    godCard.classList.add("god-card");
    godCard.innerHTML = `<p>${god.name}</p><small>${god.effect}</small>`;
    godCard.addEventListener("click", () => selectGod(index, godCard));
    godContainer.appendChild(godCard);
});

function selectGod(index, godCard) {
    if (selectedGod) {
        document.querySelector(".selected").classList.remove("selected");
    }
    selectedGod = gods[index];
    godCard.classList.add("selected");
    nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
    localStorage.setItem("selectedGod", JSON.stringify(selectedGod));
    window.location.href = "stocks.html";
});
