function updateFontSizeValue() {
    document.getElementById("fontSizeValue").textContent = document.getElementById("fontSize").value + "px";
    changeCSS();
}

/*
  Updates the style of the text in the text area based on the current values of the
  font size, color, and style inputs.
*/
function changeCSS() {
    let text = document.getElementById("text");
    let fontSize = document.getElementById("fontSize").value;
    let colorPicker = document.getElementById("colorPicker").value;
    let style = document.getElementById("style").value;

    text.style.fontSize = fontSize + "px";  
    text.style.color = colorPicker;  

    
    if (style.includes("bold")) {
        text.style.fontWeight = "bold";
    } else {
        text.style.fontWeight = "normal";
    }
    
    if (style.includes("italic")) {
        text.style.fontStyle = "italic";
    } else {
        text.style.fontStyle = "normal";
    }
}


function changeAlignment(align) {
    let text = document.getElementById("text");
    text.style.textAlign = align;
    
   
    document.querySelectorAll(".align-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    event.target.classList.add("active");
}

function changeFontFamily(font) {
    document.getElementById("text").style.fontFamily = font;
    
   
    document.querySelectorAll(".font-card").forEach(card => {
        card.classList.remove("active");
    });
    event.target.classList.add("active");
}

function changeBackground(bg) {
    document.getElementById("text-display").style.background = bg;
    
   
    document.querySelectorAll(".bg-option").forEach(option => {
        option.classList.remove("active");
    });
    event.target.classList.add("active");
}

function changeSolidBackground() {
    let color = document.getElementById("bgColorPicker").value;
    document.getElementById("text-display").style.background = color;
    
   
    document.querySelectorAll(".bg-option").forEach(option => {
        option.classList.remove("active");
    });
}

function resetStyles() {
    document.getElementById("fontSize").value = 24;
    document.getElementById("fontSizeValue").textContent = "24px";
    document.getElementById("colorPicker").value = "#4361ee";
    document.getElementById("style").value = "normal";
    document.getElementById("bgColorPicker").value = "#ffffff";
    
    let text = document.getElementById("text");
    text.style = "";
    text.style.fontSize = "24px";
    
    document.getElementById("text-display").style.background = "white";
    
    
    document.querySelectorAll(".align-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    document.querySelector(".align-btn").classList.add("active");
    
    document.querySelectorAll(".font-card").forEach(card => {
        card.classList.remove("active");
    });
    document.querySelector(".font-card").classList.add("active");
    
    document.querySelectorAll(".bg-option").forEach(option => {
        option.classList.remove("active");
    });
    document.querySelector(".bg-option").classList.add("active");
}