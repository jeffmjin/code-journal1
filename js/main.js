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

  if (data.editing === null) {
    data.nextEntryId++;
    var entries = {
      title: $form.elements.name.value,
      url: $form.elements.url.value,
      notes: $form.elements.notes.value,
      entryId: data.nextEntryId
    };

    data.entries.unshift(entries);
    $ul.prepend(journal(entries));
  } else {

    for (var z = 0; z < data.entries.length; z++) {
      if (data.entries[z].entryId === data.editing.entryId) {
        var newEntries = {
          title: $form.elements.name.value,
          url: $form.elements.url.value,
          notes: $form.elements.notes.value,
          entryId: data.nextEntryId
        };
        var allLi = document.querySelectorAll('li');
        var editing = Number(allLi[z].closest('li').getAttribute('data-entry-id'));
        if (data.editing.entryId === editing) {
          var editingEntry = journal(newEntries);
          allLi[z].replaceWith(editingEntry);
        }
        data.entries.splice(z, 1, newEntries);
      }
    }
  }
  $photo.setAttribute('src', '/images/placeholder-image-square.jpg');
  $form.reset();
  viewChange('entries');
  data.editing = null;
}

function journal(entry) {

  var $list = document.createElement('li');
  $list.setAttribute('class', 'row margin-bot');
  $list.setAttribute('data-entry-id', entry.entryId);

  var $colHalfOne = document.createElement('div');
  $colHalfOne.setAttribute('class', 'column-half');

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.url);

  var $colHalfTwo = document.createElement('div');
  $colHalfTwo.setAttribute('class', 'column-half');

  var $hElement = document.createElement('h3');
  $hElement.setAttribute('class', 'list input-media h-dom d-flex');
  $hElement.textContent = entry.title;

  var $pElement = document.createElement('p');
  $pElement.textContent = entry.notes;

  var $pen = document.createElement('i');
  $pen.setAttribute('class', 'fa-solid fa-pen');

  $list.appendChild($colHalfOne);
  $list.appendChild($colHalfTwo);
  $colHalfOne.appendChild($img);
  $colHalfTwo.appendChild($hElement);
  $hElement.appendChild($pen);
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
$ul.addEventListener('click', handleClickIcon);

function handleClickIcon(event) {
  if (event.target.tagName === 'I') {
    var editClosest = parseInt(event.target.closest('li').getAttribute('data-entry-id'));
    for (var x = 0; x < data.entries.length; x++) {
      if (data.entries[x].entryId === editClosest) {
        data.editing = data.entries[x];
        handleEditEntry(data.editing);
      }
    }
  }
}

var $editHeading = document.querySelector('.new-entry-text');
var $editTitle = document.querySelector('#title');
var $notes = document.querySelector('#notes');

function handleEditEntry(entry) {
  $editHeading.textContent = 'Edit Entry';
  $editTitle.value = entry.title;
  $photo.src = entry.url;
  $url.value = entry.url;
  $notes.value = entry.notes;
  viewChange('entry-form');
}

var $modal = document.querySelector('#modal');
var $cancel = document.querySelector('.cancel-button');
var $confirm = document.querySelector('.confirm-button');
var $delete = document.querySelector('.delete');

$delete.addEventListener('click', function (event) {
  $modal.className = 'modal-container';
});
