const spinBtn = document.getElementById("spinBtn");
const gpaInput = document.getElementById("gpaInput");
const wheel = document.getElementById("wheel");
const resultDiv = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");

const outcomes = [
    "🔥 เทพเทรดเดอร์! (หุ้นพุ่ง 20%)",
    "🔮 มือใหม่สายมู! (หุ้นสายมูพุ่ง)",
    "💀 ติดดอยเต็มคอร์ส! (-10%)",
    "🤡 นักลงทุนมีม! (โดนปั่นหนัก)",
    "📈 สาย VI ไม่แคร์ตลาด (หุ้นพื้นฐานดี)",
    "⚡ นักเก็งกำไรสุดขอบ! (หุ้นขึ้นแล้วร่วง)"
];

gpaInput.addEventListener("input", () => {
    spinBtn.disabled = isNaN(parseFloat(gpaInput.value)) || gpaInput.value < 0 || gpaInput.value > 4;
});

spinBtn.addEventListener("click", () => {
    let randomIndex = Math.floor(Math.random() * outcomes.length);
    let angle = randomIndex * 60 + (360 * 5);
    wheel.style.transform = `rotate(${angle}deg)`;

    setTimeout(() => {
        resultDiv.innerHTML = `🎲 ผลลัพธ์: ${outcomes[randomIndex]}`;
        localStorage.setItem("fortune", outcomes[randomIndex]); // บันทึกดวง
        nextBtn.style.display = "inline";
    }, 3000);
});

nextBtn.addEventListener("click", () => {
    window.location.href = "god.html";
});
