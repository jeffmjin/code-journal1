var $url = document.querySelector('#url');
var $photo = document.querySelector('#image');
var $form = document.querySelector('#form');

$url.addEventListener('input', handleInput);

function handleInput(event) {
  if ($photo === '') {
    $photo.setAttribute('src', '/images/placeholder-image-square.jpg');
  } else {
    $photo.setAttribute('src', $form.elements.url.value);
  }
}
