import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddPerson from "../react-js/pages/AddPerson";
import PersonList from "../react-js/pages/PersonList";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PersonList />} />
        <Route path="/addPerson" element={<AddPerson />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
