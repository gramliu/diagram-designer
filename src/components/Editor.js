import { useSelector } from "react-redux"
import ObjectCard from "./ObjectCard"

const cardGalleryStyle = {
  display: "flex",
}

/**
 * The main content view containing a gallery of {@link ObjectCard} cards
 */
const Editor = () => {
  const model = useSelector((store) => store.model.model)
  const components = []
  for (const { name, fields } of model) {
    const card = <ObjectCard name={name} fields={fields} />
    components.push(card)
  }
  return <div style={cardGalleryStyle}>{components}</div>
}

export default Editor
