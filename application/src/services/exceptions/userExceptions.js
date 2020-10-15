'use strict'

class UserEmailAlreadyTakenError extends Error {}
class UserUsernameAlreadyTakenError extends Error {}

module.exports = {
    UserEmailAlreadyTakenError,
    UserUsernameAlreadyTakenError
}