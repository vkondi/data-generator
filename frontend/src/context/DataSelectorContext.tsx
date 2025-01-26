import axios from "axios";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { GET_CONFIG_URL } from "../utils/URL";

export type FieldData = {
  dataType: string;
  name: string;
};

type DataSelectorContextProps = {
  fields: FieldData[];
  setFields: Dispatch<SetStateAction<FieldData[]>>;
  allowedDataTypes: string[];
};

const emptyField: FieldData = { dataType: "", name: "" };
const defaultFields: FieldData[] = [emptyField];

const DataSelectorContext = createContext<DataSelectorContextProps | undefined>(
  undefined
);

export const DataSelectorProvider: FC<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const [allowedDataTypes, setAllowedDataTypes] = useState<string[]>([]);
  const [fields, setFields] = useState<FieldData[]>(defaultFields);

  const fetchConfig = async () => {
      try {
        const response = await axios.get(GET_CONFIG_URL);
        setAllowedDataTypes(response?.data?.allowedDataTypes ?? []);
      } catch (error) {
        console.error("Failed to fetch config:", error);
      }
    };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <DataSelectorContext.Provider value={{ fields, setFields, allowedDataTypes }}>
      {children}
    </DataSelectorContext.Provider>
  );
};

export const useDataSelectorContext = (): DataSelectorContextProps => {
  const context = useContext(DataSelectorContext);

  if (!context) {
    throw new Error(
      "useDataSelectorContext must be used within a DataSelectorProvider"
    );
  }
  return context;
};
