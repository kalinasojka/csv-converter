let fromCSVbtn = document.querySelector("#from_csv_btn");
let fromCSVdrop = document.querySelector("#from_csv_dropdown");
let userInput = document.querySelector("#user_input");

let toCSVbtn = document.querySelector("#to_csv_btn");
let toCSVdrop = document.querySelector("#to_csv_dropdown");
let tableDiv = document.querySelector("#table");

let table = document.createElement("table");
let addRowBtn = document.createElement('button');
let isConverted = false;


let inputArr = [];

//FROM CSV TO HTML TABLE EVENT LISTENER
fromCSVbtn.addEventListener("click", convertToTable); //fromCSVbtn.onclick = convertToTable;

//there is a bug somewhere in the loop, it doesn't add the last row ever
console.log('my array - lacks last row! ', inputArr)

//FROM HTML TO CSV TABLE EVENT LISTENER
toCSVbtn.addEventListener("click", convertToCSV);

//Function to convert input => string => array => table
function convertToTable() {
    let userInputStr = userInput.value;
    // STEP 1: create an array

    // separator type: 
    let sep = fromCSVdrop.value;
    if (sep == ";" ){
        sep = ";";
    }else {
        sep = ",";
    }
    
    let row = [];
    let word = "";

    //Loop through the string to make an array
    //cc=current character, nc=next character
    for (let i = 0; i < userInputStr.length; i++){ 
        let cc = userInputStr[i];  
        let nc = userInputStr[i+1];
        
        //skip separator and newline
        if (cc == sep) {
            continue
        }//on newline empty row array to make it ready for the next row
        else if (cc == "\n") {
            continue
        }//contruct word string
        else if (cc != sep && nc != sep && nc != "\n"){
            word += cc;
            // console.log('first if', word)
        }//just before sep append the word to the row array and empty the word string
        else if (cc != sep && nc == sep) { 
            word += cc;
            // console.log('second if', word);
            row.push(word);
            word = "";
        }//just before newline append the word to the row array,empty the word string, append row to inputArr
        else if (cc != sep && nc == "\n"){
            word += cc;
            // console.log('third if', word);
            row.push(word);
            word = "";
            inputArr.push(row);
            row = [];
        }
        
    } 

    //STEP 2: convert array into table
    console.log("Launching array to table conversion function");
    arrayToTable(inputArr); //creates elements <table><tr><td><input></</</> from array
    tableDiv.appendChild(table);
    
    //STEP 3: append the addRowbtn
    tableDiv.appendChild(addRowBtn);
    addRowBtn.textContent = "Add row...";

}

//Function to convert an array into a table
function arrayToTable(arr) {
    console.log("Running the array to table conversion")
    //Loop though each element of the main array to create a row
    for (let i = 0; i < arr.length; i++){
        let htmlRow = document.createElement('tr');
        table.appendChild(htmlRow);
        let row = arr[i];
        //Loop through each element of subarray to create cells
        for (let j = 0; j < row.length; j++) {
            let td = document.createElement("td");
            htmlRow.appendChild(td);
            let tdInput = document.createElement('input');
            td.appendChild(tdInput); //<input>
            tdInput.setAttribute("value", row[j]); //<input value=></input>
            tdInput.setAttribute("id", `cell${i}${j}`);
            tdInput.setAttribute("onchange", `updateArray(${i}, ${j}, "cell${i}${j}")`);
            console.log(tdInput)
        }
    }
    isConverted = true //when this is true event listener listence for change in cells
    // return table;

}

//UPDATE input in the inputArr - event listener directly inside the element
//<input value="Period" id="cell00" onchange="updateArray(0, 0, &quot;cell00&quot;)">
function updateArray(i, j, id){
    //alert("you changed a cell, good for you!")
    let myCell = document.getElementById(id); //`${id}`
    console.log('Changes applied to cell id: ', myCell);
    console.log('Array input value before change is ', inputArr[i][j])
    let defValue = myCell.defaultValue; //inputArr[0][0] = 
    let currValue = myCell.value;
    console.log(`Default value was: ${defValue} and current value is: ${currValue}`)
    inputArr[i][j] = currValue;
    console.log('New input value in the array is: ', inputArr[i][j]);
       
}

//Function to convert back to CSV and overwrite in the textarea
function convertToCSV() {
    let myNewString = inputArr.join(";");
    console.log(myNewString);
}

