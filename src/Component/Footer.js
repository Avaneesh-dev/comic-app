import React from 'react';
import { NavLink } from 'reactstrap';
import "./Main.css"

function Footer(props) {
    return(
    <div className="footer">
        <div className='footer-spikes'></div>
        <div className="container mt-5">
            <div className="row justify-content-center">             
                <div className="col-4 col-sm-2 text-center">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                        <li><NavLink href='/home' className='text-white'>Home</NavLink></li>
                    </ul>
                </div>
                <div className="col-7 col-sm-5">
                    <h5>Reach Out to Me:</h5>
                    <address>
		              RR-532, MMM Hall of Residence, Indian Institute of Technology Kharagpur,
		              West Bengal, India - 721302<br />
		              <i className="fa fa-phone fa-lg"></i>: +91 8090227807<br />
		              <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:joydeep">
                        avaneesh2812@gmail.com</a>
                    </address>
                </div>
            </div>
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© Copyright 2023 Avaneesh Srivastava</p>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Footer;