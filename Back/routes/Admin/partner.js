const express = require("express");
const router = express.Router();

const Partner = require('../../models/Admin/Partners')


router.route("/newpartner").post((req, res, next) => {
  const name = req.body.name;
  Partner.findOne({name}).then(partners => {
    if(partners) {
      partners.name = req.body.name,
      partners.topImageData = req.body.topImageData,
      partners.save();
    } else {
      const newPartner = new Partner({
          name : req.body.name,
          topImageData : req.body.topImageData,
      })
      newPartner.save().then((result) => {
          res.status(200).json({
              success : true,
              document : result
          });
      }).catch((err) => next(err))
    }
  })
})

router.get('/allpartner', (req,res) =>{
    Partner.find({})
    .exec((err, Partner) =>{
      if(err) {
        res.status(500).json({message:err})
      }
      res.status(200).json({message: 'ok', data : Partner})
    })
  })

module.exports = router;
