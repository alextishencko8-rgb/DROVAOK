// ===== MODAL =====
const modal = document.getElementById("modal");
const openBtn = document.getElementById("openCalc");
const closeBtn = document.getElementById("close");

openBtn.onclick = () => modal.style.display = "block";
closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
  if (e.target == modal) modal.style.display = "none";
};

// ===== CALCULATOR =====
function calculate() {
  const pricePerM3 = document.getElementById("woodType").value;

  const length = parseFloat(document.getElementById("length").value) || 0;
  const width = parseFloat(document.getElementById("width").value) || 0;
  const height = parseFloat(document.getElementById("height").value) || 0;

  const volume = length * width * height;
  const price = volume * pricePerM3;

  document.getElementById("volume").innerText = volume.toFixed(2);
  document.getElementById("price").innerText = price.toFixed(2);
}

// ===== SPA NAVIGATION =====
function showSection(id) {
  const sections = document.querySelectorAll(".page-section");

  sections.forEach(sec => sec.classList.remove("active"));

  document.getElementById(id).classList.add("active");
}

// стартова сторінка
window.addEventListener("load", () => {
  showSection("hero");
});

// ===== BURGER =====
const burger = document.getElementById("burger");
const menu = document.querySelector(".menu");

burger.onclick = () => {
  burger.classList.toggle("active");
  menu.classList.toggle("active");
};

// закриття меню при кліку
document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    menu.classList.remove("active");
  });
});

// ===== ORDER MODAL =====
const orderModal = document.getElementById("orderModal");
const openOrder = document.getElementById("openOrder");
const closeOrder = document.getElementById("closeOrder");

openOrder.onclick = () => (orderModal.style.display = "block");
closeOrder.onclick = () => (orderModal.style.display = "none");

window.addEventListener("click", (e) => {
  if (e.target == orderModal) orderModal.style.display = "none";
});

// ===== ORDER CALC =====
const orderVolume = document.getElementById("orderVolume");
const orderWood = document.getElementById("orderWood");
const orderPrice = document.getElementById("orderPrice");

function updateOrderPrice() {
  const volume = parseFloat(orderVolume.value) || 0;
  const pricePerM3 = parseFloat(orderWood.value);

  const total = volume * pricePerM3;

  orderPrice.innerText = total.toFixed(0);
}

orderVolume.addEventListener("input", updateOrderPrice);
orderWood.addEventListener("change", updateOrderPrice);

// ===== SUBMIT =====
async function submitOrder() {
  const name = document.getElementById("orderName").value;
  const phone = document.getElementById("orderPhone").value;
  const address = document.getElementById("orderAddress").value;

  const woodSelect = document.getElementById("orderWood");
  const wood = woodSelect.options[woodSelect.selectedIndex].text;

  const volume = document.getElementById("orderVolume").value;
  const length = document.getElementById("orderLength").value;
  const price = document.getElementById("orderPrice").innerText;

  if (!name || !phone || !address || !volume) {
    alert("Заповніть всі поля!");
    return;
  }

  const message = `
🪵 НОВЕ ЗАМОВЛЕННЯ ДРОВ
------------------------
👤 ПІБ: ${name}
📞 Телефон: ${phone}
📍 Адреса: ${address}

🌳 Порода: ${wood}
📦 Об’єм: ${volume} м³
📏 Довжина: ${length} см

💰 Сума: ${price} грн
  `;

  const token = "8530257939:AAE89bffFNmLhr9C9fcfk-xw9CBCpcdZVVY";
  const chat_id = "7974703334";

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chat_id,
      text: message
    })
  });

  alert("Замовлення відправлено 🚀");

  orderModal.style.display = "none";
}


async function sendContact() {
  const name = document.getElementById("contactName").value;
  const phone = document.getElementById("contactPhone").value;
  const messageText = document.getElementById("contactMessage").value;

  if (!name || !phone || !messageText) {
    alert("Заповніть всі поля!");
    return;
  }

  const message = `
📩 НОВА ЗАЯВКА З САЙТУ
------------------------
👤 Ім'я: ${name}
📞 Телефон: ${phone}

💬 Повідомлення:
${messageText}
  `;

  const token = "8530257939:AAE89bffFNmLhr9C9fcfk-xw9CBCpcdZVVY";
  const chat_id = "7974703334";

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chat_id,
      text: message
    })
  });

  alert("Заявка відправлена ✅");

  // очистка полів
  document.getElementById("contactName").value = "";
  document.getElementById("contactPhone").value = "";
  document.getElementById("contactMessage").value = "";
}

const btn = document.querySelector(".contacts_form button");
btn.disabled = true;
setTimeout(() => btn.disabled = false, 3000);