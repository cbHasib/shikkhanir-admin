import { Button, Label, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Avatar, Table } from "flowbite-react";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";

const AddNewInstructor = () => {
  const [load, setLoad] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    setLoad(true);

    fetch(`${process.env.REACT_APP_SERVER_URL}/instructor-count`)
      .then((res) => res.json())
      .then((data) => setCount(data.data + 1))
      .catch((error) => console.log(error));

    fetch(`${process.env.REACT_APP_SERVER_URL}/instructors`)
      .then((res) => res.json())
      .then((data) => {
        setInstructors(data.data);
        setLoad(false);
      })
      .catch((error) => console.log(error));
  }, [refresh]);

  const handleAddInstructor = (data) => {
    const instructor_slug = data.name.toLowerCase().split(" ").join("-");
    const newData = { _id: count, instructor_slug, ...data };

    fetch(`${process.env.REACT_APP_SERVER_URL}/add-instructor`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          setRefresh(!refresh);
          setLoad(true);
          reset();
        } else {
          alert(data.error);
        }
      })
      .catch((error) => alert(error.message));
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
        body: JSON.stringify({ name: "Hasib" }),
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
        <div className="flex gap-10 items-start py-10 px-20">
          <div className="w-[50%] mx-auto">
            <form
              onSubmit={handleSubmit(handleAddInstructor)}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="id" value="Instructor ID" />
                  </div>
                  <TextInput
                    id="id"
                    type="text"
                    shadow={true}
                    addon="ID"
                    value={count}
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
                    rows={4}
                  />
                </div>
              </div>

              <Button type="submit">Add Instructor</Button>
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
                      <Table.Cell className="flex gap-5 items-center justify-center">
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
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewInstructor;
