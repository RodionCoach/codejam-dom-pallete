(function () {
  let paletteTools = document.querySelector('.palette--tools-list'),
    paintBucket = document.querySelector('.palette--color-paint_bucket'),
    chooseColor = document.querySelector('.palette--color-cshoose_color'),
    move = document.querySelector('.palette--color-move'),
    transform = document.querySelector('.palette--color-transfom'),
    canvasContainer = document.querySelector('.main-container-canvas');

  let currColorInput = document.querySelector('.palette--color-current_color input'),
    prevColorInput = document.querySelector('.palette--color-prev_color input'),
    redColorPicker = document.querySelector('.palette--color-third_color'),
    blueColorPicker = document.querySelector('.palette--color-fourth_color');
  let currColor = currColorInput.value;
  let prevColor;

  redColorPicker.addEventListener('click', function (e) {
    prevColorInput.value = currColor;
    currColorInput.value = '#ff0000';
    currColor = currColorInput.value;
  });
  blueColorPicker.addEventListener('click', function (e) {
    prevColorInput.value = currColor;
    currColorInput.value = '#00eeff';
    currColor = currColorInput.value;
  });

  currColorInput.addEventListener('change', function (e) {
    prevColor = currColor;
    currColor = e.target.value;
    prevColorInput.value = prevColor;
  })

  paletteTools.addEventListener('click', function (e) {
    e.stopPropagation();
    [].forEach.call(paletteTools.children, function (el) {
      el.classList.remove('active')
    })

    e.target.classList.add('active');

    if (e.target.id == 1) {
      canvasContainer.addEventListener('click', changeColorOnCurrent);

      canvasContainer.addEventListener('dblclick', changeColorOnPrev);
    };

    if (e.target.id == 4) {
      canvasContainer.addEventListener('click', transformtHandler);
    }
  })


  function paintBucketHandler() {

  }

  function chooseColortHandler() {

  }

  function moveHandler() {

  }

  function transformtHandler(e) {
    if (e.target.dataset.figure == 'square') {
      e.target.classList.add('circle');
      e.target.dataset.figure = 'circle';
    } else {
      e.target.classList.remove('circle')
      e.target.dataset.figure = 'square';
    }

  }

  function changeColorOnCurrent(e) {
    e.target.style.backgroundColor = currColor;
  }

  function changeColorOnPrev(e) {
    e.target.style.backgroundColor = prevColor;
  }
})();