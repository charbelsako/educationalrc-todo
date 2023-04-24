const router = require('express').Router()
const bcrypt = require('bcrypt')
const passport = require('passport')

router.get('/current', async (req, res) => {
  res.json(req.session)
})

router.get('/logout', async (req, res) => {
  try {
    await req.session.destroy()
    res.status(200).json({ message: 'Logout successful' })
  } catch (err) {
    console.error(err)
  }
})

router.post('/login', passport.authenticate('local'), async (req, res) => {
  try {
    res.status(200).json({ message: 'Login Success' })
  } catch (err) {
    console.error(err)
  }
})

router.post('/signup', async (req, res) => {
  try {
    const params = req.body
    // TODO validate input

    const user = await User.findOne({ email: params.email })
    if (user) {
      return res.status(400).json({ message: 'Email already taken' })
    }
    const salt = await bcrypt.genSalt(10)
    params.password = await bcrypt.hash(params.password, salt)

    const newUser = new User({ email: params.email, password: params.password })
    await newUser.save()

    res.json(newUser)
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
