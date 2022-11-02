/* global data */

var $url = document.querySelector('#url');
var $photo = document.querySelector('#image');
var $form = document.querySelector('#form');
var $divNewEntry = document.querySelector('#div-new-entry');
var $divEntries = document.querySelector('#div-entries');
var $anchorEntry = document.querySelector('.a-entries');
var $anchorNew = document.querySelector('.new-button');

$url.addEventListener('input', handleInput);
$form.addEventListener('submit', handleSubmit);

$anchorEntry.addEventListener('click', function () {
  viewChange('entries');
});

$anchorNew.addEventListener('click', function () {
  viewChange('entry-form');
});

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
  $ul.prepend(journal(entries));
  viewChange('entries');

}

function journal(entry) {

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
  viewChange(data.view);
});

function viewChange(view) {
  data.view = view;
  if (view === 'entry-form') {
    $divEntries.className = 'hidden';
    $divNewEntry.className = 'new-entry';
  }
  if (view === 'entries') {
    $divNewEntry.className = 'hidden';
    $divEntries.className = '';
  }
}
