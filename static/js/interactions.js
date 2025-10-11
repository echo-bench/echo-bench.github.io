function playVideo(id) {
  const video = document.getElementById(id);
  video.play();
}

function changePlotly(id) {
  const selectEl = document.querySelector('#select-' + id + ' select');
  if (!selectEl) return;

  const selected = selectEl.value;
  const iframe = document.getElementById(id + '-frame');

  const oldSrc = iframe.src
  const oldDir = oldSrc.substring(0, oldSrc.lastIndexOf("/") + 1);
  iframe.src = oldDir + selected + ".html";
  console.log(oldDir, selected);
}

const galleryData = [
  {
    input: "assets/gallery/gradient_input.jpg",
    output: "assets/gallery/gradient_output.jpg",
    prompt: "blend in these colours to generate gradient background"
  },
  {
    input: null,
    output: "assets/gallery/whiteboard_output.jpg",
    prompt: "a real photograph of a whiteboard solving the integral of 4x and showing all steps to get to answer"
  },
  {
    input: "assets/gallery/sketch_input.jpg",
    output: "assets/gallery/sketch_output.jpg",
    prompt: "Make a super realistic image from this sketch, with a cute spider and a soap bar."
  },
  {
    input: null,
    output: "assets/gallery/meme_output.jpg",
    prompt: "Create an image to go along with this song lyric: when you are suffering, know that I have betrayed you."
  },
  {
    input: "assets/gallery/alligator_input.jpg",
    output: "assets/gallery/alligator_output.jpg",
    prompt: "Draw a giant alligator with a mouth that fits the shape of the lines in this chart."
  },
  {
    input: null,
    output: "assets/gallery/receipt_output.jpg",
    prompt: "Generate a photorealistic image that appears to be a photograph of a detailed paper receipt. The receipt should display a total of $127.54, with all numerical values (item prices, taxes, and any additional charges) accurately adding up. The restaurant name: No Name X and the address: Non-Existing Avenue, City, CA 94130."
  },
  {
    input: "assets/gallery/shoe_input.jpg",
    output: "assets/gallery/shoe_output.jpg",
    prompt: "Adjust the perspective in this image so that the sneaker appears photographed strictly from the front and centered. Align the horizontal and vertical lines, removing any distortion caused by the shooting angle."
  },
  {
    input: null,
    output: "assets/gallery/bat_output.jpg",
    prompt: "How a bat sees the world"
  },
  {
    input: "assets/gallery/ocr_input.jpg",
    output: "assets/gallery/ocr_output.jpg",
    prompt: "Modify the image so the handwriting is transformed into legible letters"
  },
  {
    input: null,
    output: "assets/gallery/recursive_output.jpg",
    prompt: "Chatgpt drawing a Chatgpt drawing a Chatgpt"
  },
];

async function populateGallery() {
  try {
    const gallery = document.getElementById('gallery');
    const indicators = gallery.querySelector('.carousel-indicators');
    const inner = gallery.querySelector('.carousel-inner');

    galleryData.forEach((item, idx) => {
      const li = document.createElement('li');
      li.setAttribute('data-target', `#gallery`);
      li.setAttribute('data-slide-to', idx);
      if (idx === 0) li.classList.add('active');
      indicators.appendChild(li);

      const div = document.createElement('div');
      div.classList.add('carousel-item');
      if (idx === 0) div.classList.add('active');

      const inputSection = item.input ? `
        <div class="column">
          <div class="square-container">
            <img src="${item.input}" alt="Input Image">
          </div>
          <p class="label-container">Input Image</p>
        </div>
      ` : '';

      div.innerHTML = `
        <div class="columns is-vcentered is-variable is-2" style="align-items: stretch;">
          <div class="column prompt-column ${item.input ? '' : 'is-three-fifths'}">
            <div class="sticky-scroll prompt-container ${item.input ? '' : 'prompt-container-no-input'}">
              <p class="content">${item.prompt}</p>
            </div>
            <p class="label-container">Prompt</p>
          </div>
          ${inputSection}
          <div class="arrow-container" style="display: flex; align-items: center; justify-content: center;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="10 0 25 30" width="25" height="30">
              <polygon points="10,10 20,10 20,5 35,15 20,25 20,20 10,20" fill="black"/>
            </svg>
          </div>
          <div class="column">
            <div class="square-container">
              <img src="${item.output}" alt="Output Image">
            </div>
            <p class="label-container">Output Image</p>
          </div>
        </div>
      `;
      inner.appendChild(div);
    });
  } catch (err) {
    console.error('Error populating gallery:', err);
  }
}

const modelNameMapping = {
  'nano_banana': 'Nano Banana',
  'bagel': 'Bagel',
  'anole': 'Anole',
  'flux_kontext': 'Flux Kontext',
  'bagel_think': 'Bagel-Think',
  'gemini_2_0_flash': 'Gemini 2.0 Flash',
  'llm_diffusion': 'LLM+Diffusion',
  '4o_image_gen': '4o Image Gen'
};

