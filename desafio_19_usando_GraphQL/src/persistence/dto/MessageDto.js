class MessageDto {
  constructor({ id, date, message, email, firstname, lastname, nick, avatar, age }) {
    this.id = id
    this.date = date
    this.message = message
    this.email = email,
    this.firstname = firstname,
    this.lastname = lastname,
    this.nick = nick,
    this.avatar = avatar,
    this.age = age
  }
}

module.exports = function formatDTO(messages) {
  if (Array.isArray(messages)) {
    return messages.map(obj => new MessageDto(obj))
  } else {
    return new MessageDto(messages)
  }
}