import { useSelector } from "react-redux"
import "./App.css"
import { useDispatch } from "react-redux"
import actions from "./actions"
import Editor from "./components/Editor"
import Navbar from "./components/Navbar"
import Starter from "./components/Starter"
import { isModel } from "./util/modelUtil"

const App = () => {
  const dispatch = useDispatch();
  const cachedModel = JSON.parse(window.localStorage.getItem("model"));
  const model = useSelector((store) => store.model.model)
  if (model == null) {
    if (cachedModel != null && isModel(cachedModel)) {
      dispatch(actions.model.setModel(cachedModel));
    }
  }
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
