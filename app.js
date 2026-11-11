const scenarios = [
  {
    title: "Oleada de contraseñas fallidas",
    type: "Tradicional",
    description: "El sistema de identidad registra 27 intentos fallidos contra una cuenta de tesorería desde una dirección IP desconocida. La política de bloqueo y MFA impide el acceso. No hay inicios de sesión exitosos ni actividad posterior.",
    detail: "La señal es real y merece análisis, pero el control bloqueó el intento y no hay evidencia de compromiso.",
    answer: "evento",
    explanation: "Se observó un intento de acceso, pero fue bloqueado. Con la evidencia disponible no hubo acceso no autorizado ni impacto confirmado.",
    principle: "Pista clave: intento detectado ≠ acceso conseguido. Registra la señal y verifica que no haya sesiones o actividad relacionadas."
  },
  {
    title: "Adjunto sospechoso puesto en cuarentena",
    type: "Tradicional",
    description: "La pasarela de correo detiene un archivo adjunto malicioso antes de que llegue al buzón. El registro confirma que ningún usuario lo descargó y los equipos no muestran ejecución ni cambios.",
    detail: "El control preventivo funcionó; no se detecta afectación de cuentas, equipos o información.",
    answer: "evento",
    explanation: "Es un intento de ataque observado y bloqueado sin compromiso demostrado. Conserva la alerta y valida que no haya copias por otros canales.",
    principle: "Pista clave: una detección contenida puede ser un evento de seguridad; sigue el umbral definido por tu organización."
  },
  {
    title: "Inicio de sesión inusual con contexto legítimo",
    type: "Tradicional",
    description: "Una analista se conecta desde una ciudad distinta a su patrón habitual. Seguridad valida por un canal conocido que está viajando; el dispositivo está administrado, MFA se completó y los registros no muestran acciones atípicas.",
    detail: "La ubicación era inusual, pero se corroboró con contexto independiente y evidencia técnica coherente.",
    answer: "evento",
    explanation: "La anomalía inicial no se confirmó como acceso indebido. La correlación con la persona, el dispositivo y el registro de actividad permitió cerrar la alerta como legítima.",
    principle: "Pista clave: la rareza orienta el triage; la evidencia y el contexto permiten calificarla."
  },
  {
    title: "Regla de reenvío creada sin autorización",
    type: "Tradicional",
    description: "La auditoría de correo muestra que una cuenta de cuentas por pagar creó una regla para reenviar mensajes de proveedores a una dirección externa desconocida. La titular niega haberla configurado.",
    detail: "La regla oculta o copia comunicaciones fuera de la organización y viola el uso autorizado de la cuenta.",
    answer: "incidente",
    explanation: "Hay una acción no autorizada que amenaza la confidencialidad y puede indicar compromiso de la cuenta. Requiere respuesta, análisis del buzón y contención según el procedimiento.",
    principle: "Pista clave: una configuración maliciosa confirmada compromete o amenaza información aunque aún no se pruebe una filtración."
  },
  {
    title: "Cambio de cuenta de proveedor detenido en verificación",
    type: "Tradicional",
    description: "Llega un correo urgente solicitando cambiar la cuenta bancaria del proveedor. Finanzas detecta que el dominio es parecido, llama al número registrado previamente y confirma que la solicitud es falsa. No modifica el ERP ni inicia pagos.",
    detail: "La suplantación fue detectada antes de que alguien actuara o entregara información.",
    answer: "evento",
    explanation: "Se trata de un intento de fraude observado y reportado, sin modificación ni divulgación confirmada. La alerta debe registrarse y puede alimentar las reglas de detección.",
    principle: "Pista clave: distinguir el intento frustrado del compromiso de una cuenta, un cambio indebido o una pérdida."
  },
  {
    title: "Ransomware ejecutado en una estación",
    type: "Tradicional",
    description: "Una herramienta de seguridad detecta cifrado de archivos en una estación. El proceso ya modificó documentos locales antes de ser aislado; no hay evidencia de que otros equipos estén afectados.",
    detail: "La contención redujo el alcance, pero la ejecución y alteración de archivos ya ocurrieron.",
    answer: "incidente",
    explanation: "La integridad y disponibilidad de información se vieron afectadas por una acción no autorizada. Que el caso esté limitado a un equipo no lo convierte en una simple alerta.",
    principle: "Pista clave: impacto real basta para activar la gestión de incidentes; el alcance se determina por separado."
  },
  {
    title: "Salida de datos desde una cuenta de servicio",
    type: "Tradicional",
    description: "Los registros cloud muestran que una cuenta de servicio exportó miles de registros de socios a un destino externo nunca autorizado. El propietario técnico confirma que no había una tarea programada.",
    detail: "Hay evidencia de extracción de información fuera del entorno aprobado.",
    answer: "incidente",
    explanation: "La confidencialidad de los datos está comprometida o bajo amenaza inminente. Debe escalarse para determinar qué información salió, desde cuándo y qué sistemas participaron.",
    principle: "Pista clave: correlaciona identidad, volumen, destino, permisos y finalidad del proceso."
  },
  {
    title: "La voz del gerente en una llamada urgente",
    type: "IA y deepfake",
    description: "Una colaboradora recibe una llamada con una voz clonada que parece la del gerente general y solicita una transferencia inmediata. Ella sospecha, corta la llamada y verifica la petición en un número corporativo ya registrado. No comparte datos ni ejecuta pagos.",
    detail: "El audio sintético es parte de un intento de ingeniería social; la colaboradora no siguió la instrucción.",
    answer: "evento",
    explanation: "El intento de fraude debe documentarse y analizarse, pero el escenario no muestra acceso, divulgación, alteración o pago no autorizado.",
    principle: "Pista clave: un deepfake puede ser una señal de ataque; el incidente depende de la afectación o amenaza confirmada y del criterio interno."
  },
  {
    title: "Deepfake convence a compartir un archivo confidencial",
    type: "IA y deepfake",
    description: "En una videollamada, una persona que aparenta ser la directora pide revisar una hoja con datos de clientes. Un empleado comparte el archivo por un enlace público. Después se confirma que la imagen y la voz eran sintéticas y el enlace permitió acceso externo.",
    detail: "El contenido se divulgó a terceros por una instrucción de suplantación.",
    answer: "incidente",
    explanation: "La confidencialidad quedó comprometida: el archivo fue accesible fuera de la organización. El uso de deepfake explica el engaño, pero la clasificación se basa en la divulgación y su impacto.",
    principle: "Pista clave: no clasifiques por lo convincente del video; confirma qué información quedó expuesta y a quién."
  },
  {
    title: "Phishing generado con IA obtiene una contraseña",
    type: "IA generativa",
    description: "Una persona introduce su contraseña corporativa en una página falsa redactada sin errores por una herramienta de IA. El atacante intenta usarla, pero MFA bloquea el acceso; la contraseña se cambia de inmediato y los registros confirman que no hubo sesión válida.",
    detail: "La credencial fue entregada fuera del canal legítimo, aunque el segundo factor impidió la sesión.",
    answer: "incidente",
    explanation: "La divulgación no autorizada de la credencial crea una amenaza inmediata para la cuenta y exige respuesta: cambio, revocación de sesiones o tokens y revisión de actividad.",
    principle: "Pista clave: un control que detiene el inicio de sesión reduce el impacto; no borra la exposición confirmada de la credencial."
  },
  {
    title: "Inyección de prompt bloqueada por el asistente",
    type: "IA generativa",
    description: "Un documento incluye instrucciones para que un asistente interno ignore sus reglas y revele información. El filtro identifica la instrucción, detiene el flujo y las pruebas confirman que no se consultaron ni mostraron datos restringidos.",
    detail: "La prueba se registra; no hubo salida de información ni acción no autorizada del asistente.",
    answer: "evento",
    explanation: "Es un intento de manipulación detectado. Según la política de la organización puede requerir investigación, pero el escenario no confirma impacto o violación consumada.",
    principle: "Pista clave: revisa entradas, herramientas invocadas y respuestas efectivamente entregadas, no solo el texto del prompt."
  },
  {
    title: "Prompt injection hace que el asistente revele datos",
    type: "IA generativa",
    description: "Un archivo cargado por un usuario contiene instrucciones ocultas. El asistente las sigue y responde en un canal compartido con datos personales de otros socios, que el solicitante no estaba autorizado a consultar.",
    detail: "Los registros muestran que el modelo accedió a una fuente restringida y entregó el resultado al usuario.",
    answer: "incidente",
    explanation: "Hay divulgación no autorizada de información. El comportamiento del modelo y la cadena de herramientas deben investigarse como parte del incidente.",
    principle: "Pista clave: el impacto se demuestra con la fuente consultada, permisos, prompt, respuesta y audiencia que la recibió."
  },
  {
    title: "Agente de IA cambia permisos de almacenamiento",
    type: "IA y agentes",
    description: "Un agente automatizado usa una API para marcar como públicos varios archivos internos por una configuración incorrecta. Los registros prueban que documentos de clientes quedaron accesibles desde Internet durante 18 minutos, antes de revertir el permiso.",
    detail: "La exposición temporal ocurrió aunque ya se haya corregido el ajuste.",
    answer: "incidente",
    explanation: "La disponibilidad pública no autorizada afectó la confidencialidad. La respuesta debe evaluar accesos, datos expuestos, credenciales del agente y controles de aprobación.",
    principle: "Pista clave: automatización o error no eliminan el incidente si hubo impacto real."
  },
  {
    title: "Factura falsa creada con IA detectada antes del pago",
    type: "IA generativa",
    description: "Cuentas por pagar recibe una factura visualmente convincente que imita a un proveedor. La comparación con la orden de compra revela una cuenta bancaria distinta; el área confirma el dato por un contacto conocido y rechaza el documento. No se registra cambio ni transferencia.",
    detail: "El intento de fraude fue identificado y detenido en el proceso de validación.",
    answer: "evento",
    explanation: "La factura es una señal relevante y debe reportarse, pero no hay evidencia de alteración de registros, divulgación o transferencia no autorizada.",
    principle: "Pista clave: verifica el proceso financiero y los cambios realizados, no solo la apariencia del documento generado."
  }
];

