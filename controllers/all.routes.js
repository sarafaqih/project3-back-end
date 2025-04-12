
const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Stadium = require("../models/stadium.js");
const Reservation = require("../models/reservation.js")
const router = express.Router();



//Stadium Routes Section ----------------------------------------------------------------------

router.post("/", verifyToken, async (req, res) => {
    try {
      console.log(req.body)
      req.body.addedBy = req.user._id;
      const stadium = await Stadium.create(req.body);
      stadium._doc.addedBy = req.user;
      res.status(201).json(stadium);
    } catch (err) {
      console.log(err)
      res.status(500).json({ err: err.message });
    }
  })




  router.get("/", verifyToken, async (req, res) => {
    try {
      const stadiums = await Stadium.find({})
        .populate("addedBy")
        .sort({ addedAt: "desc" });
      res.status(200).json(stadiums);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });


// put static routes before dynamic ones (get for Reservation) ------
  router.get("/reservations", verifyToken, async (req, res) => {
    try {
      const reservations = await Reservation.find({})
        .populate("username")
        .populate("stadium")
        .sort({ reservedAt: "desc" });
      res.status(200).json(reservations);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  router.get("/:stadiumId", verifyToken, async (req, res) => {
    try {
      const stadium = await Stadium.findById(req.params.stadiumId).populate("addedBy");
      res.status(200).json(stadium);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });


  router.put("/:stadiumId", verifyToken, async (req, res) => {
    try {
      // Find the stadium:

      const stadium = await Stadium.findById(req.params.stadiumId).populate("addedBy");

    //   console.log(stadium.addedBy.role)
    //   console.log(stadium.addedBy)
  
    //   // Check permissions:
      if (stadium.addedBy.role === "customer") {
        return res.status(403).send("You're not allowed to do that!");

      }
  
      // Update stadium:
      const updatedStadium = await Stadium.findByIdAndUpdate(
        req.params.stadiumId,
        req.body,
        { new: true }
      );
  
      // Append req.user to the author property: !!!!!!!!!!!!!!!!!!!!!
      //updatedStadium._doc.addedBy = req.user;
  
      // Issue JSON response:
      res.status(200).json(updatedStadium);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });




  router.delete("/:stadiumId", verifyToken, async (req, res) => {
    try {
      const stadium = await Stadium.findById(req.params.stadiumId).populate("addedBy");

  
      if (stadium.addedBy.role === "customer") {
        return res.status(403).send("You're not allowed to do that!");
      }

  
      const deletedstadium = await Stadium.findByIdAndDelete(req.params.stadiumId);
      res.status(200).json(deletedstadium);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });


//Reservation Routes Section ----------------------------------------------------------------------

router.post("/:stadiumId/reservation", verifyToken, async (req, res) => {

    try {
        req.body.username = req.user._id;
        console.log(req.body.username)
        const stadium = await Stadium.findById(req.params.stadiumId)

        req.body.stadium = req.params.stadiumId
        // req.body.stadium = stadium
        // console.log(req.body.stadium)


        const reservation = await Reservation.create(req.body);
        
        // reservation._doc.username = req.user;
        // reservation._doc.Stadium = stadium;
       
        // console.log("kk",reservation)
        
        res.status(201).json(reservation);
      } catch (err) {
        res.status(500).json({ err: err.message });
      }
    })


    router.get("/reservations/:reservationId", verifyToken, async (req, res) => {
        try {
          const reservation = await Reservation.findById(req.params.reservationId)
          .populate("username")
          .populate("stadium")
          res.status(200).json(reservation);
        } catch (err) {
          res.status(500).json({ err: err.message });
        }
      });
      
      router.put("/reservations/:reservationId", verifyToken, async (req, res) => {
        try {

          const reservation = await Reservation.findById(req.params.reservationId)
          .populate("username")
          .populate("stadium");
    
          console.log(reservation.username.id)
          console.log(req.user._id)


          if (req.user.role !== "admin" && !reservation.username._id.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
          }
      

          const updatedreservation = await Reservation.findByIdAndUpdate(
            req.params.reservationId,
            req.body,
            { new: true }
          );
      
          updatedreservation._doc.username = req.user;
      
          res.status(200).json(updatedreservation);
        } catch (err) {
          res.status(500).json({ err: err.message });
        }
      });


      router.delete("/reservations/:reservationId", verifyToken, async (req, res) => {
        try {

    
          const reservation = await Reservation.findById(req.params.reservationId)
          .populate("username")
          .populate("stadium");
    
          if (req.user.role !== "admin" && !reservation.username._id.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
          }
    
      
          const deletedreservation = await Reservation.findByIdAndDelete(req.params.reservationId);
          res.status(200).json(deletedreservation);
        } catch (err) {
          res.status(500).json({ err: err.message });
        }
      });
    
module.exports = router;
