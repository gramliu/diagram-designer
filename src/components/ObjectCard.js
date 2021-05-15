import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core"
import AddCircleIcon from "@material-ui/icons/AddCircle"

const cardStyle = {
  margin: "1em",
}

/**
 * A table row that represents a single field in an object model and its type
 * specification
 *
 * @param {String} fieldName name of the field
 * @param {dict} fieldSpec the field's specification (type, enum)
 */
const FieldRow = ({ fieldName, fieldSpec }) => {
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
    const fontStyle = fieldSpec.required
      ? {
          fontWeight: "bold",
          textDecoration: "underline",
        }
      : null

    if (enumVals != null) {
      // if enum type
      type = `${type} (enum)`
      const enumText = enumVals.join(" | ")
      return (
        <>
          <TableRow>
            <TableCell rowSpan={2}>{fieldName}</TableCell>
            <TableCell align="right" style={{ ...fontStyle }}>
              {type}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">
              <Typography variant="caption" style={{ wordWrap: "normal" }}>
                {enumText}
              </Typography>
            </TableCell>
          </TableRow>
        </>
      )
    } else {
      cells.push(<TableCell>{fieldName}</TableCell>)
      cells.push(
        <TableCell align="right" style={{ ...fontStyle }}>
          {type}
        </TableCell>
      )
    }
  }
  return <TableRow key={fieldName}>{cells}</TableRow>
}

/**
 * A table representing a mapping of object model fields to their type
 * specifications
 * @param {dict} fields
 */
const FieldTable = ({ fields }) => {
  const tableRows = []
  for (let fieldName in fields) {
    const fieldVal = fields[fieldName]
    const tableRow = <FieldRow fieldName={fieldName} fieldSpec={fieldVal} />
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
 * A Card representing an Object type and its fields and corresponding type
 * specifications
 *
 * @param {String} name the name of this object type
 * @param {dict} fields the fields and type specifications defined by this object type
 */
const ObjectCard = ({ name, fields }) => {
  return (
    <div style={cardStyle}>
      <Card style={{ padding: 0, maxWidth: "30vw" }}>
        <CardContent>
          <Typography variant="h6">{name}</Typography>
          <hr />
          <FieldTable fields={fields} />
          <IconButton>
            <AddCircleIcon style={{ color: "#1565c0" }} />
          </IconButton>
        </CardContent>
      </Card>
    </div>
  )
}

export default ObjectCard
