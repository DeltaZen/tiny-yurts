import { createSvgElement } from './svg-utils';
import { emojiOx } from './ox-emoji';
import { emojiGoat } from './goat-emoji';
import { emojiFish } from './fish-emoji';
import { colors } from './colors';

// Animal score counters (for incrementing) and their wrappers (for show/hiding)
export const oxCounterWrapper = document.createElement('div');
export const oxCounter = document.createElement('div');
export const goatCounterWrapper = document.createElement('div');
export const goatCounter = document.createElement('div');
export const fishCounterWrapper = document.createElement('div');
export const fishCounter = document.createElement('div');

// New things to export:
export const scoreCounters = document.createElement('div');
export const clock = document.createElement('div');
export const clockMonth = document.createElement('div');
export const pathTilesIndicator = document.createElement('div');
export const pathTilesIndicatorCount = document.createElement('div');

// Odd one out because can't put divs in an svg
export const clockHand = createSvgElement('path');

export const initUi = () => {
  // TODO: Move elsewhre and minify
  const styles = document.createElement('style');
  styles.innerText = `
    body {
      font-family: system-ui;
      font-weight: 700;
      color: #443;
      margin: 0;
    }
    button {
      font-weight: 700;
      font-family: system-ui;
      border: none;
      padding: 0 20px;
      font-size: 32px;
      height: 56px;
      border-radius: 48px;
      background: #fff;
      box-shadow: 0 0 0 1px ${colors.shade};
      transition: all .2s;
    }
    button:hover {
      box-shadow: 4px 4px 0 1px ${colors.shade};
    }
    button:active {
      box-shadow: 0 0 0 1px ${colors.shade};
      transform: scale(.95);
    }
  `;
  document.head.appendChild(styles);

  // Add HTML UI elements (?)
  const uiContainer = document.createElement('div');
  uiContainer.style.cssText = 'position:absolute;inset:0;display:grid;overflow:hidden;pointer-events:none;';
  document.body.append(uiContainer);

  scoreCounters.style.cssText = 'display:flex;position:absolute;top:16px;left:16px;';
  scoreCounters.style.trasition = 'opacity 1s';
  scoreCounters.style.opacity = 0;

  oxCounterWrapper.style.cssText = 'display:flex;align-items:center;gap:8px;transition:width 1s,opacity 1s 1s';
  const oxCounterEmoji = emojiOx();
  oxCounterWrapper.style.width = 0;
  oxCounterWrapper.style.opacity = 0;
  oxCounterEmoji.style.width = '48px';
  oxCounterEmoji.style.height = '48px';
  oxCounterWrapper.append(oxCounterEmoji, oxCounter);

  goatCounterWrapper.style.cssText = 'display:flex;align-items:center;gap:8px;transition:width 1s,opacity 1s 1s';
  const goatCounterEmoji = emojiGoat();
  goatCounterWrapper.style.width = 0;
  goatCounterWrapper.style.opacity = 0;
  goatCounterEmoji.style.width = '48px';
  goatCounterEmoji.style.height = '48px';
  goatCounterWrapper.append(goatCounterEmoji, goatCounter);

  fishCounterWrapper.style.cssText = 'display:flex;align-items:center;gap:8px;transition:width 1s,opacity 1s 1s';
  const fishCounterEmoji = emojiFish();
  fishCounterWrapper.style.width = 0;
  fishCounterWrapper.style.opacity = 0;
  fishCounterEmoji.style.width = '48px';
  fishCounterEmoji.style.height = '48px';
  fishCounterWrapper.append(fishCounterEmoji, fishCounter);

  scoreCounters.append(oxCounterWrapper, goatCounterWrapper, fishCounterWrapper);

  clock.style.cssText = `
    position: absolute;
    top: 16px;
    right: 16px;
    display: grid;
    place-items: center;
    border-radius: 64px;
    background: ${colors.ui}
  `;
  clock.style.width = '80px';
  clock.style.height = '80px';
  clock.style.opacity = 0;
  clock.style.transition = 'opacity 1s';

  const clockSvg = createSvgElement('svg');
  clockSvg.setAttribute('stroke-linejoin', 'round');
  clockSvg.setAttribute('stroke-linecap', 'round');
  clockSvg.setAttribute('viewBox', '0 0 16 16');
  clockSvg.style.width = '80px';
  clockSvg.style.height = '80px';

  for (let i = 75; i < 350; i += 25) {
    const dot = createSvgElement('path');
    dot.setAttribute('fill', 'none');
    dot.setAttribute('stroke', '#eee');
    dot.setAttribute('transform-origin', 'center');
    dot.setAttribute('d', 'm8 14.5v0');
    dot.style.transform = `rotate(${i}grad)`;
    clockSvg.append(dot);
  }

  clockHand.setAttribute('stroke', '#eee');
  clockHand.setAttribute('transform-origin', 'center');
  clockHand.setAttribute('d', 'm8 4v4');
  clockSvg.append(clockHand);

  clockMonth.style.cssText = 'position:absolute;bottom:8px;font-size:16px;color:#eee';
  clockMonth.innerText = 'Feb'; // Temp until made dynamic

  clock.append(clockSvg, clockMonth);

  pathTilesIndicator.style.cssText = `
    position: absolute;
    display: grid;
    place-items: center;
    place-self: center;
    bottom: 20px;
    margin: 0 auto;
    border-radius: 20px;
    background: ${colors.ui};
  `;
  pathTilesIndicator.style.transform = 'rotate(-45deg)';
  pathTilesIndicator.style.opacity = 0;
  pathTilesIndicator.style.transition = 'scale.4s cubic-bezier(.5,2,.5,1), opacity 1s';
  pathTilesIndicator.style.width = '72px';
  pathTilesIndicator.style.height = '72px';
  pathTilesIndicatorCount.style.cssText = `
    display: grid;
    place-items: center;
    position: absolute;
    border-radius: 64px;
    border: 6px solid ${colors.ui};
    transform: translate(28px,28px) rotate(45deg);
    font-size: 20px;
    background: #eee;
    transition: all.5s;
  }`;
  pathTilesIndicatorCount.style.width = '28px';
  pathTilesIndicatorCount.style.height = '28px';
  const pathTilesSvg = createSvgElement('svg');
  pathTilesSvg.setAttribute('viewBox', '0 0 18 18');
  pathTilesSvg.style.width = '54px';
  pathTilesSvg.style.height = '54px';
  pathTilesSvg.style.transform = 'rotate(45deg)';
  const pathTilesSvgPath = createSvgElement('path');
  pathTilesSvgPath.setAttribute('fill', 'none');
  pathTilesSvgPath.setAttribute('stroke', '#eee');
  // pathTilesPath.setAttribute('stroke-linejoin', 'round');
  pathTilesSvgPath.setAttribute('stroke-linecap', 'round');
  pathTilesSvgPath.setAttribute('stroke-width', 2);
  pathTilesSvgPath.setAttribute('d', 'M11 1h-3q-2 0-2 2t2 2h4q2 0 2 2t-2 2h-6q-2 0-2 2t2 2h4q2 0 2 2t-2 2h-3');
  pathTilesSvg.append(pathTilesSvgPath);
  // pathTilesIndicatorInner.append(pathTilesSvg);
  // pathTilesIndicatorInner.style.width = '64px';
  // pathTilesIndicatorInner.style.height = '64px';
  // pathTilesIndicatorInner.style.borderRadius = '16px'; // The only non-"infinity"?
  pathTilesIndicator.append(pathTilesSvg, pathTilesIndicatorCount)

  uiContainer.append(scoreCounters, clock, pathTilesIndicator);
};
