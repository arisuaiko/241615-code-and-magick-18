'use strict';

// константы, в которых записана ширина и высота облака, а так же отступы
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var GAP = 50;
var FONT_GAP = 16;
var barHeight = CLOUD_HEIGHT - GAP - FONT_GAP - GAP;
var BAR_WIDTH = 40;
var STAT_Y = CLOUD_HEIGHT - GAP;

// функция отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// нахождение максимального элемента в массиве times
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};
// рисуем гистограму
function drawColumn(ctx, names, i) {
  if (names[i] === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = 'hsl( 240,' + (25 + 70 * Math.random()) + '%, 50%)';
  }
}
window.renderStatistics = function (ctx, names, times) {
  // цвет тени, смещенной на 10пх вниз и вправо (110 и 60)
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  // цвет самого облака
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // рисуем надпись
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000000';
  ctx.fillText('Ура, вы победили!', CLOUD_X + 2 * FONT_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + 2 * FONT_GAP, CLOUD_Y + 2 * FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    drawColumn(ctx, names, i);
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, STAT_Y - FONT_GAP - (barHeight * times[i]) / maxTime + GAP, BAR_WIDTH, (barHeight * times[i]) / maxTime);
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, STAT_Y + 2.5 * FONT_GAP);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, STAT_Y - (barHeight * times[i]) / maxTime);
  }
};
