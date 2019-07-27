import * as React from 'react'
import Link from 'next/link'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem 
} from 'reactstrap'

interface Props {}
interface State {
  isOpen: boolean,
  dropdownOpen: boolean
}

export default class Menu extends React.Component<Props, State> {
  state = {
    isOpen: false,
    dropdownOpen: false
  }
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }
  toggle(): void{
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  onMouseEnter(): void{
    this.setState({dropdownOpen: true})
  }
  onMouseLeave(): void{
    this.setState({dropdownOpen: false})
  }
  render() {
    return (
      <div>
        <Navbar className="navbar-horizontal navbar-dark bg-default" expand="md">
          <Container>
            <Link href="/">
                <a className="navbar-brand">Web Security Analyzer</a>
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen}>
                  <DropdownToggle nav>
                    SQL Injection
                  </DropdownToggle>
                  <DropdownMenu right>
                    <Link href="/sqlmap">
                      <DropdownItem>
                        <a>sqlmap</a>
                      </DropdownItem>
                    </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <style global jsx>{`
          nav .navbar-brand a{
            color: white;
          }
          nav .dropdown-item a{
            color: #212529;
          }
          nav .dropdown-item{
            cursor: pointer;
          }
        `}</style>
      </div>
    )
  }
}