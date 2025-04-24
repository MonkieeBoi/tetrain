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
  const outupt = document.querySelector("#output");

  function updateOutput() {
    const text = input.textContent;
    outupt.innerHTML = color(text);
  }

  input.addEventListener("change", () => {
    updateOutput();
  });

  document.onkeydown = (event) => {
    if (event.key == "v" && event.ctrlKey) {
      navigator.clipboard.readText()
        .then((text) => {
          input.textContent = text;
          updateOutput();
        });
    } else if (event.key == "c" && event.ctrlKey) {
      navigator.clipboard.writeText(outupt.innerHTML);
    }
  };
};
