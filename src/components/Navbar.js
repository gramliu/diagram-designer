import { Toolbar, Typography, IconButton, Icon, Box } from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"
import AppBar from "@material-ui/core/AppBar"
import logo from "../assets/logo.png"
import { exportModel } from "../util/modelUtil"
import { useSelector } from "react-redux"

const iconSize = 24

const Navbar = () => {
  const model = useSelector(store => store.model.model);
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" flexGrow={1} alignItems="center">
          <IconButton edge="start" aria-label="app icon">
            <Icon>
              <img src={logo} height={iconSize} width={iconSize} alt="app logo" />
            </Icon>
          </IconButton>
          <Typography variant="h6">Diagram Designer</Typography>
        </Box>
        <IconButton aria-label="download" onClick={() => exportModel(model)}>
          <SaveIcon style={{ color: "white" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
