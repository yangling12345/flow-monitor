import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap'

const {
    Header, Brand, Toggle, Collapse
} = Navbar

export default withRouter(class extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    render () {
        const { history, location: {pathname} } = this.props
        const NavItemWithRouter = ({children, to}) => <NavItem
            onClick={e => history.push(to)}
            className={`${pathname === to ? 'active' : ''}`}>
            {children}
        </NavItem>

        return <Navbar inverse collapseOnSelect className="navbar-static-top">
            <Header>
                <Brand><Link to="/">Flow++</Link></Brand>
                <Toggle data-toggle="collapse" data-target=".bs-navbar-collapse"/>
            </Header>
            <div className=" hidden-sm hidden-md hidden-lg">
                <Nav className="collapse navbar-collapse bs-navbar-collapse" role="navigation">
                    <NavItemWithRouter to="/">运行状态</NavItemWithRouter>
                    <NavItemWithRouter to="/">系统状态</NavItemWithRouter>
                    <NavItemWithRouter to="/">硬件信息</NavItemWithRouter>
                    <NavItemWithRouter to="/admin">系统设置</NavItemWithRouter>
                </Nav>
            </div>
        </Navbar>
    }
})