const scenarioPanel = document.querySelector("#scenario-panel");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const restartButton = document.querySelector("#restart-button");
const scoreCount = document.querySelector("#score-count");
const totalCount = document.querySelector("#total-count");
const progressLabel = document.querySelector("#progress-label");
const progressPercent = document.querySelector("#progress-percent");
const progressFill = document.querySelector("#progress-fill");
const progressTrack = document.querySelector(".progress-track");
let current = 0;
let score = 0;
let answers = [];

totalCount.textContent = scenarios.length;

function renderScenario() {
  const scenario = scenarios[current];
  const completed = answers.length;
  const percent = Math.round((completed / scenarios.length) * 100);
  progressLabel.textContent = completed === scenarios.length ? "RETO COMPLETADO" : `ESCENARIO ${String(current + 1).padStart(2, "0")} DE ${scenarios.length}`;
  progressPercent.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
  progressTrack.setAttribute("aria-valuenow", String(completed));
  scoreCount.textContent = score;
  feedback.hidden = true;
  feedback.className = "feedback";
  nextButton.disabled = true;
  nextButton.innerHTML = 'Siguiente escenario <span aria-hidden="true">→</span>';

  scenarioPanel.innerHTML = `
    <div class="scenario-meta">
      <span class="scenario-number">CASO ${String(current + 1).padStart(2, "0")}</span>
      <span class="scenario-tag ${scenario.type.startsWith("Tradicional") ? "trad" : "ai"}">${scenario.type}</span>
    </div>
    <h3>${scenario.title}</h3>
    <p class="scenario-copy">${scenario.description}</p>
    <div class="case-detail"><b>Contexto:</b> ${scenario.detail}</div>
    <p class="choice-label">¿CÓMO LO CLASIFICAS?</p>
    <div class="choice-grid" role="group" aria-label="Elige una clasificación">
      <button class="choice-button" type="button" data-answer="evento"><span class="choice-glyph" aria-hidden="true">◌</span>Es un evento</button>
      <button class="choice-button" type="button" data-answer="incidente"><span class="choice-glyph" aria-hidden="true">!</span>Es un incidente</button>
    </div>`;

  scenarioPanel.querySelectorAll(".choice-button").forEach(button => {
    button.addEventListener("click", () => submitAnswer(button.dataset.answer));
  });
}

