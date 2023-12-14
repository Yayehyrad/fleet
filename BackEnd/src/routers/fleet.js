const express = require("express");
const Fleet = require("../models/fleet");
// const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/fleet", async (req, res) => {
  // console.log(req.body);
  const {
    model,
    license: licensePlate,
    tags,
    LastOMeter: LOM,
    date: date_LOM,
    chassieNumber,
    seatNumber,
    doorsNumber,
    Secdate: date,
  } = req.body;
  const fleet = new Fleet({
    model,
    licensePlate,
    tags,
    LOM,
    date_LOM,
    chassieNumber,
    seatNumber,
    doorsNumber,
    date,
  });
  try {
    await fleet.save();
    // console.log(`fleet saved`, fleet);
    res.status(201).send({ fleet });
  } catch (error) {
    // console.log(error, error.message);
    res.status(500).send(error.message);
  }
});
router.get("/fleet", async (req, res) => {
  const skip = req.query.skip ? req.query.skip : 0;
  console.log(skip, req.query);
  try {
    // const fleet = await Fleet.find({});
    const fleet = await Fleet.aggregate([
      {
        $skip: parseInt(skip),
      },
      {
        $limit: 4,
      },
    ]);
    if (!fleet) {
      return res.status(404).send("not found");
    }
    res.status(200).send(fleet);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});
router.get("/fleet/:id", async (req, res) => {
  console.log(req.params);
  try {
    const fleet = await Fleet.findById({ _id: req.params.id });
    if (!fleet) {
      return res.status(404).send("not found");
    }
    res.status(200).send(fleet);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.patch("/fleet/:id", async (req, res) => {
  console.log(req.body);
  const update = [
    "model",
    "licensePlate",
    "LOM",
    "chassieNumber",
    "seatNumber",
  ];
  const updates = Object.keys(req.body);
  const isVal = updates.every((upd) => {
    return update.includes(upd);
  });
  if (!isVal) {
    return res.status(400).send({ error: "invaid action" });
  }
  try {
    const fleet = await Fleet.findById({ _id: req.params.id });
    if (!fleet) {
      return res.status(404).send({ error: "not found" });
    }
    updates.forEach((update) => {
      console.log(update);
      fleet[update] = req.body[update];
      console.log(fleet[update]);
    });
    // console.log(fleet);
    await fleet.save();
    res.status(200).send(fleet);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete("/fleet/:id", async (req, res) => {
  console.log(req);
  try {
    const fleet = await Fleet.findByIdAndDelete({ _id: req.params.id });
    if (!fleet) {
      return res.status(404).send("not found");
    }
    res.status(200).send(fleet);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// update

// router.post("/filter/tasks",async (req , res)=>{
//   try{
//       let match = {}
//       if (req.body.search == "search"){
//         match = {
//           $or: [
//               {
//                 licencPlate: new RegExp(req.body.data , "i")
//               },
//               {
//                 chassie: new RegExp(req.body.data  ,"i")
//               }
//             ]
//       } }
//       else if(req.body.search == "filter"){
//           if(!req.body.color){
//               req.body.color = "red"
//           }
//

//           match = {
//               $and: [
//                   {
//                       exp: {
//                           $lt: parseInt(req.body.data.color)
//                       }
//                   } ,
//                 ]
//               }
//       }
//       else{
//         match =  req.body.data
//       }
//       const fleet = await Task.aggregate([
//           {
//               $match : match
//           },
//       {
//            $sort : {
//
//           }
//       } ,
//       {
//           $skip : req.body.skip
//       },
//       {
//           $limit : 12
//       }

// ])
//       console.log(fleet)
//       res.status(201).send(fleet)
//   }catch(e){
//       res.status(500).send(e.message)
//   }
// })

module.exports = router;
