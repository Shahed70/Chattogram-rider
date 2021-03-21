import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DateTime from '../DateTime/DateTime';
import { rideData } from '../fakeData';
import GoogleMap from '../Map/GoogleMap';
import './Destination.css'

const Destination = () => {
        const [data, setData] = useState({})
        const [choosed, setChoosed] = useState(true)
        const [address, setAddress] = useState({})

        const {id} = useParams()
        console.log(id);
        const vehicleSingleData = rideData.find(data => {
        return data.name === `${id}`
        })

        const handleDestination = (e) =>{  
        setData(vehicleSingleData)
        setChoosed(false)
        }
        const blurHandler = (e) =>{
        const newAddress = {...address}
        newAddress[e.target.name] = e.target.value
        setAddress(newAddress)
        }
    return (

        <div className="container py-5">
        <div className="row">
          <div className="col-md-5 col-sm-12">
          <div className="date mb-5 p-2">
            <p>Choose your prefered time :</p>
            <DateTime />
          </div>
            {
              choosed ?
              <div className="destination">
              <div className="form-group">
               <label htmlFor="">Pick form</label>
                <input type="text" name="name_from" onBlur={blurHandler}  className="form-control" placeholder="Gulshan" />
             </div>
              <div className="form-group">
               <label htmlFor="">Pick to</label>
               <input type="text" name="name_to" onBlur={blurHandler}  className="form-control" placeholder="Baddah" />
             </div>
             <div className="form-group">
             <input onClick={handleDestination} type="submit"  value="Search" className="form-control bg-danger text-light" />
             </div>
             </div>
             :
             <div className="card">
             <div className="card-body">
               <div className="card bg-danger text-light p-3 d-flex jutify-content-center align-items-center">
                 <div className="card-body text-center">
                     <p>{address.name_from}</p>
                     <p> <i className="fas fa-walking"></i></p>
                     <p>{address.name_to}</p>
                 </div>
               </div>
                <div className="flex-box text-primary my-4">
                   <span><img className="w-100" src={data.photo} alt=""/></span>
                    <span className="text-capitalize">{data.name}</span>
                    <span> <i className="fas fa-user-friends"></i> </span>
                    <span>{data.p1}</span>
                </div>
                <div className="flex-box mb-4 justify-content text-primary">
                   <span><img className="w-100" src={data.photo} alt=""/></span>
                    <span className="text-capitalize">{data.name}</span>
                    <span> <i className="fas fa-user-friends"></i> </span>
                    <span>{data.p2}</span>
                </div>
                <div className="flex-box text-primary">
                   <span><img className="w-100" src={data.photo} alt=""/></span>
                    <span className="text-capitalize">{data.name}</span>
                    <span> <i className="fas fa-user-friends"></i> </span>
                    <span>{data.p3}</span>
                </div>
             </div>
           </div>
            }
  
          </div>
          <div className="col-md-7 col-sm-12">
            <GoogleMap/>
          </div>
        </div>
      
      </div>
  
    );
};

export default Destination;