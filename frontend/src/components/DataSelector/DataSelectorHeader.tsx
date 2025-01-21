import React from 'react';
import { FormControl, InputLabel } from '@mui/material';
import styles from './DataSelectorHeader.module.css';

const DataSelectorHeader: React.FC = () => {
  return (
    <div className={styles.container}>
      <FormControl variant="outlined" sx={{ flex: 1, borderRight: '1px solid #e0e0e0' }}>
        <InputLabel>Data Type</InputLabel>
      </FormControl>
      <FormControl variant="outlined" sx={{ flex: 1,borderRight: '1px solid #e0e0e0' }}>
        <InputLabel>Field Name</InputLabel>
      </FormControl>
      <div className={styles.deleteIconSpacer} data-testid="delete-icon-spacer"></div>
    </div>
  );
};

export default DataSelectorHeader;