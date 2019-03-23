Feature: Verify User

  Clients should be able to send a request to our API in order to verify their email address. Our API should validate the structure of the payload amd response with an error if it is invalid

  Scenario: Bad Request Payload

    If the client sends a GET request to /users/:hash with missing fields, they should receive a response with a 400 status code.

    When the client creates a GET request to /users/somerandomhash with empty params
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the content type of the response should be JSON
    And the payload of the response should be a JSON object
    And contains an error property set to true
    And contains a message property which says "Please enter a valid hash"

  Scenario Outline: Request Payload with invalid hash

    If the client sends a GET request to /users/hash with invalid hash, they should receive a response with a 400 status code

    When the client creates a GET request to /users/<hash> with empty params
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the content type of the response should be JSON
    And the payload of the response should be a JSON object
    And contains an error property set to true
    And contains a message property which says "Please enter a valid hash"
    And delete the test record

    Examples:

      | hash                |
      | a232hij2            |
      | aes32432njeBsefsrwe |

  Scenario: Valid Request with Non-Existing User as Payload

    If the client sends a GET request to /users/:hash with an hash that does not exist, they should receive a response with 400 HTTP status code

    When the client creates a GET request to /users/abcdef0123456789abcdef012345678912345678 with empty params
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the content type of the response should be JSON
    And the payload of the response should be a JSON object
    And contains an error property set to true
    And contains a message property which says "Provided email address does not exist"

  Scenario: Minimal Valid Request

    If the client sends a GET request to /users/:hash with an hash that exists, they should receive a response with 400 hTTP status code

    When the client creates a GET request to /users/abcdef0123456789abcdef012345678912345678 with empty params
    And create a seed with email_hash set to abcdef0123456789abcdef012345678912345678
    And sends the request
    Then our API should respond with a 200 HTTP status code
    And the content type of the response should be JSON
    And the payload of the response should be a JSON object
    And contains an error property set to false
    And contains a message property which says "Successfully verified the account"
    And delete the test record
