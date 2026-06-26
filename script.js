const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const reserveForm = document.querySelector("[data-reserve-form]");
const whatsappNumber = "6281238770093";

const buildWhatsAppUrl = (message) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const setHeaderState = () =>
  header.classList.toggle("is-scrolled", window.scrollY > 24);
setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
});

nav.addEventListener("click", (e) => {
  if (e.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Buka menu");
  }
});

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  const ctx = link.getAttribute("data-wa-context");
  const msg =
    ctx === "hero"
      ? "Halo Happy Banana Komodo, saya mau reservasi meja untuk dinner."
      : ctx === "reserve"
        ? "Halo Happy Banana Komodo, saya mau reservasi meja. Boleh dibantu?"
        : ctx === "footer"
          ? "Halo Happy Banana Komodo, saya ingin bertanya tentang menu dan reservasi."
          : "Halo Happy Banana Komodo, saya ingin reservasi.";

  link.setAttribute("href", buildWhatsAppUrl(msg));
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noreferrer");
});

reserveForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(reserveForm);
  const message = [
    "Halo Happy Banana Komodo, saya mau reservasi meja.",
    "",
    `Nama: ${fd.get("name") || "-"}`,
    `Tanggal: ${fd.get("date") || "-"}`,
    `Waktu: ${fd.get("time") || "-"}`,
    `Jumlah tamu: ${fd.get("guests") || "-"}`,
    `Catatan: ${fd.get("notes") || "-"}`,
  ].join("\n");

  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
});
