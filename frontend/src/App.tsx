/**
 * The main application component that renders the header and footer.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * return (
 *   <App />
 * )
 */

import DataSelector from "./components/DataSelector/DataSelector";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import "./App.css";

function App() {
  return (
    <div className="container">
      <Header />
      <DataSelector />
      <Footer />
    </div>
  );
}

export default App;