const modelComparisonData = {
  color_shift: {
    prompt: "ghiblify this drawing",
    models: ['nano_banana', 'bagel', 'anole', 'flux_kontext', 'bagel_think', 'gemini_2_0_flash', 'llm_diffusion', '4o_image_gen'],
    input: true,
  },
  face_identity: {
    prompt: "Billy the Kid cleaned up and colorized from the famous photo of him",
    models: ['nano_banana', 'flux_kontext', 'bagel_think', 'gemini_2_0_flash', 'bagel', 'anole', '4o_image_gen', 'llm_diffusion'],
    input: true,
  },
  structure_distance: {
    prompt: "giving it a fresh twist with a more detailed, realistic touch",
    models: ['nano_banana', 'bagel', 'bagel_think', 'flux_kontext', '4o_image_gen', 'gemini_2_0_flash', 'llm_diffusion', 'anole'],
    input: true,
  },
  text_rendering: {
    prompt: "Create an infographic explaining Newton's prism experiment in great detail. The background should be pure white, and include neatly rendered text labels with step-by-step annotations. Each step should be numbered and connected with subtle gradient arrows, and include both the theoretical explanation and practical observations.",
    models: ['4o_image_gen', 'nano_banana', 'gemini_2_0_flash', 'llm_diffusion', 'flux_kontext', 'bagel_think', 'bagel', 'anole'],
    input: false,
  },
};

async function populateModelComparison() {
  try {
    const container = document.getElementById('specialized-comparison-grid');
    if (!container) return;

    const selectEl = document.querySelector('#select-specialized select');
    if (!selectEl) return;
    metric = selectEl.value;

    const chartImg = document.querySelector('#specialized-chart');
    if (chartImg) {
      chartImg.src = `assets/specialized_metrics/${metric}.jpg`;
    }

    const metricData = modelComparisonData[metric];
    const { models, prompt, input } = metricData;
    const basePath = `assets/specialized_metrics/${metric}/`;

    container.innerHTML = '';
    const inputPath = input ? `${basePath}input.png` : null;

    const inputSection = inputPath ? `
      <div>
        <div class="square-container">
          <img src="${inputPath}" alt="Input Image">
        </div>
        <p class="label-container">Input Image</p>
      </div>
    ` : '';

    const topRow = document.createElement('div');
    topRow.innerHTML = `
      <div style="margin-bottom: 10px;">
        <div style="margin: 20px 0;">
          <div class="header-line"></div>
          <p>Example Model Comparison</p>
        </div>
        <div class="grid-container" style="align-items: stretch; justify-content: center;">
          <div class="prompt-column" style="flex-grow: 1; width: ${inputPath ? '' : '100%'};">
            <div class="prompt-container">
              <p class="content">${prompt}</p>
            </div>
            <p class="label-container">Prompt</p>
          </div>
          ${inputSection}
          <div style="display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg class="arrow-container" xmlns="http://www.w3.org/2000/svg" viewBox="10 0 25 30" width="25" height="30">
              <polygon points="10,10 20,10 20,5 35,15 20,25 20,20 10,20" fill="black"/>
            </svg>
          </div>
        </div>
      </div>`;

    const outputsWrapper = document.createElement('div');
    outputsWrapper.classList.add('model-comparison-grid', 'sticky-scroll');

    let innerHTML = '<div class="grid-container">';
    models.forEach(model => {
      const label = modelNameMapping[model];
      const path = `${basePath}${model}.png`;
      innerHTML += `
        <div class="grid-item">
          <div class="square-container">
            <img src="${path}" alt="${label}" 
                 onerror="this.parentElement.innerHTML='<div class=&quot;square-container placeholder&quot;></div>'">
          </div>
          <div class="grid-item-label">${label}</div>
        </div>`;
    });
    innerHTML += '</div>';
    outputsWrapper.innerHTML = innerHTML;
    
    container.appendChild(topRow);
    container.appendChild(outputsWrapper);
  } catch (err) {
    console.error('Error populating model comparison grid:', err);
  }
}

function addIframePlaceholders() {
  document.querySelectorAll("iframe").forEach(iframe => {
    if (iframe.parentElement.querySelector(".iframe-placeholder")) return;

    const placeholder = document.createElement("div");
    placeholder.className = "iframe-placeholder";
    placeholder.innerHTML = `
      <div>Hatching interactive visualization...</div>
      <div class="emoji-seq">
        <span class="emoji">🥚</span>
        <span class="emoji">🐣</span>
        <span class="emoji">🐥</span>
      </div>
    `;

    const parent = iframe.parentElement;
    if (getComputedStyle(parent).position === "static") {
      parent.style.position = "relative";
    }

    parent.appendChild(placeholder);

    iframe.addEventListener("load", () => {
      placeholder.style.opacity = 0;
      setTimeout(() => placeholder.remove(), 600);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  populateGallery();
  populateModelComparison();
  addIframePlaceholders();
});