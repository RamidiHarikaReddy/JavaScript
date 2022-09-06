var expr = "";
var lastValue="";
var myCalc = document.getElementById('display');

window.onload = function(){
    var operators = document.getElementsByClassName('displayButton');
    for(var operator of operators)
        operator.addEventListener('click',printValue);
    document.getElementById('result').addEventListener('click',printResult);
    document.getElementById('invert').addEventListener('click',invertNumber);
    document.getElementById('clear').addEventListener('click',clearAll)
}

function backspace()
{
	var size = myCalc.value.length;
	myCalc.value=myCalc.value.substring(0,size-1);
}

function clearAll()
{
    myCalc.value="0";
    expr = "";
}

function printValue()
{
    var val = this.getAttribute('value');
    console.log(val)
    if(!isNaN(val)){
        if(myCalc.value!=0 && !isNaN(lastValue))
            myCalc.value += val;
        else
            myCalc.value = val
    }
    expr += val;
    lastValue = val;
    if(event.target.innerHTML=='%')
        printResult();
}

function printResult()
{
    var result = parseExpr(expr);
    if(isNaN(result) || result=='Infinity')
        myCalc.value = 'Not a number';
    else{
        myCalc.value = result;
        expr = result;
    }
}

function invertNumber(){
    var val = myCalc.value;
    if(val.includes('-'))
    myCalc.value = myCalc.value.replace('-','');
    else
        myCalc.value = '-'+myCalc.value;
    expr = expr.replace(val,'('+myCalc.value+')');
}

function parseExpr(obj){
    return Function('"use strict";return (' + obj + ')')();
}


function calculatorParent(){
    
}

calculatorParent.prototype.expr = '';

function calcButtons(){

}

calcButtons.prototype.intitalize = function(){

}

calcButtons.prototype.calculateExpr = function(){

}

function calcOperators(){

}

calcOperators.prototype.intitalize = function(){
    
}

function calcDisplay(){
    this.intitalize();
}

calcDisplay.prototype.result = 0;

calcDisplay.prototype.intitalize = function(){

}

calcDisplay.prototype.displayValue = function(){

}

