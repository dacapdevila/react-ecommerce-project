export default function validarMensaje( data ) {

    let errors = {};

    if( !data.nombre ) {
        errors.nombre = "El nombre es obligatorio.";
    } else if( data.nombre.length < 2 ) {
        errors.nombre = 'El nombre debe tener al menos 2 caracteres.'
    }

    if( !data.apellido ) {
        errors.apellido = "El apellido es obligatorio.";
    } else if( data.apellido.length < 2 ) {
        errors.apellido = 'El apellido debe tener al menos 2 caracteres.'
    }

    if( !data.email ) {
        errors.email = "El email es obligatorio.";
    } else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( data.email ) ) {
        errors.email = "El email no tiene un formato válido."
    }

    if( !data.mensaje ) {
        errors.mensaje = "El mensaje es obligatorio.";
    } else if( data.mensaje.length < 10 ) {
        errors.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
    }

    return errors;
}
