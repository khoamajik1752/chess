var moveUnit=70;
var BOARD_HEIGHT=490; 
var currentTeam="whitechess";
let elList=new Array();
initChess();
updateTeam();
function initChess(){
    initPawn();
    initKing();
    initQueen();
    initKnight();
    initRock();
    initBishop();
}
function initPawn()
{
    var whitePawn=document.querySelectorAll('.whitepawn');

    var move=0;
    for(var i=0;i<whitePawn.length;i++)
    {
        whitePawn[i].style.top=420 + 'px';
        whitePawn[i].style.left=move +'px';
        move=move+moveUnit;
    }
    move=0;

    var blackPawn=document.querySelectorAll('.blackpawn');
    for(var i=0;i<blackPawn.length;i++)
    {
        blackPawn[i].style.top=70 + 'px';
        blackPawn[i].style.left=move +'px';
        move=move+moveUnit;
    }
}

function initKing(){
    var whiteKing=document.querySelector('.whiteking');
    whiteKing.style.top=490+'px';
    whiteKing.style.left=280+'px';

    var blackKing=document.querySelector('.blackking');
    blackKing.style.top=0+'px';
    blackKing.style.left=210+'px';

}

function initQueen(){
    var whiteQueen=document.querySelector('.whitequeen');
    whiteQueen.style.top=490+'px';
    whiteQueen.style.left=210+'px';
    var blackQueen=document.querySelector('.blackqueen');
    blackQueen.style.top=0+'px';
    blackQueen.style.left=280+'px';
}
function initKnight(){
    var whiteKnight=document.querySelectorAll('.whiteknight');
    var move=70;
    for(var i=0;i<whiteKnight.length;i++)
    {
        whiteKnight[i].style.top=490 + 'px';
        whiteKnight[i].style.left=move +'px';
        move=move+moveUnit*5;
    }
    var blackKnight=document.querySelectorAll('.blackknight');
    move=70;
    for(var i=0;i<whiteKnight.length;i++)
    {
        blackKnight[i].style.top=0 + 'px';
        blackKnight[i].style.left=move +'px';
        move=move+moveUnit*5;
    }
}
function initRock(){
    var whiteRock=document.querySelectorAll('.whiterock');
    var move=0;
    for(var i=0;i<whiteRock.length;i++)
    {
        whiteRock[i].style.top=490 + 'px';
        whiteRock[i].style.left=move +'px';
        move=move+moveUnit*7;
    }
    move=0;
    var blackRock=document.querySelectorAll('.blackrock');
    for(var i=0;i<blackRock.length;i++)
    {
        blackRock[i].style.top=0 + 'px';
        blackRock[i].style.left=move +'px';
        move=move+moveUnit*7;
    }
}
function initBishop(){
    var whiteBishop=document.querySelectorAll('.whitebishop');
    var move=140;
    for(var i=0;i<whiteBishop.length;i++)
    {
        whiteBishop[i].style.top=490 + 'px';
        whiteBishop[i].style.left=move +'px';
        move=move+moveUnit*3;
    }
    var blackBishop=document.querySelectorAll('.blackbishop');
    move=140;
    for(var i=0;i<blackBishop.length;i++)
    {
        blackBishop[i].style.top=0+ 'px';
        blackBishop[i].style.left=move +'px';
        move=move+moveUnit*3;
    }
}


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0,originX=0,originY=0;
    elmnt.onmousedown = dragMouseDown;


    function dragMouseDown(e) {
  
      e = e || window.event;
      e.preventDefault();
      originX=parseInt(elmnt.style.left);
      originY=parseInt(elmnt.style.top);
      chessPossiblemoves(elmnt,originX,originY);
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      elmnt.style.zIndex=12;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      elmnt.style.zIndex=9;
      document.onmouseup = null;
      document.onmousemove = null;
      absoluteMove(parseInt(elmnt.style.left)+35,parseInt(elmnt.style.top)+35);
      checkActualmove(parseInt(elmnt.style.left),parseInt(elmnt.style.top));
      resetBoard();
   
    }
    function absoluteMove(xCurr,yCurr){
        elmnt.style.left=(Math.floor(xCurr/70))*70 +"px";
        elmnt.style.top=(Math.floor(yCurr/70 ))*70 +"px";
    }
    function checkActualmove(xCurr,yCurr){
        var team=elmnt.className.slice(0,5);
        var currteam=currentTeam.slice(0,5);
        console.log(team,currteam);
        if(team==currteam) {
            console.log('true');
            for(var i=0;i<elList.length;i++){
                if(parseInt(elList[i].style.left)==xCurr && parseInt(elList[i].style.top)==yCurr){
                    removeCapTure(xCurr,yCurr);
                    toggleTeam();
                    updateTeam();
                    resetBoard();
                    return true;
                }
            }
            
        }

        elmnt.style.left=originX+'px';
        elmnt.style.top=originY+'px';
    }


}
function updateTeam(){
    var x=document.querySelector('.currteam');
    console.log(x);
    x.innerHTML=currentTeam;

}

