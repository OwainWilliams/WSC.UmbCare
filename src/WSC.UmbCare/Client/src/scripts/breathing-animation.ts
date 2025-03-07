export function startBreathingAnimation(target:ShadowRoot) {

  const countdownElement = target.querySelector('.countdown') as HTMLDivElement;
  const ballElement = target.querySelector('.ball') as HTMLDivElement;
  const textElement = target.querySelector('.breath-text') as HTMLDivElement;
  const boxCountdownElement = target.querySelector('.box-countdown') as HTMLDivElement;

countdownElement.textContent = "It's time to breathe";

  const phases = ["Inhale", "Hold", "Exhale", "Hold"];
  let phaseIndex = 0;
  let boxCountdown = 4;

  textElement.textContent = phases[phaseIndex];
  boxCountdownElement.textContent = boxCountdown.toString();


  //Controls the ball - 4 second timer
  setInterval(() => {
    phaseIndex = (phaseIndex + 1) % phases.length;
    textElement.textContent = phases[phaseIndex];
    boxCountdown = 5;
    boxCountdownElement.textContent = boxCountdown.toString();
    ballElement.style.animationPlayState = 'running';
  }, 4000);


  //Controls the countdown per phase - 1 second timer
  setInterval(() => {
    if (boxCountdown > 0) {
      boxCountdown--;
      boxCountdownElement.textContent = boxCountdown.toString();
    }
  }, 1000);
}
