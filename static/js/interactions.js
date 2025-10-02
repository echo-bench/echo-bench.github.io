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

function changeVisualPrompt(id) {
  const selectParent = document.getElementById('select-' + id);
  if (selectParent === null) {
      return ;
  }
  let path0 = selectParent.getElementsByTagName('select')[0].selectedOptions[0].id;
  let path1 = selectParent.getElementsByTagName('select')[1].selectedOptions[0].id;

  const image0 = document.getElementById(id + '0');
  const image1 = document.getElementById(id + '1');
  
  const imageSrc = image0.src;
  let imagePath = imageSrc.split("/");
  imagePath = imagePath.slice(0, -1).join("/") + "/";

  image0.src = imagePath + id + "_" + path1 + ".png";
  image1.src = imagePath + path0 + "_" + path1 + ".png";

  return { path0, path1, imagePath };
}

function changeVisualPromptOverlay(id) {
  const selectParent = document.getElementById('select-' + id);
  if (selectParent === null) {
      return ;
  }

  const { path0, path1, imagePath } = changeVisualPrompt(id);

  let shouldOverlay = selectParent.getElementsByTagName('select')[2].selectedOptions[0].id;
  const image2 = document.getElementById(id + '2');
  image2.src = imagePath + "overlay" + "_" + path1 + ".png";

  if (shouldOverlay === 'yes') {
    image2.style.opacity = '1';
  } else {
    image2.style.opacity = '0';
  }
}