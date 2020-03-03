var submitForm = document.querySelector('.contest__btn');
var modalSuccess = document.querySelector('.success');
var closeSuccess = modalSuccess.querySelector('.modal__btn');

submitForm.addEventListener("click", function(event) {
  event.preventDefault();
  modalSuccess.classList.add("modal--show");
});

closeSuccess.addEventListener("click", function(event) {
  event.preventDefault();
  modalSuccess.classList.remove("modal--show");
});