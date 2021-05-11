import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import { useSelector } from "react-redux"

const cardGalleryStyle = {
  display: "flex",
}

const cardStyle = {
  margin: "1em",
}

/**
 * Parse a field and its type specification into a {@link TableRow}
 * @param {String} fieldName name of the field
 * @param {dict} fieldSpec the field's specification (type, enum)
 * @returns a {@link TableRow} representing the field
 */
const parseField = (fieldName, fieldSpec) => {
  const cells = []
  if (typeof fieldSpec === "string") {
    // Simple specifications of the form { fieldName: type }
    cells.push(<TableCell>{fieldName}</TableCell>)
    cells.push(<TableCell align="right">{fieldSpec}</TableCell>)
  } else if (fieldSpec.type != null) {
    /*
      Nested specs of the form {
        fieldName: {
          type: Type,
          required: Boolean,
          enum: [Type]
        }
      }
    */
    const enumVals = fieldSpec.enum
    let type = fieldSpec.type
    const fontStyle = fieldSpec.required ? {
      fontWeight: "bold",
      textDecoration: "underline"
    } : null;

    if (enumVals != null) {
      // if enum type
      type = `${type} (enum)`
      const enumText = enumVals.join(" | ")
      return (
        <>
          <TableRow>
            <TableCell rowSpan={2}>{fieldName}</TableCell>
            <TableCell align="right" style={{ ...fontStyle }}>{type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">
              <Typography variant="caption" style={{wordWrap: "normal"}}>
                {enumText}
              </Typography>
            </TableCell>
          </TableRow>
        </>
      )
    } else {
      cells.push(<TableCell>{fieldName}</TableCell>)
      cells.push(<TableCell align="right" style={{ ...fontStyle }}>{type}</TableCell>)
    }
  }
  return <TableRow key={fieldName}>{cells}</TableRow>
}

/**
 * Parse a dictionary of fields representing a single object type
 * into a table
 * @param {dict} fields
 * @returns a {@link Table} representing this type
 */
const createCardContent = (fields) => {
  const tableRows = []
  for (let fieldName in fields) {
    const fieldVal = fields[fieldName]
    const tableRow = parseField(fieldName, fieldVal)
    tableRows.push(tableRow)
  }
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Field</TableCell>
          <TableCell align="right">Type</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{tableRows}</TableBody>
    </Table>
  )
}

/**
 * The main content view containing an interactive representation of a data model
 */
const Editor = () => {
  const model = useSelector((store) => store.model.model)
  const components = []
  for (let obj of model) {
    const { name, fields } = obj
    const cardContent = createCardContent(fields)
    const card = (
      <div style={cardStyle}>
        <Card style={{ padding: 0, maxWidth: "30vw" }}>
          <CardContent>
            <Typography variant="h6">{name}</Typography>
            <hr />
            {cardContent}
            <IconButton>
              <AddCircleIcon style={{ color: "#1565c0" }} />
            </IconButton>
          </CardContent>
        </Card>
      </div>
    )
    components.push(card)
  }
  return <div style={cardGalleryStyle}>{components}</div>
}

export default Editor
