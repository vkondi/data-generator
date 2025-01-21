import React from 'react';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <div className="layout" {...props}>
      <div className="layout-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;