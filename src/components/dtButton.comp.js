import DtMain from "./dtMain.comp.js";

/** Descripción */
class DtButton extends DtMain{

    // VARIABLES DE ESTADO ---------------------------------------------------------------------
    buttonData = {
        width: '100',
        height: '60',
        textContent: "button",
        color: "#ddd",
        backgroundColor: "#259",
        fontFamily: "Arial",        
        fontSize: 14,
    }

    // MÉTODOS NATIVOS DEL ELEMENTO ------------------------------------------------------------

    /** Creación de una nueva instancia del elemento. */
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        // Inicializaciones y configuraciones
    }

    /** Inicialización del elemento. El elemento fue conectado al DOM. */
    connectedCallback() {
        // Lógica al conectarse al DOM
        this.render();
        this.setEventListeners();
    }

    /** Gestiona los eventos a los que este elemento esta suscripto. */
    handleEvent(e){
        // ⁡⁢⁣⁣Controla como se muestran y ocultan las secciones⁡
        if(e.target.classList.contains('extend') || e.target.closest('.extend')){
            // Se asigna correctamente el target (de lo contrario el target podria ser el contenido del botón)
            const target = e.target.classList.contains('extend') ? e.target : e.target.closest('.extend');
            // ⁡⁣⁣⁢Si se ha cerrado la sección que estaba abierta⁡
            if(target.classList.contains('current-section')){
                target.classList.remove('current-section');
                target.lastElementChild.style.transform = 'rotate(0deg)';
                target.nextElementSibling.classList.add('hidden');
            }
            // ⁡⁣⁣⁢Si se abre una nueva sección⁡
            else{
                const configInputs = this.shadowRoot.querySelectorAll('.config-inputs');
                configInputs.forEach((element) => element.classList.add('hidden'));
    
                const extendBtns = this.shadowRoot.querySelectorAll('.extend');
                extendBtns.forEach((element) => {
                    element.classList.remove('current-section');
                    element.lastElementChild.style.transform = 'rotate(0deg)';
                });            
                target.classList.add('current-section');
                target.lastElementChild.style.transform = 'rotate(180deg)';
    
                const child = target.nextElementSibling;
                child.classList.remove('hidden');
            }
        }
        // ⁡⁢⁣⁣Lógica de cambio en un input de tipo number⁡
        else if(e.target.classList.contains('input-number') && e.type === 'input'){
            const field = e.target.getAttribute('field'); // width, height, etc...
            const value = e.target.value;
            const measure = e.target.getAttribute('measure'); // px, %, rem, etc...

            e.target.setAttribute('value', value);
            this.buttonData[field] = value+measure;
            this.updateButton(field, value+measure);
        } 
        // ⁡⁢⁣⁣Lógica para procesar los inputs de tipo text⁡
        else if(e.target.classList.contains('input-text') && e.type === 'input'){
            const field = e.target.getAttribute('field'); // width, height, etc...
            const value = e.target.value;
            // El input es del texto interno del botón
            if(field === 'textContent'){
                const $button = this.shadowRoot.querySelector('.preview>button');
                $button.textContent = value;
                this.buttonData[field] = value;
            }
        }
        // ⁡⁢⁣⁣Lógica de cambio en un select⁡ 
        else if(e.target.classList.contains('input-select') && e.type === 'change'){
            const value = e.target.value;
            const field = e.target.getAttribute('field');
            this.buttonData[field] = value;
            this.updateButton(field, value);
        }

    }


    // MÉTODOS PROPIOS -------------------------------------------------------------------------



    /** Define y renderiza en pantalla el elemento. */
    render(){
        const style = `
            <style>
                .container{
                    box-sizing: border-box;
                    padding: 0;
                    margin: 0;                    
                    padding: 10px;
                    height: 95dvh; /******************************** EDITAR ***************************************/
                    width: 100%; /******************************** EDITAR ***************************************/
                    display: grid;
                    grid-template-columns: repeat(8, 1fr);
                    grid-template-rows: repeat(9, 1fr);
                    grid-column-gap: 10px;
                    grid-row-gap: 10px;
                    background-color: #444;
                }
                .config{
                    grid-area: 1 / 1 / 10 / 5;
                    padding: 10px;
                }
                .preview{
                    grid-area: 1 / 5 / 7 / 9;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }
                .preview>button{
                    display: block;
                    width: ${this.buttonData.width}px;
                    height: ${this.buttonData.height}px;
                    background-color: ${this.buttonData.backgroundColor};
                    color: ${this.buttonData.color};
                    font-family: ${this.buttonData.fontFamily};
                    font-size: ${this.buttonData.fontSize}px;
                    border: none;
                }
                .code{
                    grid-area: 7 / 5 / 10 / 9;
                }
                
                .container, .config, .preview, .code, .extend{ 
                    box-sizing: border-box;
                    border: thin solid black; 
                }
                .config, .preview, .code{ 
                    width: 100%; 
                    height: 100%;
                    background-color: #aaa;
                }
                .extend.current-section{
                    background-color: #ffd;
                }
                .extend{
                    width: 100%;
                    height: 50px;
                    border-bottom: none;
                    background-color: #bbd;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 10px;
                }
                .extend:hover{
                    background-color: #bcb;
                }
                .section:last-child>button{
                    border-bottom: thin solid black; 
                }
                .hidden{
                    display: none;
                }
                .input-container{
                    padding: 5px 20px; 
                    display: flex;
                    align-items: center;
                }
                .input-description{
                    width: 15%;
                }
                .input-select{
                    width: 200px;
                }
                input-text{
                    width: 200px;
                }
                .input-value{
                }
                .input-number{
                    width: 40px;
                }
                .section{
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                .section *{
                    transition: transform 200ms;
                }
                .config-inputs{
                    box-sizing: border-box;
                    margin: 0;
                    padding: 10px 5px;
                    border: thin solid black; 
                    background-color: #bbf;
                    border-bottom: none;
                }
                .section:last-child>.config-inputs{
                    border: thin solid black; 
                    border-top: none;
                }
            </style>
        `;
        const body = `
            <div class="container">
                <div class="config">
                    <!----------------------------------------------------------------------------------------->
                    <div class="section">
                        <button class="extend">
                            <h3>Size properties</h3>
                            <div>↓</div>
                        </button>
                        <div class="config-inputs hidden">
                            <div class="input-container">
                                <div class="input-description">height</div>
                                <input class="input-number input-value" type="number" min="10" max="350" field="height" value=${this.buttonData.height} measure="px" >
                            </div>
                            <div class="input-container">
                                <div class="input-description">width</div>
                                <input class="input-number input-value" type="number" min="10" max="600" field="width" value=${this.buttonData.width} measure="px" >
                            </div>
                        </div>
                    </div>
                    <!----------------------------------------------------------------------------------------->
                    <div class="section">
                        <button class="extend">
                            <h3>Text properties</h3>
                            <div>↓</div>
                        </button>                    
                        <div class="config-inputs hidden">

                            <div class="input-container">
                                <div class="input-description">text content</div>
                                <input class="input-text input-value" type="text" field="textContent" value=${this.buttonData.textContent} autocomplete="false">
                            </div>

                            <div class="input-container">
                                <div class="input-description">font family</div>
                                <select class="input-select input-value" value="Arial" field="fontFamily">
                                    <option>Arial</option>
                                    <option>Arial Black</option>
                                    <option>Comic Sans MS</option>
                                    <option>Courier New</option>
                                    <option>Georgia</option>
                                    <option>Helvetica</option>
                                    <option>Impact</option>
                                    <option>Times New Roman</option>
                                    <option>Trebuchet MS</option>
                                    <option>Verdana</option>
                                </select>
                            </div>

                            <div class="input-container">
                                <div class="input-description">font weight</div>
                                <select class="input-select input-value" value="100" field="fontWeight">
                                    <option>100</option>
                                    <option>200</option>
                                    <option>300</option>
                                    <option>400</option>
                                    <option>500</option>
                                    <option>600</option>
                                    <option>700</option>
                                    <option>800</option>
                                    <option>900</option>
                                    <option>bold</option>
                                    <option>bolder</option>
                                    <option>lighter</option>
                                </select>
                            </div>

                            <div class="input-container">
                                <div class="input-description">font size</div>
                                <input class="input-number input-value" type="number" min="2" max="100" field="fontSize" value=${this.buttonData.fontSize} measure="px" >
                            </div>
    
                        </div>
                    </div>
                    <!----------------------------------------------------------------------------------------->
                    <div class="section">
                        <button class="extend">
                            <h3>Color properties</h3>
                            <div>↓</div>
                        </button>
                        <div class="config-inputs hidden">
                            CONTENIDO RELACIONADO AL COLOR
                        </div>
                    </div>
                    <!----------------------------------------------------------------------------------------->
                </div>

                <div class="preview">
                    <button>${this.buttonData.textContent}</button>
                </div>
                <div class="code">
                </div>
            </div>
        `;

        this.shadowRoot.innerHTML = style + body;
    }

    /** Suscribe el elemento a todos los eventos que debe escuchar. */
    setEventListeners(){
        this.shadowRoot.addEventListener('click', this);

        const inputNumberArray = this.shadowRoot.querySelectorAll('.input-number');
        inputNumberArray.forEach(inputNumber => {
            inputNumber.addEventListener('input', this);
        });

        const inputSelectArray = this.shadowRoot.querySelectorAll('.input-select');
        inputSelectArray.forEach(inputSelect => {
            inputSelect.addEventListener('change', this);
        });

        const inputTextArray = this.shadowRoot.querySelectorAll('.input-text');
        inputTextArray.forEach(inputText => {
            inputText.addEventListener('input', this);
        });

    }

    /** Actualiza el estilo del botón aplicando el campo y valor pasado como argumentos. */
    updateButton(field, value){
        const button = this.shadowRoot.querySelector('.preview>button');
        button.style[field] = value;
    }
}

customElements.define('dt-button', DtButton);