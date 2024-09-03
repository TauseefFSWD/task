import React from "react";
import Table from "./components/Table";
import reactLogo from "./assets/react.svg"; // Assuming you have a react logo in your assets

const App = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-center">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mt-4">Dynamic Table</h1>
      </header>

      <Table />

      <footer className="mt-8 text-gray-500">
        <p>&copy; 2024 TAUSEEF SHAIKH. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
