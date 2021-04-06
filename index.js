const name = document.querySelector('.modal__name');
const email = document.querySelector('.modal__email');
const phone = document.querySelector('.modal__phone');
const modalError = document.querySelectorAll('.modal__error');
const inputs = Array.from(document.querySelectorAll('input'));
const inputsForValidation = setValidationFields();
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

document.body.addEventListener('click', (event) => {
  event.preventDefault();

  if (event.target.dataset.id === 'pre-order') {
    openModal();
  }

  if (
    event.target.classList.contains('modal__close') ||
    event.target.classList.contains('overlay')
  ) {
    closeModal();
  }

  if (event.target.classList.contains('modal__submit')) {
    setValidationError();
    clearValidationError();
  }
});

function openModal() {
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
  overlay.style.zIndex = '2';
  modal.style.transform = 'translateY(0)';
}

function closeModal() {
  modal.style.transform = 'translateY(-100vh)';
  setTimeout(() => {
    overlay.style.backgroundColor = 'transparent';
    overlay.style.zIndex = '-1';
  }, 300);
}

function setValidationFields() {
  const res = [];

  inputs.forEach((input) => {
    if (
      input.classList.contains('modal__name') ||
      input.classList.contains('modal__email')
    ) {
      res.push(input);
    }
  });

  return res;
}

function setValidationError() {
  const res = [];

  inputsForValidation.forEach((input) => {
    if (!input.value) {
      input.previousElementSibling.style.opacity = '1';
      input.style.border = '1px solid red';
    } else {
      input.previousElementSibling.style.opacity = '0';
      input.style.border = '1px solid rgba(123, 139, 173, 1)';
      res.push(input.value);
    }
  });

  return res;
}

function clearValidationError() {
  const clientData = setValidationError();
  const phone = inputs.find((input) =>
    input.classList.contains('modal__phone')
  );

  if (clientData && clientData.length === 2) {
    clientData.push(phone.value || 'Phone number is missing');
    inputs.forEach((input) => (input.value = ''));
    setTimeout(() => {
      closeModal();
    }, 200);
  } else {
    return;
  }
}

function emailValidator() {
  const email = document.querySelector('.modal__email');

  email.addEventListener('change', () => {
    const regExp = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
    const isValid = regExp.test(email.value);

    if (!isValid) {
      email.value = '';
    }
  });
}

emailValidator();