var x= document.querySelectorAll('.blackchess li');
for(var i=0;i<x.length;i++){
    dragElement(x[i]);
}
var x= document.querySelectorAll('.whitechess li');
for(var i=0;i<x.length;i++){
    dragElement(x[i]);
}
function toggleTeam(){

    if (currentTeam=='whitechess'){
        currentTeam='blackchess';
    }
    else{
        currentTeam='whitechess';
        opTeam='whitechess';
    }
    console.log(currentTeam);

}


function chessPossiblemoves(obj,xCurr,yCurr){
    if (xCurr< 0 || yCurr < 0) return;

    if (obj.className=='whitepawn' || obj.className=='blackpawn'){

        let direction;

        if (obj.className == 'whitepawn') direction = -moveUnit;
        else direction = moveUnit;
        if( yCurr+direction<0||yCurr+direction>BOARD_HEIGHT) {
            return;}
        if(checkMove(xCurr,yCurr+direction)){
            if(yCurr==moveUnit||yCurr==6*moveUnit){
                checkMove(xCurr,yCurr+2*direction);
            }
        }

        if(xCurr-moveUnit>=0) checkCapture(xCurr-moveUnit,yCurr+direction);
        if(xCurr+moveUnit<=BOARD_HEIGHT) checkCapture(xCurr+moveUnit,yCurr+direction);                                                                        
        
    }
    if(obj.className=='whiteknight'||obj.className=='blackknight'){
        if (xCurr-2*moveUnit >= 0) {
            if (yCurr-moveUnit >= 0) checkValidMove(xCurr-2*moveUnit, yCurr-1*moveUnit);

            if (yCurr+1 <= BOARD_HEIGHT) checkValidMove(xCurr-2*moveUnit, yCurr+1*moveUnit);
        }
    
        if (xCurr-1*moveUnit >= 0) {
            if (yCurr-2*moveUnit >= 0) checkValidMove(xCurr-1*moveUnit, yCurr-2*moveUnit);
    
            if (yCurr+2*moveUnit <= BOARD_HEIGHT) checkValidMove(xCurr-1*moveUnit, yCurr+2*moveUnit);
        }
    
        if (xCurr+1*moveUnit <= BOARD_HEIGHT) {

            if (yCurr-2*moveUnit >= 0) checkValidMove(xCurr+1*moveUnit, yCurr-2*moveUnit);

            if (yCurr+2*moveUnit <= BOARD_HEIGHT) checkValidMove(xCurr+moveUnit, yCurr+2*moveUnit);
        }
    
        if (xCurr+2*moveUnit <= BOARD_HEIGHT) {

            if (yCurr-1*moveUnit >= 0) checkValidMove(xCurr+2*moveUnit, yCurr-1*moveUnit);

            if (yCurr+1*moveUnit <= BOARD_HEIGHT) checkValidMove(xCurr+2*moveUnit, yCurr+1*moveUnit);
        }
    }
    if(obj.className=='whiterock'|| obj.className=='blackrock'){
        for (let i = 1; yCurr-i*moveUnit >= 0; i++) {
            if (checkValidMove(xCurr, yCurr-i*moveUnit)) break;
        }
    

        for (let i = 1; xCurr+i*moveUnit <= BOARD_HEIGHT; i++) {
            if (checkValidMove(xCurr+i*moveUnit, yCurr)) break;
        }

        for (let i = 1; yCurr+i*moveUnit <= BOARD_HEIGHT; i++) {
            if (checkValidMove(xCurr, yCurr+i*moveUnit)) break;
        }
    

        for (let i = 1; xCurr-i*moveUnit >= 0; i++) {
            if (checkValidMove(xCurr-i*moveUnit, yCurr)) break;
        }
    }
    if(obj.className=='whitebishop' || obj.className=='blackbishop'){
    
        for (let i = 1; xCurr+i*moveUnit <= BOARD_HEIGHT && yCurr-i*moveUnit >= 0; i++) {
            if (checkValidMove(xCurr+i*moveUnit, yCurr-i*moveUnit)) break;
        }

        for (let i = 1; xCurr+i*moveUnit <= BOARD_HEIGHT && yCurr+i*moveUnit <= BOARD_HEIGHT; i++) {
            if (checkValidMove(xCurr+i*moveUnit, yCurr+i*moveUnit)) break;
        }
        for (let i = 1; xCurr-i*moveUnit >= 0 && yCurr+i*moveUnit <= BOARD_HEIGHT; i++) {
            if (checkValidMove(xCurr-i*moveUnit, yCurr+i*moveUnit)) break;
        }


        for (let i = 1; xCurr-i*moveUnit >= 0 && yCurr-i*moveUnit >= 0; i++) {
            if (checkValidMove(xCurr-i*moveUnit, yCurr-i*moveUnit)) break;
        }
    }
    if(obj.className=='whitequeen'||obj.className=='blackqueen'){
        for (let i = 1; yCurr-i*moveUnit >= 0; i++) {
            if (checkValidMove(xCurr, yCurr-i*moveUnit)) break;
        }
    

        for (let i = 1; xCurr+i*moveUnit <= BOARD_HEIGHT; i++) {
            if (checkValidMove(xCurr+i*moveUnit, yCurr)) break;
        }

        for (let i = 1; yCurr+i*moveUnit <= BOARD_HEIGHT; i++) {
            if (checkValidMove(xCurr, yCurr+i*moveUnit)) break;
        }
    

        for (let i = 1; xCurr-i*moveUnit >= 0; i++) {
            if (checkValidMove(xCurr-i*moveUnit, yCurr)) break;
        }
        for (let i = 1; xCurr+i*moveUnit <= BOARD_HEIGHT && yCurr-i*moveUnit >= 0; i++) {
            if (checkValidMove(xCurr+i*moveUnit, yCurr-i*moveUnit)) break;
        }

        for (let i = 1; xCurr+i*moveUnit <= BOARD_HEIGHT && yCurr+i*moveUnit <= BOARD_HEIGHT; i++) {
            if (checkValidMove(xCurr+i*moveUnit, yCurr+i*moveUnit)) break;
        }
        for (let i = 1; xCurr-i*moveUnit >= 0 && yCurr+i*moveUnit <= BOARD_HEIGHT; i++) {
            if (checkValidMove(xCurr-i*moveUnit, yCurr+i*moveUnit)) break;
        }


        for (let i = 1; xCurr-i*moveUnit >= 0 && yCurr-i*moveUnit >= 0; i++) {
            if (checkValidMove(xCurr-i*moveUnit, yCurr-i*moveUnit)) break;
        }
    }
    if(obj.className=='whiteking'||obj.className=='blackking'){
        for (let i = -1; i <= 1; i++) {
            if (yCurr+i*moveUnit < 0 || yCurr+i*moveUnit > BOARD_HEIGHT) continue;
    
            for (let j = -1; j <= 1; j++) {
                if (xCurr+j*moveUnit < 0 || xCurr+j*moveUnit > BOARD_HEIGHT) continue;
                if (i == 0 && j == 0) continue;
    
                checkValidMove(xCurr+j*moveUnit, yCurr+i*moveUnit);
            }
        }
    }
}
function checkValidMove(x,y){

  if (checkCapture(x,y))return true;
    return ! checkMove(x,y);

}
function checkMove(x,y){
    if(checkTeam(x,y,currentTeam)){
        return false;
    }
    var opTeam='whitechess'

    if(currentTeam=='whitechess'){
        opTeam='blackchess';
    }
    if(checkTeam(x,y,opTeam)){
        return false;
    }
    draw(x,y);
    return true;
}
function checkTeam(xCurr,yCurr,currTeam){
    var allTeam=document.querySelectorAll('.'+currTeam+' li');
    for(var i=0;i<allTeam.length;i++){
        if(parseInt(allTeam[i].style.left)==xCurr &&(parseInt(allTeam[i].style.top)==yCurr))
        {
            return true;
        }
    }
    return false;
}
function draw(x,y){
    var el=document.createElement('div');
    var board=document.getElementById('chessboard');
    el.style.width=70 +'px';
    el.style.height=70+'px';
    el.style.position='absolute';
    el.style.left=x+'px';
    el.style.top=y+'px';
    el.style.backgroundColor= 'rgba(0,0,0,0.5)';
    board.appendChild(el);

    elList.push(el);
    return el;
}
function checkCapture(x,y){
    var opTeam='whitechess'

    if(currentTeam=='whitechess'){
        opTeam='blackchess';
    }
    if(checkTeam(x,y,opTeam)==true){
        console.log("heelll");
        draw(x,y);
        return true;
    }
    return false;
}
function removeCapTure(x,y){
    if(checkCapture(x,y)==true){
        var opTeam='whitechess'
        if(currentTeam=='whitechess'){
            opTeam='blackchess';
        }
        var opp= document.querySelectorAll('.'+opTeam+' li');
        console.log(currentTeam);
        console.log(opp);
        for(var i=0;i<opp.length;i++){
            if(parseInt(opp[i].style.left)==x&&parseInt(opp[i].style.top)==y){
                capture=opp[i];
                if(opp[i].className=='whiteking'||opp[i].className=='blackking'){
                    displayWinner();
                }
                capture.remove();
            }
        }
    }
}
function displayWinner(){
    var x=document.querySelector('.winner');
    x.innerHTML=currentTeam;
    var cover=document.querySelector('.cover');
    cover.style.display='block';
}

function resetBoard(){
    for(var i=0;i<elList.length;i++)
    {
        var temp=elList.pop();
       temp.remove();
       i--;
    }
}

