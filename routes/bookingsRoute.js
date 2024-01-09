const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");
const Room = require("../models/room");
const stripe = require("stripe")(process.env.stripePrivateKey);
const { v4: uuidv4 } = require("uuid");
router.post("/bookroom", async (req, res) => {
 
  const { room, userid, firstdate, lastdate, totalamount, totaldays, token } =
    req.body;
  console.log(firstdate + " " + lastdate + " " + totalamount + " " + totaldays);

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    console.log(customer);
    const payment = await stripe.checkout.session.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "inr",

        payment_method_types: ["card"],
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      const newbooking = new Booking({
        room: room.name,
        roomid: room._id,
        userid,
        fromdate: firstdate, //: fromdate.format("MM DD YYYY"),
        todate: lastdate, //: moment(todate, "MM-DD-YYYY"),
        totalamount,
        totaldays,
        transactionId: "1234",
      });
      const booking = await newbooking.save();

      const roomtemp = await Room.findOne({ _id: room._id });
      roomtemp.currentbookings.push({
        bookingid: booking._id,
        fromdate: firstdate,
        todate: lastdate,
        //firstdate, //:  moment().('DD-MM-YYYY'),
        //lastdate, //  : moment(todate , 'DD-MM-YYYY'),
        userid: userid,
        status: booking.status,
      });
      await roomtemp.save();
    }
    res.send("Payment successfull ,Your room is booked");
  } catch (error) {
    return res.status(300).json({ error });
  }
});

module.exports = router;
