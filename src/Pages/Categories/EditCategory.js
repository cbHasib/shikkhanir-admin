import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";

const EditCategory = () => {
  const { register, handleSubmit } = useForm();

  const [category, setCategory] = useState({});
  const [load, setLoad] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/category/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data.data);
        setLoad(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = (data) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/update-category/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Updated Successfully!");
        } else {
          alert("Something went wrong!");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {load ? (
        <LoadingSpinner />
      ) : category?.cat_slug ? (
        <div className="m-auto xl:container px-12 sm:px-0 mx-auto min-w-full">
          <div className="mx-auto h-full sm:w-max">
            <div className="m-auto pt-12">
              <div className="mt-6 rounded-3xl border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-4 sm:px-10 sm:py-7 flex justify-center items-center flex-col">
                <h3 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">
                  Update {category?.cat_name}
                </h3>

                <form
                  onSubmit={handleSubmit(handleUpdate)}
                  className="mt-10 space-y-8 dark:text-white w-80"
                >
                  <div>
                    <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300 mt-2">
                      <input
                        type="text"
                        placeholder="Category ID"
                        defaultValue={category?._id}
                        readOnly
                        disabled
                        className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition cursor-not-allowed"
                        title="ID can't be changed"
                      />
                    </div>
                    <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300 mt-2">
                      <input
                        {...register("cat_name")}
                        type="text"
                        placeholder="Category Name"
                        defaultValue={category?.cat_name}
                        className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                      />
                    </div>
                    <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300 mt-2">
                      <input
                        {...register("cat_slug")}
                        type="text"
                        placeholder="Category Slug"
                        defaultValue={category?.cat_slug}
                        className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <button className="w-full rounded-full bg-sky-500 dark:bg-sky-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800">
                      <span className="text-base font-semibold text-white dark:text-gray-900">
                        Update Category
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[70vh]">
          <h2 className="text-4xl text-red-600">Category Not Found</h2>
        </div>
      )}
    </>
  );
};

export default EditCategory;
