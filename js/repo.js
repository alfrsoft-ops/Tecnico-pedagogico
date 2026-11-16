// Acceso a libros, capítulos y preguntas. Hoy lee data/catalogo.js y
// data/preguntas.js; para usar una base de datos o una API basta con reimplementar
// estas funciones (por ejemplo con fetch), que ya devuelven promesas.
const Repo = (() => {
  const catalog = window.CATALOG || { books: [] };
  const bank = window.QUESTION_BANK || {};

  const countQuestions = (chapterId) => (bank[chapterId] || []).length;

  function withCounts(book) {
    const chapters = book.chapters.map((chapter) => ({ ...chapter, total: countQuestions(chapter.id) }));
    return { ...book, chapters, total: chapters.reduce((sum, chapter) => sum + chapter.total, 0) };
  }

  return {
    async listBooks() {
      return catalog.books.map(withCounts);
    },
    async getBook(bookId) {
      const book = catalog.books.find((item) => item.id === bookId);
      return book ? withCounts(book) : null;
    },
    async getQuestions(chapterId) {
      return (bank[chapterId] || []).map((question) => ({ ...question, options: [...question.options] }));
    },
    // Botones bajo el catálogo. Las de "mix" suman las preguntas de sus libros.
    async listCollections() {
      return (catalog.collections || []).map((item) => {
        const books = (item.mix || []).map((id) => catalog.books.find((book) => book.id === id)).filter(Boolean);
        const total = item.mix
          ? books.reduce((sum, book) => sum + withCounts(book).total, 0)
          : countQuestions(item.id);
        return { ...item, total };
      });
    },
    // Preguntas de cada libro de una colección "mix" (una lista por libro),
    // marcadas con su procedencia para mostrarla durante el simulacro.
    async getMixPools(bookIds) {
      return bookIds.map((id) => {
        const book = catalog.books.find((item) => item.id === id);
        if (!book) return [];
        return book.chapters.flatMap((chapter) => (bank[chapter.id] || []).map((question) => ({
          ...question,
          options: [...question.options],
          source: `${book.name} · ${chapter.title}`,
        })));
      });
    },
  };
})();
