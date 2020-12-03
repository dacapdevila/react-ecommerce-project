export default function validarMensaje( data ) {

    let errors = {};

    if ( !data.name ) {
        errors.name = "El nombre y apellido son obligatorios.";
    }

    if ( !data.phone ) {
        errors.phone = "El teléfono es obligatorio.";
    }

    if ( !data.email ) {
        errors.email = "El email es obligatorio.";
    } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( data.email ) ) {
        errors.email = "El email no tiene un formato válido."
    }

    if ( !data.email_confirmation ) {
        errors.email_confirmation = "La confirmación del email es obligatorio.";
    } else if ( data.email !== data.email_confirmation ) {
        errors.email_confirmation = "Los emails no coinciden, ingresalos nuevamente.";
    }

    console.log('data que llega a la validación');
    console.log(data);

    console.log('errors');
    console.log(errors);

    return errors;
}
