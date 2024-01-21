// IMPORTACIONES ------------------------------------------------------------------------------

/** Gestiona las variables globales de la aplicación para la visualización de la página. */
class DtMain extends HTMLElement{

    // VARIABLES DE ESTADO ---------------------------------------------------------------------
    
    /** Variables de configuración del header. */
    config = {
    }

    /** Referencia a los elementos hijo */
    childElements = {
    }

    /** Referencia a los elementos del shadow-DOM */
    shadowElements = {
    }

    // MÉTODOS NATIVOS DEL ELEMENTO ------------------------------------------------------------

    /** Creación de una nueva instancia del elemento. */
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    /** Inicialización del elemento. El elemento fue conectado al DOM. */
    connectedCallback() {
        this.render();
        this.setChildren();
        this.setReferences();
    }

    // MÉTODOS PROPIOS -------------------------------------------------------------------------

    /** Define y renderiza en pantalla el elemento. */
    render(){
        const style = `
            <style>
                :host{
                    box-sizing: border-box;
                    grid-area: 2 / 2 / 11 / 6;
                    width: 100%;
                    height: 100%;
                    padding: 0;
                    margin: 0;
                    display: flex;

                    background-color: #2a2;
                } 
            </style>
        `;
        const body = `
            <div id="container">
            </div>
        `;

        this.shadowRoot.innerHTML = style + body;

    }

    /** Crea y vincula los elementos hijos del elemento. */
    setChildren(){
        // // Creación de los elementos hijo
        // const $dtHeader = document.createElement('dt-header');
        // const $dtMain = document.createElement('dt-main');
        // const $dtNav = document.createElement('dt-nav');
        // // Se añade el correspondiente atributo slot a cada elemento hijo
        // $dtHeader.setAttribute('slot','dt-header');
        // $dtMain.setAttribute('slot','dt-main');
        // $dtNav.setAttribute('slot','dt-nav');
        // // Se vinculan los elementos hijo
        // this.appendChild($dtHeader);
        // this.appendChild($dtMain);
        // this.appendChild($dtNav);
    }

    /** Establece las referencias de los elementos hijos y los elementos del shadow-DOM de este elemento */
    setReferences(){
        // this.childElements.dtHeader = this.querySelector('[slot="dt-header"]');
        // this.childElements.dtMain = this.querySelector('[slot="dt-main"]');        
        // this.childElements.dtNav = this.querySelector('[slot="dt-nav"]');
        // // Elementos del shadow-DOM
        // this.shadowElements.container = this.shadowRoot.getElementById('container');
    }

}

customElements.define('dt-main', DtMain);