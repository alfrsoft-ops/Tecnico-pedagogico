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
  };
})();
