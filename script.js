const buttons=document.querySelectorAll(".buttons .row");
const options=[9,8,7,"Clr","Del",6,5,4,"+","-",3,2,1,"*","/",".",0,"","="];
const operations=["+","-","/","*"];
const invalid=["Max Limit reached","lol",NaN,Infinity];
const display=document.querySelector(".display");
let ptr=0,prev;
buttons.forEach((row)=>{
    outer:
    for(let i=0;i<5;i++){
    if(ptr==15) i++;
    let option=document.createElement("div");
    option.classList.add("box");
    option.addEventListener("mousedown",()=>{
        if(invalid.includes(display.textContent)){
            display.textContent="";
            prev=undefined;
        }
        if(!isNaN(option.textContent)){
            display.textContent+=option.textContent;
            avoidOverflow();
            return;
        }
        if(option.textContent=="."){
            [operand1,operand2]=display.textContent.split(`${prev}`);
            
            if(prev){
                if(!operand2.includes("."))display.textContent+=".";
            }
            else{
                if(!operand1.includes("."))display.textContent+=".";
            }
            return;

        }
        if(operations.includes(option.textContent)){
            if(!prev) {
                prev=option.textContent;
                display.textContent=display.textContent+option.textContent;
            }
            else{
                [operand1,operand2]=display.textContent.split(`${prev}`);
                console.log([operand1,prev,operand2]);
                display.textContent=evaluate(+operand1,prev,+operand2)+option.textContent;
                prev=option.textContent;
            }
            avoidOverflow();
            return;
        }
        if(option.textContent=="Del"){
            if(display.textContent=="lol"){
                display.textContent="";
                return;
            }
            if(operations.includes(display.textContent[display.textContent.length - 1])){
                prev=undefined;
                // console.log(display.textContent)
            }
            display.textContent=display.textContent.slice(0,-1);
            return;
        }
        if(option.textContent=="Clr"){
            display.textContent="";
            prev=undefined;
            return;
        }
        if(option.textContent=="="){
            if(prev){
                [operand1,operand2]=display.textContent.split(`${prev}`);
                display.textContent=evaluate(+operand1,prev,+operand2);
                prev=undefined;
            }
        }
        avoidOverflow();
    }
    
)
    option.addEventListener("mouseover",()=>{
        option.style.cssText = "border-color: silver;";
        option.style.background="grey";
    });
    option.addEventListener("mouseout",()=>{
        option.style.cssText = "border-color: ;";
        option.style.background="";
        option.style.cssText=`transition-property: background-color; transition-duration:0.25s;
        transition-timing-function: linear;`;
        option.style.cssText=`transition-property: border-color; transition-duration:0.25s;
    t   ransition-timing-function: linear;`;
    })
    option.textContent=options[ptr];
    ptr++;
    row.appendChild(option);
    }
})
function evaluate(operand1,operator,operand2){
    if(operator=="+") return operand1+operand2;
    if(operator=="-") return operand1-operand2;
    if(operator=="*") return operand1*operand2;
    if(operator=="/") {
        if(operand2==0) return "lol";
        console.log(operand2);
        return operand1/operand2;
    }
}

function avoidOverflow(){
    if(display.textContent.length>17){
        let num=display.textContent;
        if(!isNaN(num)) display.textContent= (+num).toExponential(2).toString();
        else display.textContent="Max Limit reached";
    }
}
let mainButtons=document.querySelector(".buttons");
let last = mainButtons.lastElementChild.lastElementChild;
last.classList.add("bigbox");