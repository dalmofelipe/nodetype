import { Schema } from 'express-validator';

export const userCreateValidationSchema : Schema = {
    name: { 
        isLength: { 
            options: { min: 3 }, 
            errorMessage: 'Nome deve conter no minimo 3 caracteres' 
        } 
    },
    email: {
        isEmail: true,
        errorMessage: 'Informe um email válido'
    },
    password: {
        isLength: { 
            options: { min: 6 },
            errorMessage: 'A senha de conter no minimo 6 caracteres'
        }
    },
}

export const userUpdateValidationSchema : Schema = {
    name: { 
        optional: true,
        isLength: { 
            options: { min: 3 }, 
            errorMessage: 'Nome deve conter no minimo 3 caracteres' 
        } 
    },
    email: {
        optional: true,
        isEmail: true,
        errorMessage: 'Informe um email válido'
    },
    password: {
        optional: true,
        isLength: { 
            options: { min: 6 },
            errorMessage: 'A senha de conter no minimo 6 caracteres'
        }
    },
}
