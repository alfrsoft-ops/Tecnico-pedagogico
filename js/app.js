// Navegación entre etapas: catálogo de libros, capítulos, progreso y
// configuración del simulacro. Las rutas viven en el hash para que el botón
// «atrás» del navegador y de Android funcione: #/, #/libro/<id>, #/progreso, #/simulacro.
(() => {
  const $ = (selector) => document.querySelector(selector);
  const setupDialog = $("#setupDialog");
  const setupForm = $("#setupForm");
  const setupQuestions = $("#setupQuestions");
  const setupTime = $("#setupTime");
  const setupMinutes = $("#setupMinutes");
  const setupBlock = $("#setupBlock");
  const customTimeField = $("#customTimeField");

  let renderToken = 0;
  let pending = null; // capítulo elegido mientras el diálogo de configuración está abierto

  function bestScores() {
    const best = {};
    Store.listResults().forEach((result) => {
      best[result.chapterId] = Math.max(best[result.chapterId] ?? 0, result.score);
    });
    return best;
  }

  // ---- ETAPA 1. Catálogo ----

  async function renderHome() {
    const token = ++renderToken;
    Shell.setHeader({ title: "Simulacro de Examen" });
    Shell.show("home");
    renderResume();
    const [books, collections] = await Promise.all([Repo.listBooks(), Repo.listCollections()]);
    if (token !== renderToken) return;
    $("#bookGrid").replaceChildren(...books.map(bookCard));
    const best = bestScores();
    $("#collectionList").replaceChildren(...collections.map((item, i) => collectionButton(item, i, best[item.id])));
  }

  // Botones bajo el catálogo: abren la configuración como un capítulo más.
  const COLLECTION_BOOK = { id: "", name: "Los 4 libros" };

  function collectionButton(collection, index, best) {
    const tone = CHAPTER_TONES[(index + 4) % CHAPTER_TONES.length];
    const button = el("button", "collection-button");
    button.type = "button";
    button.dataset.tone = tone;
    const badge = el("span", "chapter-icon");
    badge.innerHTML = icon(collection.icon);
    const detail = collection.mix
      ? `${collection.description} ${plural(collection.total, "pregunta disponible", "preguntas disponibles")}.`
      : `${collection.description} ${plural(collection.total, "pregunta", "preguntas")}.`;
    const text = el("span", "collection-text");
    text.append(el("strong", "", collection.title),
      el("small", "", best === undefined ? detail : `${detail} Mejor puntaje: ${best}/100.`));
    const go = el("span", "collection-go");
    go.innerHTML = ICONS.play;
    button.append(badge, text, go);
    if (collection.total) button.addEventListener("click", () => openSetup(COLLECTION_BOOK, collection, tone));
    else button.disabled = true;
    return button;
  }

  function bookCard(book) {
    const card = el("a", "book-card");
    card.href = `#/libro/${encodeURIComponent(book.id)}`;
    const cover = el("span", "book-cover");
    const image = el("img");
    image.src = book.cover;
    image.alt = `Portada de ${book.name}`;
    image.loading = "lazy";
    cover.append(image);
    card.append(
      cover,
      el("span", "book-name", book.name),
      el("span", "book-meta", bookMeta(book))
    );
    return card;
  }

  // "units" (opcional en el catálogo): ["sección", "secciones"]; por defecto, capítulos.
  function bookMeta(book) {
    const [one, many] = book.units || ["capítulo", "capítulos"];
    return `${plural(book.chapters.length, one, many)} · ${plural(book.total, "pregunta", "preguntas")}`;
  }

  function renderResume() {
    const saved = Store.loadSession();
    const card = $("#resumeCard");
    card.hidden = !saved || saved.finished;
    if (card.hidden) return;
    const answered = saved.answers.filter((answer) => answer !== null).length;
    const mode = saved.config.mode === "practica" ? "Modo práctica" : "Modo examen";
    $("#resumeDetail").textContent =
      `${saved.bookTitle} · ${saved.chapterTitle}${saved.config.block ? ` (${Engine.blockLabel(saved.config.block)})` : ""} · ${answered} de ${saved.questions.length} respondidas · ${mode}`;
  }

  $("#resumeContinue").addEventListener("click", () => {
    if (!Quiz.resume()) {
      toast("No se encontró el simulacro guardado.");
      renderResume();
    }
  });

  $("#resumeDiscard").addEventListener("click", async () => {
    const ok = await confirmDialog({
      title: "¿Descartar el simulacro?",
      message: "Se perderán las respuestas del simulacro en curso.",
      ok: "Descartar",
      danger: true,
    });
    if (!ok) return;
    Store.clearSession();
    renderResume();
  });

  // ---- ETAPA 2. Capítulos ----

  async function renderBook(bookId) {
    const token = ++renderToken;
    const book = await Repo.getBook(bookId);
    if (token !== renderToken) return;
    if (!book) {
      toast("El libro solicitado no existe.");
      location.replace("#/");
      return;
    }
    Shell.setHeader({ title: book.title, onBack: () => { location.hash = "#/"; } });
    $("#bookCover").src = book.cover;
    $("#bookCover").alt = `Portada de ${book.name}`;
    $("#bookTitle").textContent = book.name;
    $("#bookDescription").textContent = book.description || "";
    $("#bookMeta").textContent =
      bookMeta(book);
    const best = bestScores();
    $("#chapterList").replaceChildren(...book.chapters.map((chapter, i) => chapterCard(book, chapter, i, best[chapter.id])));
    Shell.show("book");
  }

  function chapterCard(book, chapter, index, best) {
    const tone = CHAPTER_TONES[index % CHAPTER_TONES.length];
    const card = el("article", "chapter-card");
    card.dataset.tone = tone;

    const head = el("div", "chapter-head");
    const badge = el("span", "chapter-icon");
    badge.innerHTML = icon(chapter.icon);
    const info = el("div", "chapter-info");
    const meta = el("p", "chapter-meta");
    const count = el("span", "", plural(chapter.total, "pregunta", "preguntas"));
    count.insertAdjacentHTML("afterbegin", ICONS.questions);
    meta.append(count);
    if (best !== undefined) {
      const record = el("span", "", `Mejor puntaje: ${best}/100`);
      record.insertAdjacentHTML("afterbegin", ICONS.trophy);
      meta.append(record);
    }
    info.append(el("h3", "", chapter.title), meta);
    head.append(badge, info);

    const start = el("button", "chapter-start");
    start.type = "button";
    if (chapter.total) {
      start.innerHTML = ICONS.play;
      start.append(el("span", "", "Empezar simulacro"));
      start.addEventListener("click", () => openSetup(book, chapter, tone));
    } else {
      start.disabled = true;
      start.textContent = "Banco de preguntas pendiente";
    }
    card.append(head, start);
    return card;
  }

  // ---- ETAPA 3. Configuración ----

  async function openSetup(book, chapter, tone) {
    const saved = Store.loadSession();
    if (saved && !saved.finished) {
      const ok = await confirmDialog({
        title: "Tienes un simulacro en curso",
        message: `${saved.chapterTitle} (${saved.bookTitle}). Si empiezas uno nuevo, se descartará el que está en curso.`,
        ok: "Empezar uno nuevo",
        cancel: "Cancelar",
      });
      if (!ok) return;
    }

    pending = { book, chapter };
    setupForm.reset();
    $("#setupChapter").textContent = chapter.title;
    $("#setupCount").textContent = chapter.mix
      ? `Al azar de ${plural(chapter.mix.length, "libro", "libros")}, en partes iguales · ${plural(chapter.total, "pregunta disponible", "preguntas disponibles")}`
      : `${plural(chapter.total, "pregunta disponible", "preguntas disponibles")} · ${book.name}`;
    $("#blockField").hidden = Boolean(chapter.mix); // los bloques no aplican a preguntas mezcladas
    $("#setupIcon").innerHTML = icon(chapter.icon);
    $("#setupIcon").dataset.tone = tone;

    setupBlock.replaceChildren(
      new Option("Todo el banco", "", true, true),
      ...(chapter.total > Engine.BLOCK_SIZE
        ? Engine.blocks(chapter.total).map((block) => new Option(`Preguntas ${block.start} a ${block.end}`, block.value))
        : [])
    );
    syncBlockFields();
    syncRetryField();
    setupDialog.showModal();
  }

  function syncTimeFields() {
    const custom = setupTime.value === "custom";
    customTimeField.hidden = !custom;
    setupMinutes.disabled = !custom; // un campo oculto no debe bloquear el envío
    const count = Number(setupQuestions.value) || 0;
    const seconds = custom ? Number(setupMinutes.value) * 60 : Engine.timeLimit(setupTime.value, count);
    $("#setupHint").textContent = seconds
      ? `Tiempo total: ${formatTime(seconds)} para ${plural(count, "pregunta", "preguntas")}.`
      : "Sin límite de tiempo: el reloj mostrará el tiempo transcurrido.";
  }

  // Con un bloque, la cantidad se limita al bloque; el orden aleatorio, si se
  // marca, mezcla solo las preguntas del bloque.
  function syncBlockFields() {
    const { chapter } = pending;
    if (chapter.mix) {
      // Múltiplos de la cantidad de libros, para que cada uno aporte lo mismo.
      const sizes = [20, 40, 60, 80, 100].filter((size) => size <= chapter.total);
      setupQuestions.replaceChildren(...sizes.map((size, i) => new Option(`${size} preguntas`, size, i === 0, i === 0)));
      $("#shuffleQuestionsNote").hidden = true;
      syncTimeFields();
      return;
    }
    const block = Engine.parseBlock(setupBlock.value);
    const total = block ? block.end - block.start + 1 : chapter.total;
    const sizes = [10, 20, 50].filter((size) => size < total);
    setupQuestions.replaceChildren(...sizes.map((size) => new Option(`${size} preguntas`, size)));
    setupQuestions.add(new Option(`Todas (${total})`, total, true, true));

    $("#shuffleQuestionsNote").hidden = !block;
    syncTimeFields();
  }

  // Repetir las falladas solo tiene sentido en práctica: en examen no se
  // revela si la respuesta es correcta hasta el final.
  function syncRetryField() {
    const exam = setupForm.elements.mode.value === "examen";
    const checkbox = $("#setupRetryWrong");
    checkbox.disabled = exam;
    if (exam) checkbox.checked = false;
    $("#retryWrongField").classList.toggle("is-disabled", exam);
    $("#retryWrongNote").textContent = exam
      ? "Disponible solo en modo práctica."
      : "El simulacro finaliza cuando todas estén correctas. Los repasos no suman puntaje.";
  }

  [setupTime, setupQuestions, setupMinutes].forEach((field) => field.addEventListener("input", syncTimeFields));
  setupBlock.addEventListener("input", syncBlockFields);
  setupForm.querySelectorAll('input[name="mode"]').forEach((radio) => radio.addEventListener("change", syncRetryField));
  setupDialog.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => setupDialog.close()));
  closeOnBackdrop(setupDialog);

  setupForm.addEventListener("submit", (event) => {
    const data = new FormData(setupForm);
    const time = data.get("time") === "custom" ? String(Math.round(Number(data.get("minutes")))) : data.get("time");
    if (data.get("time") === "custom" && !(Number(time) >= 1 && Number(time) <= 600)) {
      event.preventDefault();
      setupMinutes.reportValidity();
      return;
    }
    const { book, chapter } = pending;
    Store.clearSession();
    Quiz.launch(
      { bookId: book.id, bookTitle: book.name, chapterId: chapter.id, chapterTitle: chapter.title, mix: chapter.mix },
      {
        mode: data.get("mode"),
        count: Number(data.get("count")),
        time,
        shuffleQuestions: data.has("shuffleQuestions"),
        shuffleOptions: data.has("shuffleOptions"),
        retryWrong: data.get("mode") === "practica" && data.has("retryWrong"),
        block: (!chapter.mix && data.get("block")) || null,
      }
    );
  });

  // ---- Progreso ----

  function renderHistory() {
    renderToken++;
    Shell.setHeader({ title: "Simulacro de Examen", onBack: () => { location.hash = "#/"; } });
    const results = Store.listResults();
    const empty = results.length === 0;
    $("#historyEmpty").hidden = !empty;
    $("#historyStats").hidden = empty;
    $("#clearHistory").hidden = empty;

    const average = empty ? 0 : Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);
    const best = empty ? 0 : Math.max(...results.map((r) => r.score));
    const answered = results.reduce((sum, r) => sum + r.total - r.blank, 0);
    $("#historyStats").replaceChildren(...[
      ["Simulacros realizados", results.length],
      ["Puntaje promedio", `${average}/100`],
      ["Mejor puntaje", `${best}/100`],
      ["Preguntas respondidas", answered],
    ].map(([label, value]) => {
      const stat = el("div", "stat");
      stat.append(el("dt", "", label), el("dd", "", String(value)));
      return stat;
    }));

    $("#historyList").replaceChildren(...results.map((result) => {
      const item = el("li", "history-item");
      const score = el("span", "history-score", String(result.score));
      score.dataset.tone = result.tone;
      const info = el("div", "history-info");
      const mode = result.mode === "practica" ? "Práctica" : "Examen";
      info.append(
        el("strong", "", result.chapterTitle),
        el("span", "", `${result.bookTitle} · ${mode} · ${formatDate(result.date)}`)
      );
      const detail = el("div", "history-detail");
      detail.append(
        el("span", "history-level", result.level),
        el("span", "", `${result.correct}/${result.total} correctas · ${formatTime(result.elapsed)}${result.timedOut ? " · tiempo agotado" : ""}`)
      );
      detail.firstChild.dataset.tone = result.tone;
      item.append(score, info, detail);
      return item;
    }));
    Shell.show("history");
  }

  $("#clearHistory").addEventListener("click", async () => {
    const ok = await confirmDialog({
      title: "¿Borrar el historial?",
      message: "Se eliminarán todos los resultados guardados en este dispositivo.",
      ok: "Borrar",
      danger: true,
    });
    if (!ok) return;
    Store.clearResults();
    renderHistory();
  });

  // ---- Rutas ----

  function route() {
    const hash = location.hash || "#/";
    if (Quiz.isActive()) {
      if (hash !== "#/simulacro") Quiz.requestExit(hash);
      return;
    }
    if (hash === "#/simulacro") {
      if (!Quiz.resume()) location.replace("#/");
      return;
    }
    if (hash === "#/progreso") return renderHistory();
    const match = hash.match(/^#\/libro\/(.+)$/);
    if (match) return renderBook(decodeURIComponent(match[1]));
    renderHome();
  }

  window.addEventListener("hashchange", route);
  route();
})();
