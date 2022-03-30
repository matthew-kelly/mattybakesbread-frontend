import { spring } from 'svelte/motion';

// options:
// direction: 'x', 'y', false (no restriction)
// reset: true (return to original position on mouseup), false (stay in new position)

export function drag(node, { direction = false, reset = true } = {}) {
  let x, y;

  const coordinates = spring({ x: 0, y: 0 }, { stiffness: 0.2, damping: 0.4 });

  // default directions
  let directions = { x: true, y: true };
  if (direction === 'x') {
    directions.y = false;
  } else if (direction === 'y') {
    directions.x = false;
  }

  coordinates.subscribe(($coords) => {
    node.style.transform = `translate3d(${$coords.x}px, ${$coords.y}px, 0)`;
  });

  // MOUSE
  // -----
  function handleMouseDown(event) {
    event.preventDefault();
    // fire up event
    x = event.clientX;
    y = event.clientY;
    node.dispatchEvent(new CustomEvent('dragStart', { detail: { x, y } }));
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(event) {
    event.preventDefault();
    // deltas
    const dx = event.clientX - x;
    const dy = event.clientY - y;
    x = event.clientX;
    y = event.clientY;
    node.dispatchEvent(new CustomEvent('dragMove', { detail: { x, y } }));
    coordinates.update(($coords) => {
      return {
        x: directions.x ? $coords.x + dx : 0,
        y: directions.y ? $coords.y + dy : 0,
      };
    });
  }

  function handleMouseUp() {
    // fire up event
    node.dispatchEvent(new CustomEvent('dragStop', { detail: { x, y } }));
    // reset values (leave this out to keep object in new location)
    if (reset) {
      x = 0;
      y = 0;
      coordinates.update(() => {
        return { x, y };
      });
    }
    // remove event listeners
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  // TOUCH
  // -----
  function handleTouchStart(event) {
    event.preventDefault();
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
    node.dispatchEvent(new CustomEvent('dragStart', { detail: { x, y } }));
    node.addEventListener('touchmove', handleTouchMove);
    node.addEventListener('touchend', handleMouseUp); // use mouse up for touch end event
  }

  function handleTouchMove(event) {
    event.preventDefault();
    // deltas
    const dx = event.touches[0].clientX - x;
    const dy = event.touches[0].clientY - y;
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
    node.dispatchEvent(new CustomEvent('dragMove', { detail: { x, y } }));
    coordinates.update(($coords) => {
      return {
        x: directions.x ? $coords.x + dx : 0,
        y: directions.y ? $coords.y + dy : 0,
      };
    });
  }

  node.addEventListener('mousedown', handleMouseDown);
  node.addEventListener('touchstart', handleTouchStart);

  return {
    destroy() {
      node.removeEventListener('mousedown', handleMouseDown);
      node.removeEventListener('touchstart', handleTouchStart);
    },
  };
}
