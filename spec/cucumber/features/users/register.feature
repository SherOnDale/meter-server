Feature: Register User

  Clients should be able to send a request to our API in order to create a user. Our API should validate the structure of the payload and response with an error if it is invalid.

  Scenario Outline: Bad Client requests

    If the client sends a POST request to /users with a bad payload, they should receive a response with a 400 status code

    When the client creates a POST request to /users
    And attaches a generic <payloadType> payload
    And sends the request
    Then our API should respond with a <statusCode> HTTP status code
    And the content type of the response should be JSON
    And the payload of the response should be a JSON object
    And contains an error property set to true
    And contains a message property which says <message>

    Examples:

      | payloadType | statusCode | message                                                                                |
      | empty       | 400        | 'Payload should not be empty'                                                          |
      | non-JSON    | 415        | 'The "Content-Type" header must always be "application/json" or "multipart/form-data"' |
      | malformed   | 400        | "Payload should be in JSON format"                                                     |

  Scenario: Bad Request Payload

    If the client sends a POST request to /users with missing fields, they should receive a response with a 400 status code.

    When the client creates a POST request to /users
    And attaches a Create User payload which is missing the email field
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the content type of the response should be JSON
    And the payload of the response should be a JSON object
    And contains an error property set to true
    And contains a message property which says "Payload must contain at least the email field"

  Scenario: Request Payload with Properties of Unsupported Type

    If the client sends a POST request to /users with invalid types, they should receive a response with a 400 status code.

    When the client creates a POST request to /users
    And attaches a Create User payload where the email field is not a string
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the content type of the response should be JSON
    And the payload of the response should be a JSON object
    And contains an error property set to true
    And contains a message property which says "The email must be of type string"

  Scenario Outline: Request Payload with invalid email format

    If the client sends a POST request to /users with invalid email, they should receive a response with a 400 status code

    When the client creates a POST request to /users
    And attaches a Create User payload where the email field is exactly <email>
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the content type of the response should be JSON
    And the payload of the response should be a JSON object
    And contains an error property set to true
    And contains a message property which says "The email field must be a valid email"

    Examples:

      | email     |
      | a232hij2  |
      | a@1.2.3.4 |
      | a.b.c@!!  |

  Scenario: Minimal Valid Request

    If the client sends a POST request to /users with valid payload, they should receive a response with a 200 status code

    When the client creates a POST request to /users
    And attaches a valid Create User payload
    And sends the request
    Then our API should respond with a 201 HTTP status code
    And the content type of the response should be JSON
    And the payload of the response should be a JSON object
    And contains an error property set to false
    And contains a message property which says "Successfully created a new user"
    And delete the test record