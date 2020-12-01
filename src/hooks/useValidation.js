import { useState, useEffect } from 'react';

const useValidation = ( initialState, validation, fn ) => {

    const [ data, setData ] = useState(initialState);
    const [ errors, setErrors ] = useState({});
    const [ submitForm, setSubmitForm ] = useState(false);

    useEffect(() => {
        if ( submitForm ) {
            const noErrors = Object.keys( errors ).length === 0;
            console.log('const noErrors');
            console.log(noErrors);
            if ( noErrors ) {
                fn();
            }
            setSubmitForm(false);
        }
    }, [errors]);

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const errorsValidation = validation(data);
        setErrors(errorsValidation);
        setSubmitForm(true);
        console.log('const data');
        console.log(data);
        console.log('const errors');
        console.log(errors);
        console.log('const submitForm');
        console.log(submitForm);
    }

    const handleBlur = () => {
        const errorsValidation = validation(data);
        setErrors(errorsValidation);
    }

    return {
        data,
        errors,
        submitForm,
        handleSubmit,
        handleChange,
        handleBlur
    };
}

export default useValidation;
