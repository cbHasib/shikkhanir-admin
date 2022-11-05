import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const ManageBlog = () => {
  return (
    <div>
      <h2>Manage Blog</h2>
      <div className="flex flex-wrap gap-2">
        <Link to="/blogs/add-author">
          <Button gradientDuoTone="purpleToBlue">Manage Author</Button>
        </Link>

        <Link to="/blogs/add-category">
          <Button gradientDuoTone="cyanToBlue">Manage Category</Button>
        </Link>
        <Link to="/blogs/add-new-blog">
          <Button gradientDuoTone="greenToBlue">Add New Blog</Button>
        </Link>
        {/*  <div>
          <Button gradientDuoTone="purpleToPink">Purple to Pink</Button>
        </div>
        <div>
          <Button gradientDuoTone="pinkToOrange">Pink to Orange</Button>
        </div>
        <div>
          <Button gradientDuoTone="tealToLime">Teal to Lime</Button>
        </div>
        <div>
          <Button gradientDuoTone="redToYellow">Red to Yellow</Button>
        </div> */}
      </div>
    </div>
  );
};

export default ManageBlog;
