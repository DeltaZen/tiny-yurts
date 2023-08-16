import { GameObjectClass } from 'kontra';
import { createSvgElement } from './svg';
import { fenceLayer, fenceShadowLayer } from './layers';
import { gridSize, gridLineThickness } from './grid';
import { Ox } from './ox';

// TODO: Landscape and portrait fences? Square or circle fences?
const width = 3;
const height = 2;
const circumference = width * gridSize * 2 + height * gridSize * 2;
const padding = 3;
const roundness = 2;
const fenceLineThickness = 1;

export class Farm extends GameObjectClass {
  constructor(properties) {
    super(properties);
    this.type = properties.type;
  }

  addAnimal() {
    const animal = new Ox({
      x: padding + (Math.random() * (width * gridSize - padding * 2)),
      y: padding + (Math.random() * (height * gridSize - padding * 2)),
      parent: this,
      rotation: Math.random() * Math.PI * 4,
    });
    this.addChild(animal);
    animal.addToSvg();
  }

  addToSvg() {
    const x = this.x * gridSize + fenceLineThickness / 2 + gridLineThickness;
    const y = this.y * gridSize + fenceLineThickness / 2 + gridLineThickness;
    const svgWidth = gridSize * width - fenceLineThickness - gridLineThickness;
    const svgHeight = gridSize * height - fenceLineThickness - gridLineThickness;
    const fence = createSvgElement('rect');
    fence.setAttribute('width', svgWidth);
    fence.setAttribute('height', svgHeight);
    fence.setAttribute('rx', roundness);
    fence.setAttribute('transform', `translate(${x},${y})`);
    fence.setAttribute('stroke-dasharray', circumference); // Math.PI * 2 + a bit
    fence.setAttribute('stroke-dashoffset', circumference);
    fence.style.transition = 'all.9s';
    fenceLayer.appendChild(fence);

    const shadow = createSvgElement('rect');
    // TODO: Landscape and portrait fences? Square or circle fences?
    shadow.setAttribute('width', svgWidth);
    shadow.setAttribute('height', svgHeight);
    shadow.setAttribute('rx', roundness);
    shadow.setAttribute('transform', `translate(${x},${y})`);
    shadow.setAttribute('stroke-dasharray', circumference); // Math.PI * 2 + a bit
    shadow.setAttribute('stroke-dashoffset', circumference);
    shadow.style.transition = 'all.9s';
    fenceShadowLayer.appendChild(shadow);

    // After a while, animate
    setTimeout(() => {
      fence.setAttribute('stroke-dashoffset', 0);
      shadow.setAttribute('stroke-dashoffset', 0);
    }, 500);
  }
}