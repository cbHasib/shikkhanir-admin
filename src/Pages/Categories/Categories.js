import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";

const Categories = () => {
  const [load, setLoad] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const [categories, setCategories] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
        console.log(data);
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

    fetch("http://localhost:5000/category", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoad(true);
        setRefresh(!refresh);
        e.target.reset();
      });
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
              <div class="bg-white overflow-hidden overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <table class="divide-y divide-gray-200 text-sm dark:divide-gray-700">
                  <thead class="bg-purple-300  dark:bg-gray-800">
                    <tr>
                      <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                        ID
                      </th>
                      <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                        Name
                      </th>
                      <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                        Slug
                      </th>
                      <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    {categories?.map((category) => (
                      <tr>
                        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                          {category._id}
                        </td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                          {category.cat_name}
                        </td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                          {category.cat_slug}
                        </td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                          Action
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
