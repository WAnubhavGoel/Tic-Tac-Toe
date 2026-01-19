const gameBoard=(function(){
    let board=["","","","","","","","",""];
    const getBoard=()=>board;
    const setMark=(index,mark)=>{
        if(board[index]==="") board[index]=mark;
    }
    return {getBoard,setMark};
})();
const player=(playerName,mark)=>{
    return {playerName,mark};
}
function checkWinner(){
    const board=gameBoard.getBoard();
    const winningCombinations=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]];
    for(let i=0;i<8;i++){
        let xCnt=0;
        let yCnt=0;
        for(let j=0;j<3;j++){
            if(board[winningCombinations[i][j]]=='X') xCnt++;
            if(board[winningCombinations[i][j]]=='O') yCnt++;
        }
        if(xCnt==3 || yCnt==3) return true;
    }
    return false;
}
function checkTie(){
    const board=gameBoard.getBoard();
    let cnt=0;
    for(let i=0;i<9;i++){
        if(board[i]==""){
            cnt++;
            break;
        }
    }
    if(cnt==0 && !checkWinner()) return true;
    return false;
}
const gameController=(function(){
    let player1=player("Player 1","X");
    let player2=player("Player 2","O");
    let gameOver=false;
    let currentPlayer=player1;
    const setStartingMark=(initialMark)=>{
        if(initialMark=="X"){
            player1=player("Player 1","X");
            player2=player("Player 2","O");
        }
        else{
            player1=player("Player 1","O");
            player2=player("Player 2","X");
        }
        gameOver=false;
        currentPlayer=player1;
        gameController.reset();
    }
    const switchPlayer=()=>{
        if(currentPlayer==player1){
            currentPlayer=player2;
        }
        else{
            currentPlayer=player1;
        }
    }
    const playGame=(index)=>{
        if(gameOver) return;
        if(gameBoard.getBoard()[index]!="") return;
        gameBoard.setMark(index,currentPlayer.mark);
        if(checkWinner()){
            gameOver=true;
            result.textContent=`${currentPlayer.playerName} has won 🥳🥳`;
            console.log(currentPlayer);
            return;
        }
        if(checkTie()){
            gameOver=true;
            result.textContent="This game is a tie";
            return;
        }
        switchPlayer();
    }
    const reset=()=>{
        const board=gameBoard.getBoard();
        for(let i=0;i<9;i++){
            board[i]="";
        }
        gameOver=false;
    };
    return {setStartingMark,playGame,reset};
})();
const displayController=(function(){
    const cells=document.querySelectorAll(".cell");
    const render=()=>{
        const board=gameBoard.getBoard();
        cells.forEach((cell,i)=>{
            cell.textContent=board[i];
        });
    }
    cells.forEach((cell,i)=>{
        cell.addEventListener("click",()=>{
            gameController.playGame(i);
            render();
        })
    })
    return {render};
})();
const crossBtn=document.querySelector(".cross");
const circleBtn=document.querySelector(".circle");
const renderBtn=document.querySelector(".reset");
const result=document.querySelector(".result");
renderBtn.addEventListener("click",()=>{
    gameController.reset();
    result.textContent="";
    displayController.render();
})
crossBtn.addEventListener("click",()=>{
    gameController.reset();
    result.textContent="";
    gameController.setStartingMark("X");
    displayController.render();
})
circleBtn.addEventListener("click",()=>{
    gameController.reset();
    result.textContent="";
    gameController.setStartingMark("O");
    displayController.render();
})