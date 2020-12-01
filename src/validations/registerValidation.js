export default function validateRegistration( data ) {

    let errors = {};

    if ( !data.nombre ) {
        errors.nombre = "El nombre es obligatorio."
    }

    if ( !data.email ) {
        errors.email = "El email es obligatorio."
    } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( data.email ) ) {
        errors.email = "El email no tiene un formato válido."
    }

    if ( !data.password ) {
        errors.password = "La contraseña es obligatorio."
    } else if ( data.password.length < 6 ) {
        errors.password = "La contraseña debe tener como mínimo 6 caracteres.";
    }

    return errors;
}
