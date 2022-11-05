import { Button, Label, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const AddCourseContent = () => {
  const [load, setLoad] = useState(false);
  const { register, handleSubmit, reset, getValues } = useForm();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [vdoId, setVdoId] = useState(null);

  const [catId, setCatId] = useState(1);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/courses-by-category/${catId}`)
      .then((res) => res.json())
      .then((data) => {
        const coursesData = data.data;
        setCourses(coursesData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [catId]);

  useEffect(() => {
    setLoad(true);
    fetch(`${process.env.REACT_APP_SERVER_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        let categoriesData = data.data;
        categoriesData.shift();
        setCategories(categoriesData);
        setLoad(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [refresh]);

  const handleAddCourse = (data) => {
    setLoad(true);
    if (!data.video_thumbnail && data.youtube_video_id) {
      data.video_thumbnail = `https://img.youtube.com/vi_webp/${getValues(
        "youtube_video_id"
      )}/maxresdefault.webp`;
    }
    // setLoad(true);
    if (!data.course_id) {
      alert("Select a Course");
    }

    fetch(`${process.env.REACT_APP_SERVER_URL}/add-course-content`, {
      method: "POST",
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
        setVdoId(null);
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
      ) : (
        <div className="w-[80%] mx-auto py-10">
          <form
            onSubmit={handleSubmit(handleAddCourse)}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-5">
              <div>
                <div className="mb-2 block w-full">
                  <Label htmlFor="category" value="Course Category" />
                </div>
                <Select
                  id="category"
                  required={true}
                  onChange={(e) => setCatId(e.target.value)}
                >
                  {categories?.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.cat_name}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <div className="mb-2 block w-full">
                  <Label htmlFor="Course" value="Select Course" />
                </div>
                <Select
                  id="Course"
                  {...register("course_id", {
                    valueAsNumber: true,
                  })}
                  required
                >
                  {courses?.map((course) => (
                    <option value={course._id} key={course._id}>
                      {course.course_title}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <div className="mb-2 block w-full">
                <Label htmlFor="video_title" value="Video Title" />
              </div>
              <TextInput
                id="video_title"
                {...register("video_title")}
                type="text"
                placeholder="HTML Basic concept video..."
                shadow={true}
              />
            </div>

            <div>
              <div className="mb-2 block w-full">
                <Label htmlFor="video_thumbnail" value="Video Thumbnail Link" />
              </div>
              <TextInput
                {...register("video_thumbnail")}
                id="video_thumbnail"
                type="url"
                placeholder="www.example.com/image.jpg"
                shadow={true}
              />
            </div>

            <div>
              <div className="mb-2 block w-full">
                <Label
                  htmlFor="video_link"
                  value="Video Link (CUSTOM) if any"
                />
              </div>
              <TextInput
                {...register("video_link")}
                id="video_link"
                type="url"
                placeholder="www.example.com/video.mp4"
                shadow={true}
              />
            </div>

            <div>
              <div className="mb-2 block w-full">
                <Label htmlFor="youtube_embed_link" value="Youtube Video ID" />
              </div>
              <TextInput
                {...register("youtube_video_id")}
                id="youtube_embed_link"
                type="text"
                placeholder="dhTs0IFwrAs"
                shadow={true}
                onChange={(e) =>
                  setVdoId(
                    `https://i.ytimg.com/vi_webp/${e.target.value}/maxresdefault.webp`
                  )
                }
              />
            </div>

            {vdoId && (
              <div className="grid grid-cols-4">
                <div></div>
                <img className="col-span-2" src={vdoId} alt="" />
                <div></div>
              </div>
            )}

            <Button type="submit">Add Course</Button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddCourseContent;
