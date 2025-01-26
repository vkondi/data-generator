/**
 * A footer component that contains a Generate button for data generation.
 * The button is disabled when any field in the data selector context has an empty name or data type.
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 *
 * @returns A footer element containing a Generate button that triggers data generation when clicked
 */

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

import { useDataSelectorContext } from "../../context/DataSelectorContext";

import styles from "./Footer.module.css";
import axios from "axios";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { EXPORT_URL } from "../../utils/URL";

const FILE_FORMAT_OPTIONS = [
  { id: "csv", label: "CSV" },
  { id: "json", label: "JSON" },
  { id: "xml", label: "XML" },
  { id: "html", label: "HTML" },
  { id: "xlsx", label: "XLS/Excel" },
];

const Footer: React.FC = () => {
  const [countField, setCountField] = useState({
    count: 10,
    error: false,
    helperText: "",
  });
  const [fileFormat, setFileFormat] = useState<string>("csv");
  const [disableGenerate, setDisableGenerate] = useState<boolean>(true);
  const { fields } = useDataSelectorContext();

  const onGenerate = async () => {
    try {
      const response = await axios.post(
        EXPORT_URL,
        {
          fields,
          count: countField.count,
          file_format: fileFormat,
        },
        { responseType: "blob" }
      );

      // Extract filename from Content-Disposition header
      let fileName = `generated_data_${new Date().getTime()}.${fileFormat}`;
      const contentDisposition = response?.headers?.["content-disposition"];
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match) {
          fileName = match[1];
        }
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error generating data:", error);
    }
  };

  const handleFileFormatChange = (event: SelectChangeEvent) => {
    setFileFormat(event.target.value as string);
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(event.target.value);

    if (newCount <= 1000) {
      setCountField({
        ...countField,
        error: false,
        helperText: "",
        count: parseInt(event.target.value),
      });
    } else {
      setCountField({
        ...countField,
        error: true,
        helperText: "Max count is 1000",
        count: parseInt(event.target.value),
      });
    }
  };

  useEffect(() => {
    setDisableGenerate(
      fields.some((field) => field.dataType === "" || field.name === "")
    );
  }, [fields]);

  return (
    <div className={styles.container}>
      <Button
        variant="outlined"
        onClick={onGenerate}
        {...(disableGenerate ? { disabled: true } : {})}
      >
        Generate
      </Button>

      <TextField
        label="Count"
        variant="outlined"
        value={countField.count}
        error={countField.error}
        helperText={countField.helperText}
        size="small"
        onChange={handleCountChange}
        sx={{ width: 100 }}
      />

      <Select
        value={fileFormat}
        label="File Format"
        onChange={handleFileFormatChange}
        size="small"
      >
        {FILE_FORMAT_OPTIONS.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default Footer;
