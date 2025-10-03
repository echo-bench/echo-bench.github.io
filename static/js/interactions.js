function playVideo(id) {
  const video = document.getElementById(id);
  video.play();
}

function changeVideo(id) {
  const selectParent = document.getElementById('select-' + id);
  if (selectParent === null) {
      return ;
  }
  let path0 = selectParent.getElementsByTagName('select')[0].selectedOptions[0];
  let path1 = selectParent.getElementsByTagName('select')[1].selectedOptions[0];
  path0 = path0.textContent.trim().toLowerCase();
  path0 = path0.split(/[\s-]+/)[0] || '';
  path1 = path1.textContent.trim().toLowerCase();

  const video = document.getElementById(id);
  const videoSrc = video.querySelector('source').src;
  const videoPath = videoSrc.split("/");
  const videoBase = videoPath[videoPath.length-1].replace(".m4v", "").split("_");
  let newVideoPath = videoPath.slice(0, -1).join("/") + "/";

  newVideoPath += path0 + "_" + path1 + ".m4v";
  video.src = newVideoPath;
  video.load();
}

function changeImage(id) {
  const selectParent = document.getElementById('select-' + id);
  if (selectParent === null) {
      return ;
  }
  let path0 = selectParent.getElementsByTagName('select')[0].selectedOptions[0].id;
  let path1 = selectParent.getElementsByTagName('select')[1].selectedOptions[0].id;

  const image = document.getElementById(id);
  const imageSrc = image.src;
  let imagePath = imageSrc.split("/");
  imagePath = imagePath.slice(0, -1).join("/") + "/";

  image.src = imagePath + path0 + "_" + path1 + ".png";
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