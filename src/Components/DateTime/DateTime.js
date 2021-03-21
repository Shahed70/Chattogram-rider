import React, { useState } from 'react';
//import DatePicker from 'react-date-picker';
import DateTimePicker from 'react-datetime-picker';
const DateTime = () => {
    const [value, onChange] = useState(new Date());

    return (
        <div className="container">
           <div className="row">
           <div className="col-md-12">
                 <DateTimePicker 
                     onChange={onChange}
                     value={value}
                 />
            </div>
           </div>
        </div>
    );
};

export default DateTime;