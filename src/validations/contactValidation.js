export default function validarMensaje( data ) {

    let errors = {};

    /*
    if( !data.email ) {
        errors.email = "El email es obligatorio.";
    } else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( data.email ) ) {
        errors.email = "El email no tiene un formato válido."
    }

    if( !data.password ) {
        errors.password = "La contraseña es obligatoria.";
    } else if( data.password.length < 6 ) {
        errors.password = 'La contraseña debe ser de al menos 6 caracteres.'
    }
    */

    return errors;
}
