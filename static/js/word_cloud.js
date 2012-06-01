var screenSizeX = 300;
var screenSizeY = 100;
var fontType = "px Courier New";
var hasRead = false
var lastTxt, rect, newRect, bitree;
var centerPoint = new Point(screenSizeX / 2, screenSizeY / 2);
function Word(str, size, color, x, y, sizeX, sizeY, offsetX, offsetY) {
    this.str = str;
    this.size = size;
    this.color = color;
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
}
function Rectangle(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
}
function Point(x, y) {
    this.x = x;
    this.y = y;
}
function BItree() {
    var tree = new Array();
    var vis = new Array();
    for (var i = 0; i <= screenSizeX; i++) {
        tree.push(new Array(screenSizeY + 1));
        vis.push(new Array(screenSizeY + 1));
    }
    for (var i = 0; i <= screenSizeX; i++)
        for (var j = 0; j <= screenSizeY; j++) {
            tree[i][j] = 0;
            vis[i][j] = false;
        } 
    function lowbit(x) {return x & (-x);}
    this.update = function(x, y) {
        if (vis[x][y]) return;
        vis[x][y] = true;
        for (var i = x + 1; i <= screenSizeX; i += lowbit(i))
            for (var j = y + 1; j <= screenSizeY; j += lowbit(j))
                tree[i][j]++;
    } 
    this.query = function(x, y) {
        var ans = 0;
        for (var i = x + 1; i > 0; i -= lowbit(i))
            for (var j = y + 1; j > 0; j -= lowbit(j))
                ans += tree[i][j];
        return ans;
    }
}

