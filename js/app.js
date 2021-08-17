let fromCSVbtn = document.querySelector("#from_csv_btn");
let fromCSVdrop = document.querySelector("#from_csv_dropdown");

let userInput = document.querySelector("#user_input"); //<textarea>

let toCSVbtn = document.querySelector("#to_csv_btn");
let toCSVdrop = document.querySelector("#to_csv_dropdown");

let tableDiv = document.querySelector("#table");
let table = document.createElement("table");
let addRowBtn = document.createElement('button');

let isConverted = false;

let inputArr = [];

//FROM CSV TO HTML TABLE EVENT LISTENER
fromCSVbtn.addEventListener("click", convertToTable)

//my array
console.log('my array ', inputArr);

//UPDATE CELL - ONCHANGE LISTENER WITHIN THE <input> ELEMENT

//ADD ROW EVENT LISTENER
addRowBtn.addEventListener("click", addRow);

//FROM HTML TO CSV TABLE EVENT LISTENER 
//converts back to string and feeds into the textarea
toCSVbtn.addEventListener("click", convertToCSV);

//Create table if no table, if there is one then delete it and create new
function convertToTable() {
    if (isConverted == true) {
        //delete table
        table.removeChild;
        makeTable();
    }
    else{
        makeTable();
    }
}

//Function to convert input => string => array => table
function makeTable(){
    let userInputStr = userInput.value;
    // STEP 1: create an array
    // separator type: 
    let sep = fromCSVdrop.value;
    console.log(`before this mess, sep is: ${sep}`)
    if (sep == "semicolon" ){
        sep = ";";
        console.log("going with 1st option")
    }else if (sep == "coma" ){
        sep = ",";
        console.log("going with 2nd option")
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
        }
        else if (cc == "\n") {
            continue
        }//contruct word string
        else if (cc != sep && nc != sep && nc != "\n" && userInputStr.indexOf(cc)!=userInputStr.length-1){ //userInputStr.indexOf(cc)==userInputStr[length-1]
            word += cc;
            //console.log("word maker in action!", word,"indexOfcc", userInputStr.indexOf(cc), "index of last character", userInputStr.length-1 )
            // console.log('first if', word)
        }//just before sep append the word to the row array and empty the word string
        else if (cc != sep && nc == sep) { 
            word += cc;
            // console.log('second if', word);
            row.push(word);
            console.log(word);
            word = "";
        }//just before newline append the word to the row array,empty the word string, append row to inputArr, empty row
        else if (cc != sep && nc == null || cc != sep && nc == "\n" ){  
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
    if (userInput.value == ""){
        console.log("no input")
    }else{
        tableDiv.appendChild(addRowBtn);
        addRowBtn.textContent = "Add row...";
    }
    console.log("at the end of the function ", isConverted);
    isConverted = true //prohibits repeating table content on each button click
    
}

//Function to convert an array into a table
function arrayToTable(arr) {
    console.log("Running the array to table conversion")
    //Loop though each element of the main array to create a row
    for (let i = 0; i < arr.length; i++){
        let htmlRow = document.createElement("tr");
        table.appendChild(htmlRow);
        let row = arr[i];
        //Loop through each element of subarray to create cells
        for (let j = 0; j < row.length; j++) {
            let td = document.createElement("td");
            htmlRow.appendChild(td);
            let tdInput = document.createElement("input");
            td.appendChild(tdInput); //<input>
            tdInput.setAttribute("value", row[j]); //<input value=>
            tdInput.setAttribute("id", `cell${i}${j}`);
            tdInput.setAttribute("onchange", `updateArray(${i}, ${j}, "cell${i}${j}")`);
            // console.log(tdInput)
        }
    }
}

//Function to update input in the inputArr - event listener directly inside the element
//<input value="Period" id="cell00" onchange="updateArray(0, 0, &quot;cell00&quot;)">
function updateArray(i, j, id){
    //alert("you changed a cell, good for you!")
    let myCell = document.getElementById(id); //`${id}`
    console.log("Changes applied to cell id: ", myCell);
    console.log("Array input value before change is ", inputArr[i][j])
    let defValue = myCell.defaultValue; //inputArr[0][0] = 
    let currValue = myCell.value;
    console.log(`Default value was: ${defValue} and current value is: ${currValue}`)
    inputArr[i][j] = currValue;
    console.log("New input value in the array is: ", inputArr[i][j]);
    console.log("After changes the array looks like this: ", inputArr)

}

//Function to convert an array into a table
function addRow(){ 
    let newRow = document.createElement("tr");
    let newSubArray = [];

    table.appendChild(newRow);
    // console.log(inputArr[0].length);
    for (i = 0; i < inputArr[0].length; i++){
        let newCell = document.createElement("td");
        let newInputCell = document.createElement("input");
        //specify the indices for new elements:
        let innerIndex = i
        let outerIndex = inputArr.length;

        newRow.appendChild(newCell);
        newCell.appendChild(newInputCell);
        newSubArray.push(newInputCell.value);

        newInputCell.setAttribute("id", `cell${outerIndex}${innerIndex}`);
        newInputCell.setAttribute("onchange", `updateArray(${outerIndex}, ${innerIndex}, "cell${outerIndex}${innerIndex}")`);
        // console.log("brand new cell: ", newInputCell,);
    }
    inputArr.push(newSubArray);
    console.log("my array after adding new row and pushing new values: ", inputArr);
}

//Function to convert back to CSV and overwrite in the textarea
//include \n characters!!
function convertToCSV() {
    let sep = toCSVdrop.value;

    if (sep == "semicolon"){
        sep = ";";
    }else if (sep == "coma"){
        sep = ",";
    }
    for (i = 0; i < inputArr.length; i++){
        //index of the last thing in a subarray in order to add newline to it:
        let x = inputArr[i].length // 3
        let y = x-1 //2
        inputArr[i][y] = inputArr[i][y] + "\n"
        console.log(inputArr[i][y])
        //join the subarrays with sep as well
        console.log("inputArr[i] is... ", inputArr[i]);
        inputArr[i] = inputArr[i].join(sep);
    }
    let myNewString = inputArr.join(sep);
    console.log("This is my new string: ", myNewString);
    //feed the new string into the <textarea>
    userInput.value = myNewString;
}
