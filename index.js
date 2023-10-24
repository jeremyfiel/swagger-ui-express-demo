const express = require('express')
const swaggerUI = require('swagger-ui-express')


const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000


const OASdescription = {

    openapi: "3.1.0",
    info: {
        title: "test api for stack",
        version: "1.0.0"
    },
    servers: [
        {
            "url": "https://localhost.com:3000/v1"
        }
    ],
    tags: [{
        "name": "test api",
        "description": "test api description"
    }],
    paths: {
        "/hello": {
            "get": {
                "description": "description",
                "tags": ["test api"],
                "operationId": "sayHello",
                "parameters": [
                    {
                        "$ref": "#/components/parameters/header_accept-language"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "response",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "string"

                                }
                            }
                        }
                    },
                    "400": {
                        "$ref": "#/components/responses/400"
                    }
                }
            }
        }
    },
    components: {
        "parameters": {
            "header_accept-language": {
                "name": "accept-language",
                "in": "header",
                "schema": {
                    "type": "string",
                    "enum": ["en-US"],
                    "default": "en-US"
                }
            }
        },
        "responses": {
            "400": {
                "description": "Bad Request",
                "content": {
                    "application/problem+json": {
                        "schema": {
                            "description": "Problem JSON as defined in RFC9457",
                            "type": "object",
                            "properties": {
                                "type": {
                                    "description": "The \"type\" member is a JSON string containing a URI reference [URI] that identifies the problem type",
                                    "type": "string",
                                    "format": "uri-reference"
                                },
                                "status": {
                                    "description": "The \"status\" member is a JSON number indicating the HTTP status code ([HTTP], <a href=\"https://www.rfc-editor.org/rfc/rfc9110#section-15\">Section 15</a>) generated by the origin server for this occurrence of the problem.",
                                    "type": "number"
                                },
                                "title": {
                                    "description": "The \"title\" member is a JSON string containing a short, human-readable summary of the problem type.",
                                    "type": "string"
                                },
                                "detail": {
                                    "description": "The \"detail\" member is a JSON string containing a human-readable explanation specific to this occurrence of the problem.",
                                    "type": "string"
                                },
                                "instance": {
                                    "description": "The \"instance\" member is a JSON string containing a URI reference that identifies the specific occurrence of the problem.",
                                    "type": "string",
                                    "format": "uri-reference"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


app.use('/hello', swaggerUI.serve, swaggerUI.setup(OASdescription))


app.listen(PORT, () => console.log(`listening on port ${PORT}`))