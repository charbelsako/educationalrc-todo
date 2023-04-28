function requireLogin(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.json({ message: 'Not authenticated!' })
  }
}

module.exports = { requireLogin }
