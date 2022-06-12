import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PersonList = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/persons");
        const data = await response.json();
        setPeople(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="flex flex-col gap-2 rounded-lg pt-4 drop-shadow-lg">
          <Link className="button self-start bg-blue" to="/addPerson">
            Add
          </Link>
          <table className="table-auto">
            <thead className="bg-gray">
              <tr>
                <th className="px-6 py-2">ID</th>
                <th className="px-6 py-2">First Name</th>
                <th className="px-6 py-2">LastName</th>
                <th className="px-6 py-2">Email</th>
                <th className="px-6 py-2">PhoneNumber</th>
                <th className="px-6 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {people.map(({ id, firstName, lastName, email, phoneNumber }) => (
                <tr key={id}>
                  <td className="px-6 py-4">{id}</td>
                  <td className="px-6 py-4">{firstName}</td>
                  <td className="px-6 py-4">{lastName}</td>
                  <td className="px-6 py-4">{email}</td>
                  <td className="px-6 py-4">{phoneNumber}</td>
                  <td className="flex gap-2 px-6 py-4">
                    <button className="button bg-blue">Edit</button>
                    <button className="button bg-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default PersonList;
