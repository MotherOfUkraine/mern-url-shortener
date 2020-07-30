const { Router } = require('express')
const Link = require('../modules/Link')
const router = new Router()

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({ code: req.params.code })

        if(link){
            link.clicks++
            await link.save()
            return res.redirect(link.from)
        }

        res.status(404).json('Link is not existing')
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router