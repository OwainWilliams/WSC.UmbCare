export function startBreathingAnimation(target: ShadowRoot) {
  const ballElement = target.querySelector('.ball') as HTMLDivElement;
  const textElement = target.querySelector('.breath-text') as HTMLDivElement;
  const boxCountdownElement = target.querySelector('.box-countdown') as HTMLDivElement;

  const phases = ["Breathe In", "Hold", "Breathe Out", "Hold"];
  let phaseIndex = 0;
  let boxCountdown = 4;

  const updatePhase = () => {
    phaseIndex = (phaseIndex + 1) % phases.length;
    textElement.textContent = phases[phaseIndex];
    boxCountdown = 5;
    boxCountdownElement.textContent = boxCountdown.toString();
    ballElement.style.animationPlayState = 'running';
  };

  const updateCountdown = () => {
    if (boxCountdown > 0) {
      boxCountdown--;
      boxCountdownElement.textContent = boxCountdown.toString();
    }
  };

  textElement.textContent = phases[phaseIndex];
  boxCountdownElement.textContent = boxCountdown.toString();

  setInterval(updatePhase, 4000);
  setInterval(updateCountdown, 1000);
}
