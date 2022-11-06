import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const UpdateBlog = () => {
  const [load, setLoad] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [error, setError] = useState("Okay");

  const [blog, setBlog] = useState({});

  const id = useParams().id;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/get-single-blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBlog(data.data);
          setError(null);
        } else {
          console.log(data.error);
          setError(data.error);
        }
      })
      .catch((error) => {
        alert(error.message);
        setError(error.message);
      });
  }, [id]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/authors`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAuthors(data.data);
        } else {
          console.log(data.error);
        }
        setLoad(false);
      })
      .catch((error) => {
        alert(error.message);
      });
    setLoad(false);
  }, [refresh]);

  useEffect(() => {
    setLoad(true);
    fetch(`${process.env.REACT_APP_SERVER_URL}/blog-categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.data);
        } else {
          console.log(data.error);
        }
        setLoad(false);
      })
      .catch((error) => {
        alert(error.message);
      });
    setLoad(false);
  }, [refresh]);

  const handleUpdateBlog = (data) => {
    setLoad(true);
    const { author, postCategory } = data;

    const authorName = author.split(";")[0];
    const author_id = author.split(";")[1];
    const postCatName = postCategory.split(";")[0];
    const cat_id = postCategory.split(";")[1];

    data.author = authorName;
    data["author_id"] = author_id;
    data["cat_id"] = cat_id;
    data.postCategory = postCatName;

    fetch(`${process.env.REACT_APP_SERVER_URL}/update-blog/${id}`, {
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
          alert(data.message);
        } else {
          alert(data.error);
        }
        setRefresh(!refresh);
        setLoad(false);
      })
      .catch((error) => {
        alert(error.message);
        setLoad(false);
      });
  };

  return (
    <>
      {load ? (
        <LoadingSpinner />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className="w-[80%] mx-auto py-10">
          <form
            onSubmit={handleSubmit(handleUpdateBlog)}
            className="flex flex-col gap-4"
          >
            <div>
              <div>
                <div className="mb-2 block w-full">
                  <Label htmlFor="title" value="Blog Title" />
                </div>
                <TextInput
                  id="title"
                  {...register("title")}
                  type="text"
                  placeholder="What is the blog title?"
                  required={true}
                  shadow={true}
                  defaultValue={blog?.title}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="readingMinute" value="Reading Minute" />
                </div>

                <TextInput
                  {...register("readingMinute", {
                    required: true,
                    min: 0,
                    setValueAs: Number,
                  })}
                  id="hours"
                  defaultValue={blog?.readingMinute}
                  type="number"
                  min={0}
                  shadow={true}
                  placeholder="5"
                />
              </div>

              <div>
                <div className="mb-2 block w-full">
                  <Label
                    htmlFor="category"
                    value={`Post Category (Previously: ${blog?.postCategory})`}
                  />
                </div>
                <Select
                  id="category"
                  required={true}
                  {...register("postCategory", {
                    required: true,
                  })}
                >
                  {categories?.map((category) => (
                    <option
                      value={category?.cat_name + ";" + category?._id}
                      key={category?._id}
                    >
                      {category?.cat_name}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <div className="mb-2 block w-full">
                  <Label
                    htmlFor="author"
                    value={`Post Author (Previously: ${blog?.author})`}
                  />
                </div>
                <Select
                  {...register("author", {
                    required: true,
                  })}
                  id="author"
                >
                  {authors?.map((author) => (
                    <option
                      value={author?.name + ";" + author?._id}
                      key={author._id}
                    >
                      {author?.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <div>
                <div className="mb-2 block w-full">
                  <Label htmlFor="slug" value="Blog Slug" />
                </div>
                <TextInput
                  {...register("slug")}
                  id="slug"
                  type="text"
                  placeholder="web-development/what-is-web-development"
                  required={true}
                  shadow={true}
                  defaultValue={blog?.slug}
                />
              </div>
            </div>

            <div>
              <div>
                <div className="mb-2 block w-full">
                  <Label htmlFor="thumbnail" value="Blog Thumbnail" />
                </div>
                <TextInput
                  {...register("thumbnail")}
                  id="thumbnail"
                  type="url"
                  placeholder="www.example.com/image.jpg"
                  required={true}
                  shadow={true}
                  defaultValue={blog?.thumbnail}
                />
              </div>
            </div>

            <div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="postBody" value="Post Body (HTML)" />
                </div>
                <Textarea
                  {...register("postBody")}
                  id="postBody"
                  placeholder="Now we are going to talk about todays topic............."
                  required={true}
                  rows={6}
                  defaultValue={blog?.postBody}
                />
              </div>
            </div>

            <div className="hidden">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="publishDate" value="Publish Date" />
                </div>

                <TextInput
                  {...register("publishDate")}
                  id="publishDate"
                  type="text"
                  shadow={true}
                  placeholder="July 5, 2022"
                  value={blog?.publishDate}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="liked" value="Liked" />
                </div>

                <TextInput
                  {...register("liked", {
                    // setValueAs: Boolean,
                    setValueAs: (value) => {
                      return value === blog?.liked;
                    },
                  })}
                  id="liked"
                  type="text"
                  shadow={true}
                  value={blog?.liked}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="reactionCount" value="reaction Count" />
                </div>

                <TextInput
                  {...register("reactionCount", {
                    valueAsNumber: true,
                  })}
                  id="reactionCount"
                  type="number"
                  shadow={true}
                  value={blog?.reactionCount}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="viewCount" value="view Count" />
                </div>

                <TextInput
                  {...register("viewCount", {
                    valueAsNumber: true,
                  })}
                  id="viewCount"
                  type="number"
                  shadow={true}
                  value={blog?.viewCount}
                />
              </div>
            </div>

            <Button type="submit">Update Blog</Button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateBlog;
