import Layout from "../Layout/Layout";
import DataSelectorField from "./DataSelectorField";

import styles from "./DataSelector.module.css";
import { type FC, useEffect, useState, useCallback, useMemo } from "react";
import DataSelectorHeader from "./DataSelectorHeader";

const emptyField = { dataType: "", name: "" };
const defaultFields = [emptyField];

const DataSelector: FC = () => {
  const [fields, setFields] = useState(defaultFields);

  const onTypeChange = useCallback((value: string, index: number) => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, dataType: value } : field
      )
    );
  }, []);

  const onNameChange = useCallback((value: string, index: number) => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, name: value } : field
      )
    );
  }, []);

  const onDelete = useCallback((index: number) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  }, []);

  useEffect(() => {
    console.log("fields: ", fields);
  }, [fields]);

  const renderedFields = useMemo(() => {
    return fields.map((field, index) => (
      <DataSelectorField
        key={index}
        index={index}
        onTypeChange={onTypeChange}
        onNameChange={onNameChange}
        onDelete={onDelete}
        dataTypeValue={field.dataType}
        nameValue={field.name}
      />
    ));
  }, [fields, onTypeChange, onNameChange, onDelete]);

  return (
    <div className={styles.container}>
      <Layout>
        <div className={styles.layoutContainer}>
          <DataSelectorHeader />
          {renderedFields}
        </div>
      </Layout>
    </div>
  );
};

export default DataSelector;
