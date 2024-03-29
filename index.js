const refs = {
  input: document.querySelector("#input"),
  button: document.querySelector("#btn"),
  output: document.querySelector("#output"),
};

let draggedElement = null;
let startX = 0;
let startY = 0;

function onClick() {
  const inputText = refs.input.value;
  refs.output.textContent = "";
  for (const char of inputText) {
    const letterSpan = document.createElement("span");
    letterSpan.textContent = char;
    refs.output.appendChild(letterSpan);
    makeDraggable(letterSpan);
  }
}

function makeDraggable(element) {
  element.draggable = true;
  element.addEventListener("dragstart", function (event) {
    event.target.classList.add("letter");
    draggedElement = event.target;

    startX = event.clientX;
    startY = event.clientY;
  });
}

document.addEventListener("dragover", function (event) {
  event.preventDefault();
});

document.addEventListener("drop", function (event) {
  event.preventDefault();

  if (draggedElement) {
    const targetElement = document.elementFromPoint(
      event.clientX,
      event.clientY
    );

    const parent = draggedElement.parentNode;
    const draggedIndex = Array.from(parent.children).indexOf(draggedElement);
    const targetIndex = Array.from(parent.children).indexOf(targetElement);

    if (draggedIndex < targetIndex) {
      const targetElementX = draggedElement.style.left;
      const targetElementY = draggedElement.style.top;

      targetElement.style.left = targetElementX;
      targetElement.style.top = targetElementY;

      draggedElement.style.left =
        event.clientX - draggedElement.offsetWidth / 4 + "px";
      draggedElement.style.top =
        event.clientY - draggedElement.offsetHeight / 4 + "px";
      draggedElement = null;
    } else {
      draggedElement.style.left =
        event.clientX - draggedElement.offsetWidth / 4 + "px";
      draggedElement.style.top =
        event.clientY - draggedElement.offsetHeight / 4 + "px";
      draggedElement = null;
    }
  }
});

refs.button.addEventListener("click", onClick);
