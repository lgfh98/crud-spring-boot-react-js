import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../react-js/components/Layout";
import AddPerson from "../react-js/pages/AddPerson";
import PersonList from "../react-js/pages/PersonList";

const Router = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PersonList />} />
          <Route path="/addPerson" element={<AddPerson />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default Router;