function submitAnswer(choice) {
  if (answers[current]) return;
  const scenario = scenarios[current];
  const isCorrect = choice === scenario.answer;
  answers[current] = { choice, correct: isCorrect };
  if (isCorrect) score++;
  scoreCount.textContent = score;

  scenarioPanel.querySelectorAll(".choice-button").forEach(button => {
    button.disabled = true;
    if (button.dataset.answer === scenario.answer) button.classList.add("correct-choice");
    else if (button.dataset.answer === choice && !isCorrect) button.classList.add("wrong-choice");
  });

  feedback.hidden = false;
  feedback.classList.add(isCorrect ? "correct" : "incorrect");
  feedback.innerHTML = `
    <div class="feedback-head"><span aria-hidden="true">${isCorrect ? "✓" : "↻"}</span>${isCorrect ? "¡Correcto!" : `La clasificación adecuada es ${scenario.answer === "evento" ? "evento" : "incidente"}.`}</div>
    <p>${scenario.explanation}</p>
    <p class="principle"><b>Para recordar:</b> ${scenario.principle}</p>`;

  nextButton.disabled = false;
  nextButton.innerHTML = current === scenarios.length - 1
    ? 'Ver resultado <span aria-hidden="true">→</span>'
    : 'Siguiente escenario <span aria-hidden="true">→</span>';
  feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderResults() {
  const percent = Math.round((answers.filter(a => a?.correct).length / scenarios.length) * 100);
  progressLabel.textContent = "RETO COMPLETADO";
  progressPercent.textContent = "100%";
  progressFill.style.width = "100%";
  progressTrack.setAttribute("aria-valuenow", String(scenarios.length));
  const missed = answers.filter(a => a && !a.correct).length;
  const headline = percent === 100 ? "¡Criterio impecable!" : percent >= 70 ? "Buena lectura de las señales." : "El contexto cambia la clasificación.";
  scenarioPanel.innerHTML = `
    <div class="result-panel">
      <div class="result-emblem" aria-hidden="true">${percent >= 70 ? "✓" : "↻"}</div>
      <p class="eyebrow">RESULTADO FINAL</p>
      <h3>${headline}</h3>
      <p>Tuviste <b>${score} de ${scenarios.length}</b> respuestas correctas (${percent}%). ${missed ? "Revisa los casos que fallaste: el reto distingue entre una señal observada y un impacto o amenaza que activa la respuesta." : "Has diferenciado correctamente las alertas contenidas de los incidentes con impacto."}</p>
      <div class="result-stats"><span class="result-stat"><b>${score}</b> correctas</span><span class="result-stat"><b>${missed}</b> para repasar</span><span class="result-stat"><b>${scenarios.length}</b> casos revisados</span></div>
      <div class="review-list" aria-label="Revisión de respuestas">${scenarios.map((scenario, index) => `
        <div class="review-item ${answers[index]?.correct ? "good" : "bad"}"><span class="review-result">${answers[index]?.correct ? "✓" : "↻"}</span><b>${String(index + 1).padStart(2, "0")} · ${scenario.title}</b>${scenario.answer === "evento" ? "Evento" : "Incidente"} · ${scenario.type}</div>`).join("")}</div>
    </div>`;
  feedback.hidden = true;
  nextButton.disabled = true;
  nextButton.textContent = "Reto terminado";
  nextButton.style.display = "none";
  progressTrack.closest(".challenge-topline").scrollIntoView({ behavior: "smooth", block: "start" });
}

nextButton.addEventListener("click", () => {
  if (current < scenarios.length - 1) {
    current++;
    renderScenario();
    scenarioPanel.scrollIntoView({ behavior: "smooth", block: "center" });
  } else renderResults();
});

restartButton.addEventListener("click", () => {
  current = 0;
  score = 0;
  answers = [];
  nextButton.style.display = "";
  renderScenario();
  document.querySelector("#reto").scrollIntoView({ behavior: "smooth", block: "start" });
});

renderScenario();
