function cmd(command) {
  document.execCommand(command, false, null);
}

function fontSize(size) {
  if (!size) return;
  document.execCommand("fontSize", false, size);
}

function lineHeight(value) {
  if (!value) return;

  const sel = window.getSelection();
  if (!sel.rangeCount) return;

  let node = sel.anchorNode;
  while (node && node.nodeType !== 1) node = node.parentNode;

  if (node) node.style.lineHeight = value;
}

function addLink() {
  const url = prompt("Enter URL:");
  if (url) document.execCommand("createLink", false, url);
}

function uploadImage() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = () => {
    const url = URL.createObjectURL(input.files[0]);
    document.execCommand("insertHTML", false, `
<figure contenteditable="false">
  <img src="${url}">
  <figcaption class="caption" contenteditable="true">Caption (optional)</figcaption>
</figure>
<p><br></p>
`);
  };
  input.click();
}

function uploadVideo() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "video/*";

  input.onchange = () => {
    const url = URL.createObjectURL(input.files[0]);
    document.execCommand("insertHTML", false, `
<figure contenteditable="false">
  <video src="${url}" controls></video>
  <figcaption class="caption" contenteditable="true">Caption (optional)</figcaption>
</figure>
<p><br></p>
`);
  };
  input.click();
}

function publish() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("editor").innerHTML.trim();

  if (!title || !content) {
    alert("Title or content missing");
    return;
  }

  const data = btoa(unescape(encodeURIComponent(
    JSON.stringify({ title, content })
  )));

  location.href = `/p/${data}`;
}
