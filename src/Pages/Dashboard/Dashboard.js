import React, { useState } from "react";
import { useEffect } from "react";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";

const Dashboard = () => {
  const [courseCount, setCourseCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [instructorCount, setInstructorCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [error, setError] = useState("");

  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);

    fetch(`${process.env.REACT_APP_SERVER_URL}/course-count`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCourseCount(data.data);
          setError("");
        } else {
          setError(data.error);
          alert(data.error);
        }
      });

    fetch(`${process.env.REACT_APP_SERVER_URL}/video-count`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setError("");
          setVideoCount(data.data);
        } else {
          setError(data.error);
          alert(data.error);
        }
      });

    fetch(`${process.env.REACT_APP_SERVER_URL}/instructor-count`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setError("");
          setInstructorCount(data.data);
        } else {
          setError(data.error);
          alert(data.error);
        }
      });

    fetch(`${process.env.REACT_APP_SERVER_URL}/blog-count`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setError("");
          setBlogCount(data.data);
        } else {
          setError(data.error);
          alert(data.error);
        }
        setLoad(false);
      });
  }, []);

  return (
    <>
      {load ? (
        <LoadingSpinner />
      ) : error ? (
        <h2 className="h-[80vh] w-full flex justify-center items-center text-4xl font-medium text-red-700">
          {error}
        </h2>
      ) : (
        <section className="p-6 my-6 dark:bg-gray-800 dark:text-gray-100 ">
          <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
            <div className="shadow-lg rounded-2xl w-full p-4 bg-white dark:bg-gray-800 hover:bg-purple-300 duration-300 ">
              <div className="flex items-center">
                <span className="bg-green-500 p-2 h-7 w-7 rounded-full relative">
                  <svg
                    width="50"
                    fill="currentColor"
                    height="50"
                    className="text-white h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 172 172"
                  >
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <path d="M21.5,21.5v129h64.5v-32.25v-64.5v-32.25zM86,53.75c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25c-17.7805,0 -32.25,14.4695 -32.25,32.25zM118.25,86c-17.7805,0 -32.25,14.4695 -32.25,32.25c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25z"></path>
                  </svg>
                </span>
                <p className="text-md text-gray-700 dark:text-gray-50 ml-2 font-medium">
                  Courses
                </p>
              </div>

              <div className="flex flex-col justify-start">
                <p
                  className={
                    courseCount
                      ? "text-gray-800 text-4xl text-left dark:text-white font-bold my-4"
                      : "h-11 bg-gray-200 rounded dark:bg-gray-700 w-15 mb-4 animate-pulse my-4"
                  }
                >
                  {courseCount ? courseCount : null}
                </p>
                <div className="relative w-full h-2 bg-gray-200 rounded">
                  <div className="absolute top-0 h-2  left-0 rounded bg-green-500 w-full"></div>
                </div>
              </div>
            </div>

            <div className="shadow-lg rounded-2xl w-full p-4 bg-white dark:bg-gray-800 hover:bg-purple-300 duration-300">
              <div className="flex items-center">
                <span className="bg-green-500 p-2 h-7 w-7 rounded-full relative">
                  <svg
                    width="50"
                    fill="currentColor"
                    height="50"
                    className="text-white h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 172 172"
                  >
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <path d="M21.5,21.5v129h64.5v-32.25v-64.5v-32.25zM86,53.75c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25c-17.7805,0 -32.25,14.4695 -32.25,32.25zM118.25,86c-17.7805,0 -32.25,14.4695 -32.25,32.25c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25z"></path>
                  </svg>
                </span>
                <p className="text-md text-gray-700 dark:text-gray-50 ml-2 font-medium">
                  Videos
                </p>
              </div>

              <div className="flex flex-col justify-start">
                <p
                  className={
                    videoCount
                      ? "text-gray-800 text-4xl text-left dark:text-white font-bold my-4"
                      : "h-11 bg-gray-200 rounded dark:bg-gray-700 w-15 mb-4 animate-pulse my-4"
                  }
                >
                  {videoCount ? videoCount : null}
                </p>
                <div className="relative w-full h-2 bg-gray-200 rounded">
                  <div className="absolute top-0 h-2  left-0 rounded bg-green-500 w-full"></div>
                </div>
              </div>
            </div>

            <div className="shadow-lg rounded-2xl w-full p-4 bg-white dark:bg-gray-800 hover:bg-purple-300 duration-300">
              <div className="flex items-center">
                <span className="bg-green-500 p-2 h-7 w-7 rounded-full relative">
                  <svg
                    width="50"
                    fill="currentColor"
                    height="50"
                    className="text-white h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 172 172"
                  >
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <path d="M21.5,21.5v129h64.5v-32.25v-64.5v-32.25zM86,53.75c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25c-17.7805,0 -32.25,14.4695 -32.25,32.25zM118.25,86c-17.7805,0 -32.25,14.4695 -32.25,32.25c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25z"></path>
                  </svg>
                </span>
                <p className="text-md text-gray-700 dark:text-gray-50 ml-2 font-medium">
                  Instructors
                </p>
              </div>

              <div className="flex flex-col justify-start">
                <p
                  className={
                    instructorCount
                      ? "text-gray-800 text-4xl text-left dark:text-white font-bold my-4"
                      : "h-11 bg-gray-200 rounded dark:bg-gray-700 w-15 mb-4 animate-pulse my-4"
                  }
                >
                  {instructorCount ? instructorCount : null}
                </p>
                <div className="relative w-full h-2 bg-gray-200 rounded">
                  <div className="absolute top-0 h-2  left-0 rounded bg-green-500 w-full"></div>
                </div>
              </div>
            </div>

            <div className="shadow-lg rounded-2xl w-full p-4 bg-white dark:bg-gray-800 hover:bg-purple-300 duration-300">
              <div className="flex items-center">
                <span className="bg-green-500 p-2 h-7 w-7 rounded-full relative">
                  <svg
                    width="50"
                    fill="currentColor"
                    height="50"
                    className="text-white h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 172 172"
                  >
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <path d="M21.5,21.5v129h64.5v-32.25v-64.5v-32.25zM86,53.75c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25c-17.7805,0 -32.25,14.4695 -32.25,32.25zM118.25,86c-17.7805,0 -32.25,14.4695 -32.25,32.25c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25z"></path>
                  </svg>
                </span>
                <p className="text-md text-gray-700 dark:text-gray-50 ml-2 font-medium">
                  Blogs
                </p>
              </div>

              <div className="flex flex-col justify-start">
                <p
                  className={
                    blogCount
                      ? "text-gray-800 text-4xl text-left dark:text-white font-bold my-4"
                      : "h-11 bg-gray-200 rounded dark:bg-gray-700 w-15 mb-4 animate-pulse my-4"
                  }
                >
                  {blogCount ? blogCount : null}
                </p>
                <div className="relative w-full h-2 bg-gray-200 rounded">
                  <div className="absolute top-0 h-2  left-0 rounded bg-green-500 w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Dashboard;
