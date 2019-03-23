Feature: Set Profile

    Client should be able to send a request to our API in order to set their profile. Our API should validate the structure of the payload and respond with an error if it is invalid

    When the client creates a PUT request to /users
    And attaches a generic <payloadType> payload
    And sends the request
    Then our API should respond with a <statusCode> HTTP status code
    And the content type of the response should be JSON
    And the payload of the response should be a JSON object
    And contains an error property set to true
    And contains a message property which says <message>

    Examples:

      | payloadType | statusCode | message                                                       |
      | empty       | 400        | 'Payload should not be empty'                                 |
      | non-JSON    | 415        | 'The "Content-Type" header must always be "application/json"' |
      | malformed   | 400        | "Payload should be in JSON format"                            |

  Scenario Outline: Bad Request Payload

    If the client sends a PUT request to /users with missing fields, they should receive a response with a 400 status code.

    When the client creates a PUT request to /users
    And attaches a Create User payload which is missing the <missingFields> field
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the content type of the response should be JSON
    And the payload of the response should be a JSON object
    And contains an error property set to true
    And contains a message property which says "Payload must contain at least the email, firstName, lastName and password fields"

    Examples:

      | missingFields |
      | email         |
      | firstName     |
      | lastName      |
      | password      |

  Scenario Outline: Request Payload with Properties of Unsupported Type

    If the client sends a PUT request to /users with invalid types, they should receive a response with a 400 status code.

    When the client creates a PUT request to /users
    And attaches a Create User payload where the <field> field is not a <type>
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the content type of the response should be JSON
    And the payload of the response should be a JSON object
    And contains an error property set to true
    And contains a message property which says "The email, firstName, lastName and password must be of type string"

    Examples:
      | field     | type   |
      | email     | string |
      | firstName | string |
      | lastName  | string |
      | password  | string |

  Scenario Outline: Request Payload with invalid email format

    If the client sends a PUT request to /users with invalid email, they should receive a response with a 400 status code

    When the client creates a PUT request to /users
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

  Scenario Outline: Request Payload with invalid password

    If the client sends a PUT request to /users with invalid password, they should receive a response with a 400 status code

    When the client creates a PUT request to /users
    And attaches a Create User payload where the password field is exactly <password>
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the content type of the response should be JSON
    And the payload of the response should be a JSON object
    And contains an error property set to true
    And contains a message property which says "The password field must be a valid password"

    Examples:
      | password |
      | test     |
      | testtest |
      | testTest |

  Scenario: Valid Payload with Non-Existing Email

    If the client sends a PUT request to /users with valid payload but with email that does not exist, they should receive a response with a 400 status code

    When the client creates a PUT request to /users
    And attaches a valid Create User payload
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the content type of the response should be JSON
    And the payload of the response should be a JSON object
    And contains an error property set to true
    And contains a message property which says "Provided email adddress does not exist"

  Scenario: Minimal Valid Payload

    If the client sends a PUT request to /users with valid payload, they should receive a response with a 200 status code

    When the client creates a POST request to /users
    And attaches a valid Create User payload
    And sends the request
    Then our API should respond with a 201 HTTP status code
    And the content type of the response should be JSON
    And the payload of the response should be a JSON object
    And contains an error property set to false
    And contains a message property which says "Successfully created a new user"
    When the client creates a PUT request to /users
    And attaches a valid Create User payload
    And sends the request
    Then our API should respond with a 200 HTTP status code
    And the content type of the response should be JSON
    And the payload of the response should be a JSON object
    And contains an error property set to false
    And contains a message property which says "Successfully set the user profile"
    And delete the test record