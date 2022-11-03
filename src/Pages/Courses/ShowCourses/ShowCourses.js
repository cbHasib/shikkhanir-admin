import { Avatar, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const ShowCourses = () => {
  const [load, setLoad] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setLoad(true);
    fetch(`${process.env.REACT_APP_SERVER_URL}/courses`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCourses(data.data);
          setLoad(false);
        } else {
          alert(data.error);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [refresh]);

  const handleDelete = (id, title) => {
    const userConfirmed = window.confirm(
      `Are you sure to DELETE ${title} from database?`
    );

    if (userConfirmed) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/delete-course/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert(data.message);
            setRefresh(!refresh);
            setLoad(true);
          } else {
            alert(data.error);
          }
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <>
      {load ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="h-full w-full flex items-center justify-center">
            <Table>
              <Table.Head>
                <Table.HeadCell>ID</Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Slug</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {courses?.map((course) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={course._id}
                  >
                    <Table.Cell> {course._id}</Table.Cell>
                    <Table.Cell>
                      <Avatar img={course.thumbnail} />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {course.course_title}
                    </Table.Cell>
                    <Table.Cell>{course.course_slug}</Table.Cell>
                    <Table.Cell>{course.price}</Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-5">
                        <Link
                          to={`/courses/update-course/${course._id}`}
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Edit
                        </Link>
                        <span
                          onClick={() =>
                            handleDelete(course?._id, course?.course_title)
                          }
                          className="font-medium text-red-600 hover:underline dark:text-red-500 hover:cursor-pointer"
                        >
                          Delete
                        </span>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowCourses;
