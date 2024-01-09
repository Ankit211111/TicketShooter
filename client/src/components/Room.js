import React,{useState} from 'react';
import {Modal , Button, Carousel} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Bookingscreen from '../screens/Bookingscreen';
//import Homescreen from '../screens/Homescreen';
function Room({room ,fromdate,todate}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <div className='row bs' style={{ marginLeft: '5rem'}}> 
           <div className ="col-md-4">
              <img src={room.imageurls[0]} className="smallimg" />
           </div>
           <div className ="col-md-7 text-left">
           <h1>{room.name}</h1>
              <b>
                {" "}
              <p>Max Count : {room.maxcount}</p>
              <p>Phone Number : {room.phonenumber}</p>
              <p>Type : {room.type}</p>
              
              </b>

              <div style={{float:'right'}}>
                  
                 {(fromdate && todate )&& (
                   <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                   <Button className='btn btn-primary m-2'>Book Now</Button>
                   </Link>
                 ) } 
                
                <button className='btn btn-primary' onClick={handleShow}>View Details</button>
              </div>
           </div>
        

      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Carousel prevLabel='' nextLabel=''>
      
        {room.imageurls.map(url=>{
            return <Carousel.Item>
            <img
              className="d-block w-100 bigimg"
              src={url}
              
            />
            <p>{room.description}</p>
          </Carousel.Item>
        })}
      
    </Carousel>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>


        </div>
    )
}

export default Room;