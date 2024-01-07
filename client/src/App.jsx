import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([])

  const handleUpload = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name)
      await axios.post("http://localhost:3000/upload", formData);
      handleImport()
      setName("")
      setFile(null)
    } catch (error) {
      console.log(error);
    }
  };

  const handleImport = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get_user")
      const newUsers = response.data.users
      console.log(newUsers)
      setUsers([...newUsers])
    } catch (error) {
      console.log(error)
    }
  }
  console.log(users)

  useEffect(() => {
    handleImport()
  }, [])

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      <div>
        {
          users && users.map(user => (
            <div key={user._id}>
              <img style={{ "height": "200px", "width": "200px", "objectFit": "cover" }} src={`${user.image}`} alt={`${user.name}`} />
              <h1 style={{ "color": "black" }}>{user.name} </h1>
            </div>
          ))
        }
      </div>
    </div >
  );
}

export default App;
