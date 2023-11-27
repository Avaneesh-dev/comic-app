import React, {useState} from 'react'
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem,NavLink} from 'reactstrap'
import "./Main.css"

function NavbarComponent(props) {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
      <Navbar dark expand="md" className="col-12 navtext" style={{zIndex: 1, backgroundColor: "#022031"}}>
        <NavbarBrand className="col-md-3 col-sm-6">
          {/* <img src='./LTB-Logo-Nav.png' className="img-fluid" style={{height: "50px"}} alt="Lab's logo" /> */}
          <span style={{fontFamily: "fantasy", fontSize: 18, marginLeft: 20,}}> Comic Generator</span>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar className='col-md-9 text-center'>
          <NavItem className="col-md-2">
              <NavLink href="home">HOME</NavLink>             
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
  )
}

export default NavbarComponent