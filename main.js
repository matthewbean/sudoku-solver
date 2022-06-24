import './style.css'

let startBoard=[
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0]
]


//function to check for numbers
function checkNumbers(board, row, column){
  //create in array of all possible numbers
  let possible=[1,2,3,4,5,6,7,8,9]
  //get all the numbers at are eliminated
  let quadrant=[Math.floor(row/3), (Math.floor(column/3))]
  let rowArray=[...board[row]]
  let columnArray=board.map(item=>item[column])
  let squareArray=board
    .filter((item, i)=>i>(quadrant[0]*3-1)&&i<(quadrant[0]*3+3))
    .map((item, i)=>item.slice(quadrant[1]*3, (quadrant[1]+1)*3))
    .flat()
  let compare= new Set([...rowArray, ...columnArray, ...squareArray])
  //filter out all numbers that are taken
  possible=possible.filter(n=>!compare.has(n))
  return possible
}


//function to draw new board
function drawBoard(board){
  let htmlBoard=''

  //generate the board
  board.forEach((element, i) => {
    element.forEach((item, j)=>{
      htmlBoard+=`<input type='number'  
      class='square${(i+1)%3 === 0 ? ' solidBottom':i%3 === 0 ?' solidTop':''}'  
      min='0' 
      max='9'
      value='${item > 0 ? item:''}'
      id='${i}${j}'
>      </input>`
    })
  });
  //draw the board
  document.querySelector('#app').innerHTML = `
    <div class='board'>
    ${htmlBoard}
    </div>
  `
  document.querySelectorAll('.square').forEach((item, i)=>{
    item.addEventListener('change',(e)=>{
      startBoard=startBoard.map((x, i)=>i != e.target.id[0]?x:(x.map((y, j)=>j!=e.target.id[1]?y:parseInt(e.target.value))))
      drawBoard(startBoard)
    })
  })
}
drawBoard(startBoard)



class Stack {
  constructor() {
    this.currentElement = 0;
  }
  pop = () => {
    if (this.currentElement === 0) {
      console.error("Puzzle is Unsolvable");
      clearInterval(loop)
    } else {
      let returnElement = this[this.currentElement];
      delete this[this.currentElement];
      this.currentElement--;
      return returnElement;
    }
  };
  add = (element) => {
    this.currentElement++;
    this[this.currentElement] = element;
  };
  isEmpty = () => {
    return this.currentElement <= 0;
  };
}
class Counter{
  constructor(row,column){
    this.row=row;
    this.column=column;
  }
  next(){
    if (this.column>=8&&this.row>=8){
      return false
    }
    if (this.column>=8){
      this.column=0  
      this.row++
      return true
    } else {
      this.column++
      return true
    }
  }
  previous(){
    if (this.column<=0&&this.row<=0){
      return false
    }
    if (this.column<=0){
      this.column=8
      this.row--
      return true
    } else {
      this.column--
      return true
    }
  }
  getRow(){
    return this.row
  }
  getColumn(){
    return this.column
  }
}



    function depth(){
      steps++;
    
    //get the current element
    let current = stack.pop()
    let { state, counter } = current;


    //get all possible numbers
    //create new board for each possible number and add it to the stack
    
        if (state[counter.getRow()][counter.getColumn()] === 0){
          let possible=checkNumbers(state, counter.getRow(), counter.getColumn())
          if (possible.length>0){
            possible.forEach((item)=>{
              let newBoard={
                state: [...state],
                counter: new Counter(counter.getRow(), counter.getColumn())
              }
              let finalBoard={
                ...newBoard,
                state:newBoard.state.map((x, i)=>i !== counter.getRow()?x:(x.map((y, j)=>j!==counter.getColumn()?y:item)))
              }
              finalBoard.counter.next()

              stack.add(finalBoard)
            })
            

          } else {
          }
        } else {
          counter.next()
          let newBoard={
            state: [...state],
            counter: new Counter(counter.getRow(), counter.getColumn())
          }
          stack.add(newBoard)

      }
    drawBoard(state)

    
    if (done){
      clearInterval(loop)
      console.log(`%c Solved after ${steps} iterations.`, 'background: #030')
    }
    if (counter.column>=8&&counter.row>=8){
      done=true;
    }
  }
  var loop;
  var stack;
  var done;
  var steps;
  document.getElementById('setLoop').addEventListener("click", setLoop)
    function setLoop(){
      stack = new Stack();
      done=false;
      steps=0;



      stack.add({
        state:[...startBoard],
        counter: new Counter(0,0)
      });
      loop=setInterval(depth, 0)
      return loop
  }