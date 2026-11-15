// Lógica del simulacro sin dependencias de la interfaz: armado de la sesión,
// límite de tiempo, calificación y nivel de dominio.
const Engine = (() => {
  const SECONDS_PER_QUESTION = 90;

  // Escala orientativa de dominio (puntaje sobre 100).
  const LEVELS = [
    { min: 90, name: "Dominio sobresaliente", tone: "excellent" },
    { min: 80, name: "Dominio alto", tone: "high" },
    { min: 70, name: "Dominio satisfactorio", tone: "good" },
    { min: 60, name: "Dominio básico", tone: "basic" },
    { min: 0, name: "Requiere reforzamiento", tone: "low" },
  ];

  function shuffle(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function normalize(text) {
    return String(text).normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/\s+/g, " ").trim().toLowerCase();
  }

  // Descarta preguntas repetidas por id o por enunciado.
  function uniqueQuestions(questions) {
    const seen = new Set();
    return questions.filter((question) => {
      const keys = [`id:${question.id}`, `q:${normalize(question.q)}`];
      if (keys.some((key) => seen.has(key))) return false;
      keys.forEach((key) => seen.add(key));
      return true;
    });
  }

  // "auto" = 1,5 min por pregunta, "none" = sin límite, número = minutos.
  function timeLimit(time, count) {
    if (time === "none") return null;
    if (time === "auto") return count * SECONDS_PER_QUESTION;
    const minutes = Number(time);
    return minutes > 0 ? Math.round(minutes * 60) : null;
  }

  // Ajusta las letras citadas en la retroalimentación ("La alternativa B…",
  // "… porque A: …. C: ….") al nuevo orden de las alternativas.
  // order[nueva posición] = posición original.
  function relabel(text, order) {
    if (!text || order.every((original, i) => original === i)) return text;
    const letters = "ABCD";
    const map = (letter) => letters[order.indexOf(letters.indexOf(letter))] || letter;
    const out = text
      .replace(/\b(alternativas?\s+)([A-D])\b/g, (_, prefix, letter) => prefix + map(letter))
      .replace(/(^|\s)([A-D]):(?=\s)/g, (_, space, letter) => space + map(letter) + ":");
    // Reordena alfabéticamente la lista final "X: motivo. Y: motivo."
    const start = out.search(/(^|\s)[A-D]: /);
    if (start < 0) return out;
    const items = out.slice(start).trim().split(/\s(?=[A-D]: )/);
    if (!items.every((item) => /^[A-D]: /.test(item))) return out;
    return out.slice(0, start) + (start ? " " : "") + items.sort().join(" ");
  }

  // config: { mode, count, time, shuffleQuestions, shuffleOptions }
  // context: { bookId, bookTitle, chapterId, chapterTitle }
  function createSession(config, context, bank) {
    const pool = uniqueQuestions(bank);
    const source = config.shuffleQuestions ? shuffle(pool) : pool;
    const questions = source.slice(0, Math.max(1, config.count)).map((question) => {
      const natural = question.options.map((_, i) => i);
      const order = config.shuffleOptions ? shuffle(natural) : natural;
      return {
        id: question.id,
        text: question.q,
        options: order.map((i) => question.options[i]),
        answer: order.indexOf(question.answer),
        explanation: relabel(question.explanation || "", order),
        legal: question.legal || "",
      };
    });

    return {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      config: { ...config },
      ...context,
      questions,
      answers: Array(questions.length).fill(null),
      index: 0,
      elapsed: 0,
      limit: timeLimit(config.time, questions.length),
      startedOn: new Date().toISOString(),
      finished: false,
      timedOut: false,
    };
  }

  function statusOf(session, index) {
    const chosen = session.answers[index];
    if (chosen === null) return "blank";
    return chosen === session.questions[index].answer ? "correct" : "wrong";
  }

  function levelFor(score) {
    return LEVELS.find((level) => score >= level.min);
  }

  function grade(session) {
    const total = session.questions.length;
    let correct = 0;
    let blank = 0;
    session.questions.forEach((_, i) => {
      const status = statusOf(session, i);
      if (status === "correct") correct++;
      if (status === "blank") blank++;
    });
    // Aritmética entera: se trunca para no subir de nivel por redondeo.
    const score = total ? Math.floor((correct * 100) / total) : 0;
    return {
      total,
      correct,
      wrong: total - correct - blank,
      blank,
      answered: total - blank,
      score,
      percent: score,
      level: levelFor(score),
    };
  }

  return { SECONDS_PER_QUESTION, LEVELS, shuffle, normalize, uniqueQuestions, relabel, timeLimit, createSession, statusOf, levelFor, grade };
})();

if (typeof module !== "undefined") module.exports = Engine;
