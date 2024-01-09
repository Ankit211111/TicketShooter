import React , {useState ,useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";

function Bookingscreen() {
    let { roomid ,fromdate,todate} = useParams();
    
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [room, setroom] = useState();
    const [totalamount, settotalamount] = useState();
    const firstdate = moment(fromdate , 'DD-MM-YYYY')
    const lastdate =moment(todate , 'DD-MM-YYYY')
 
const totaldays = moment.duration(lastdate.diff(firstdate)).asDays()+1
//const totalamount = totaldays * room.rentperday ; 

   
 
    useEffect(()=>{
        const a = async()=>{
        try {
            setloading(true);
        const data = (await axios.post("/api/rooms/getroombyid" , {roomid:roomid})).data;
           settotalamount(totaldays * data.rentperday )
        setroom(data);
        setloading(false);
        } catch (error) {
            
            setloading(false);
            seterror(true);

        }
    }
    a();

       },[]);

          
 async function onToken(token) {
    
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      firstdate: firstdate._i,
      lastdate: lastdate._i,
      totalamount,
      totaldays,
      token
    };

    try {
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
    } catch (error) {
        <Error message="something went wrong"/>
    }
 }
    return (
      <div className="m-5">
        {loading ? (
          <h1>
            {" "}
            <Loader />
          </h1>
        ) : room ? (
          <div>
            <div className="row justify-content-center mt-5 bs">
              <div className="col-md-6">
                <h1>{room.name}</h1>
                <img src={room.imageurls[0]} className="bigimg" />
              </div>
              <div className="col-md-6">
                <div style={{ textAlign: "right" }}>
                  <h1>Booking Details</h1>
                  <hr />
                  <b>
                    <p>
                      Name :
                      {JSON.parse(localStorage.getItem("currentUser")).name}{" "}
                    </p>
                    <p>From Date :{fromdate} </p>
                    <p>To Date :{todate}</p>
                    <p>Max Count : {room.maxcount}</p>
                  </b>
                </div>
                <div style={{ textAlign: "right" }}>
                  <b>
                    <h1>Amount</h1>
                    <hr />
                    <p>Total days :{totaldays} </p>
                    <p>Rent per day : {room.rentperday}</p>
                    <p>Total Amount : {totalamount}</p>
                  </b>
                </div>
                <div>
                  
                  <StripeCheckout
                    currency="INR"
                    amount={totalamount *100}
                    token={onToken}
                    stripeKey={process.env.REACT_APP_STRIPEPUBKEY}>
                    <button style={{ float: "right" }}
                    className="btn btn-primary">
                  Pay Now
                  </button>
                  </StripeCheckout>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Error />
        )}
      </div>
    );
}

export default Bookingscreen;