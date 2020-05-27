let submitForm = document.querySelector('.contest__form');
let modalStatusOk = document.querySelector('.status--ok');
let closeStatusOk = modalStatusOk.querySelector('.status__btn');

submitForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  modalStatusOk.classList.remove('visually-hidden');
});

closeStatusOk.addEventListener('click', function() {
  modalStatusOk.classList.add('visually-hidden');
});
