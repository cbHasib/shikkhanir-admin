import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Label,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const EditInstructor = () => {
  const [load, setLoad] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const [instructors, setInstructors] = useState([]);
  const [instructor, setInstructor] = useState({});
  const [refresh, setRefresh] = useState(false);
  const id = parseInt(useParams().id);

  useEffect(() => {
    setLoad(true);
    reset();
    fetch(`${process.env.REACT_APP_SERVER_URL}/instructors`)
      .then((res) => res.json())
      .then((data) => setInstructors(data.data))
      .catch((error) => console.log(error));

    fetch(`${process.env.REACT_APP_SERVER_URL}/instructor/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setInstructor(data.data);
        setLoad(false);
      })
      .catch((error) => console.log(error));
  }, [id, reset, refresh]);

  const handleUpdateInstructor = (data) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/update-instructor/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          reset();
          setRefresh(!refresh);
          alert(data.message);
        } else {
          alert(data.error);
        }
      })
      .catch((error) => console.log(error));

    reset();
  };

  const handleDelete = (id, name) => {
    const userConfirmed = window.confirm(
      `Are you sure to DELETE ${name} from database?`
    );

    if (userConfirmed) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/delete-instructor/${id}`, {
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
      ) : instructor?._id ? (
        <div className="flex gap-10 items-start py-10 px-20">
          <div className="w-[50%] mx-auto">
            <form
              onSubmit={handleSubmit(handleUpdateInstructor)}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-5 gap-5">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="id" value="Instructor ID" />
                  </div>
                  <TextInput
                    id="id"
                    type="text"
                    shadow={true}
                    addon="ID"
                    value={instructor?._id}
                    disabled
                  />
                </div>
                <div className="col-span-2">
                  <div className="mb-2 block w-full">
                    <Label htmlFor="name" value="Instructor Name" />
                  </div>
                  <TextInput
                    id="name"
                    {...register("name")}
                    type="text"
                    placeholder="Hasibul Hasan"
                    required={true}
                    shadow={true}
                    defaultValue={instructor?.name}
                  />
                </div>
                <div className="col-span-2">
                  <div className="mb-2 block w-full">
                    <Label htmlFor="instructor_slug" value="Instructor Slug" />
                  </div>
                  <TextInput
                    id="instructor_slug"
                    {...register("instructor_slug")}
                    type="text"
                    defaultValue={instructor?.instructor_slug}
                    placeholder="Hasibul Hasan"
                    required={true}
                    shadow={true}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="designation"
                      value="Instructor Designation"
                    />
                  </div>
                  <TextInput
                    {...register("designation", {
                      required: true,
                    })}
                    id="designation"
                    type="text"
                    placeholder="PSHRD at RU"
                    defaultValue={instructor?.designation}
                    shadow={true}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Instructor Email" />
                  </div>
                  <TextInput
                    {...register("email", {
                      required: false,
                    })}
                    id="email"
                    type="email"
                    placeholder="hasib@shikkhanir.com"
                    shadow={true}
                    defaultValue={instructor?.email}
                  />
                </div>
              </div>

              <div>
                <div>
                  <div className="mb-2 block w-full">
                    <Label htmlFor="image" value="Instructor Image" />
                  </div>
                  <TextInput
                    {...register("image")}
                    id="image"
                    type="url"
                    placeholder="www.example.com/image.jpg"
                    required={true}
                    shadow={true}
                    defaultValue={instructor?.image}
                  />
                </div>
              </div>

              <div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="instructor_about"
                      value="Instructor About"
                    />
                  </div>
                  <Textarea
                    {...register("about")}
                    id="instructor_about"
                    placeholder="I'm Hasibul Hasan a dedicated learner and web developer who working....."
                    required={true}
                    rows={4}
                    defaultValue={instructor?.about}
                  />
                </div>
              </div>

              <Button type="submit">Update Instructor</Button>
            </form>
          </div>

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
                        <div className="flex gap-5">
                          <Link
                            to={`/instructors/update-instructor/${instructor._id}`}
                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                          >
                            Edit
                          </Link>
                          <span
                            onClick={() =>
                              handleDelete(instructor?._id, instructor?.name)
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
        </div>
      ) : (
        <div className="flex flex-col gap-5 justify-center items-center h-[70vh]">
          <h2 className="text-4xl text-red-600">User Not Found</h2>
          <Link to="/instructors">
            <Button color="failure">Go Back</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default EditInstructor;
