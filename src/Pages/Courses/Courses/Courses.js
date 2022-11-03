import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Link to="/courses/add-new">
          <Button outline={true} gradientDuoTone="purpleToBlue">
            Add New Course
          </Button>
        </Link>

        <Link to="/courses/update-course/1">
          <Button outline={true} gradientDuoTone="pinkToOrange">
            Update Course
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Courses;
