/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];

const GRID_LENGTH = 3;
let turn = 'X';
function generateRandomNumber1()
{   
    let arrayOfAvailablePosition = []
    for(let pos=0;pos<document.getElementsByClassName("box").length;pos++){
        if(!document.getElementsByClassName("box")[pos].hasChildNodes()){
            arrayOfAvailablePosition.push(pos)
        }
    }

    let len = (arrayOfAvailablePosition.length-1)==0?0:(arrayOfAvailablePosition.length-1)
    var rand = arrayOfAvailablePosition[Math.floor(Math.random() * (len))];
    
    if(!document.getElementsByClassName("box")[rand].hasChildNodes()){
        var colX = document.getElementsByClassName("box")[rand].getAttribute("colidX")
        var colY = document.getElementsByClassName("box")[rand].getAttribute("rowidX")
        var index = (colX) +","+ (colY)
    }

    return index


    // var rowidx = Math.floor(Math.random()*3)
    // var colidy = Math.floor(Math.random()*3)
    // if(checkForPlayerPosition(colidy==0 ? 0 : colidy-1,rowidx==0 ? 0 : rowidx-1)){
    //     generateRandomNumber1();    
    // }
    // return (rowidx==0 ? 0 : rowidx-1)+","+(colidy==0 ? 0 : colidy-1);
        //var hasChilds =  document.getElementsByClassName("rowStyle")[colidx==0 ? 0 : colidx-1].children[colidy==0 ? 0 : colidy-1].hasChildNodes();
    
    // for(let pos=0;pos<document.getElementsByClassName("box").length;pos++){
    //     if(!document.getElementsByClassName("box")[pos].hasChildNodes()){
    //         var colX = document.getElementsByClassName("box")[pos].getAttribute("colidX")
    //         var colY = document.getElementsByClassName("box")[pos].getAttribute("rowidX")
    //         var index = (colX) +","+ (colY)
    //         break;
    //     }
    //  }

    // for(let pos=0;pos<document.getElementsByClassName("box").length;pos++){
    //     if(!document.getElementsByClassName("box")[pos].hasChildNodes()){
    //         var colX = document.getElementsByClassName("box")[pos].getAttribute("colidX")
    //         var colY = document.getElementsByClassName("box")[pos].getAttribute("rowidX")
    //         var index = (colX) +","+ (colY)
    //         break;
    //     }
    //  }
    // return index;
}

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    if(checkForPlayerPosition(colIdx, rowIdx)){
        alert("cannot place, choose again")
    }else{
        let newValue = 1;
        grid[colIdx][rowIdx] = newValue;
        renderMainGrid();
        addClickHandlers();
        checkForWinning()
        var OIndex = generateRandomNumber1(); 
        var arr = OIndex.split(',')
        newValue=2;
        grid[arr[0]][arr[1]]= newValue;    
        renderMainGrid();
        addClickHandlers();
        checkForWinning()
        
    }
}

function checkForPlayerPosition(colIdx, rowIdx){
    let isPresent = false
    for(let pos=0; pos<document.getElementsByClassName("box").length;pos++){
        if(document.getElementsByClassName("box")[pos].getAttribute("rowidX") == rowIdx && document.getElementsByClassName("box")[pos].getAttribute("colidX") == colIdx){
            if(document.getElementsByClassName("box")[pos].hasChildNodes()){
                isPresent=true
                break;
            }        
        }
    }
    return isPresent
}

function checkIfPlayerNotHasFirstChance(){
    let isHavingChild=false
    for(let pos=0; pos<document.getElementsByClassName("box").length;pos++){
        if(document.getElementsByClassName("box")[pos].hasChildNodes()){
            isHavingChild=true
            break;
        }        
    }
    return isHavingChild
}




function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function checkForWinning(){
    if(checkLeftDaigonalValue()||checkHoriztalValue()||checkVerticalValue()){
        alert("YOU WIN")
        window.location.reload(true)
    }
}


function checkLeftDaigonalValue(){
    let isWinningPosition = false
    let XValue=[]
    let OValue=[]
    
    let row=GRID_LENGTH-1
    for(let pos=0; pos<document.getElementsByClassName("box").length;pos++){
        if(document.getElementsByClassName("box")[pos].hasChildNodes()){
            if(document.getElementsByClassName("box")[pos].getAttribute("rowidX") == document.getElementsByClassName("box")[pos].getAttribute("colidX") ){
                if(document.getElementsByClassName("box")[pos].innerText.trim() == "X"){
                    XValue.push(document.getElementsByClassName("box")[pos].innerText.trim())
                }else if(document.getElementsByClassName("box")[pos].innerText.trim() == "O"){
                    OValue.push(document.getElementsByClassName("box")[pos].innerText.trim())                            
                }
                if(XValue.length == GRID_LENGTH || OValue.length==GRID_LENGTH){
                    isWinningPosition = true
                    break
                }
            }
        }        
    }    
    return isWinningPosition
}

function checkRightDaigonalValue(){

}
function checkHoriztalValue(){ 
    for(let pos=0; pos<document.getElementsByClassName("box").length;pos++){
        for(let i = 0; i<GRID_LENGTH;i++){
            let XValue=[]
            let OValue=[]    
            for(let j = 0; j<GRID_LENGTH;j++){        
                if(document.getElementsByClassName("box")[pos].getAttribute("rowidX") == i && document.getElementsByClassName("box")[pos].getAttribute("colidX") == j){
                    if(document.getElementsByClassName("box")[pos].hasChildNodes()){
                        if(document.getElementsByClassName("box")[pos].innerText.trim() == "X"){
                            XValue.push(document.getElementsByClassName("box")[pos].innerText.trim())
                        }else if(document.getElementsByClassName("box")[pos].innerText.trim() == "O"){
                            OValue.push(document.getElementsByClassName("box")[pos].innerText.trim())                            
                        }    
                    }        
                }
            }
            if(XValue.length==GRID_LENGTH || OValue.length==GRID_LENGTH){
                return true
                break
            }
        }
    }
    return false
}    

function checkVerticalValue(){
    for(let pos=0; pos<document.getElementsByClassName("box").length;pos++){
        for(let i = 0; i<GRID_LENGTH;i++){
            let XValue=[]
            let OValue=[]    
            for(let j = 0; j<GRID_LENGTH;j++){            
                if(document.getElementsByClassName("box")[pos].getAttribute("rowidX") == j && document.getElementsByClassName("box")[pos].getAttribute("colidX") == i){
                    if(document.getElementsByClassName("box")[pos].hasChildNodes()){
                        if(document.getElementsByClassName("box")[pos].innerText.trim() == "X"){
                            console.log(" Veticle "+document.getElementsByClassName("box")[pos].getAttribute("colidX")+","+document.getElementsByClassName("box")[pos].getAttribute("rowidX"))
                            XValue.push(document.getElementsByClassName("box")[pos].innerText.trim())
                        }else if(document.getElementsByClassName("box")[pos].innerText.trim() == "O"){
                            OValue.push(document.getElementsByClassName("box")[pos].innerText.trim())                            
                        }   
                    }     
                }
                if(XValue.length==GRID_LENGTH || OValue.length==GRID_LENGTH){
                    return true
                    break
                }
            }
    }
}
return false   
}

var player = []

initializeGrid();
renderMainGrid();
addClickHandlers();
//generateRandomNumber1();
