import AddNewBlog from "../Pages/Blogs/AddNewBlog/AddNewBlog";
import AddNewBlogAuthor from "../Pages/Blogs/BlogAuthor/AddNewBlogAuthor";
import UpdateBlogAuthor from "../Pages/Blogs/BlogAuthor/UpdateBlogAuthor";
import AddNewBlogCategory from "../Pages/Blogs/BlogCategory/AddNewBlogCategory";
import UpdateBlogCategory from "../Pages/Blogs/BlogCategory/UpdateBlogCategory";
import ManageBlog from "../Pages/Blogs/ManageBlog/ManageBlog";
import UpdateBlog from "../Pages/Blogs/UpdateBlog/UpdateBlog";
import Categories from "../Pages/Categories/Categories";
import EditCategory from "../Pages/Categories/EditCategory";
import Contact from "../Pages/Contact/Contact";
import AddCourseContent from "../Pages/Courses/AddCourseContent/AddCourseContent";
import AddNewCourse from "../Pages/Courses/AddNewCourse/AddNewCourse";
import Courses from "../Pages/Courses/Courses/Courses";
import EditCourse from "../Pages/Courses/EditCourse/EditCourse";
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
        path: "/courses/add-course-content",
        element: (
          <PrivateRoute>
            <AddCourseContent />
          </PrivateRoute>
        ),
      },
      {
        path: "/courses/update-course/:id",
        element: (
          <PrivateRoute>
            <EditCourse />
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
        path: "/contacts",
        element: <Contact />,
      },
      {
        path: "/contacts/view-contact/:id",
        element: <Contact />,
      },
      {
        path: "/blogs",
        element: <ManageBlog />,
      },
      {
        path: "/blogs/add-new-blog",
        element: <AddNewBlog />,
      },
      {
        path: "/blogs/update-blog/:id",
        element: <UpdateBlog />,
      },
      {
        path: "/blogs/add-author",
        element: <AddNewBlogAuthor />,
      },
      {
        path: "/blogs/update-author/:id",
        element: <UpdateBlogAuthor />,
      },
      {
        path: "/blogs/add-category",
        element: <AddNewBlogCategory />,
      },
      {
        path: "/blogs/update-category/:id",
        element: <UpdateBlogCategory />,
      },
    ],
  },
]);

export default router;
