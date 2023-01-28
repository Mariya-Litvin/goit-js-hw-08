// Завдання 3 - форма зворотного зв'язку

// HTML містить розмітку форми.Напиши скрипт, який буде
// зберігати значення полів у локальне сховище,
//     коли користувач щось друкує.

//  Виконуй це завдання у файлах 03 - feedback.html і 03 - feedback.js.
//   Розбий його на декілька підзавдань:

// 1. Відстежуй на формі подію input, і щоразу записуй у
// локальне сховище об'єкт з полями email і message,
// у яких зберігай поточні значення полів форми.Нехай ключем
// для сховища буде рядок "feedback-form-state".
// 2. Під час завантаження сторінки перевіряй стан сховища,
// і якщо там є збережені дані, заповнюй ними поля форми.
// В іншому випадку поля повинні бути порожніми.
// 3. Під час сабміту форми очищуй сховище і поля форми, а
// також виводь у консоль об'єкт з полями email, message та
// їхніми поточними значеннями.
// 4. Зроби так, щоб сховище оновлювалось не частіше, ніж
// раз на 500 мілісекунд. Для цього додай до проекту і
// використовуй бібліотеку lodash.throttle.

import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

const LOCAL_STORAGE_KEY = 'feedback-form-state';

setInputOnForm();

// - Останавливаем поведение по умолчанию
// - Если не все поля заполнены - выводим сообщение
//  - Убираем сообщение из хранилища
//  - Очищаем форму

function onFormSubmit(event) {
  event.preventDefault();

  if (form.elements.email.value === '' || form.elements.message.value === '') {
    return alert('Please fill in all the fields!');
  }

  console.log({
    email: form.elements.email.value,
    message: form.elements.message.value,
  });
  event.currentTarget.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

//  - Получаем значение полей
//  - Сохраняем их в хранилище

function onFormInput(event) {
  const formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

//  - Получаем значение из хранилища
//  - Если там что-то было, обновляем DOM

function setInputOnForm() {
  const savedMessage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (savedMessage) {
    form.elements.email.value = savedMessage.email;
    form.elements.message.value = savedMessage.message;
  }
}
