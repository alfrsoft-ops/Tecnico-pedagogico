// Utilidades de interfaz compartidas: iconos, formatos, avisos y confirmaciones.
const ICONS = {
  book: '<svg viewBox="0 0 24 24"><path d="M6 3.5h10.5A1.5 1.5 0 0 1 18 5v15.5H6A2 2 0 0 1 4 18.5v-13a2 2 0 0 1 2-2Z"/><path d="M8 3.5v7l3-2 3 2v-7M7 20.5h11"/></svg>',
  scale: '<svg viewBox="0 0 24 24"><path d="M12 3v18M5 6h14M7 6l-4 8h8L7 6ZM17 6l-4 8h8l-4-8ZM7 21h10"/></svg>',
  doc: '<svg viewBox="0 0 24 24"><path d="M6 3.5h9l4 4v13H6a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z"/><path d="M15 3.5v4h4M8 12h8M8 15.5h8M8 8.5h3"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><path d="M4 20h16M7 16.5V10M12 16.5V5.5M17 16.5V13"/></svg>',
  people: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9.5" r="2.5"/><path d="M15.5 14.6a4.5 4.5 0 0 1 5 4.9"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M7 4.5v15l12-7.5-12-7.5Z"/></svg>',
  questions: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 16.5v.01"/></svg>',
  trophy: '<svg viewBox="0 0 24 24"><path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20.5h7M10 17h4"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  cross: '<svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg>',
  legal: '<svg viewBox="0 0 24 24"><path d="M6.5 2.5h7.5l4 4v15h-11.5z"/><path d="M14 2.5v4h4M9.5 11h5M9.5 14.5h5M9.5 18h3"/></svg>',
};

const icon = (name) => ICONS[name] || ICONS.book;

// Colores de los capítulos, en el mismo orden que la referencia.
const CHAPTER_TONES = ["blue", "purple", "teal", "olive", "coral"];

function formatTime(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString("es-BO", { dateStyle: "medium", timeStyle: "short" });
  } catch (e) {
    return iso;
  }
}

function plural(count, one, many) {
  return `${count} ${count === 1 ? one : many}`;
}

// Crea un elemento con clase y texto (el texto nunca se interpreta como HTML).
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// Vista visible, encabezado y botón «volver», comunes a todas las etapas.
const Shell = (() => {
  const views = {
    home: document.querySelector("#homeView"),
    book: document.querySelector("#bookView"),
    history: document.querySelector("#historyView"),
    quiz: document.querySelector("#quizView"),
  };
  const nav = document.querySelector("#mainNav");
  const back = document.querySelector("#headerBack");
  let backAction = null;

  back.addEventListener("click", () => backAction && backAction());

  return {
    show(name) {
      Object.entries(views).forEach(([key, view]) => { view.hidden = key !== name; });
      nav.hidden = name === "quiz";
      document.body.classList.toggle("in-quiz", name === "quiz");
      nav.querySelectorAll("a").forEach((link) => {
        const active = link.dataset.nav === name || (name === "book" && link.dataset.nav === "home");
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
      window.scrollTo(0, 0);
    },
    setHeader({ title, subtitle = "Técnico pedagógico", onBack = null }) {
      document.querySelector("#headerTitle").textContent = title;
      document.querySelector("#headerSubtitle").textContent = subtitle;
      back.hidden = !onBack;
      backAction = onBack;
    },
  };
})();

let toastTimer = null;
function toast(message) {
  const box = document.querySelector("#toast");
  box.textContent = message;
  box.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { box.hidden = true; }, 3200);
}

// Los clics en el fondo oscuro llegan con el propio <dialog> como destino.
function closeOnBackdrop(dialog, onClose) {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) (onClose || (() => dialog.close()))();
  });
}

// Confirmación modal; resuelve true si se acepta.
const confirmDialog = (() => {
  const dialog = document.querySelector("#confirmDialog");
  const okButton = document.querySelector("#confirmOk");
  const cancelButton = document.querySelector("#confirmCancel");
  let resolver = null;

  function settle(value) {
    if (dialog.open) dialog.close();
    if (resolver) resolver(value);
    resolver = null;
  }

  okButton.addEventListener("click", () => settle(true));
  cancelButton.addEventListener("click", () => settle(false));
  dialog.addEventListener("cancel", () => settle(false));
  closeOnBackdrop(dialog, () => settle(false));

  return ({ title, message, ok = "Aceptar", cancel = "Cancelar", danger = false }) => {
    if (resolver) settle(false);
    document.querySelector("#confirmTitle").textContent = title;
    document.querySelector("#confirmMessage").textContent = message;
    okButton.textContent = ok;
    cancelButton.textContent = cancel;
    dialog.classList.toggle("is-danger", danger);
    dialog.showModal();
    return new Promise((resolve) => { resolver = resolve; });
  };
})();
