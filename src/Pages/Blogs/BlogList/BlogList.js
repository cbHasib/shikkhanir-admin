import { Avatar, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const BlogList = () => {
  const [load, setLoad] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setLoad(true);
    fetch(`${process.env.REACT_APP_SERVER_URL}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBlogs(data.data.reverse());
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
      fetch(`${process.env.REACT_APP_SERVER_URL}/delete-blog/${id}`, {
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
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Slug</Table.HeadCell>
                <Table.HeadCell>Published</Table.HeadCell>
                <Table.HeadCell>Post Category</Table.HeadCell>
                <Table.HeadCell>Author</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {blogs?.map((blog) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={blog._id}
                  >
                    <Table.Cell>
                      <Avatar img={blog.thumbnail} />
                    </Table.Cell>
                    <Table.Cell className="whitespace-pre-wrap font-medium  text-gray-900 dark:text-white">
                      {blog.title}
                    </Table.Cell>
                    <Table.Cell>{blog.slug}</Table.Cell>
                    <Table.Cell>{blog.publishDate}</Table.Cell>
                    <Table.Cell>{blog.postCategory}</Table.Cell>
                    <Table.Cell>{blog.author}</Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-5">
                        <Link
                          to={`/blogs/update-blog/${blog._id}`}
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Edit
                        </Link>
                        <span
                          onClick={() => handleDelete(blog?._id, blog?.title)}
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

export default BlogList;
