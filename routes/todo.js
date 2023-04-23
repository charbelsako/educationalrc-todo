const router = require('express').Router()
const { requireLogin } = require('../middleware/auth')

router.use(requireLogin)

router.get('/', async (req, res) => {
  try {
    const { page, limit } = req.query
    const items = await Item.find({
      user: req.session.user._id,
      isDeleted: false,
    })
      .skip((page - 1) * limit)
      .limit(limit)

    res.status(200).json({
      items: items,
      page,
      limit,
      start: (page - 1) * limit,
      totalDocs: items.length,
    })
  } catch (err) {
    console.error(err)
  }
})

router.post('/create', async (req, res) => {
  try {
    // TODO validate input
    const params = req.body
    const item = new Item({ user: req.session.user._id, text: params.text })
    await item.save()
    res.status(200).json({ message: 'Created item successfully', item })
  } catch (err) {
    console.error(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const item = await Item.findOneAndUpdate(
      {
        _id: id,
        user: req.session.user._id,
      },
      {
        isDeleted: true,
      },
      { new: true }
    )

    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }
    res.status(200).json({ message: 'Deleted Successfully', item })
  } catch (err) {
    console.error(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const params = req.body
    const item = await Item.findOneAndUpdate(
      { _id: id, user: req.session.user._id },
      { ...params },
      { new: true }
    )
    if (!item) {
      res.status(404).json({ message: 'Item not found' })
    }

    res.status(200).json({ message: 'Updated Successfully', item })
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
