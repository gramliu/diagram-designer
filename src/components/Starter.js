import { Icon, Typography } from "@material-ui/core"
import { DropzoneArea } from "material-ui-dropzone"
import { useDispatch } from "react-redux"
import actions from "../actions"
import logo from "../assets/logo.png"
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useState } from "react"
import { isModel } from "../util/modelUtil"

const containerStyle = {
  marginTop: "10vh",
  width: "50%",
  marginLeft: "auto",
  marginRight: "auto",
}

const dropzoneStyle = {
  width: "50%",
  marginTop: "1em",
  marginLeft: "auto",
  marginRight: "auto",
}

const iconSize = 128

const Starter = () => {
  const dispatch = useDispatch()
  const [showAlert, setShowAlert] = useState(false)

  const fileListener = (files) => {
    if (files.length > 0) {
      const file = files[0]
      const fileReader = new FileReader()
      fileReader.readAsText(file, "UTF-8")
      fileReader.onload = (e) => {
        try {
          const model = JSON.parse(e.target.result)
          if (isModel(model)) {
            dispatch(actions.model.setModel(model))
            window.localStorage.setItem("model", JSON.stringify(model));
          }
        } catch (err) {
          console.log("Error occured")
          setShowAlert(true)
        }
      }
    }
  }

  return (
    <div style={containerStyle}>
      <Icon>
        <img src={logo} height={iconSize} width={iconSize} />
      </Icon>
      <Typography variant="h5" style={{ marginTop: "2em" }}>
        Upload your model to begin
      </Typography>
      <div style={dropzoneStyle}>
        <DropzoneArea onChange={fileListener} acceptedFiles={["application/json"]} />
      </div>
      <Snackbar open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)}>
        <Alert onClose={() => setShowAlert(false)} severity="error">
          Invalid model! Expected JSON array
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Starter
