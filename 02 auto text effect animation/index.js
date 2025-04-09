const divEl = document.querySelector("div");

const career =["Youtuber","Freelancer","Instructure","Comedian"];
let careerIndex=0;
let charIndex=0;
update();
function update(){
    charIndex++;
    divEl.innerHTML = 
    `<h1>i am ${career[careerIndex].slice(0, 1) === "I" ? "an" : "a"}&nbsp<h1 style="color:yellow;">${career[careerIndex].slice(0,charIndex)}</h1></h1>`
    
    if(charIndex===career[careerIndex].length){
        careerIndex++;
        charIndex=0;
    }
    if(careerIndex===career.length){
        careerIndex=0;
    }
    setTimeout(update,300)
}
