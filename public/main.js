var board = new Array();
var score = 0;
var over = false;
var gridContainer = document.getElementById('grid-container');


window.onload = function() {
    newGame(); 

}
function newGame() {
 /*    prepareForMobile(); */

    // 初始化盘格
    Init();
}

/* function prepareForMobile() {
    $('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius', 0.02 * gridContainerWidth);

    $('.grid-cell').css('width', cellSideLength);
    $('.grid-cell').css('height', cellSideLength);
    $('.grid-cell').css('border-radius', 0.02 * cellSideLength);

} */

document.getElementById("newGame").onclick = function() {
    Init();
    getOneNumber(); 
    getOneNumber();
}
// 按下W S A D分别是上下左右
$(document).keydown(function(event) {
    if( over ) {
        return;
    }
    switch(event.keyCode) {
        case 65: 
            if(moveLeft()) {
                updateView();

                getOneNumber();
                isGameOver();
            }
            break;
        case 87:
            if(moveTop()) {
                updateView();

                getOneNumber();
                isGameOver();
            }
            break;
        case 68:
            if(moveRight()) {
                updateView();

                getOneNumber();
                isGameOver();
            }
            break;
        case 83:
            if(moveDown()) {
                updateView();

                getOneNumber();
                isGameOver();
            }
            break;
        default: 
            break;
    }
}) 
 
function Init() {
    var gridCell;
    // 初始化整体框架
    for(var i = 0; i < 4; ++i) {
        for(var j = 0; j < 4; ++j) {
            gridCell = document.getElementById('grid-cell-' + i + '-' + j);
            gridCell.style.top = getTop(i) + 'px';
            gridCell.style.left = getLeft(j) + 'px'; 
        }
    }
    // 初始化数据数组
    for(var i = 0; i < 4; ++i) {
        board[i] = [];
        for(var j = 0; j < 4; ++j) {
            board[i][j] = 0;
        }
    }
    score = 0;

    updateView();
} 
// 每一次操作都要执行的函数，用来更新视图
function updateView() {
    var node;
    var arr = document.querySelectorAll(".number-cell");
    arr.forEach(function(value) {
        value.parentNode.removeChild(value);
    });
    for(var i = 0; i < 4; ++i) {
        for(var j = 0; j < 4; ++j) {
            node = document.createElement('div');
            node.className = 'number-cell';
            node.id = 'number-cell-' + i + '-' + j;
            gridContainer.appendChild(node); 
           /*  $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');  */
            var p = $("#number-cell-" + i + "-" + j); 
            if(!board[i][j]) {
                node.style.width = '0';
                node.style.height = '0';
                node.style.top = getTop(i) + 'px';
                node.style.left = getLeft(j) + 'px'; 

            } else {
                node.style.width = '100px';
                node.style.height = '100px';
                node.style.top = getTop(i) + 'px';
                node.style.left = getLeft(j) + 'px';
                node.style.backgroundColor = getNumberBgColor(board[i][j]);
                node.style.color = getNumberColor(board[i][j]);
                node.innerHTML = board[i][j];
            }
        }
    }

    var Score = $('#score');
    Score.css('animation-name', 'myAnimation');
    Score.css('animation-duration', '0.2s');
    Score.css('animation-timing-function', 'ease-in');
    document.getElementById('score').innerText = score;
}
// 随机一个空白位置生成一个2或者4
function getOneNumber() {
    // 随机一个生成数的位置
    // 以防寻找空位时发生死循环
    var time = 0;
    var randX = parseInt(Math.floor( Math.random() * 4 ));
    var randY = parseInt(Math.floor( Math.random() * 4 ));
    while( time < 50 ) {
        if(board[randX][randY] === 0) {
            break;
        }
        randX = parseInt(Math.floor( Math.random() * 4 ));
        randX = parseInt(Math.floor( Math.random() * 4 ));
        time ++;
        
    }
    // 随机一个数
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    // 显示这个随机数
     if( time === 50) {
        for(var i = 0; i < 4; ++i) {
            for(var j = 0; j < 4; ++j) {
                if( board[i][j] === 0 ) {
                    randX = i;
                    randY = j;
                }
            }
        }
     }
 
     board[randX][randY] = randNumber;
     showNumber(randX, randY, randNumber);  
     return true;
}
// 以下四个方法分别是上、下、左、右移动
function moveLeft() {
    // flag判断当前操作向左移动了
    var flag = false;
    // 保证 4 4 8 向左移动不会出现加到16的情况
    var k = 0;
    // move left
    for(var i = 0; i < 4; ++i) {
        for(var j = 1; j < 4; ++j) {
            // 只要格子有数字
            if( board[i][j] !== 0 ) {
                // 在该格子的左侧找到一个落脚点
                for( ; k < j; k++) {
                    if( board[i][k] === 0 && noBlockRow( i, k, j, board )) {
                        // 向左移动
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        flag = true;
                        break;
                    } else if( board[i][k] === board[i][j] && noBlockRow( i, k, j, board)) {
                        // 相同数字碰撞相加
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        k++;
                        flag = true;
                        break;
                    }
                }
            }
        }
        k = 0;
    }
    return flag;
}

function moveTop() {
    // move top
    var flag = false;
    var k = 0;
    for(var i = 0; i < 4; ++i) {
        for(var j = 1; j < 4; ++j) {
            // 只要格子有数字
            if( board[j][i] !== 0 ) {
                // 在该格子的上侧找到一个落脚点
                for(; k < j; k++) {
                    if( board[k][i] === 0 && noBlockCol( i, k, j, board )) {
                        // move
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        flag = true;
                        break;
                    } else if( board[k][i] === board[j][i] && noBlockCol( i, k, j, board)) {
                        //move
                        //add
                        board[k][i] += board[j][i];
                        board[j][i] = 0;
                        score += board[k][i];
                        k++;
                        flag = true;
                        break;
                    }
                }
            }
        }
        k = 0;
    }
    return flag;
}

function moveRight() {
    // move right
    var flag = false;
    var k = 3;
    for(var i = 0; i < 4; i++) {
        for(var j = 2; j >= 0; --j) {
            // 只要格子有数字
            if( board[i][j] !== 0 ) {
                // 在该格子的右侧找到一个落脚点
                for(; k > j; k--) {
                    if( board[i][k] === 0 && noBlockRow( i, j, k, board )) {
                        // move
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        flag = true;
                        break;
                    } else if( board[i][k] === board[i][j] && noBlockRow( i, j, k, board)) {
                        //move
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        k--;
                        flag = true
                        break;
                    }
                }
            }
        }
        k = 3;
    }
    return flag;
}

function moveDown() {
    // move down
    var flag = false;
    var k =3;
    for(var i = 0; i < 4; i++) {
        for(var j = 2; j >= 0; --j) {
            // 只要格子有数字
            if( board[j][i] !== 0 ) {
                // 在该格子的上侧找到一个落脚点
                for(; k > j; k--) {
                    if( board[k][i] === 0 && noBlockCol( i, j, k, board )) {
                        // move
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        flag = true;
                        break;
                    } else if( board[k][i] === board[j][i] && noBlockCol( i, j, k, board)) {
                        //move
                        //add
                        board[k][i] += board[j][i];
                        board[j][i] = 0;
                        score += board[k][i];
                        k--;
                        flag = true;
                        break;
                    }
                }
            }
        }
        k = 3;
    }
    return flag;

}

function isGameOver() {

}

