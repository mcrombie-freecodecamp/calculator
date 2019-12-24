import React from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULTSTATE = {
  input:"0",
  fullOperation:"",
  solved:false
}

class Calculator extends React.Component{
constructor(props){
  super(props);
  this.state =  DEFAULTSTATE;
  this.handleNumberInput = this.handleNumberInput.bind(this);
  this.handleZeroInput = this.handleZeroInput.bind(this);
  this.handleDecimalInput = this.handleDecimalInput.bind(this);
  this.handleOperandInput = this.handleOperandInput.bind(this);
  this.handleClear = this.handleClear.bind(this);
  this.handleSolve = this.handleSolve.bind(this);
}
handleNumberInput(event){ 
  if(this.state.solved){
    this.setState({
      input:event.target.value,
      fullOperation:event.target.value,
      solved:false
    })
  }
  else{
    if(this.state.input != "+" && this.state.input != "-" && this.state.input != "*" && this.state.input != "/" && this.state.input != "0" && this.state.input != "."){
    this.setState({
      input:this.state.input + event.target.value,
      fullOperation:this.state.fullOperation + event.target.value
    })
  }
  else{
    this.setState({
      input:event.target.value,
      fullOperation:this.state.fullOperation + event.target.value
    })
  }
  }
  

}
handleZeroInput(event){
  //don't allow multiple zeroes in a row
  if (this.state.solved){
    this.setState({
      input:event.target.value,
      fullOperation:event.target.value,
      solved:false
    })
  }else{
    if (this.state.input != "0"){
      this.setState({
        input:this.state.input + event.target.value,
        fullOperation:this.state.fullOperation + event.target.value
      })
  }
  }

}
handleDecimalInput(event){
  //don't allow multiple decimals in one number
  if (this.state.solved){
    this.setState({
      input:event.target.value,
      fullOperation:event.target.value,
      solved:false
    })
  }else{
    if (this.state.input.indexOf(".") == -1){
      this.setState({
        input:this.state.input + event.target.value,
        fullOperation:this.state.fullOperation + event.target.value
      })
    }
  }

}
handleOperandInput(event){ 
  if(this.state.solved){  
    this.setState({
      input:event.target.value,
      fullOperation:this.state.input + event.target.value,
      solved:false
    })
  }
  else{
    if(this.state.input != "+" && this.state.input != "-" && this.state.input != "*" && this.state.input != "/" ){
  this.setState({
    input:event.target.value,
    fullOperation:this.state.fullOperation + event.target.value
    })
  }
    else if(event.target.value == "-"){
      this.setState({
        input:event.target.value,
        fullOperation:this.state.fullOperation + event.target.value
      })
    }
    else{
      //counting the operands before what we are about to input
      let char = this.state.fullOperation.slice(-1)[0];
      let count = -1;
      while(char == "+" || char == "-" || char == "*" || char == "/"){
        console.log(char);
        count--;
        char = this.state.fullOperation.slice(count)[0];
      }
      this.setState({
        input:event.target.value,
        fullOperation:this.state.fullOperation.substring(0, this.state.fullOperation.length + count + 1) + event.target.value
      })
  }
  }
  

}
handleClear(){
  this.setState( DEFAULTSTATE)
}
handleSolve(){
  let answer = eval(this.state.fullOperation).toString();
  this.setState({
    input:answer,
    fullOperation:this.state.fullOperation + "=" + answer,
    solved:true
  })
}
render(){
  return(
  <div id="container">
      <div id="calculator">
          <div id="full-operation">{this.state.fullOperation}</div>
          <div id="display">{this.state.input}</div>
          <button id="add" class="clickable" value="+" onClick={this.handleOperandInput}>+</button>
          <button id="subtract" class="clickable" value="-" onClick={this.handleOperandInput}>-</button>
          <button id="multiply" class="clickable" value="*" onClick={this.handleOperandInput}>*</button>
          <button id="divide" class="clickable" value="/" onClick={this.handleOperandInput}>/</button>
          <button id="clear" class="clickable" onClick={this.handleClear}>Clear</button>

          <button id="one" class="clickable" value="1" onClick={this.handleNumberInput}>1</button>
          <button id="two" class="clickable" value="2" onClick={this.handleNumberInput}>2</button>
          <button id="three" class="clickable" value="3" onClick={this.handleNumberInput}>3</button>
          <button id="four" class="clickable" value="4" onClick={this.handleNumberInput}>4</button>
          <button id="five" class="clickable" value="5" onClick={this.handleNumberInput}>5</button>
          <button id="six" class="clickable" value="6" onClick={this.handleNumberInput}>6</button>
          <button id="seven" class="clickable" value="7" onClick={this.handleNumberInput}>7</button>
          <button id="eight" class="clickable" value="8" onClick={this.handleNumberInput}>8</button>
          <button id="nine" class="clickable" value="9" onClick={this.handleNumberInput}>9</button>
          <button id="zero" class="clickable" value="0" onClick={this.handleZeroInput}>0</button>
          <button id="decimal" class="clickable" value="." onClick={this.handleDecimalInput}>.</button>
          <button id="equals" class="clickable" value="=" onClick={this.handleSolve}>=</button>
      </div>
  </div>
  );
}
}

// ReactDOM.render(<Calculator />,document.getElementById("calculator-app"));
export default Calculator;
