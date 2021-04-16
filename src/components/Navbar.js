import { Toolbar, Typography, IconButton, Icon } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import logo from "../assets/logo.png"

const iconSize = 24

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" aria-label="app icon">
          <Icon>
            <img src={logo} height={iconSize} width={iconSize} />
          </Icon>
        </IconButton>
        <Typography variant="h6">Diagram Designer</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
