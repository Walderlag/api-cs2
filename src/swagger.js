import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API CS2 Inventory',
      version: '1.0.0',
      description: 'API REST para gerenciamento de inventário de CS2 com autenticação JWT e controle de acesso'
    },
    servers: [
      {
        url: process.env.RENDER_EXTERNAL_URL || `https://api-cs2.onrender.com`,
        description: 'Servidor'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Token obtido via POST /auth/login'
        }
      },
      schemas: {
        Caixa: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único da caixa (ObjectId do MongoDB)'
            },
            nome: {
              type: 'string',
              example: 'Caixa de Operação'
            },
            colecao: {
              type: 'string',
              example: 'Recon'
            }
          }
        },
        Chave: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único da chave (ObjectId do MongoDB)'
            },
            nome: {
              type: 'string',
              example: 'Chave de Caso'
            },
            quantidade: {
              type: 'integer',
              example: 10
            }
          }
        },
        Skin: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único da skin (ObjectId do MongoDB)'
            },
            arma: {
              type: 'string',
              example: 'AK-47'
            },
            nome_skin: {
              type: 'string',
              example: 'Phantom Disruptor'
            },
            raridade: {
              type: 'string',
              example: 'Extraordinária'
            },
            caixa_id: {
              type: 'string',
              description: 'ID da caixa associada (ObjectId do MongoDB)'
            }
          }
        },
        Usuario: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            email: {
              type: 'string'
            },
            role: {
              type: 'string',
              enum: ['admin', 'user']
            }
          }
        },
        Erro: {
          type: 'object',
          properties: {
            mensagem: {
              type: 'string'
            }
          }
        }
      }
    },
    security: []
  },
  apis: ['./src/routes/*.js']
};

export const specs = swaggerJSDoc(options);

export default specs;
