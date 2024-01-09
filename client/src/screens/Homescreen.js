import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';
import Room from '../components/Room';
import { DatePicker, Space } from 'antd'
//import 'antd/dist/antd.css'
import  '@ant-design/cssinjs';
import moment from 'moment';
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [fromdate , setfromdate] = useState()
  const [todate , settodate] = useState()
  const [duplicaterooms,setduplicaterooms] =useState([])
  useEffect(() => {
    const fetchdata = async () => {
      try {
        setloading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        //console.log(data[0].currentbookings);
        setduplicaterooms(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };
    fetchdata();
  }, []);
   
  function filterByDate(dates) {
     setfromdate(dates[0].format('DD-MM-YYYY'))
      settodate(dates[1].format('DD-MM-YYYY'))
    
        // var temprooms = []
        // var availability = false
        // for(const room of duplicaterooms){

        //   if(room.currentbookings.length >0){
        //     for(const booking of room.currentbookings){
        //       if(!moment(moment(dates[0].format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate))
        //       && !moment(moment(dates[1].format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate))
        //       ){

        //         if(
        //             moment(dates[0].format('DD-MM-YYYY'))!==booking.fromdate &&
        //             moment(dates[0].format('DD-MM-YYYY'))!==booking.todate &&
        //             moment(dates[1].format('DD-MM-YYYY'))!==booking.fromdate &&
        //             moment(dates[1].format('DD-MM-YYYY'))!==booking.todate 
        //         )
        //         {
        //           availability=true;
        //         }
        //       }
        //     }
        //   }
        //   if(availability == true || room.currentbookings.length === 0)
        //   {
        //     temprooms.push(room)
        //   }
        //   setrooms(temprooms);
        // }
        

  }


  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-3">

        <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />

        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1><Loader/></h1>
        ) : rooms.length>1 ? (
          rooms.map((room) => {
            return <div className="col-md-9">
                 <Room room ={room} fromdate={fromdate} todate={todate} />         
            </div>          
            })
        ) :  (
          <h1><Error/></h1>
          
        )}
      </div>
    </div>
  );
}
export default Homescreen;
