import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PersonList = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const navigate = useNavigate();

  const handleDeletePerson = async (personId) => {
    let process = await confirm("Are you sure you want to proceed?");
    if (process) {
      try {
        setLoading(true);
        await fetch(`http://localhost:8080/api/person/${personId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await fetch("http://localhost:8080/api/persons");
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setPeople(data);
          setLoading(false);
        }
      } catch (error) {
        setError("error");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/persons");
        const data = await response.json();
        if (data.error) {
          setError(error);
        } else {
          setPeople(data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError("error");
      }
    };
    fetchData();
  }, []);

  if (error) {
    return "Error";
  }

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
                    <button
                      className="button bg-blue"
                      onClick={() => {
                        navigate(`editPerson/${id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="button bg-error"
                      onClick={() => handleDeletePerson(id)}
                    >
                      Delete
                    </button>
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
