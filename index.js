dict = {
  "T": "#b48ead",
  "O": "#ebcb8b",
  "I": "#88c0d0",
  "L": "#d08770",
  "J": "#5e81ac",
  "S": "#a3be8c",
  "Z": "#bf616a",
};

function color(text) {
  text = text.replaceAll("\n", `<br>`);
  for (const [key, value] of Object.entries(dict)) {
    text = text.replaceAll(key, `<span style="color: ${value};">${key}</span>`);
  }
  return text;
}

window.onload = () => {
  const input = document.querySelector("#input");
  const output = document.querySelector("#output");
  const auto = document.querySelector("#autocopy");
  const raw = document.querySelector("#copyraw");

  function updateOutput() {
    const text = input.value;
    output.innerHTML = color(text);
  }

  function copy() {
    if (raw.checked) {
      copyraw();
    } else {
      copyhtml();
    }
  }

  function copyhtml() {
    const text = new ClipboardItem({
      "text/html": new Blob([output.innerHTML], { type: "text/html" }),
    });
    navigator.clipboard.write([text]);
  }

  function copyraw() {
    navigator.clipboard.writeText(output.innerHTML);
  }

  function paste() {
    navigator.clipboard.readText()
      .then((text) => {
        input.value = text;
        updateOutput();
        if (auto.checked) {
          copy();
        }
      });
  }

  document.querySelector("#copy").onclick = copy;
  document.querySelector("#paste").onclick = paste;

  input.addEventListener("input", () => {
    updateOutput();
  });

  document.onkeydown = (event) => {
    if (event.key == "v" && event.ctrlKey) {
      paste();
    } else if (event.key == "C" && event.ctrlKey && event.shiftKey) {
      copyraw();
    } else if (event.key == "c" && event.ctrlKey) {
      copy();
    }
  };

  for (const mino in dict) {
    document.querySelector(`#${mino}-colour`).addEventListener(
      "change",
      (event) => {
        dict[mino] = event.target.value;
        updateOutput();
      },
    );
  }
};
