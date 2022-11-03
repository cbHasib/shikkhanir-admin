import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const AddNewCourse = () => {
  const [load, setLoad] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const [count, setCount] = useState(0);
  const [instructors, setInstructors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/course-count`)
      .then((res) => res.json())
      .then((data) => {
        setCount(parseInt(data.data));
      })
      .catch((error) => {
        alert(error.message);
      });

    fetch(`${process.env.REACT_APP_SERVER_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        let categoriesData = data.data;
        categoriesData.shift();
        setCategories(categoriesData);
      })
      .catch((error) => {
        alert(error.message);
      });

    fetch(`${process.env.REACT_APP_SERVER_URL}/instructors`)
      .then((res) => res.json())
      .then((data) => {
        setInstructors(data.data);
        setLoad(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [refresh]);

  const handleAddCourse = (data) => {
    setLoad(true);
    const { course_title, mainFeatures, learnFeatures } = data;
    const course_slug = course_title.toLowerCase().split(" ").join("-");
    const mainFeature = mainFeatures.split(",");
    const learnFeature = learnFeatures.split(",");
    const newData = {
      _id: count + 1,
      course_slug,
      ...data,
      mainFeatures: mainFeature,
      learnFeatures: learnFeature,
    };

    fetch(`${process.env.REACT_APP_SERVER_URL}/add-new-course`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
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
      })
      .catch((error) => {
        alert(error.message);
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
            <div className="grid grid-cols-6 gap-5">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="id" value="Course ID" />
                </div>
                <TextInput
                  id="id"
                  type="text"
                  shadow={true}
                  addon="ID"
                  value={count + 1}
                  disabled
                />
              </div>
              <div className="col-span-3">
                <div className="mb-2 block w-full">
                  <Label htmlFor="course_title" value="Course Title" />
                </div>
                <TextInput
                  id="course_title"
                  {...register("course_title")}
                  type="text"
                  placeholder="HSC Physics 1st Paper"
                  required={true}
                  shadow={true}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="price" value="Price" />
                </div>
                <TextInput
                  {...register("price", {
                    required: true,
                    setValueAs: Number,
                    min: 0,
                  })}
                  id="price"
                  type="number"
                  addon="৳"
                  shadow={true}
                />
              </div>
              <div>
                <div className="mb-2 block w-full">
                  <Label htmlFor="category" value="Course Category" />
                </div>
                <Select
                  id="category"
                  required={true}
                  {...register("cat_id", {
                    required: true,
                    setValueAs: Number,
                  })}
                >
                  {categories?.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.cat_name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-5">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="hours" value="Hours Required" />
                </div>

                <TextInput
                  {...register("hoursRequired", {
                    required: true,
                    min: 0,
                    setValueAs: Number,
                  })}
                  id="hours"
                  type="number"
                  min={0}
                  shadow={true}
                  placeholder="120"
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="enrollment" value="Enroll Student" />
                </div>
                <TextInput
                  {...register("enrolledStudent", {
                    required: true,
                    min: 0,
                    setValueAs: Number,
                  })}
                  id="enrollment"
                  type="number"
                  placeholder="34"
                  min={0}
                  shadow={true}
                />
              </div>

              <div>
                <div className="mb-2 block w-full">
                  <Label htmlFor="instructor" value="Course Instructor" />
                </div>
                <Select
                  {...register("instructorId", {
                    required: true,
                    setValueAs: Number,
                  })}
                  id="instructor"
                >
                  {instructors?.map((instructor) => (
                    <option value={instructor._id} key={instructor._id}>
                      {instructor.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="col-span-4">
                <div className="mb-2 block w-full">
                  <Label htmlFor="thumbnail" value="Course Thumbnail" />
                </div>
                <TextInput
                  {...register("thumbnail")}
                  id="thumbnail"
                  type="url"
                  placeholder="www.example.com/image.jpg"
                  required={true}
                  shadow={true}
                />
              </div>
            </div>

            <div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="shortDes" value="Course Short Description" />
                </div>
                <Textarea
                  {...register("course_description")}
                  id="shortDes"
                  placeholder="Full preparation guide on HSC Physics 1st Paper Syllabus............."
                  required={true}
                  rows={2}
                />
              </div>
            </div>

            <div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="mainFeature"
                    value="Course Main Feature (Separate with ',' - IMPORTANT)"
                  />
                </div>
                <Textarea
                  {...register("mainFeatures")}
                  id="mainFeature"
                  placeholder="127 Videos, 135 Quiz, 900+ Smart Notes......"
                  required={true}
                  rows={2}
                />
              </div>
            </div>

            <div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="learnFeatures"
                    value="Course Learn Feature (Separate with ',' - IMPORTANT)"
                  />
                </div>
                <Textarea
                  {...register("learnFeatures")}
                  id="learnFeatures"
                  placeholder="Everything you need to learn about physcis 1st paper, All resourses including quiz, recorded class, notes etc, Can join from anywhere, Course validity: 12 months...."
                  required={true}
                  rows={2}
                />
              </div>
            </div>

            <div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="courseAbout"
                    value="Course Details About (HTML)"
                  />
                </div>
                <Textarea
                  {...register("courseAbout")}
                  id="courseAbout"
                  placeholder="<p></p><p><strong class='text-lg'>Requirements</strong><br />This course is designed for HSC 1st and 2nd year students and HSC candidates.<br/><p></p>...................."
                  required={true}
                  rows={4}
                />
              </div>
            </div>

            <Button type="submit">Add Course</Button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddNewCourse;
