import { Avatar, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/instructors`)
      .then((res) => res.json())
      .then((data) => setInstructors(data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className="h-full w-full flex items-center justify-center">
        <Table>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Slug</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {instructors?.map((instructor) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={instructor._id}
              >
                <Table.Cell> {instructor._id}</Table.Cell>
                <Table.Cell>
                  <Avatar img={instructor.image} />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {instructor.name}
                </Table.Cell>
                <Table.Cell>{instructor.instructor_slug}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/instructors/update-instructor/${instructor._id}`}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Edit
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Instructors;
