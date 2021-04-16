import { Typography } from "@material-ui/core"
import { useSelector } from "react-redux"
import "./App.css"
import Editor from "./components/Editor"
import Navbar from "./components/Navbar"
import Starter from "./components/Starter"

const App = () => {
  const model = useSelector((store) => store.model.model)
  return (
    <div className="App">
      {model == null ? (
        <Starter />
      ) : (
        <>
          <Navbar />
          <Editor />
        </>
      )}
    </div>
  )
}

export default App
