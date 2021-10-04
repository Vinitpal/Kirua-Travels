- connect with db and the port 8800

- create model {Pin, User}

  - (pin) => {username, title, desc, rating, lat, long}
  - (user) => {username, email, password}

- setup routes {pins, users}

  - (pins) => {createPin, getPins}

  - (users) => {register, login}
    - (register) => {userAlreadyExists, initialCheck, hashPassword, createUser, saveUser}
    - (login) => {doesUserExists, checkPassword, login}

- setup middlewares
  - userAlreadyExists, registerCheck for initialCheck
