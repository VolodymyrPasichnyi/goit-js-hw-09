import Notiflix from 'notiflix';


const firstDelay = document.querySelector('[name = delay]')
const delayStep = document.querySelector('[name = step]')
const amount = document.querySelector('[name = amount]')
const button = document.querySelector('button')


function createPromise(position, delay) {
  return new Promise((resolve, reject)=> {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
 })
}

button.addEventListener('click', (el) => {
  el.preventDefault()
  let delay = Number(firstDelay.value);
  let step = Number(delayStep.value);
  for (let i = 0; i < amount.value; i++) {
  createPromise(i + 1, i * step + delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
}
})