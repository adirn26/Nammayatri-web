import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MapComponent from './MapsComponent';

const dummydetails = {
  message: "",
  driverName: "",
  date: "",
  time: "",
  source: "",
  destination: "",
  totalAmount: "",
  paymentMode: "CASH",
  rating: 0,
  tripId: "",
  selectedItem: null,
  vehicleNumber: "KA50D1234",
}

function TripDetails() {
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const [tripDetails, setTripDetails] = useState(dummydetails);
  console.log(location);

  useEffect(() => {
    const randomOtp = Math.floor(Math.random() * 9000) + 1000;
    setOtp(randomOtp.toString());
    setTripDetails({ vehicleNumber: "KA50D1234", driverName: location.state.booking.name, date: location.state.booking.date, time: location.state.booking.time, source: location.state.currentLocation, destination: location.state.destination, totalAmount: location.state.booking.offerPrice, tripId: location.state.booking.tripId });
  }, []);

  return (
    <>
      <div className="container-fluid position-relative my-5 z-0">
        <MapComponent currentLocation={location.state.currentLocation} destination={location.state.destination} booking={location.state.booking} />
      </div>
      <div className="container-fluid my-5 position-absolute z-1" style={{ transform: 'translateY(-40%)' }}>
        <div className="card border-warning" style={{ maxWidth: '5rem', height: '90px' }}>
          <div className="card-header ">OTP</div>
          <div className="card-body">
            <p className="card-text">{otp}</p>
          </div>
        </div>

        <div className="card card-sm my-4 border-warning" style={{ maxWidth: '400rem' }}>
          <div className="card-header">
            {tripDetails.driverName} is on the way...
          </div>

          <div className="card-body">
            <div className="row d-flex align-items-center">
              <div className="col">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="img-fluid rounded-start w-25" alt="..." />
                <h5 className='my-3'>{tripDetails.driverName}</h5>
                <div className="card" style={{ maxWidth: '4.4rem' }}>
                  <div className="card-body">
                    <p className="card-text"><span className="fa fa-star checked"> {location.state.booking.ratings} </span></p>
                  </div>
                </div>
                <button type="button" className="btn btn-secondary my-3"><span className="fa fa-regular fa-phone"> Call</span></button>
              </div>
              <div className="col">
                <img src="https://i.pinimg.com/564x/e6/4b/16/e64b167e83dcd9bdd20c94260393393a.jpg" className="img-fluid" alt="..." />
                <div className="card text-bg-warning mx-auto my-3" style={{ maxWidth: '8rem' }}>
                  <div className="card-body">
                    {tripDetails.vehicleNumber}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default TripDetails