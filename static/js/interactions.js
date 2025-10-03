function playVideo(id) {
  const video = document.getElementById(id);
  video.play();
}

function changeImage(id) {
  const selectParent = document.getElementById('select-' + id);
  if (!selectParent) return;

  let path0 = selectParent.getElementsByTagName('select')[0].value;

  const image = document.getElementById(id);
  const imageSrc = image.src;
  let imagePath = imageSrc.split("/");
  imagePath = imagePath.slice(0, -1).join("/") + "/";

  image.src = imagePath + path0 + ".jpg";
}

function changePlotly(id) {
  const selectEl = document.querySelector('#select-' + id + ' select');
  if (!selectEl) return;

  const selected = selectEl.value;
  const iframe = document.getElementById(id + '-frame');

  const oldSrc = iframe.src
  const oldDir = oldSrc.substring(0, oldSrc.lastIndexOf("/") + 1);
  iframe.src = oldDir + selected + ".html";
  console.log(oldDir, selected)
}