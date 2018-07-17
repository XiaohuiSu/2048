
/* var documentWidth = window.screen.availWidth;
var gridContainerWidth = 0.92 * documentWidth;
var cellSideLength = 0.18 * documentWidth;
var cellSpace = 0.04 * documentWidth; */

function getTop(i) {
    return 20 + i * 120;
}

function getLeft(j) {
    return 20 + j * 120;
}
// 不同数字对应不用的背景颜色
function getNumberBgColor(value) {
    switch(value) {
        case 2: return '#eee4da'; break;
        case 4: return '#ede0c8'; break;
        case 8: return '#f2b179'; break;
        case 16: return '#f59563'; break;
        case 32: return '#f67c5f'; break;
        case 64: return '#f6513b'; break;
        case 128: return '#edcf72'; break;
        case 256: return '#edcc61'; break;
        case 512: return '#9c0'; break;
        case 1024: return '#33b5e5'; break;
        case 2048: return '#09c'; break;
        case 4096: return '#a6c'; break;
        case 8192: return '#93c'; break;
    }
    return 'black';

}
// 字体颜色
function getNumberColor(value) {
    if(value <= 4) {
        return '#776e65';
    }
    return 'white'
}

// 判断横向是否有障碍
function noBlockRow( row, col1, col2, board ) {
    for(var i = col1 + 1; i < col2; ++i ) {
        if( board[row][i] !== 0 ){
            return false;
        }
    }
    return true;
}

function noBlockCol( col, row1, row2, board ) {
    for(var i = row1 + 1; i < row2; ++i) {
        if( board[i][col] !== 0 ) {
            return false;
        }
    }
    return true;
}