function dist(p1, p2) {
    return Math.sqrt((p1.x - p2.x) * (p1.x -p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}
//***********************Bublle Sort********************//
function BubbleSort()
{
    for (var i=0;i<words.length-1;i++)
        for (var j=i;j<words.length;j++)
            if (words[j].size>words[i].size)
            {
                var temp=words[j];
                words[j]=words[i];
                words[i]=temp;
            }
}
//***********************init***************************//
function init() {
    hasRead = true;
    lastTxt = new String();
    words = new Array();
    var txt = "程序设计|HTML5|编程之美|ACM|QQ|人人|微博|竞赛|社交化|博创杯|大神|Midas|中山大学";
    var i = 0, j = 0;
    while (j < txt.length) {
        var str = new String;
        var	num = new String;
        while (txt[j] != '|' && j < txt.length)
	        str += txt[j++];		
	    words.push(new Word(str, 14+i*2, randomColor(), 0, 0, 0, 0, 0, 0));
        j++; i++;
    }
    BubbleSort();
}
//***********************guess***************************//
function guessX() {
    return screenSizeX;
}
function guessY() {
    return screenSizeY;
}
//***********************getRect***************************//
function getRect() {
    var cxt = document.getElementById("canvasId").getContext("2d");
    for (var i = 0; i < words.length; i++) {
        cxt.fillStyle="#FFFFFF";
		cxt.fillRect(0, 0, screenSizeX, screenSizeY);
        cxt.font = words[i].size + fontType;
        cxt.fillStyle = words[i].color;
        cxt.fillText(words[i].str, 0, screenSizeY / 2);
        
        var gX = guessX(words[i]);
        var gY = guessY(words[i]);
        var x = 0;
        var y = Math.floor(Math.max(0, screenSizeY / 2 - gY));
        var w = Math.floor(Math.min(screenSizeX - x, gX * 1.5));
        var h = Math.floor(Math.min(screenSizeY - y, gY * 1.5));
        var imageData=document.getElementById("canvasId").getContext("2d").getImageData(x, y, w, h);
        var pix=imageData.data;
        var maxX = 0, maxY = 0, minX = screenSizeX, minY = screenSizeY;
		for (var j = 0; j < pix.length; j++) {
		    var sign = false;
		    if (pix[j++] != 255) sign = true;
            if (pix[j++] != 255) sign = true;
            if (pix[j++] != 255) sign = true;
			if (sign) {
			    var index = Math.floor(j / 4);
			    minX = Math.min(minX, index % screenSizeX);
			    maxX = Math.max(maxX, index % screenSizeX);
			    minY = Math.min(minY, Math.floor(index / screenSizeX));
			    maxY = Math.max(maxY, Math.floor(index / screenSizeX));
			}
		}
		words[i].sizeX = maxX - minX + 1;
		words[i].sizeY = maxY - minY + 1;
		words[i].offsetX = minX;
		words[i].offsetY = maxY - screenSizeY / 2;
    }
    cxt.fillStyle = "#FFFFFF";
    cxt.fillRect(0, 0, screenSizeX, screenSizeY);
}
//***********************canPush***************************//
function canPush(unitRect) {
    if (unitRect.x1 < 0 || unitRect.y1 < 0) return false;
    if (unitRect.x2 > screenSizeX || unitRect.y2 > screenSizeY) return false;
    var sum1 = bitree.query(unitRect.x2 - 1, unitRect.y2 - 1);
    var sum2 = bitree.query(unitRect.x1 - 1, unitRect.y1 - 1);
    var sum3 = bitree.query(unitRect.x1 - 1, unitRect.y2 - 1);
    var sum4 = bitree.query(unitRect.x2 - 1, unitRect.y1 - 1);
    return sum1 + sum2 - sum3 - sum4 == 0;
}
//***********************updateBItree*************************//
function updateBItree(unitRect) {
    var w = unitRect.x2 - unitRect.x1;
    var h = unitRect.y2 - unitRect.y1;
    var imageData=document.getElementById("canvasId").getContext("2d").getImageData(unitRect.x1, unitRect.y1, w, h);
    var pix=imageData.data;
	for (var j = 0; j < pix.length; j++) {
	    var sign = false;
	    if (pix[j++] != 255) sign = true;
        if (pix[j++] != 255) sign = true;
        if (pix[j++] != 255) sign = true;
		if (sign) {
		    var index = Math.floor(j / 4);
		    bitree.update(index % w + unitRect.x1, Math.floor(index / w) + unitRect.y1);
		}
	}
}
//***********************isBetterPoint*************************//
function betterPoint(p1, p2, word) {
    if (!canPush(new Rectangle(p2.x, p2.y, p2.x + word.sizeX, p2.y + word.sizeY))) return p1;
    var p1c = new Point(p1.x + word.sizeX / 2, p1.y + word.sizeY / 2);
    var p2c = new Point(p2.x + word.sizeX / 2, p2.y + word.sizeY / 2);
    if (dist(p1c, centerPoint) < dist(p2c, centerPoint)) return p1;
        else return p2; 
}


//***********************getBestPoint*************************//
function getBestPoint(word) {
    var retP = new Point(0, 0);
    for (var i = 0; i < rect.length; i++) {
        var p1 = new Point(rect[i].x1, rect[i].y1);
        var p2 = new Point(rect[i].x1, rect[i].y2 - word.sizeY);
        var p3 = new Point(rect[i].x2 - word.sizeX, rect[i].y1);
        var p4 = new Point(rect[i].x2 - word.sizeX, rect[i].y2 - word.sizeY);
        retP = betterPoint(retP, p1, word);
        retP = betterPoint(retP, p2, word);
        retP = betterPoint(retP, p3, word);
        retP = betterPoint(retP, p4, word);
    }
    return retP;
}
//***********************splitUnitRect***************************//
function splitUnitRect(unitRect) {
    if (unitRect.x2 - unitRect.x1 < 8) return;
    var cPoint = new Point(Math.floor((unitRect.x1 + unitRect.x2) / 2), Math.floor((unitRect.y1 + unitRect.y2) / 2));
    var rect1 = new Rectangle(unitRect.x1, unitRect.y1, cPoint.x, cPoint.y);
    var rect2 = new Rectangle(unitRect.x1, cPoint.y, cPoint.x, unitRect.y2);
    var rect3 = new Rectangle(cPoint.x, unitRect.y1, unitRect.x2, cPoint.y);
    var rect4 = new Rectangle(cPoint.x, cPoint.y, unitRect.x2, unitRect.y2);
    if (!canPush(rect1)) splitUnitRect(rect1);
        else newRect.push(rect1);
    if (!canPush(rect2)) splitUnitRect(rect2);
        else newRect.push(rect2);
    if (!canPush(rect3)) splitUnitRect(rect3);
        else newRect.push(rect3);
    if (!canPush(rect4)) splitUnitRect(rect4);
        else newRect.push(rect4);
}

//***********************splitRect***************************//
function splitRect() {
    newRect = new Array();
    for (var i = 0; i < rect.length; i++) 
        if (canPush(rect[i])) newRect.push(rect[i]);
    for (var i = 0; i < rect.length; i++)
        if (!canPush(rect[i])) splitUnitRect(rect[i]);
    
    rect = new Array();
    for (var i = 0; i < newRect.length; i++) {
        var sign = true;
        for (var j = 0; j < rect.length; j++) {
            var canMerger = false;
            if (newRect[i].x2 - newRect[i].x1 == rect[j].x2 - rect[j].x1 && newRect[i].x1 == rect[j].x1 && (newRect[i].y1 == rect[j].y2 || newRect[i].y2 == rect[j].y1)) canMerger = true;
            if (newRect[i].y2 - newRect[i].y1 == rect[j].y2 - rect[j].y1 && newRect[i].y1 == rect[j].y1 && (newRect[i].x1 == rect[j].x2 || newRect[i].x2 == rect[j].x1)) canMerger = true;
            if (canMerger) {
                var x1 = Math.min(rect[j].x1, newRect[i].x1);
                var y1 = Math.min(rect[j].y1, newRect[i].y1);
                var x2 = Math.max(rect[j].x2, newRect[i].x2);
                var y2 = Math.max(rect[j].y2, newRect[i].y2);
                if (x2 - x1 <= screenSizeX / 10 && y2 - y1 <= screenSizeY / 5) {
                    sign = false;
                    rect[j].x1 = x1;
                    rect[j].y1 = y1;
                    rect[j].x2 = x2;
                    rect[j].y2 = y2;
                    break;
                }
            }
        }
        if (sign) rect.push(newRect[i]);
    }
}

//**********************randomColor*******************//
		function randomColor()
		{
			var colors = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
            var color = '#';
            var brush = Math.random()*30;
			for (var i = 0; i < 6; i++) 
			{
                index = Math.round(Math.random() * 15);
                color += colors[index];
            }
			return color;
		}

//***********************getPlace***************************//
function paint() {
    bitree = new BItree();
    rect = new Array();
    for (var i = 0; i < 10; i++)
        for (var j = 0; j < 5; j++) {
            var x1 = Math.floor(i * (screenSizeX / 10));
            var y1 = Math.floor(j * (screenSizeY / 5));
            var x2 = Math.floor((i + 1) * (screenSizeX / 10));
            var y2 = Math.floor((j + 1) * (screenSizeY / 5));
            rect.push(new Rectangle(x1, y1, x2, y2));
        }
            
    var cxt = document.getElementById("canvasId").getContext("2d");
    for (var i = 0; i < words.length; i++) {
        p = getBestPoint(words[i]);
        
        words[i].x = p.x;
        words[i].y = p.y;
        cxt.font = words[i].size + fontType;
        cxt.fillStyle = words[i].color;
        cxt.fillText(words[i].str, words[i].x - words[i].offsetX, words[i].y + words[i].sizeY - words[i].offsetY);
        
        updateBItree(new Rectangle(words[i].x, words[i].y, words[i].x + words[i].sizeX, words[i].y + words[i].sizeY));
        splitRect();
    }
}
//***********************getRandom************************//
function getRandom(n)
{
  return Math.round(Math.random(n))+1;
}

//***********************draw***************************//
function draw() 
{
    init();
    getRect();
    paint();
}

$(document).ready(function()
        {
            $(".user_image").mouseover(function()
                {
                    $("#canvasId").slideToggle("slow");
                    draw();
                })
            $(".user_image").mouseout(function()
                                      {
                                        $("#canvasId").hide();
                                      }
                                     )
        })
