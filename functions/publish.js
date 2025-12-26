function cmd(command) {
  document.execCommand(command, false, null);
}

function fontSize(size) {
  if (!size) return;
  document.execCommand("fontSize", false, size);
}

function lineHeight(value) {
  if (!value) return;
  document.execCommand("insertHTML", false,
    `<div style="line-height:${value}">${window.getSelection()}</div>`
  );
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
    const file = input.files[0];
    const url = URL.createObjectURL(file);
    document.execCommand("insertHTML", false,
      `<img src="${url}">`
    );
  };
  input.click();
}

function uploadVideo() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "video/*";
  input.onchange = () => {
    const file = input.files[0];
    const url = URL.createObjectURL(file);
    document.execCommand("insertHTML", false,
      `<video src="${url}" controls></video>`
    );
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
