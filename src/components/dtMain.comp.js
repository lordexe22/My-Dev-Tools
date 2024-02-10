/** Descripción */
class DtMain extends HTMLElement{

    // ​‌‌‍⁡⁣⁢⁣VARIABLES DE ESTADO ----------------------------------------------⁡​

    /** Estado actual de la aplicación */
    state = {}

    // ⁡⁣⁢⁣​‌‌‍MÉTODOS NATIVOS DEL ELEMENTO ------------------------------------- ​⁡

    /** Creación de una nueva instancia del elemento. */
    constructor(){
        super();
    }
}

customElements.define('dt-main', DtMain);

export default DtMain;