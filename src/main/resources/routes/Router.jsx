import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../react-js/components/Layout";
import AddPerson from "../react-js/pages/AddPerson";
import EditPerson from "../react-js/pages/EditPerson";
import PersonList from "../react-js/pages/PersonList";

const Router = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PersonList />} />
          <Route path="/addPerson" element={<AddPerson />} />
          <Route path="/editPerson/:id" element={<EditPerson />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default Router;
