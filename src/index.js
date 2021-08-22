import {LitElement, html, css} from 'lit';

class MyElement extends LitElement {
    static get styles() {
        return css`
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
    get table() {
        return this.renderRoot.querySelector("table");
    }
    // // get addRowBtn() {
    // //     return this.renderRoot.querySelector("#");
    // // }
    constructor() {
        super();
        this.inputArr = [];
        this.btn;
      }


    render() {
        return html`
        <div class="container">
            <div class="left">
                <div class="options_left">
                    <button @click=${this.convertToHTML} id="to_html_btn">Transform to HTML >></button>
                    <label for="from_csv_dropdown">Separator:</label>
                    <select id="from_csv_dropdown">
                        <option value=",">COMA</option>
                        <option value=";">SEMICOLON</option>
                    </select>
                </div>
                <textarea name="user_input" id="user_input" cols="70" rows="10" placeholder="Enter your CSV text here"></textarea>
            </div>

            <div class="right">
                <div class="options_right">
                    <button id="to_csv_btn"><< Transform back to CSV</button>
                    <label for="to_csv_dropdown">Separator:</label>
                    <select id="to_csv_dropdown">
                        <option value=",">COMA</option>
                        <option value=";">SEMICOLON</option>
                    </select>
                </div>
                <table>${this.inputArr.map(row => html`<tr>${row.map(cell => html`<td><input value=${cell}></td>`)}</tr>`)}</table>
                ${this.addRowBtn()}
            </div>
        </div>
        `;
    }
    // 
    //FUNCTIONS:
    convertToHTML() {
        // if (this.userInput.value != ""){}

        //empty the array
        this.inputArr = [];
        
        let userInputStr = this.userInput.value;
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
            else if (cc != sep && nc != sep && nc != "\n" && userInputStr.indexOf(cc)!=userInputStr.length-1){ //userInputStr.indexOf(cc)==userInputStr[length-1]
                word += cc;
            }//just before sep append the word to the row array and empty the word string
            else if (cc != sep && nc == sep) { 
                word += cc;
                row.push(word);
                word = "";
            }//just before newline append the word to the row array,empty the word string, append row to inputArr, empty row
            else if (cc != sep && nc == null || cc != sep && nc == "\n" ){  
                word += cc;
                row.push(word);
                word = "";
                this.inputArr.push(row);
                row = [];
            }
            
        }
        
    }

    addRowBtn() {
        if (this.inputArr.length != 0){
            return html`<button>Add row...</button>`;
        }
    }


}

customElements.define('my-element', MyElement);