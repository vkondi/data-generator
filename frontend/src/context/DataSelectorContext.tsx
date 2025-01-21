import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type FieldData = {
  dataType: string;
  name: string;
};

type DataSelectorContextProps = {
  fields: FieldData[];
  setFields: Dispatch<SetStateAction<FieldData[]>>;
};

const emptyField: FieldData = { dataType: "", name: "" };
const defaultFields: FieldData[] = [emptyField];

const DataSelectorContext = createContext<DataSelectorContextProps | undefined>(
  undefined
);

export const DataSelectorProvider: FC<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const [fields, setFields] = useState<FieldData[]>(defaultFields);

  return (
    <DataSelectorContext.Provider value={{ fields, setFields }}>
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
