// Catálogo de libros y capítulos del simulacro.
// Para agregar un libro: copia uno de los objetos de "books", cambia su "id",
// pon su portada en assets/portadas/ y define sus capítulos. Cada capítulo
// necesita un "id" único, que es el que se usa en los archivos de preguntas
// (línea "CAPÍTULO: <id>"). Iconos disponibles: book, scale, doc, chart, people.
// Debe seguir siendo JSON válido entre las llaves: lo lee tools/importar_txt.py.
window.CATALOG = {
 "books": [
  {
   "id": "ods-2030",
   "name": "ODS 4 UNESCO 2030",
   "title": "Educación 2030",
   "description": "Declaración de Incheon y Marco de Acción para la realización del Objetivo de Desarrollo Sostenible 4.",
   "cover": "assets/portadas/ods-2030.png",
   "chapters": [
    { "id": "ods-2030-c1", "title": "I. Visión, justificación y principios", "icon": "book" },
    { "id": "ods-2030-c2", "title": "II. Objetivos, enfoques estratégicos, metas e indicadores", "icon": "scale" },
    { "id": "ods-2030-c3", "title": "III. Modalidades de aplicación", "icon": "scale" }
   ]
  },
  {
   "id": "lidei-2022",
   "name": "Lidei 2022 Liderazgo OEI",
   "title": "Lidei 2022",
   "description": "LIDEI 2022. Liderazgo Directivo en Iberoamérica – Organización de Estados Iberoamericanos (OEI).",
   "cover": "assets/portadas/lidei-2022.png",
   "chapters": [
    { "id": "lidei-2022-c1", "title": "I. El modelo de liderazgo pedagógico", "icon": "people" },
    { "id": "lidei-2022-c2", "title": "II. Estudio de casos significativos", "icon": "book" },
    { "id": "lidei-2022-c3", "title": "III. Diseño, pilotaje y resultados de la encuesta", "icon": "chart" },
    { "id": "lidei-2022-c4", "title": "IV. Análisis sintético sobre liderazgo", "icon": "doc" }
   ]
  },
  {
   "id": "marco-gestion-intermedia",
   "name": "Marco de Gestión Intermedia",
   "title": "Marco de Gestión Intermedia",
   "description": "Marco para la Gestión y el Liderazgo Educativo Local: promoviendo prácticas de liderazgo intermedio.",
   "cover": "assets/portadas/marco-gestion-intermedia.png",
   "chapters": [
    { "id": "marco-gestion-intermedia-c2", "title": "2. Síntesis del contexto y evolución del nivel intermedio en Chile", "icon": "book" },
    { "id": "marco-gestion-intermedia-c3", "title": "3. Acerca de la gestión y del liderazgo educativo del nivel intermedio", "icon": "people" },
    { "id": "marco-gestion-intermedia-c4", "title": "4. Marco para la gestión y el liderazgo educativo local", "icon": "doc" }
   ]
  },
  {
   "id": "erce-2019",
   "name": "Estudio Regional ERCE 2019",
   "title": "ERCE 2019",
   "description": "Estudio Regional Comparativo y Explicativo: los aprendizajes fundamentales en América Latina y el Caribe.",
   "cover": "assets/portadas/erce-2019.png",
   "units": ["sección", "secciones"],
   "chapters": [
    { "id": "erce-2019-s2", "title": "2. Logros de aprendizaje", "icon": "chart" },
    { "id": "erce-2019-s3", "title": "3. Agenda 2030", "icon": "scale" },
    { "id": "erce-2019-s4", "title": "4. Factores asociados al logro educativo", "icon": "people" }
   ]
  }
 ]
};
