import { init, GameLoop } from 'kontra';
import { Yurt } from './yurt';
import { svgElement } from './svg';
import { initPointer } from './pointer';
import { OxFarm } from './ox-farm';
import { people } from './person';
import { inventory } from './inventory';
import { initUi } from './ui';

init(null, { contextless: true });

const { pathTilesCountElement } = initUi();

setTimeout(() => {
  const testYurt = new Yurt({ x: 6, y: 7, type: 'ox' });
  testYurt.addToSvg();
}, 0);

setTimeout(() => {
  const testYurt2 = new Yurt({ x: 5, y: 5, type: 'ox' });
  testYurt2.addToSvg();
}, 500);

setTimeout(() => {
  const testYurt3 = new Yurt({ x: 7, y: 5, type: 'ox' });
  testYurt3.addToSvg();
}, 500);

let testOxFarm;

setTimeout(() => {
  testOxFarm = new OxFarm({ width: 3, height: 2, x: 1, y: 6 });
}, 1000);

initPointer(svgElement);

let updateCount = 0;
let renderCount = 0;

let totalUpdateCount = 0;

const loop = GameLoop({
  update() {
    updateCount++;
    totalUpdateCount++;
    // if (totalUpdateCount > 200) return;

    // Some things happen 15 times/s instead of 60.
    // E.g. because movement handled with CSS transitions will be done at browser refresh rate anyway
    switch (updateCount % 4) {
      case 0:
        break;
      case 1:
        testOxFarm.update();
        break;
      case 2:
        break;
      case 3:
        break;
    }

    if (updateCount >= 60) updateCount = 0;

    people.forEach(p => p.update());
  },
  render() {
    renderCount++;

    // Some things happen 15 times/s instead of 60.
    // E.g. because movement handled with CSS transitions will be done at browser refresh rate anyway
    switch (renderCount % 4) {
      case 0:
        pathTilesCountElement.innerText = inventory.paths;
        // pathTilesCountElement.style.borderColor = inventory.paths && inventory.paths > 0 ? '' : 'red';
        break;
      case 1:
        testOxFarm.render();
        break;
      case 2:
        break;
      case 3:
        break;
    }
    if (renderCount >= 60) renderCount = 0;

    people.forEach(p => p.render());
  },
});

setTimeout(() => {
  loop.start();
}, 3000);
