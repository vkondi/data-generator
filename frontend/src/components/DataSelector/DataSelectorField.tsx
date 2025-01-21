import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "./DataSelectorField.module.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

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
const UNSUPPORTED_DATA_TYPES = [
  "url",
  "macAddress",
  "ipAddress",
  "uuid",
  "jobTitle",
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
        disabled={UNSUPPORTED_DATA_TYPES.includes(dataType.id)}
      >
        {dataType.label}
      </MenuItem>
    ));
  };

  return (
    <div className={styles.container}>
      <FormControl variant="outlined" sx={{ flex: 1 }}>
        <InputLabel id="demo-simple-select-label">Data Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dataTypeValue}
          label="Data Type"
          onChange={handleTypeChange}
        >
          {renderMenuItems()}
        </Select>
      </FormControl>
      <TextField
        id="outlined-basic"
        label="Field Name"
        variant="outlined"
        sx={{ flex: 1 }}
        onChange={handleNameChange}
        value={nameValue}
      />
      <IconButton aria-label="delete" size="large" onClick={handleDelete}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
};

export default DataSelectorField;
