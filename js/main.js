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
  event.preventDefault();

  data.nextEntryId++;
  var entries = {
    title: $form.elements.name.value,
    url: $form.elements.url.value,
    notes: $form.elements.notes.value,
    entryId: data.nextEntryId
  };

  data.entries.unshift(entries);
  $photo.setAttribute('src', '/images/placeholder-image-square.jpg');
  $form.reset();

}

function journal(entry) {
  /* <li class="row margin-bot">
      <div class="column-half">
        <img src="/images/placeholder-image-square.jpg">
      </div>
      <div class="column-half">
        <h3 class="list input-media">Some dummy title</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Quod nobis dolores, quidem nisi necessitatibus id fugit repellat laudantium dolorem odio fuga placeat illo saepe,
          ullam rem quasi facere accusantium veritatis.
        </p>
      </div>
    </li> */

  var $list = document.createElement('li');
  $list.setAttribute('class', 'row margin-bot');

  var $colHalfOne = document.createElement('div');
  $colHalfOne.setAttribute('class', 'column-half');

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.url);

  var $colHalfTwo = document.createElement('div');
  $colHalfTwo.setAttribute('class', 'column-half');

  var $hElement = document.createElement('h3');
  $hElement.setAttribute('class', 'list input-media');
  $hElement.textContent = entry.title;

  var $pElement = document.createElement('p');
  $pElement.textContent = entry.notes;

  $list.appendChild($colHalfOne);
  $list.appendChild($colHalfTwo);
  $colHalfOne.appendChild($img);
  $colHalfTwo.appendChild($hElement);
  $colHalfTwo.appendChild($pElement);

  return $list;
}

var $ul = document.querySelector('.unordered');

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var $entries = journal(data.entries[i]);
    $ul.appendChild($entries);
  }
});
