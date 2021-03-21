import React from 'react';
import { Link } from 'react-router-dom';
import {rideData} from '../fakeData'
import './Home.css'
const Home = () => {
    const vehicleData = rideData;
    return (
        <div className="container-fluid bg-secondary home-bg py-5">
      <div className="container mt-5">
        <div className="d-flex display-flex   justify-content-between mb-4 p-3">
          {vehicleData.map((vehicle) => {
            return (
              <div key={vehicle.name} className="flex-item">
                <Link className="link-style text-uppercase" to={`/destination/${vehicle.name}`}>
                  <div className="card">
                    <div className="card-body">
                      <img src={vehicle.photo} alt="" />
                      <h3 className="my-4 text-center">{vehicle.name}</h3>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column text-start">
                          <span>General class</span>
                          <span>Special class</span>
                          <span>Vip class</span>
                        </div>
                        <div className="d-flex flex-column text-end">
                          <span>$ {vehicle.p1}</span>
                          <span>$ {vehicle.p2}</span>
                          <span>$ {vehicle.p3}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>


    );
};

export default Home;
