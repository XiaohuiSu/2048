// 每生成一个数的动画效果
function showNumber(i, j, randNumber) {
    var node = $("#number-cell-" + i + "-" + j);

    node.css("background-color", getNumberBgColor(randNumber));
    node.css("color", getNumberColor(randNumber));

    node.css("width", cellSideLength);
    node.css("height", cellSideLength);
    node.text(randNumber);
    node.css('animation-name', 'myAnimation');
    node.css('animation-duration', '0.2s');
    node.css('animation-timing-function', 'ease-in');
    
} 
