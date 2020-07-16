const express = require('express');
const router = express.Router();

const Active = require('../../models/Admin/ActiveCards');
const Admin = require('../../models/Admin/Admin');

router.post("/activeCards", function (req, res) {
  Admin.findOne({ pseudo: "degalikars" }).then(adminFound => {
    Active.findOne({ admin: adminFound._id }).then(active => {
      if (active !== null) {
        active.Coordonates = req.body.Coordonates
        active.Identities = req.body.Identities
        active.Health = req.body.Health
        active.SocialNetworks = req.body.SocialNetworks
        active.Professional = req.body.Professional
        active.Hobbies = req.body.Hobbies
        active.save();
        res.status(200).json({
          success: true
        });
      } else {
        const newActive = new Active({
          Identities: req.body.Identities,
          Coordonates: req.body.Coordonates,
          SocialNetworks: req.body.SocialNetworks,
          Health: req.body.health,
          Professional: req.body.Professional,
          Hobbies: req.body.Hobbies,
          admin: adminFound._id
        });
        newActive
          .save()
          .then(result => {
            res.status(200).json({
              success: true,
              document: result
            });
          })
          .catch(err => next(err));
      }
    });
  });
});


router.get("/activeCards", function (req, res) {
  let tab = [];
  Admin.findOne({ pseudo: "degalikars" }).then(adminFound => {
    const query = {
      admin: adminFound._id
    }
    Active.findOne(query, function (err, datas) {
      if (err) {
        return err;
      } else {
        let payloadDatas = new Active({});
        if (datas !== null) {
          payloadDatas = Object.assign(datas);
          tab.push(payloadDatas.Identities)
          tab.push(payloadDatas.Coordonates)
          tab.push(payloadDatas.SocialNetworks)
          tab.push(payloadDatas.Hobbies)
          tab.push(payloadDatas.Health)
          tab.push(payloadDatas.Professional)
          return res
            .send({
              datas: payloadDatas,
              tab: tab
            })
            .status(200);
        } else {
          return res.send({ message: "Pas de datas" });
        }
      }
    })
  })
});

module.exports = router;
