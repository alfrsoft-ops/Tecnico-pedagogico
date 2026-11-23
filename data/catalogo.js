// Catálogo del simulacro: áreas, libros (o normas) y capítulos.
// "areas" son las tarjetas de la portada; cada libro indica su área con "area"
// (sin "area", va a tecnico-pedagogico). "units" en un área es cómo se llaman
// sus libros en la tarjeta (["norma", "normas"]).
// Para agregar un libro: copia uno de los objetos de "books", cambia su "id",
// pon su portada en assets/portadas/ y define sus capítulos. Cada capítulo
// necesita un "id" único, que es el que se usa en los archivos de preguntas
// (línea "CAPÍTULO: <id>"). Iconos disponibles: book, scale, doc, chart, people.
// "coverLabel" escribe un texto sobre la portada (para portadas genéricas).
// "collections" son los botones bajo el catálogo de un área: con banco propio
// (su "id" se usa como CAPÍTULO) o con "mix", que toma preguntas al azar de
// esos libros en partes iguales. Con "book", el botón va bajo los capítulos de
// ese libro en lugar de bajo el catálogo del área. "count" fija la cantidad de
// preguntas de un "mix" (sin elegir otra en la configuración).
// Debe seguir siendo JSON válido entre las llaves: lo lee tools/importar_txt.py.
window.CATALOG = {
 "areas": [
  {
   "id": "normativa-general",
   "title": "Normativa General",
   "description": "Constitución Política del Estado y leyes del Estado Plurinacional.",
   "heading": "Normativa general",
   "hint": "Selecciona una norma para practicar con su banco de preguntas.",
   "icon": "scale",
   "tone": "blue",
   "units": ["norma", "normas"]
  },
  {
   "id": "normativa-especifica",
   "title": "Normativa Específica",
   "description": "Reglamentos y resoluciones del sector educativo.",
   "heading": "Normativa específica",
   "hint": "Selecciona una norma para practicar con su banco de preguntas.",
   "icon": "docCheck",
   "tone": "green",
   "units": ["norma", "normas"]
  },
  {
   "id": "tecnico-pedagogico",
   "title": "Técnico Pedagógico",
   "description": "Liderazgo, gestión educativa y estudios de referencia internacional.",
   "heading": "Catálogo de libros",
   "hint": "Selecciona un libro para ver sus capítulos y practicar.",
   "icon": "cap",
   "tone": "purple",
   "units": ["libro", "libros"]
  }
 ],
 "books": [
  {
   "id": "cpe",
   "area": "normativa-general",
   "name": "Constitución Política del Estado",
   "title": "CPE",
   "description": "Constitución Política del Estado Plurinacional de Bolivia (2009).",
   "cover": "assets/portadas/normativa-general/cpe-bolivia.webp",
   "units": ["bloque", "bloques"],
   "chapters": [
    { "id": "cpe-general", "title": "Primera Parte. Bases fundamentales del Estado; derechos, deberes y garantías (Arts. 1 al 144)", "icon": "scale" },
    { "id": "cpe-parte-2", "title": "Segunda Parte. Estructura y organización funcional del Estado (Arts. 145 al 268)", "icon": "scale" },
    { "id": "cpe-parte-3", "title": "Tercera Parte. Estructura y organización territorial del Estado (Arts. 269 al 305)", "icon": "scale" },
    { "id": "cpe-parte-4", "title": "Cuarta Parte. Estructura y organización económica del Estado (Arts. 306 al 409)", "icon": "scale" }
   ]
  },
  {
   "id": "ley-070",
   "area": "normativa-general",
   "name": "Ley N.º 070 de la Educación",
   "title": "Ley N.º 070",
   "description": "Ley de la Educación «Avelino Siñani – Elizardo Pérez» (2010).",
   "cover": "assets/portadas/normativa-general/ley-070.webp",
   "units": ["bloque", "bloques"],
   "chapters": [
    { "id": "ley-070-t1", "title": "Título I. Marco filosófico y político de la educación boliviana (Arts. 1 al 7)", "icon": "scale" },
    { "id": "ley-070-t2", "title": "Título II. Sistema Educativo Plurinacional (Arts. 8 al 68)", "icon": "scale" },
    { "id": "ley-070-t3", "title": "Título III. Organización curricular, administración y gestión del Sistema Educativo Plurinacional (Arts. 69 al 92)", "icon": "scale" }
   ]
  },
  {
   "id": "ley-045",
   "area": "normativa-general",
   "name": "Ley N.º 045 contra el Racismo",
   "title": "Ley N.º 045",
   "description": "Ley contra el Racismo y toda Forma de Discriminación (2010).",
   "cover": "assets/portadas/normativa-general/ley-045.webp",
   "units": ["bloque", "bloques"],
   "chapters": [
    { "id": "ley-045-general", "title": "Capítulos I al V. Disposiciones generales, prevención y educación, Comité Nacional, instancias de protección y delitos (Arts. 1 al 24)", "icon": "scale" }
   ]
  },
  {
   "id": "ley-348",
   "area": "normativa-general",
   "name": "Ley N.º 348 Vida Libre de Violencia",
   "title": "Ley N.º 348",
   "description": "Ley Integral para Garantizar a las Mujeres una Vida Libre de Violencia (2013).",
   "cover": "assets/portadas/normativa-general/ley-348.webp",
   "units": ["bloque", "bloques"],
   "chapters": [
    { "id": "ley-348-t2", "title": "Título II. Políticas públicas e institucionalidad (Arts. 8 al 16)", "icon": "scale" },
    { "id": "ley-348-t3", "title": "Título III. Prevención, atención y protección (Arts. 17 al 41)", "icon": "scale" },
    { "id": "ley-348-t4", "title": "Título IV. Persecución y sanción penal (Arts. 42 al 75)", "icon": "scale" },
    { "id": "ley-348-t5", "title": "Título V. Legislación penal (Arts. 76 al 100)", "icon": "scale" }
   ]
  },
  {
   "id": "ley-548",
   "area": "normativa-general",
   "name": "Ley N.º 548 Código Niña, Niño y Adolescente",
   "title": "Ley N.º 548",
   "description": "Código Niña, Niño y Adolescente (2014).",
   "cover": "assets/portadas/normativa-general/ley-548.webp",
   "units": ["bloque", "bloques"],
   "chapters": [
    { "id": "ley-548-l1", "title": "Título Preliminar y Libro I. Derechos, garantías, deberes y protección de las niñas, niños y adolescentes (Arts. 1 al 192)", "icon": "scale" },
    { "id": "ley-548-l2", "title": "Libro II. Protección jurisdiccional (Arts. 193 al 258)", "icon": "scale" },
    { "id": "ley-548-l3", "title": "Libro III. Sistema penal para adolescentes (Arts. 259 al 348)", "icon": "scale" }
   ]
  },
  {
   "id": "ley-223",
   "area": "normativa-general",
   "name": "Ley N.º 223 Personas con Discapacidad",
   "title": "Ley N.º 223",
   "description": "Ley General para Personas con Discapacidad (2012).",
   "cover": "assets/portadas/normativa-general/ley-223.webp",
   "units": ["bloque", "bloques"],
   "chapters": [
    { "id": "ley-223-general", "title": "Capítulos Primero al Cuarto. Disposiciones generales, derechos y deberes, garantías y gestión pública (Arts. 1 al 49)", "icon": "scale" }
   ]
  },
  {
   "id": "ley-1178",
   "area": "normativa-general",
   "name": "Ley N.º 1178 SAFCO",
   "title": "Ley N.º 1178",
   "description": "Ley de Administración y Control Gubernamentales (1990).",
   "cover": "assets/portadas/normativa-general/ley-1178.webp",
   "units": ["bloque", "bloques"],
   "chapters": [
    { "id": "ley-1178-general", "title": "Capítulos I al VIII. Sistemas de Administración y Control, responsabilidad por la función pública, Contraloría y jurisdicción coactiva fiscal (Arts. 1 al 55)", "icon": "scale" }
   ]
  },
  {
   "id": "ley-004",
   "area": "normativa-general",
   "name": "Ley N.º 004 Lucha contra la Corrupción",
   "title": "Ley N.º 004",
   "description": "Ley de Lucha contra la Corrupción, Enriquecimiento Ilícito e Investigación de Fortunas «Marcelo Quiroga Santa Cruz» (2010).",
   "cover": "assets/portadas/normativa-general/ley-004.webp",
   "units": ["bloque", "bloques"],
   "chapters": [
    { "id": "ley-004-general", "title": "Capítulos I al IV. Disposiciones generales, entidades de lucha contra la corrupción, delitos de corrupción y modificaciones normativas (Arts. 1 al 40)", "icon": "scale" }
   ]
  },
  {
   "id": "ds-04688",
   "area": "normativa-especifica",
   "name": "Decreto Supremo N.º 04688",
   "title": "D.S. N.º 04688",
   "description": "",
   "cover": "assets/portadas/normativa-especifica.svg",
   "coverLabel": "D.S. N.º 04688",
   "units": ["bloque", "bloques"],
   "chapters": [
    { "id": "ds-04688-general", "title": "Contenido general", "icon": "doc" }
   ]
  },
  {
   "id": "rs-212414",
   "area": "normativa-especifica",
   "name": "Resolución Suprema N.º 212414",
   "title": "R.S. N.º 212414",
   "description": "Reglamento de Faltas y Sanciones del Magisterio y Personal Docente y Administrativo.",
   "cover": "assets/portadas/normativa-especifica.svg",
   "coverLabel": "R.S. N.º 212414",
   "units": ["bloque", "bloques"],
   "chapters": [
    { "id": "rs-212414-general", "title": "Contenido general", "icon": "doc" }
   ]
  },
  {
   "id": "rm-0864-2019",
   "area": "normativa-especifica",
   "name": "Resolución Ministerial N.º 0864/2019",
   "title": "R.M. N.º 0864/2019",
   "description": "",
   "cover": "assets/portadas/normativa-especifica.svg",
   "coverLabel": "R.M. N.º 0864/2019",
   "units": ["bloque", "bloques"],
   "chapters": [
    { "id": "rm-0864-2019-general", "title": "Contenido general", "icon": "doc" }
   ]
  },
  {
   "id": "rm-0069-2025",
   "area": "normativa-especifica",
   "name": "Resolución Ministerial N.º 0069/2025",
   "title": "R.M. N.º 0069/2025",
   "description": "",
   "cover": "assets/portadas/normativa-especifica.svg",
   "coverLabel": "R.M. N.º 0069/2025",
   "units": ["bloque", "bloques"],
   "chapters": [
    { "id": "rm-0069-2025-general", "title": "Contenido general", "icon": "doc" }
   ]
  },
  {
   "id": "rm-0020-2024",
   "area": "normativa-especifica",
   "name": "Resolución Ministerial N.º 0020/2024",
   "title": "R.M. N.º 0020/2024",
   "description": "",
   "cover": "assets/portadas/normativa-especifica.svg",
   "coverLabel": "R.M. N.º 0020/2024",
   "units": ["bloque", "bloques"],
   "chapters": [
    { "id": "rm-0020-2024-general", "title": "Contenido general", "icon": "doc" }
   ]
  },
  {
   "id": "rm-0190-2024",
   "area": "normativa-especifica",
   "name": "Resolución Ministerial N.º 190/2024",
   "title": "R.M. N.º 190/2024",
   "description": "",
   "cover": "assets/portadas/normativa-especifica.svg",
   "coverLabel": "R.M. N.º 190/2024",
   "units": ["bloque", "bloques"],
   "chapters": [
    { "id": "rm-0190-2024-general", "title": "Contenido general", "icon": "doc" }
   ]
  },
  {
   "id": "rm-0800-2015",
   "area": "normativa-especifica",
   "name": "Resolución Ministerial N.º 800/2015",
   "title": "R.M. N.º 800/2015",
   "description": "",
   "cover": "assets/portadas/normativa-especifica.svg",
   "coverLabel": "R.M. N.º 800/2015",
   "units": ["bloque", "bloques"],
   "chapters": [
    { "id": "rm-0800-2015-general", "title": "Contenido general", "icon": "doc" }
   ]
  },
  {
   "id": "rm-0001",
   "area": "normativa-especifica",
   "name": "Resolución Ministerial N.º 0001",
   "title": "R.M. N.º 0001",
   "description": "Normas Generales para la Gestión Educativa y Escolar.",
   "cover": "assets/portadas/normativa-especifica.svg",
   "coverLabel": "R.M. N.º 0001",
   "units": ["bloque", "bloques"],
   "chapters": [
    { "id": "rm-0001-general", "title": "Contenido general", "icon": "doc" }
   ]
  },
  {
   "id": "ods-2030",
   "area": "tecnico-pedagogico",
   "name": "ODS 4 UNESCO 2030",
   "title": "Educación 2030",
   "description": "Declaración de Incheon y Marco de Acción para la realización del Objetivo de Desarrollo Sostenible 4.",
   "cover": "assets/portadas/ods-2030.webp",
   "chapters": [
    { "id": "ods-2030-c1", "title": "I. Visión, justificación y principios", "icon": "book" },
    { "id": "ods-2030-c2", "title": "II. Objetivos, enfoques estratégicos, metas e indicadores", "icon": "scale" },
    { "id": "ods-2030-c3", "title": "III. Modalidades de aplicación", "icon": "scale" }
   ]
  },
  {
   "id": "lidei-2022",
   "area": "tecnico-pedagogico",
   "name": "Lidei 2022 Liderazgo OEI",
   "title": "Lidei 2022",
   "description": "LIDEI 2022. Liderazgo Directivo en Iberoamérica – Organización de Estados Iberoamericanos (OEI).",
   "cover": "assets/portadas/lidei-2022.webp",
   "chapters": [
    { "id": "lidei-2022-c1", "title": "I. El modelo de liderazgo pedagógico", "icon": "people" },
    { "id": "lidei-2022-c2", "title": "II. Estudio de casos significativos", "icon": "book" },
    { "id": "lidei-2022-c3", "title": "III. Diseño, pilotaje y resultados de la encuesta", "icon": "chart" },
    { "id": "lidei-2022-c4", "title": "IV. Análisis sintético sobre liderazgo", "icon": "doc" }
   ]
  },
  {
   "id": "marco-gestion-intermedia",
   "area": "tecnico-pedagogico",
   "name": "Marco de Gestión Intermedia",
   "title": "Marco de Gestión Intermedia",
   "description": "Marco para la Gestión y el Liderazgo Educativo Local: promoviendo prácticas de liderazgo intermedio.",
   "cover": "assets/portadas/marco-gestion-intermedia.webp",
   "chapters": [
    { "id": "marco-gestion-intermedia-c2", "title": "2. Síntesis del contexto y evolución del nivel intermedio en Chile", "icon": "book" },
    { "id": "marco-gestion-intermedia-c3", "title": "3. Acerca de la gestión y del liderazgo educativo del nivel intermedio", "icon": "people" },
    { "id": "marco-gestion-intermedia-c4", "title": "4. Marco para la gestión y el liderazgo educativo local", "icon": "doc" }
   ]
  },
  {
   "id": "erce-2019",
   "area": "tecnico-pedagogico",
   "name": "Estudio Regional ERCE 2019",
   "title": "ERCE 2019",
   "description": "Estudio Regional Comparativo y Explicativo: los aprendizajes fundamentales en América Latina y el Caribe.",
   "cover": "assets/portadas/erce-2019.webp",
   "units": ["sección", "secciones"],
   "chapters": [
    { "id": "erce-2019-s2", "title": "2. Logros de aprendizaje", "icon": "chart" },
    { "id": "erce-2019-s3", "title": "3. Agenda 2030", "icon": "scale" },
    { "id": "erce-2019-s4", "title": "4. Factores asociados al logro educativo", "icon": "people" }
   ]
  }
 ],
 "collections": [
  {
   "id": "normativa-general-mixto",
   "area": "normativa-general",
   "title": "Simulacro integral de Normativa General",
   "description": "100 preguntas al azar de las 8 normas: alrededor del 12,5 % de cada una.",
   "icon": "scale",
   "mix": ["cpe", "ley-070", "ley-045", "ley-348", "ley-548", "ley-223", "ley-1178", "ley-004"],
   "mixUnits": ["norma", "normas"],
   "count": 100
  },
  {
   "id": "cpe-mixto",
   "area": "normativa-general",
   "book": "cpe",
   "title": "Simulacro integral de la CPE",
   "description": "Preguntas al azar de las 4 partes de la Constitución: 25 % de cada una.",
   "icon": "scale",
   "mix": ["cpe-general", "cpe-parte-2", "cpe-parte-3", "cpe-parte-4"],
   "mixUnits": ["parte", "partes"]
  },
  {
   "id": "ley-070-mixto",
   "area": "normativa-general",
   "book": "ley-070",
   "title": "Simulacro integral de la Ley N.º 070",
   "description": "Preguntas al azar de los 3 títulos de la Ley de la Educación: un tercio de cada uno.",
   "icon": "scale",
   "mix": ["ley-070-t1", "ley-070-t2", "ley-070-t3"],
   "mixUnits": ["título", "títulos"]
  },
  {
   "id": "ley-348-mixto",
   "area": "normativa-general",
   "book": "ley-348",
   "title": "Simulacro integral de la Ley N.º 348",
   "description": "Preguntas al azar de los 4 títulos de la Ley: 25 % de cada uno.",
   "icon": "scale",
   "mix": ["ley-348-t2", "ley-348-t3", "ley-348-t4", "ley-348-t5"],
   "mixUnits": ["título", "títulos"]
  },
  {
   "id": "ley-548-mixto",
   "area": "normativa-general",
   "book": "ley-548",
   "title": "Simulacro integral de la Ley N.º 548",
   "description": "Preguntas al azar de los 3 libros del Código: un tercio de cada uno.",
   "icon": "scale",
   "mix": ["ley-548-l1", "ley-548-l2", "ley-548-l3"],
   "mixUnits": ["libro", "libros"]
  },
  {
   "id": "integrado",
   "area": "tecnico-pedagogico",
   "title": "Banco de preguntas integradas",
   "description": "Banco propio que integra preguntas de los 4 libros.",
   "icon": "book"
  },
  {
   "id": "mixto",
   "area": "tecnico-pedagogico",
   "title": "Preguntas del banco",
   "description": "Preguntas al azar de los 4 libros: 25 % de cada uno.",
   "icon": "chart",
   "mix": ["ods-2030", "lidei-2022", "marco-gestion-intermedia", "erce-2019"]
  }
 ]
};
