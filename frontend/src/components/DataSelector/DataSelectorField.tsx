/**
 * DataSelectorField component allows users to select a data type and provide a name for the field.
 * It also provides an option to delete the field.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {function} props.onTypeChange - Callback function to handle changes in the data type selection.
 * @param {function} props.onNameChange - Callback function to handle changes in the field name input.
 * @param {function} props.onDelete - Callback function to handle the deletion of the field.
 * @param {number} props.index - The index of the current field in the list.
 * @param {string} props.dataTypeValue - The current value of the data type selection.
 * @param {string} props.nameValue - The current value of the field name input.
 *
 * @returns {JSX.Element} The rendered DataSelectorField component.
 */

import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "./DataSelectorField.module.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useDataSelectorContext } from "../../context/DataSelectorContext";

const DATA_TYPES = [
  { id: "name", label: "Name" },
  { id: "phone", label: "Phone" },
  { id: "number", label: "Number" },
  { id: "boolean", label: "Boolean" },
  { id: "date", label: "Date" },
  { id: "email", label: "Email" },
  { id: "time", label: "Time" },
  { id: "address", label: "Address" },
  { id: "city", label: "City" },
  { id: "country", label: "Country" },
  { id: "zipCode", label: "Zip Code" },
  { id: "company", label: "Company" },
  { id: "jobTitle", label: "Job Title" },
  { id: "color", label: "Color" },
  { id: "uuid", label: "UUID" },
  { id: "url", label: "URL" },
  { id: "ipAddress", label: "IP Address" },
  { id: "macAddress", label: "MAC Address" },
];

interface DataTypeFieldProps {
  onTypeChange: (value: string, index: number) => void;
  onNameChange: (value: string, index: number) => void;
  onDelete: (index: number) => void;
  index: number;
  dataTypeValue: string;
  nameValue: string;
}

const DataSelectorField: React.FC<DataTypeFieldProps> = ({
  onTypeChange,
  onNameChange,
  onDelete,
  index,
  dataTypeValue,
  nameValue,
}) => {
  const { allowedDataTypes } = useDataSelectorContext();
  
  const handleDelete = () => {
    onDelete(index);
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    onTypeChange(event.target.value, index);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onNameChange(value, index);
  };

  const renderMenuItems = () => {
    return DATA_TYPES.map((dataType) => (
      <MenuItem
        key={dataType.id}
        value={dataType.id}
        disabled={!allowedDataTypes?.includes(dataType.id)}
      >
        {dataType.label}
      </MenuItem>
    ));
  };

  return (
    <div className={styles.container}>
      <FormControl variant="outlined" sx={{ flex: 1 }} size="small">
        <InputLabel data-testid="data-type-input" id="demo-simple-select-label">
          Data Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dataTypeValue}
          label="Data Type"
          onChange={handleTypeChange}
          data-testid="data-selector-field"
        >
          {renderMenuItems()}
        </Select>
      </FormControl>
      <TextField
        data-testid="name-input"
        id="outlined-basic"
        label="Field Name"
        variant="outlined"
        sx={{ flex: 1 }}
        onChange={handleNameChange}
        value={nameValue}
        size="small"
      />
      <IconButton
        aria-label="delete"
        size="small"
        onClick={handleDelete}
        data-testid="delete-button"
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
};

export default DataSelectorField;
