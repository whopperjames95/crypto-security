const bcrypt = require('bcryptjs')
const users = []


module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body

      
      for (let i = 0; i < users.length; i++) {
        if(users[i].username === username) {
          if (bcrypt.compareSync(password, users[i].password)){
            console.log(req.body)
            delete req.body.password
            res.status(200).send(req.body);
            return
          }
        }
        // const existing = bcrypt.compareSync()
        // if (users[i].username === username && users[i].password === password) {
          // res.status(200).send(users[i])
        // }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      let {
            password,
          } = req.body

          const salt = bcrypt.genSaltSync(10);
          console.log(salt);
          const hash = bcrypt.hashSync(password, salt);
          console.log(hash);

          delete req.body.password;
          const user = req.body;
          user['password'] = hash;
          // console.log(user)


        console.log('Registering User')
        console.log(req.body)
        users.push(user)
        console.log(users)
        res.status(200).send(users)
    }
}








const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const existing = bcrypt.compareSync(password, users[i].passHash)
        if (users[i].username === username && existing) {
          res.status(200).send(users[i])
          return
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        let {username, email, firstName, lastName, password} = req.body

        const salt = bcrypt.genSaltSync(5)
        const passHash = bcrypt.hashSync(password, salt)

        let userObj = {
          username,
          email,
          firstName,
          lastName,
          passHash
        }

        users.push(userObj)

        let tempUser = {...userObj}
        delete tempUser.passHash

        res.status(200).send(tempUser)
    }
}