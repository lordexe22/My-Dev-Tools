/** Descripción */
class Plantilla extends HTMLElement{

    // VARIABLES DE ESTADO ---------------------------------------------------------------------

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

    /**  Desconección del elemento. El elemento es removido del DOM. */
    disconnectedCallback() {
        // Lógica al desconectarse del DOM
    }

    /** El elemento es adoptado en un nuevo documento, El elemento se movio de un documento a otro. */
    adoptedCallback(oldDocument, newDocument) {
        // Lógica al adoptarse en un nuevo documento
    }

    /** Permite especificar qué atributos del elemento deben ser observados para cambios. Cuando se 
     * define, el método attributeChangedCallback se activará automáticamente para los atributos 
     * especificados. */
    static get observedAttributes() {
        return ['atr1', 'atr2', 'atr3'];
    }

    /** Este método es ejecutado al detectar cambios en los atributos observados del elemento. */
    attributeChangedCallback(attributeName, oldValue, newValue) {
        // Lógica al cambiar un atributo
    }

    /** Gestiona los eventos a los que este elemento esta suscripto. */
    handleEvent(e){
        // Lógica al recibir un evento
    }


    // MÉTODOS PROPIOS -------------------------------------------------------------------------



    /** Define y renderiza en pantalla el elemento. */
    render(){
        const style = `
            <style>
                :host{} /* Estilos del elemento principal */
            </style>
        `;
        const body = `
            <div id="container">
            </div>
        `;

        this.shadowRoot.innerHTML = style + body;
    }

    /** Suscribe el elemento a todos los eventos que debe escuchar. */
    setEventListeners(){
    }
}

customElements.define('plantilla-component', Plantilla);