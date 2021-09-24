function getDraggables() {
  const draggables = document.querySelectorAll(".draggable");
  const sortContainer = document.querySelector(".sortables");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  sortContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(sortContainer, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      sortContainer.appendChild(draggable);
    } else {
      sortContainer.insertBefore(draggable, afterElement);
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll(".draggable:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
}

const check = (solC, solW) => {
  document.querySelector(`.solution-box__${solC}`).classList.remove("hidden");
  document.querySelector(`.solution-box__${solW}`).classList.add("hidden");
};

document.querySelector(".check-button").addEventListener("click", () => {
  const sortables = [...document.querySelectorAll(".sortables-option")];
  sortables.every(
    (x, i) => i === 0 || x.dataset.order >= sortables[i - 1].dataset.order
  )
    ? check("correct", "wrong")
    : check("wrong", "correct");
});

getDraggables();
