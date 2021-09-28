const router = require('express').Router({mergeParams:true});
router.get('/', async (req, res)=>{
    
    res.status(200).json([]);
})

module.exports = router;