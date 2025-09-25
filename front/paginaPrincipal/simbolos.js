const simbolos = [
  "√",
  "π",
  "∞",
  "≈",
  "≠",
  "≤",
  "≥",
  "±",
  "∑",
  "∫",
  "Δ",
  "θ",
  "α",
  "β",
  "γ",
  "λ",
  "μ",
  "σ",
  "Ω",
  "ω",
  "φ",
  "ψ",
  "τ",
  "η",
  "∂",
  "∇",
  "∈",
  "∉",
  "∋",
  "∩",
  "∪",
  "⊂",
  "⊃",
  "⊆",
  "⊇",
  "∅",
  "∃",
  "∀",
  "∴",
  "∵",
  "∗",
  "⋅",
  "×",
  "÷",
  "≡",
  "≅",
  "≪",
  "≫",
  "∝",
  "∠",
  "⊥",
  "‖",
  "∧",
  "∨",
  "¬",
  "⇒",
  "⇔",
  "←",
  "→",
  "↑",
  "↓",
  "ℕ",
  "ℤ",
  "ℚ",
  "ℝ",
  "ℂ",
  "ℵ",
  "ℶ",
  "ℓ",
  "ℏ",
  "∫",
  "∮",
  "∯",
  "∰",
  "∑",
  "∏",
  "∐",
  "∓",
  "⊕",
  "⊗",
  "⊥",
  "⊨",
  "⊻",
  "⊽",
  "⊳",
  "⊲",
  "⊴",
  "⊵",
  "∘",
  "∴",
  "∵",
  "∶",
  "∷",
  "∸",
  "∹",
  "∺",
  "∻",
  "∼",
  "≃",
  "≅",
  "≆",
  "≇",
  "≉",
  "≊",
  "≋",
  "≌",
  "≍",
  "≎",
  "≏",
  "≐",
  "≑",
  "≒",
  "≓",
  "≔",
  "≕",
];

const panel = document.getElementById("panelSimbolos");
panel.innerHTML = simbolos
  .map(
    (s) =>
      `<button type="button" class="btn btn-light btn-sm m-1 simbolo-math">${s}</button>`
  )
  .join("");

// Mostrar/ocultar panel de símbolos
document.getElementById("btnSimbolosMatematicos").onclick = function () {
  panel.style.display = panel.style.display === "none" ? "block" : "none";
};

// Insertar símbolo en el textarea
panel.querySelectorAll(".simbolo-math").forEach((btn) => {
  btn.onclick = function () {
    const textarea = document.getElementById("descripcionPregunta");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const symbol = this.textContent;
    textarea.value = text.slice(0, start) + symbol + text.slice(end);
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = start + symbol.length;
  };
});

// Opcional: Ocultar el panel si se hace clic fuera de él
document.addEventListener("click", function (e) {
  if (
    panel.style.display === "block" &&
    !panel.contains(e.target) &&
    e.target !== document.getElementById("btnSimbolosMatematicos")
  ) {
    panel.style.display = "none";
  }
});
