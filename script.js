const buttons=document.querySelectorAll(".buttons .row");
const options=[9,8,7,"Clr","Del",6,5,4,"+","-",3,2,1,"*","/",".",0,"+/-","="];
let ptr=0;
buttons.forEach((row)=>{
    for(let i=0;i<5;i++){
    if(ptr==15) i++;
    let option=document.createElement("div");
    option.classList.add("box");
    option.textContent=options[ptr];
    ptr++;
    row.appendChild(option);
    }
})
let mainButtons=document.querySelector(".buttons");
let last = mainButtons.lastElementChild.lastElementChild;
last.classList.add("bigbox");