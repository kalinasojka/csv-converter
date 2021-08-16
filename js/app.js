let fromCSVbtn = document.querySelector("#from_csv_btn");
let fromCSVdrop = document.querySelector("#from_csv_dropdown");
let userInput = document.querySelector("#user_input");

let toCSVbtn = document.querySelector("#to_csv_btn");
let toCSVdrop = document.querySelector("#to_csv_dropdown");
let tableDiv = document.querySelector("#table");

let table = document.createElement("table");
let isConverted = false;

let inputArr = [];

//Function to convert input => string => array => table
let convertToTable = function() {
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

    //STEP 2: convert array into table, function below
    arrayToTable(inputArr); //returns finished <table>
    tableDiv.appendChild(table);
}

fromCSVbtn.addEventListener("click", convertToTable); //fromCSVbtn.onclick = convertToTable;

//there is a bug somewhere in the loop, it doesn't add the last row ever
console.log('my array', inputArr)

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
            td.appendChild(tdInput);
            tdInput.setAttribute("value", row[j]);
        }
    }
    isConverted = true
    return table;
}

// let cont = cell.textContent;
// console.log(cont)

//If the table is finished, 
// listen for changes in cells and new rows 
// to update the table
// if (isConverted == true) {
//     //table.addEventListener
//     // some kind of loop? 
//         let cell = document.querySelector("td")
//         let content = cell.textContent;
//         content.
// }
