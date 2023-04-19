import React from 'react'
import { Link } from 'react-router-dom'

const dummytripdetails = {
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
  selectedItem: null
}

function OfferList(props) {

  return (
    <div className="container my-5">
      <h5 className="display-4 lh-1">Select an Offer</h5>
      <p className="lead">Choose a ride as per your comfort</p>
      {
        props.booking.map((booking) => {
          return (
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{booking.name}</h5>
                    <p className="card-text">Time Away: {booking.timeAway} minutes</p>
                    <p className="card-text">Offer Price: ₹ {booking.offerPrice}</p>
                    <p className="card-text"><span className="fa fa-star checked"> {booking.ratings} </span></p>
                    <Link to="/tripDetails" state={{ booking: booking, currentLocation: props.currentLocation, destination: props.destination }} className="btn btn-outline-warning mb-3">Confirm for ₹ {booking.offerPrice}</Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default OfferList