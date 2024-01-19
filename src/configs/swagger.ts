import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'NodeType',
            version: '0.1.0',
            description: 'API para cadastro, autenticação e autorização de usuários',
        },
    },
    apis: ['./src/routes/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUiExpress };
