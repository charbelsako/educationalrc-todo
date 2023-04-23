function requireLogin(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.json({ message: 'Not authenticated!' })
  }
}

module.exports = { requireLogin }
