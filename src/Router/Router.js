import Categories from "../Pages/Categories/Categories";
import EditCategory from "../Pages/Categories/EditCategory";
import AddNewCourse from "../Pages/Courses/AddNewCourse/AddNewCourse";
import Courses from "../Pages/Courses/Courses/Courses";
import EditInstructor from "../Pages/Instructors/EditInstructor/EditInstructor";
import InstructorParent from "../Pages/Instructors/InstructorParent";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");
const { default: DashboardLayout } = require("../Layout/DashboardLayout");
const { default: Dashboard } = require("../Pages/Dashboard/Dashboard");

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/categories",
        element: (
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-category/:id",
        element: (
          <PrivateRoute>
            <EditCategory />
          </PrivateRoute>
        ),
      },
      {
        path: "/courses",
        element: (
          <PrivateRoute>
            <Courses />
          </PrivateRoute>
        ),
      },
      {
        path: "/courses/add-new",
        element: (
          <PrivateRoute>
            <AddNewCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "/instructors",
        element: (
          <PrivateRoute>
            <InstructorParent />
          </PrivateRoute>
        ),
      },
      {
        path: "/instructors/update-instructor/:id",
        element: (
          <PrivateRoute>
            <EditInstructor />
          </PrivateRoute>
        ),
      },
      {
        path: "/reports",
        element: <h2>Reports</h2>,
      },
      {
        path: "/blogs",
        element: <h2>Blogs</h2>,
      },
    ],
  },
]);

export default router;
