import logo from './logo.svg';
import React, { useEffect, useState } from "react"
import './App.css';

//let options = ["","o","x","o","x","x","o","x","o"]

const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

const setCellsArrNumber = (cellsCount) => {
  let cellArr = []

  for(let i=0; i<cellsCount; i++){
    cellArr.push("")
  } 
  return cellArr
}








function App() {
const [cellsCount, setCellsCount] = useState(9)
const [cellsArr, setCellsArr] = useState (setCellsArrNumber(cellsCount))
const [winnerCells, setWinnerCells] = useState ([])
const [currentPlayer, setCurrentPlayer] = useState("x")
const [isRunning, setIsRunning] = useState(true)


useEffect (() => {

  checkTheWinner()
},[cellsArr])


const setCurrentPlayerFunc = () =>{
  setCurrentPlayer((prev) => prev === "x"?"o":"x")
}


const checkTheWinner = () => {
  let DidWin = false

for (let i = 0; i < winConditions.length; i++) {
 let conditionsArr = winConditions[i]
  let cellA = cellsArr[conditionsArr[0]]
  let cellB = cellsArr[conditionsArr[1]]
  let cellC = cellsArr[conditionsArr[2]]


if(cellA !== "" && cellB !== "" && cellC !==""){

  if(cellA === cellB && cellB === cellC){
   // console.log(cellA + ` ${conditionsArr[0]}`, cellB + ` ${conditionsArr[1]}`, cellC + ` ${conditionsArr[2]}`)
   setWinnerCells([conditionsArr[0],conditionsArr[1],conditionsArr[2]])
    console.log("we have a winner")
    DidWin = true
    setIsRunning(false)
    break
  }
} 
}

   if(!DidWin && !cellsArr.includes("")){
    console.log("it is a draw")
   } 

  else if(!DidWin){ setCurrentPlayerFunc()}
}


const resetTheGame = () => {
  setCellsArr(setCellsArrNumber(cellsCount));
   setIsRunning(true);
    setWinnerCells([])
}


  return (
    <div className="App">
      <div className ="cellsContainer">
  {cellsArr.map((cellMark, index)=>{return(
  <Cell
   key={index} ind = {index}  winnerCells = {winnerCells}
   cellsArr={cellsArr} setCellsArr ={setCellsArr} 
   currentPlayer = {currentPlayer} cellMark = {cellMark}   
   setCurrentPlayerFunc = {setCurrentPlayerFunc}
   checkTheWinner={checkTheWinner} isRunning={isRunning}
    />)})}
</div>
<h2 className="statusText">  { !winnerCells.length ?`${currentPlayer}'s turn`: `${currentPlayer} won`}  </h2>
    <button className="restartBtn"  onClick = {resetTheGame}  >Restart</button>
    </div>
  );
}





function Cell (props){
console.log(props)

const DoTheMove = () =>{
  if(props.cellsArr[props.ind] === "" && props.isRunning){
const tempArr = props.cellsArr.slice(0);
tempArr[props.ind] = props.currentPlayer 
props.setCellsArr(tempArr)

  }
  return
}


  return(
    <div className = "cell"  onClick = {DoTheMove}    
    style = {{color : props.winnerCells.includes(props.ind)?"red":"black"}}
    >
{props.cellMark}
    </div>
  )
}





export default App;
