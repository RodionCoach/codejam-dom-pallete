(function () {
  let paletteTools = document.querySelector('.palette--tools-list'),
    paintBucket = document.querySelector('.palette--tools-paint_bucket'),
    chooseColor = document.querySelector('.palette--tools-cshoose_color'),
    move = document.querySelector('.palette--tools-move'),
    transform = document.querySelector('.palette--tools-transform'),
    canvasContainer = document.querySelector('.main-container-canvas');

  let currColorInput = document.querySelector('.palette--color-current_color input'),
    prevColorInput = document.querySelector('.palette--color-prev_color input'),
    redColorPicker = document.querySelector('.palette--color-third_color'),
    blueColorPicker = document.querySelector('.palette--color-fourth_color');
  let currColor = currColorInput.value;
  let prevColor = prevColorInput.value;

  let dragSrcEl = null;

  Array.prototype.forEach.call(canvasContainer.children, function (el) {
    el.addEventListener('click', handlePaintBucket, false);
    el.addEventListener('click', handleTransformt, false);
    el.addEventListener('click', handleChooseColort, false);
    el.addEventListener('dblclick', handlePaintBucket, false);
    el.addEventListener('dblclick', handleChooseColort, false);
    el.addEventListener('dragstart', handleDragStart, false);
    el.addEventListener('dragenter', handleDragEnter, false);
    el.addEventListener('dragover', handleDragOver, false);
    el.addEventListener('dragleave', handleDragLeave, false);
    el.addEventListener('drop', handleDrop, false);
    el.addEventListener('dragend', handleDragEnd, false);
  })

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

  document.querySelector('body').addEventListener('keyup', function (e) {
    if (e.key === 'Escape') {
      Array.prototype.forEach.call(paletteTools.children, function (el) {
        el.classList.remove('active');
      });
      canvasContainer.classList.remove('daraggable');
    } 
  })

  paletteTools.addEventListener('click', function (e) {
    e.stopPropagation();
    Array.prototype.forEach.call(paletteTools.children, function (el) {
      el.classList.remove('active');
      canvasContainer.classList.remove('daraggable');
      canvasContainer.setAttribute('style', 'cursor: default');
    });
    
    if (e.target.classList[0] === 'palette--tools-paint_bucket') {
      canvasContainer.setAttribute('style', 'cursor: url(./assets/icon/cursor/paint_bucket.cur), pointer');
    }    
    if (e.target.classList[0] === 'palette--tools-cshoose_color') {
      canvasContainer.setAttribute('style', 'cursor: url(./assets/icon/cursor/choose_color.cur), pointer');
    }
    if (e.target.classList[0] === 'palette--tools-move') {
      canvasContainer.setAttribute('style', 'cursor: url(./assets/icon/cursor/move.cur), pointer');
      canvasContainer.classList.add('daraggable');
    }
    if (e.target.classList[0] === 'palette--tools-transform') {
      canvasContainer.setAttribute('style', 'cursor: url(./assets/icon/cursor/transform.cur), pointer');
    }

    e.target.classList.add('active');

  })

  function handlePaintBucket(e) {
    if (!(paintBucket.classList[1] === 'active')) {
      return false;
    }
    if (e.type === 'dblclick') {
      e.target.style.backgroundColor = prevColor;
    } else {
      e.target.style.backgroundColor = currColor;
    }
  }

  function handleChooseColort(e) {
    if (!(chooseColor.classList[1] === 'active')) {
      return false;
    }
    if (e.type === 'dblclick') {
      prevColorInput.value = rgbToHex(getComputedStyle(e.target).backgroundColor);
      return false;
    }
    currColorInput.value = rgbToHex(getComputedStyle(e.target).backgroundColor);
  }

  function rgbToHex(color) { //convert rgb to hex
    color = "" + color;
    if (!color || color.indexOf("rgb") < 0) {
      return;
    }

    if (color.charAt(0) == "#") {
      return color;
    }

    var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
      r = parseInt(nums[2], 10).toString(16),
      g = parseInt(nums[3], 10).toString(16),
      b = parseInt(nums[4], 10).toString(16);

    return "#" + (
      (r.length == 1 ? "0" + r : r) +
      (g.length == 1 ? "0" + g : g) +
      (b.length == 1 ? "0" + b : b)
    );
  }

  //draggable methods
  function handleDragStart(e) {
    if (!(move.classList[1] === 'active')) {
      return false;
    }
    //this.style.opacity = '0.4'; // this / e.target is the source node.
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    //e.dataTransfer.setData('text/css', JSON.stringify(this.style));
  }

  function handleDragOver(e) {
    if (!(move.classList[1] === 'active')) {
      return false;
    }
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

    return false;
  }

  function handleDragEnter(e) {
    if (!(move.classList[1] === 'active')) {
      return false;
    }
    // this / e.target is the current hover target.
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over'); // this / e.target is previous target element.
  }

  function handleDrop(e) {
    // this / e.target is current target element.

    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    // Don't do anything if dropping the same column we're dragging.

    if (dragSrcEl != this) {
      // Set the source column's HTML to the HTML of the column we dropped on.
      /*       dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html'); */
      let oldElCloneDrag = dragSrcEl.cloneNode(true);
      let oldElCloneDrop = this.cloneNode(true);

      oldElCloneDrag.addEventListener('click', handlePaintBucket, false);
      oldElCloneDrag.addEventListener('click', handleTransformt, false);
      oldElCloneDrag.addEventListener('click', handleChooseColort, false);
      oldElCloneDrag.addEventListener('dblclick', handlePaintBucket, false);
      oldElCloneDrag.addEventListener('dragstart', handleDragStart, false);
      oldElCloneDrag.addEventListener('dragenter', handleDragEnter, false);
      oldElCloneDrag.addEventListener('dragover', handleDragOver, false);
      oldElCloneDrag.addEventListener('dragleave', handleDragLeave, false);
      oldElCloneDrag.addEventListener('drop', handleDrop, false);
      oldElCloneDrag.addEventListener('dragend', handleDragEnd, false);

      oldElCloneDrop.addEventListener('click', handlePaintBucket, false);
      oldElCloneDrop.addEventListener('click', handleTransformt, false);
      oldElCloneDrop.addEventListener('click', handleChooseColort, false);
      oldElCloneDrop.addEventListener('dblclick', handlePaintBucket, false);
      oldElCloneDrop.addEventListener('dragstart', handleDragStart, false);
      oldElCloneDrop.addEventListener('dragenter', handleDragEnter, false);
      oldElCloneDrop.addEventListener('dragover', handleDragOver, false);
      oldElCloneDrop.addEventListener('dragleave', handleDragLeave, false);
      oldElCloneDrop.addEventListener('drop', handleDrop, false);
      oldElCloneDrop.addEventListener('dragend', handleDragEnd, false);
      
      canvasContainer.insertBefore(oldElCloneDrop, dragSrcEl);
      canvasContainer.removeChild(dragSrcEl);

      canvasContainer.insertBefore(oldElCloneDrag, this);
      canvasContainer.removeChild(this);
       //full clone of DOM-element
      
    }

    return false;
  }

  function handleDragEnd(e) {
    // this/e.target is the source node.

    Array.prototype.forEach.call(canvasContainer.children, function (el) {
      el.classList.remove('over');
    });
  }

  function handleTransformt(e) {
    if (!(transform.classList[1] === 'active')) {
      return false;
    }
    if (e.target.dataset.figure === 'square') {
      e.target.classList.add('circle');
      e.target.dataset.figure = 'circle';
    } else {
      e.target.classList.remove('circle')
      e.target.dataset.figure = 'square';
    }

  }

})();