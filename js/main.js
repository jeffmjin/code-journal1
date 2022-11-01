/* global data */

var $url = document.querySelector('#url');
var $photo = document.querySelector('#image');
var $form = document.querySelector('#form');

$url.addEventListener('input', handleInput);
$form.addEventListener('submit', handleSubmit);

function handleInput(event) {
  if ($photo === '') {
    $photo.setAttribute('src', '/images/placeholder-image-square.jpg');
  } else {
    $photo.setAttribute('src', $form.elements.url.value);
  }
}

function handleSubmit(event) {

  var entries = {
    title: $form.elements.name.value,
    url: $form.elements.url.value,
    notes: $form.elements.notes.value
  };

}
