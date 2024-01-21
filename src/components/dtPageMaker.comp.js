// IMPORTACIONES ------------------------------------------------------------------------------
import './dtHeader.comp.js';
import './dtMain.comp.js';
import './dtNav.comp.js';

/** Gestiona las variables globales de la aplicación para la visualización de la página. */
class DtPageMaker extends HTMLElement{

    // VARIABLES DE ESTADO ---------------------------------------------------------------------
    
    /** Variables de configuración de la página. */
    config = {
        /** Tema de la página >> **dark** || light. */
        theme: "dark",
    }

    /** Referencia a los elementos hijo */
    childElements = {
        /** Referencia al elemento **&lt;dt-header&gt;**. */
        dtHeader : null,
        /** Referencia al elemento **&lt;dt-main&gt;**. */
        dtMain : null,
        /** Referencia al elemento **&lt;dt-nav&gt;**. */
        dtNav : null,
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
                    width: 100dvw;
                    height: 100dvh;
                    padding: 0;
                    margin: 0;
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    grid-template-rows: repeat(10, 1fr);
                    grid-column-gap: 0px;
                    grid-row-gap: 0px;

                    background-color: #444;
                } 
            </style>
        `;
        const body = `
            <slot name="dt-header"></slot>
            <slot name="dt-nav"></slot>
            <slot name="dt-main"></slot>
        `;

        this.shadowRoot.innerHTML = style + body;

    }

    /** Crea y vincula los elementos hijos del elemento. */
    setChildren(){
        // Creación de los elementos hijo
        const $dtHeader = document.createElement('dt-header');
        const $dtMain = document.createElement('dt-main');
        const $dtNav = document.createElement('dt-nav');
        // Se añade el correspondiente atributo slot a cada elemento hijo
        $dtHeader.setAttribute('slot','dt-header');
        $dtMain.setAttribute('slot','dt-main');
        $dtNav.setAttribute('slot','dt-nav');
        // Se vinculan los elementos hijo
        this.appendChild($dtHeader);
        this.appendChild($dtMain);
        this.appendChild($dtNav);
    }

    /** Establece las referencias de los elementos hijos y los elementos del shadow-DOM de este elemento */
    setReferences(){
        // Elementos hijo del DOM principal 
        this.childElements.dtHeader = this.querySelector('[slot="dt-header"]');
        this.childElements.dtMain = this.querySelector('[slot="dt-main"]');        
        this.childElements.dtNav = this.querySelector('[slot="dt-nav"]');
    }

}

customElements.define('dt-page-maker', DtPageMaker);