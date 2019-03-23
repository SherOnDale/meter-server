# Feature: Invite User

#   Clients should be able to send a request to our API in order to read a user. Our API should validate the structure of the payload amd response with an error if it is invalid

#   Scenario: Bad Request Payload

#     If the client sends a GET request to /users with missing fields, they should receive a response with a 400 status code.

#     When the client creates a GET request to /users with empty params
#     And sends the request
#     Then our API should respond with a 400 HTTP status code
#     And the content type of the response should be JSON
#     And the payload of the response should be a JSON object
#     And contains an error property set to true
#     And contains a message property which says "Payload must contain at least the email field"

#   Scenario Outline: Request Payload with invalid email format

#     If the client sends a GET request to /users with invalid email, they should receive a response with a 400 status code

#     When the client creates a GET request to /users with email param which is exactly <email>
#     And sends the request
#     Then our API should respond with a 400 HTTP status code
#     And the content type of the response should be JSON
#     And the payload of the response should be a JSON object
#     And contains an error property set to true
#     And contains a message property which says "The email field must be a valid email"

#     Examples:

#       | email     |
#       | a232hij2  |
#       | a@1.2.3.4 |
#       | a.b.c@!!  |

#   Scenario: Minimal Valid Request

#     If the client sends a GET request to /users with valid payload, they should receive a response with a 200 status code

#     When the client creates a GET request to /users with email param which is exactly test@example.com
#     And sends the request
#     Then our API should respond with a 200 HTTP status code
#     And the content type of the response should be JSON
#     And the payload of the response should be a JSON object
#     And contains an error property set to false
#     And contains a message property which says "Successfully performed the operation"
#     And contains a payload property of type object
#     And the payload contains a property exists of type boolean



#   Scenario: Not Existing User

#     If the client sends a GET request to /users with an email that does not exist, they should receive a response with a exists key set to false

#     When the client creates a GET request to /users with email param which is exactly test@example.com
#     And sends the request
#     Then our API should respond with a 200 HTTP status code
#     And the content type of the response should be JSON
#     And the payload of the response should be a JSON object
#     And contains an error property set to false
#     And contains a message property which says "Successfully performed the operation"
#     And contains a payload property of type object
#     And the payload contains a property exists of type boolean
#     And the payload contains a property exists set to false