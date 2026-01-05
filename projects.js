const viewport = document.getElementById("projViewport");
const prevBtn = document.querySelector(".nav.prev");
const nextBtn = document.querySelector(".nav.next");

function cardStep() {
  const firstCard = viewport.querySelector(".card");
  if (!firstCard) return 0;
  const gap = parseFloat(getComputedStyle(viewport).gap || 0);
  return firstCard.getBoundingClientRect().width + gap;
}

function updateButtons() {
  // Links deaktivieren, wenn am Anfang
  prevBtn.disabled = viewport.scrollLeft <= 0;

  // Rechts deaktivieren, wenn am Ende
  const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;
  nextBtn.disabled = viewport.scrollLeft >= maxScrollLeft - 1;
}

// Scroll-Events beobachten
viewport.addEventListener("scroll", updateButtons);

// Buttons klicken
prevBtn.addEventListener("click", () => {
  viewport.scrollBy({ left: -cardStep(), behavior: "smooth" });
});
nextBtn.addEventListener("click", () => {
  viewport.scrollBy({ left: cardStep(), behavior: "smooth" });
});

// Anfangszustand setzen
updateButtons();

document.querySelectorAll(".card").forEach((card) => {
  const statusEl = card.querySelector(".project-status");
  if (!statusEl) return;

  const status = statusEl.dataset.status;

  const repo = card.querySelector(".action-repo");
  const fazit = card.querySelector(".action-fazit");

  // Projekt in Planung → alles deaktivieren
  if (status === "planning") {
    repo?.classList.add("action-disabled");
    fazit?.classList.add("action-disabled");
  }

  // Projekt in aktiver Entwicklung → nur Fazit deaktivieren
  else if (status === "active") {
    fazit?.classList.add("action-disabled");
  }

  // alles andere → nichts tun
});
