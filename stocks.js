const stockContainer = document.querySelector(".stock-container");
const calculateBtn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");
let selectedStocks = [];

// ดึงข้อมูลหุ้นจากไฟล์ JSON
fetch("stocks.json")
    .then(response => response.json())
    .then(data => renderStocks(data));

// ฟังก์ชันแสดงหุ้นในหน้าเว็บ
function renderStocks(stocks) {
    stocks.forEach((stock, index) => {
        let stockDiv = document.createElement("div");
        stockDiv.classList.add("stock");
        stockDiv.innerHTML = `<p>${stock.name}</p>
                              <small>ราคาเปิด: ${stock.open} | ล่าสุด: ${stock.last} | %เปลี่ยน: ${stock.percent}%</small>`;
        stockDiv.addEventListener("click", () => selectStock(stock, stockDiv));
        stockContainer.appendChild(stockDiv);
    });
}

// ฟังก์ชันเลือกหุ้น
function selectStock(stock, stockDiv) {
    if (selectedStocks.includes(stock)) {
        selectedStocks = selectedStocks.filter(s => s !== stock);
        stockDiv.classList.remove("selected");
    } else if (selectedStocks.length < 5) {
        selectedStocks.push(stock);
        stockDiv.classList.add("selected");
    }

    // ปุ่มคำนวณเปิดเมื่อเลือกครบ 5 ตัว
    calculateBtn.disabled = selectedStocks.length !== 5;
}

// ฟังก์ชันคำนวณผลลัพธ์
function calculateResult() {
    let totalChange = selectedStocks.reduce((sum, stock) => sum + stock.change, 0);
    let totalPercent = selectedStocks.reduce((sum, stock) => sum + stock.percent, 0);

    // ดึงค่าดวงกับสิ่งศักดิ์สิทธิ์
    let fortune = localStorage.getItem("fortune") || "กลางๆ";
    let god = JSON.parse(localStorage.getItem("selectedGod")) || { name: "ไม่มี", effect: "ไม่มีผล" };

    // สุ่มเหตุการณ์ตลาด
    let events = ["ตลาดพุ่ง!", "ตลาดร่วง!", "เจ้ามือปั่น!", "ฟองสบู่แตก!"];
    let event = events[Math.floor(Math.random() * events.length)];

    // ปรับค่าผลลัพธ์ตามดวงและเทพเจ้า
    if (fortune.includes("เทพเทรดเดอร์")) totalPercent += 5;
    if (fortune.includes("ติดดอย")) totalPercent -= 5;
    if (god.name === "พญานาค") totalPercent += 3;
    if (god.name === "ราหูอมจันทร์") totalPercent -= 3;

    let outcome;
    if (totalPercent > 10) {
        outcome = "🔥 พอร์ตสุดเทพ! กำไรโหด!";
    } else if (totalPercent > 0) {
        outcome = "📈 พอร์ตมีกำไรพอสมควร!";
    } else {
        outcome = "💀 พอร์ตพัง! ติดดอย!";
    }

    resultDiv.innerHTML = `<p>🎲 ดวง: ${fortune}</p>
                           <p>🙏 สิ่งศักดิ์สิทธิ์: ${god.name} (${god.effect})</p>
                           <p>📊 เหตุการณ์ตลาด: ${event}</p>
                           <p>${outcome}</p>`;
}

calculateBtn.addEventListener("click", calculateResult);
