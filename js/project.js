import { portfolio } from "./data.js";

const grid = document.getElementById("portfolioGrid");

portfolio.forEach((item, idx) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <img class="card-img" src="${item.image}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>${item.sub}</p>
    <div class="skill-icons">
      ${item.skill
        .map(s => `<img src="image/${s}.svg" alt="${s}">`)
        .join("")}
    </div>
  `;
  card.addEventListener("click", () => openModal(item));
  grid.appendChild(card);
});

const overlay = document.getElementById("modalOverlay");

function openModal(data) {
  document.getElementById("modalName").textContent = data.name;
  document.getElementById("modalImage").src = data.image;
  renderTags("modalSkills", data.skills);
  renderTags("modalTools", data.Tools);
  document.getElementById("modalDate").textContent = data.date;
  document.getElementById("modalPeople").textContent = data.people;
  document.getElementById("modalRole").textContent = data.role;
  document.getElementById("modalDesc").textContent = data.sub2;
  document.getElementById("modalGithub").href = data.github || "#";
  document.getElementById("modalUrl").href = data.url || "#";

  overlay.classList.add("active");
}

function renderTags(containerId, list) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // 초기화

  list.forEach(item => {
    const span = document.createElement("span");
    span.className = `${item}`;
    span.textContent = item;
    container.appendChild(span);
  });
}

// X 버튼
document.getElementById("modalClose").onclick = closeModal;

// 오버레이 클릭
overlay.addEventListener("click", e => {
  if (e.target === overlay) closeModal();
});

// ESC
window.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

function closeModal() {
  overlay.classList.remove("active");
}