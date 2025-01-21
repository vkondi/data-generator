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

const Footer: React.FC = () => {
  const [disableGenerate, setDisableGenerate] = useState<Boolean>(true);
  const { fields } = useDataSelectorContext();

  const onGenerate = () => {
    console.log("fields: ", fields);
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
    </div>
  );
};

export default Footer;
