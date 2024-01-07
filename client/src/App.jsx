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
    <div className="h-screen flex flex-col justify-center gap-y-28   px-10 bg-gradient-to-b from-indigo-400 to-teal-100">
      <form className="w-full flex flex-col gap-4 " onSubmit={handleUpload}>
        <input type="text" className=" rounded-full border-indigo-500 outline-indigo-500 border-solid py-2 px-4 text-sm " placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />

        <input type="file" className="py-1 px-4 border-solid  border-2 rounded-full hover:bg-indigo-300" onChange={(e) => setFile(e.target.files[0])} />

        <button className="py-1 px-4 border-solid border-2 w-28 rounded-full hover:bg-indigo-300" type="submit">Upload</button>
      </form>
      <div className="flex gap-x-4 w-1/3 ">
        {
          users && users.map(user => (
            <div key={user._id} className="">
              <img className="bg-black " src={`${user.image}`} alt={`${user.name}`} />
              <h1 style={{ "color": "black" }}>{user.name} </h1>
            </div>
          ))
        }
      </div>
    </div >
  );
}

export default App;
