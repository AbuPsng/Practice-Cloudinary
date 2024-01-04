import { Link, Outlet } from "react-router-dom"

function App() {

  return (
    <>
      <h3>Upload files using Multer and Cloudinary Services in MERN stack project</h3>
      <Link to="/">home </Link>|<Link to="/upload"> Upload </Link>|<Link to="secure_upload"> Secure Upload</Link>
      <Outlet />
    </>
  )
}

export default App
