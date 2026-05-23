const tabs = document.querySelectorAll(".terminal-tab");
const panels = document.querySelectorAll(".tab-panel");
const modeButtons = document.querySelectorAll(".mode-button");
const radioButtons = document.querySelectorAll(".radio-preset");
const frequency = document.querySelector("#frequency");
const radioMessage = document.querySelector("#radio-message");
const statBlocks = document.querySelectorAll(".special-stat");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.panel === target;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });
  });
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((item) => item.classList.toggle("active", item === button));
    document.body.classList.toggle("casino-mode", button.dataset.theme === "casino");
  });
});

radioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    radioButtons.forEach((item) => item.classList.toggle("active", item === button));
    frequency.textContent = button.dataset.frequency;
    radioMessage.textContent = button.dataset.message;
  });
});

const fillStats = (entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    const block = entry.target;
    const fill = block.querySelector(".stat-track i");
    fill.style.width = `${block.dataset.value}%`;
    statsObserver.unobserve(block);
  });
};

const statsObserver = new IntersectionObserver(fillStats, {
  threshold: 0.35,
});

statBlocks.forEach((block) => statsObserver.observe(block));
