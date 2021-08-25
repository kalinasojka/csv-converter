import {LitElement, html, css} from 'lit';

class MyElement extends LitElement {
    static get styles() {
        return css`
        * {
            font-family: Helvetica, sans-serif;
        }
        
        .container {
            display: flex;
            justify-items: space-around;
            flex-wrap: wrap;
        }

        .top-elements {
            margin-bottom: 5px;
        }

        #add-row-btn {
            margin-left: 5px;
        }
        `;
    }
    static get properties() {
        return {
            inputArr: {type: Array},
          };
    }

    //SELECTORS:
    get fromCSVdrop() {
        return this.renderRoot.querySelector("#from_csv_dropdown");
    }
    get userInput() {
        return this.renderRoot.querySelector("#user_input");//<textarea>
    }
    get toCSVdrop() {
        return this.renderRoot.querySelector("#to_csv_dropdown");
    }
    get inputCell() {
        return this.renderRoot.querySelectorAll(".input-cell");
      }

    constructor() {
        super();
        this.inputArr = [];
      }


    render() {
        return html`
        <div class="container">
            <div class="left">
                <div class="options_left">
                    <button @click=${this.convertToHTML} class="top-elements">Transform to HTML >></button>
                    <label for="from_csv_dropdown">Separator:</label>
                    <select id="from_csv_dropdown" class="top-elements">
                        <option value=",">COMA</option>
                        <option value=";">SEMICOLON</option>
                    </select>
                </div>
                <textarea name="user_input" id="user_input" cols="70" rows="10" placeholder="Enter your CSV text here"></textarea>
            </div>

            <div class="right">
                <div class="options_right">
                    <button @click="${this.convertToCSV}" class="top-elements"><< Transform back to CSV</button>
                    <label for="to_csv_dropdown">Separator:</label>
                    <select id="to_csv_dropdown" class="top-elements">
                        <option value=",">COMA</option>
                        <option value=";">SEMICOLON</option>
                    </select>
                </div>
                <table>${this.inputArr.map(i => 
                    html`<tr class="table-row">${i.map(j => 
                        html`<td> 
                        <input value=${j} class="input-cell">
                        </td>`)}
                        </tr>`)}
                </table>
                ${this.addRowBtn()}
            </div>
        </div>
        `;
    }

    //Function to convert input from textarea into an array
    convertToHTML() {
       console.log("CSV to HTML conversion...")
        //empty the array
        this.inputArr = [];
        let userInputStr = "";
        userInputStr = this.userInput.value;
        let row = [];
        let word = "";
        let sep = this.fromCSVdrop.value;
        //Loop through the string to make an array, cc=current character, nc=next character
        for (let i = 0; i < userInputStr.length; i++){ 
            let cc = userInputStr[i];  
            let nc = userInputStr[i+1];
            //skip separator and newline
            if (cc == sep || cc == "\n") {
                continue
            }//contruct word string
            else if (cc != sep && nc != sep && nc != "\n" && i != userInputStr.length-1){ 
                word += cc;
            }//just before sep append the word to the row array and empty the word string
            else if (cc != sep && nc == sep) { 
                word += cc;
                row.push(word);
                word = "";
            }//just before newline append the word to the row array,empty the word string, append row to inputArr, empty row
            else if (cc != sep && nc ==null|| cc != sep && nc == "\n"){  
                word += cc;
                row.push(word);
                word = "";
                this.inputArr.push(row);
                row = [];
            }
            
        }
            
            
        
    }
    //Function to add an 'add row' button when table is present
    addRowBtn() {
        if (this.inputArr.length != 0){
            return html`<button @click=${this.addRow} id="add-row-btn">Add row...</button>`;
        }
    }

    //Function to add new row
    addRow() {
        this.requestUpdate();
        let newSubArray = [];
        //inputArr[0].length - number of columns in the table
        for (let i = 0; i < this.inputArr[0].length; i++){ 
            newSubArray.push("");
        }
        this.inputArr.push(newSubArray);
    }

    //Funtion to convert values from input fields into an array, 
    //convert the array to string with separators and newlines,
    //assign the value of string back to userInput textarea.
    convertToCSV() {
        let rows = this.inputArr.length; //17
        let cols = this.inputArr[0].length;//3
        this.userInput.value = "";
        let bigArray = [];
        let tempArray=[];
        let sep = this.toCSVdrop.value;
        let c = 0 //counter
        for (let i=0; i<rows; i++){
            
            for (let j=0; j<cols; j++){
                tempArray.push(this.inputCell[c].value);
                c++;
            }
            let substring = tempArray.join(sep) //
            bigArray.push(substring);
            tempArray=[];

        }
        let outputStr = bigArray.join("\n");
        this.userInput.value = outputStr;
    }

}

customElements.define('my-element', MyElement);