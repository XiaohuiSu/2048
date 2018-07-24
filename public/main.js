var board = new Array();
var score = 0;
var over = false;

var begin = false;
var gridContainer = document.getElementById('grid-container');

var startX = 0,
    startY = 0,
    endX = 0,
    endY = 0;

window.onload = function() {
    newGame(); 

}
function newGame() {
    prepareForMobile(); 

    // 初始化盘格
    Init();

}

function prepareForMobile() {

    if( documentWidth > 600 ) {
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius', 0.02 * gridContainerWidth);

    $('.grid-cell').css('width', cellSideLength);
    $('.grid-cell').css('height', cellSideLength);
    $('.grid-cell').css('border-radius', 0.02 * cellSideLength);

} 

document.getElementById("newGame").onclick = function() {
    begin = true;
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
        case 37: 
            if(moveLeft()) {
                event.preventDefault();
                updateView();

                getOneNumber();
                isGameOver();
            }
            break;
        case 38:
            if(moveTop()) {
                event.preventDefault();

                updateView();

                getOneNumber();
                isGameOver();
            }
            break;
        case 39:
            if(moveRight()) {
                event.preventDefault();

                updateView();

                getOneNumber();
                isGameOver();
            }
            break;
        case 40:
            if(moveDown()) {
                event.preventDefault();

                updateView();

                getOneNumber();
                isGameOver();
            }
            break;
        default: 
            break;
    }
}) 

document.addEventListener('touchstart', function(event) {
    if(begin)
    event.preventDefault(); 

    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});

document.addEventListener('touchmove', function(event) {
    event.preventDefault();
});

document.addEventListener('touchend', function(event) {
   /*  event.preventDefault(); */

    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    var disX = endX - startX;
    var disY = endY - startY;
    if(Math.abs(disX) < 0.2 * documentWidth && Math.abs(disY) < 0.3 * documentWidth) {
        return;
    }
    if(Math.abs(disX) > Math.abs(disY)) {
        // 横向滑动
        if(disX > 0) {
            // 向右滑动
            if(moveRight()) {
                 event.preventDefault(); 
                 updateView();
 
                 getOneNumber();
                 isGameOver();
             }
        } else {
            // 向左滑动
            if(moveLeft()) {
                event.preventDefault(); 
                updateView();

                getOneNumber();
                isGameOver();
            }
        }

    } else {
        // 竖向滑动
        if(disY > 0) {
            // 向下滑动
            if(moveDown()) {
                 event.preventDefault(); 
                 updateView();
 
                 getOneNumber();
                 isGameOver();
             }
        } else {
            // 向上滑动
            if(moveTop()) {
                event.preventDefault(); 
                 updateView();
 
                 getOneNumber();
                 isGameOver();
             }
        }

    }

});

 
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
    
   /*  $('.number-cell').remove(); */
  /*    arr.forEach(function(value) {
        gridContainer.removeChild(value);
    });  */

    // 有些手机浏览器不支持forEach
    for(var k = 0; k < arr.length; ++k) {
        arr[k].parentNode.removeChild(arr[k]);
    }
 
    for(var i = 0; i < 4; ++i) {
        for(var j = 0; j < 4; ++j) {
            node = document.createElement('div');
            node.className = 'number-cell';
            node.id = 'number-cell-' + i + '-' + j;
            gridContainer.appendChild(node); 
           /*  $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');  */
         /*    var p = $("#number-cell-" + i + "-" + j);  */
            if(!board[i][j]) {
                node.style.width = '0';
                node.style.height = '0';
                node.style.top = getTop(i) + 'px';
                node.style.left = getLeft(j) + 'px'; 

            } else {
                node.style.width = cellSideLength + 'px';
                node.style.height = cellSideLength + 'px';
                node.style.top = getTop(i) + 'px';
                node.style.left = getLeft(j) + 'px';
                node.style.backgroundColor = getNumberBgColor(board[i][j]);
                node.style.color = getNumberColor(board[i][j]);
                node.innerHTML = board[i][j];
            }
        }
    }

    $('.number-cell').css('line-height', cellSideLength + 'px');
    $('.number-cell').css('font-size', 0.6 * cellSideLength + 'px'); 

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
     return ;
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

