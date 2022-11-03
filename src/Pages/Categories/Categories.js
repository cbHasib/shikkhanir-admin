import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";

const Categories = () => {
  const [load, setLoad] = useState(true);
  const [refresh, setRefresh] = useState(false);
  // const [modalShow, setModalShow] = useState(false);

  const [categories, setCategories] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
        setLoad(false);
      })
      .catch((err) => console.error(err));
  }, [refresh]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cat_name = e.target.cat_name.value;
    const cat_slug = cat_name.toLowerCase().split(" ").join("-");
    const _id = categories.length;
    const data = { _id, cat_name, cat_slug };

    if (!cat_name.length > 0) {
      alert("Input a Category Name");
      return;
    }

    fetch(`${process.env.REACT_APP_SERVER_URL}/category`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          setRefresh(!refresh);
          setLoad(true);
          e.target.reset();
        } else {
          alert(data.error);
        }
      })
      .catch((error) => alert(error.message));
  };

  const handleDelete = (id, name) => {
    const userConfirmed = window.confirm(
      `Are you sure to DELETE ${name} category from database?`
    );

    if (userConfirmed) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/delete-category/${id}`, {
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
    <div>
      {load ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-10">
            <div className="m-auto xl:container px-12 sm:px-0 mx-auto">
              <div className="mx-auto h-full sm:w-max">
                <div className="m-auto pt-12">
                  <div className="mt-6 rounded-3xl border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-4 sm:px-10 sm:py-7">
                    <h3 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">
                      Add New Category
                    </h3>

                    <form
                      onSubmit={handleSubmit}
                      className="mt-10 space-y-8 dark:text-white"
                    >
                      <div>
                        <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                          <input
                            name="cat_name"
                            type="text"
                            placeholder="Category Name"
                            className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                          />
                        </div>
                      </div>

                      <div>
                        <button className="w-full rounded-full bg-sky-500 dark:bg-sky-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800">
                          <span className="text-base font-semibold text-white dark:text-gray-900">
                            Add Category
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="border-t pt-6 text-gray-500 dark:border-gray-800">
                    <div className="space-x-4 text-center">
                      <span>&copy; ShikkhaNir</span>
                      <Link
                        to="/"
                        className="text-sm hover:text-sky-900 dark:hover:text-gray-300"
                      >
                        Contact
                      </Link>
                      <Link
                        href="/"
                        className="text-sm hover:text-sky-900 dark:hover:text-gray-300"
                      >
                        Privacy & Terms
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-full w-fit flex items-center justify-center">
              <Table>
                <Table.Head>
                  <Table.HeadCell>ID</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                  <Table.HeadCell>Slug</Table.HeadCell>
                  <Table.HeadCell>
                    <span className="sr-only">Edit</span>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {categories?.map((category) => (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      key={category._id}
                    >
                      <Table.Cell> {category._id}</Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {category.cat_name}
                      </Table.Cell>
                      <Table.Cell>{category.cat_slug}</Table.Cell>
                      <Table.Cell className="flex gap-5">
                        <Link
                          to={`/update-category/${category._id}`}
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Edit
                        </Link>
                        <span
                          onClick={() =>
                            handleDelete(category._id, category.cat_name)
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
        </>
      )}
    </div>
  );
};

export default Categories;
