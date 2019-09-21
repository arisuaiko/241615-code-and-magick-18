'use strict';
var WIZARD_AMOUNT = 4;
var WIZARDS_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_CLOTHS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

// Функция, возвращающая случайный элемемент массива
function getRandomElement(array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * array.length);
  }
  var randomElement = array[randomIndex];
  return randomElement;
}
// Функция, генерирующая массив объектов
function generateWizard() {
  var newWizards = [];
  for (var i = 0; i < WIZARD_AMOUNT; i++) {
    newWizards.push({
      'name': WIZARDS_NAMES[i] + ' ' + WIZARDS_SURNAMES[i],
      'coatColor': getRandomElement(WIZARD_CLOTHS_COLORS),
      'eyesColor': getRandomElement(WIZARD_EYES_COLORS)
    }
    );
  }
  return newWizards;
}
var similarWizards = generateWizard();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

  return wizardElement;
};


var fragment = document.createDocumentFragment();
for (var i = 0; i < similarWizards.length; i++) {
  fragment.appendChild(renderWizard(similarWizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
