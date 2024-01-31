import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

dotenv.config()

const options = {
    definition: {
        failOnErrors: true,
        openapi: '3.0.0',
        info: {
            title: 'NodeType',
            version: `${process.env.NODE_ENV}-${process.env.npm_package_version}`,
            description: 'API para Cadastro, Autenticação e Autorização de Usuários',
        },
    },
    apis: [
        './dist/**/*.routes.js', 
        './src/**/*.routes.ts'
    ]
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUiExpress };
