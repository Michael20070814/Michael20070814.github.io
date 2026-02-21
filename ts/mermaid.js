// <stdin>
var PANZOOM_CDN = "https://cdn.jsdelivr.net/npm/panzoom@9.4.3/+esm";
function getScheme() {
  return document.documentElement.dataset.scheme === "dark" ? "dark" : "light";
}
function buildThemeConfig(cfg, scheme) {
  const isLight = scheme === "light";
  const theme = isLight ? cfg.lightTheme ?? "default" : cfg.darkTheme ?? "dark";
  const vars = isLight ? cfg.lightThemeVariables ?? {} : cfg.darkThemeVariables ?? {};
  return {
    theme,
    themeVariables: { ...vars, ...cfg.transparentBackground ? { background: "transparent" } : {} }
  };
}
function buildBaseConfig(cfg) {
  const base = {
    startOnLoad: false,
    securityLevel: cfg.securityLevel ?? "strict",
    look: cfg.look ?? "classic",
    flowchart: { htmlLabels: cfg.htmlLabels ?? true, useMaxWidth: true },
    gantt: { useWidth: 800 }
  };
  const optional = ["maxTextSize", "maxEdges", "fontSize", "fontFamily", "curve", "logLevel"];
  for (const key of optional) {
    if (cfg[key] != null) base[key] = cfg[key];
  }
  return base;
}
function initWithTheme(scheme, themes, baseConfig) {
  const { theme, themeVariables } = themes[scheme];
  mermaid.initialize({
    ...baseConfig,
    theme,
    ...Object.keys(themeVariables).length && { themeVariables }
  });
}
async function renderOffscreen(sources) {
  const container = document.createElement("div");
  container.className = "mermaid-offscreen";
  document.body.appendChild(container);
  const nodes = sources.map((src) => {
    const n = document.createElement("pre");
    n.innerHTML = src;
    container.appendChild(n);
    return n;
  });
  await mermaid.run({ nodes });
  const results = nodes.map((n) => n.innerHTML);
  container.remove();
  return results;
}
function setupWrappers(elements) {
  elements.forEach((el, idx) => {
    const wrapper = document.createElement("div");
    wrapper.className = "mermaid-wrapper";
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
    wrapper.insertAdjacentHTML(
      "beforeend",
      `<div class="mermaid-toolbar"><button data-idx="${idx}" title="Open fullscreen with pan/zoom">\u26F6 Expand</button></div>`
    );
  });
}
function setupModal(elements) {
  const modal = document.getElementById("mermaid-modal");
  const modalBody = document.getElementById("mermaid-modal-body");
  const modalContent = document.getElementById("mermaid-modal-content");
  let pzInstance = null;
  let panzoom = null;
  const loadPanzoom = async () => {
    if (!panzoom) {
      const url = PANZOOM_CDN;
      panzoom = (await import(url)).default;
    }
    return panzoom;
  };
  const fitToScreen = () => {
    const wrapper = modalContent.querySelector(".mermaid-panzoom-container");
    if (!pzInstance || !wrapper) return;
    const w = +(wrapper.dataset.nativeWidth ?? 0);
    const h = +(wrapper.dataset.nativeHeight ?? 0);
    const rect = modalContent.getBoundingClientRect();
    const scale = Math.min((rect.width - 60) / w, (rect.height - 60) / h);
    pzInstance.zoomAbs(0, 0, scale);
    pzInstance.moveTo((rect.width - w * scale) / 2, (rect.height - h * scale) / 2);
  };
  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    pzInstance?.dispose();
    pzInstance = null;
    modalContent.innerHTML = "";
  };
  const openModal = async (idx) => {
    const svg = elements[idx].querySelector("svg");
    if (!svg) return;
    const svgClone = svg.cloneNode(true);
    const viewBox = svg.getAttribute("viewBox");
    const [w, h] = viewBox ? viewBox.split(/[\s,]+/).slice(2).map(Number) : [svg.getBoundingClientRect().width || 800, svg.getBoundingClientRect().height || 600];
    svgClone.setAttribute("width", String(w));
    svgClone.setAttribute("height", String(h));
    const wrapper = document.createElement("div");
    wrapper.className = "mermaid-panzoom-container";
    wrapper.dataset.nativeWidth = String(w);
    wrapper.dataset.nativeHeight = String(h);
    wrapper.appendChild(svgClone);
    modalContent.innerHTML = "";
    modalContent.appendChild(wrapper);
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    const pz = await loadPanzoom();
    setTimeout(() => {
      pzInstance = pz(wrapper, { maxZoom: 10, minZoom: 0.05, bounds: false });
      fitToScreen();
      wrapper.classList.add("ready");
    }, 50);
  };
  document.addEventListener("click", (e) => {
    const target = e.target;
    const toolbarBtn = target.closest(".mermaid-toolbar button");
    if (toolbarBtn) return openModal(+toolbarBtn.dataset.idx);
    const zoomBtn = target.closest(".mermaid-modal-controls button");
    if (zoomBtn && pzInstance) {
      const z = zoomBtn.dataset.zoom;
      const rect = modalBody.getBoundingClientRect();
      if (z === "fit") fitToScreen();
      else if (z === "0") {
        pzInstance.moveTo(0, 0);
        pzInstance.zoomAbs(0, 0, 1);
      } else pzInstance.smoothZoom(rect.width / 2, rect.height / 2, z === "1" ? 1.5 : 0.67);
    }
  });
  document.getElementById("mermaid-modal-close").addEventListener("click", closeModal);
  modalBody.addEventListener("click", (e) => {
    if (e.target === modalBody) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });
}
async function initMermaidPage(config) {
  const elements = document.querySelectorAll(".mermaid");
  if (!elements.length) return;
  const sources = Array.from(elements).map((el) => el.innerHTML);
  const perDiagramTransparent = sources.map((src) => /%%\s*transparent\s*%%/i.test(src));
  const cache = { light: [], dark: [] };
  const themes = {
    light: buildThemeConfig(config, "light"),
    dark: buildThemeConfig(config, "dark")
  };
  const baseConfig = buildBaseConfig(config);
  const applyTransparency = (el, i) => {
    if (perDiagramTransparent[i]) el.querySelector("svg")?.style.setProperty("background", "transparent");
  };
  setupWrappers(elements);
  setupModal(elements);
  const scheme = getScheme();
  initWithTheme(scheme, themes, baseConfig);
  await mermaid.run({ nodes: Array.from(elements) });
  elements.forEach((el, i) => {
    el.style.visibility = "";
    cache[scheme][i] = el.innerHTML;
    applyTransparency(el, i);
  });
  const alt = scheme === "dark" ? "light" : "dark";
  const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 1e3));
  idle(() => {
    if (cache[alt].length) return;
    initWithTheme(alt, themes, baseConfig);
    renderOffscreen(sources).then((results) => {
      cache[alt] = results;
    });
  });
  window.addEventListener("onColorSchemeChange", async () => {
    const newScheme = getScheme();
    if (!cache[newScheme].length) {
      initWithTheme(newScheme, themes, baseConfig);
      cache[newScheme] = await renderOffscreen(sources);
    }
    elements.forEach((el, i) => {
      el.innerHTML = cache[newScheme][i];
      applyTransparency(el, i);
    });
  });
}
export {
  initMermaidPage
};
