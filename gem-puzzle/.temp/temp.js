
// field.addEventListener('mousedown', detectStartDrag);
// field.addEventListener('mouseup', endDrag);


// function detectStartDrag(event) {

//   this.addEventListener('mousemove', startDrag);
// }

// function startDrag(event) {
//   console.log('drag');
//   console.log(event.target);
// }

// function endDrag(event) {
//   this.removeEventListener('mousemove', startDrag);
// }

field.addEventListener('mousedown', ballTracker);

function ballTracker(event) {
  if (!event.target.classList.contains('field__item')) {
    return;
  }

  const context = event.target;
  const parent = context.offsetParent;
  const parentWidth = parent.offsetWidth;
  // let offsetLeft = (context.offsetLeft || 1) * 100 / (parentWidth - parent.clientLeft * 2);
  let a = event.clientX - parent.offsetLeft;

  let shiftX = event.clientX - context.getBoundingClientRect().left;
  let targetLeft = parseInt(context.style.left);
  let shift = 100 / settings.field;

  moveAt.call(context, event.pageX, event.pageY);

  function moveAt(x, y) {
    let parentClearWidth = parentWidth - parent.clientLeft * 2;
    let shiftLeft = x - parent.getBoundingClientRect().left - parent.clientLeft - shiftX;

    let left = shiftLeft * 100 / parentClearWidth;

    // if (left === (targetLeft - shift / 2)) {
    //   left = targetLeft - shift;
    // } else if (left >= (targetLeft + shift / 2)) {
    //   left = targetLeft + shift;
    // }

    if (left <= (targetLeft - shift)) {
      left = targetLeft - shift;

    } else if (left >= (targetLeft + shift)) {
      left = targetLeft + shift;
    }

    context.style.left = left + '%';
  }

  document.addEventListener('mousemove', moveBy);

  function moveBy(event) {
    console.log('moveBy');
    // context.style.transition = 'none';
    moveAt.call(context, event.pageX, event.pageY);
  }

  document.addEventListener('mouseup', moveEnd);

  function moveEnd(event) {
    console.log('moveEnd');
    // context.style.transition = '';
    document.removeEventListener('mousemove', moveBy);
  }
}

function test(context) {
  const item = context.closest('.field__item');
  if (!item) return;
  if (item.classList.contains('field__item_blank')) return;

  const target = Number(item.dataset.id);
  const blank = Number(field.children.length);

  const buttonCoords = detectMatrixPosition(target, matrix);
  const blankCoords = detectMatrixPosition(blank, matrix);

  const isValid = validateSwap(buttonCoords, blankCoords);

  if (isValid) {
    swapMatrixItem(buttonCoords, blankCoords, matrix);
    setPositionItem(matrix);
    settings.count++;
    refreshStats(settings);
    playSound(clickCells);

    const isMatrix = isMatrixCompete(matrix);

    // let score = prepareScore(settings.field, settings.count, `${String(stopwatch.timer.min).padStart(2, 0) + ':' + String(stopwatch.timer.sec).padStart(2, 0)}`, new Date());
    // setLocalStorage(score);

    if (isMatrix && isGameStart) {
      stopwatch.stop();
      playSound(winSound);
      allert.firstElementChild.innerHTML = `Hooray! You solved the puzzle in ${stopwatch.timer.min + ':' + stopwatch.timer.sec} and ${settings.count} moves`;
      allert.classList.add('allert_open');
      overlaySecond.classList.add('overlay_restart_open');

      let score = prepareScore(settings.field, settings.count, `${String(stopwatch.timer.min).padStart(2, 0) + ':' + String(stopwatch.timer.sec).padStart(2, 0)}`, new Date());
      setLocalStorage(score);
    }
  } else {
    playSound(misclick);
  }
}
