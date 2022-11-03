import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import ShowCourses from "../ShowCourses/ShowCourses";

const Courses = () => {
  return (
    <div className="w-[80%] mx-auto flex flex-col gap-5">
      <div className="fixed left-[17%] flex flex-col gap-1">
        <Link to="/courses/add-new">
          <Button outline={true} gradientDuoTone="purpleToBlue">
            Add New Course
          </Button>
        </Link>
        <Link to="/courses/add-new">
          <Button outline={true} gradientDuoTone="pinkToOrange">
            Add Course Content
          </Button>
        </Link>
      </div>

      <ShowCourses />
    </div>
  );
};

export default Courses;
