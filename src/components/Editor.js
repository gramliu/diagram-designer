import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core"
import { useDrag } from "react-dnd"
import { useSelector } from "react-redux"

const cardGalleryStyle = {
  display: "flex",
}

const cardStyle = {
  margin: "1em",
}

const parseField = (fieldName, fieldVal) => {
  let listItem = null
  if (typeof fieldVal === "string") {
    listItem = (
      <ListItem>
        <ListItemText>{`${fieldName}: ${fieldVal}`}</ListItemText>
      </ListItem>
    )
  } else if (fieldVal.type != null) {
    const type = fieldVal.type
    const enumVals = fieldVal.enum
    const weight = fieldVal.required ? "bold" : "normal"
    const text = `${fieldName}: ${type}${enumVals == null ? "" : "(enum)"}`
    let label = (
      <ListItemText
        primary={text}
        primaryTypographyProps={{ style: { fontWeight: weight } }}
      />
    )

    if (fieldVal.enum != null) {
      const enumText = enumVals.join(" | ")
      label = (
        <ListItemText
          primary={text}
          primaryTypographyProps={{ style: { fontWeight: weight } }}
          secondary={enumText}
          secondaryTypographyProps={{ style: { wordWrap: "normal" } }}
        />
      )
    }
    listItem = <ListItem>{label}</ListItem>
  }
  return listItem
}

const parseFields = (fields) => {
  const listItems = []
  for (let fieldName in fields) {
    const fieldVal = fields[fieldName]
    const listItem = parseField(fieldName, fieldVal)
    listItems.push(listItem)
  }
  return <List dense={true}>{listItems}</List>
}

const Editor = () => {
  const model = useSelector((store) => store.model.model)
  const components = []
  for (let obj of model) {
    const { name, fields } = obj
    const fieldList = parseFields(fields)
    const card = (
      <div style={cardStyle}>
        <Card style={{ padding: 0 }}>
          <CardContent>
            <Typography variant="h6">{name}</Typography>
            <hr />
            {fieldList}
          </CardContent>
        </Card>
      </div>
    )
    components.push(card)
  }
  return <div style={cardGalleryStyle}>{components}</div>
}

export default Editor
