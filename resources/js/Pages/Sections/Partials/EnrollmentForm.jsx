import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import StudentSelect from "@/Components/StudentSelect";
import TeacherSelect from "@/Components/TeacherSelect";
import SectionContext from "@/Contexts/Section";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import CsvUploadForm from "./CsvUploadForm";

export default function EnrollmentForm() {
  const section = useContext(SectionContext);

  const { data, setData, post, processing, errors, recentlySuccessful } =
    useForm({
      section_id: section.id,
      teacher_id: 0,
      student_ids: [],
    });

  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (data.teacher_id === 0) return;

    const fetchEnrollments = async () => {
      try {
        const response = await axios.get(
          route("api.enrollments.index", {
            section_id: section.id,
            teacher_id: data.teacher_id,
          })
        );

        setStudents(response.data.students ? response.data.students : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEnrollments();
  }, [data.teacher_id]);

  useEffect(() => {
    setData(
      "student_ids",
      students.map((s) => {
        return s.id;
      })
    );
  }, [students]);

  const submit = (e) => {
    e.preventDefault();

    post(route("api.enrollments.store"), {
      preserveScroll: true,
    });
  };

  const handleStudentSelect = (option) => {
    const exists = students.some((student) => student.id === option.value);

    if (exists) return;

    setStudents([
      ...students,
      {
        id: option.value,
        user: {
          name: option.label,
        },
      },
    ]);
  };

  return (
    <section>
      <h2 className="mb-4 text-lg font-medium text-gray-900">Enrollments</h2>

      <form onSubmit={submit}>
        <div className="mt-4 max-w-xl">
          <InputLabel className="mt-1" htmlFor="teacher_id" value="Teacher" />

          <TeacherSelect
            onSelect={(option) => {
              if (option === null) {
                setStudents([]);
              }
              setData("teacher_id", option ? option.value : 0);
            }}
          />

          <InputError message={errors.teacher_id} className="mt-2" />
        </div>

        <div className="mt-4 max-w-xl">
          <InputLabel className="mt-1" htmlFor="student_ids" value="Students" />

          {students ? (
            <div className="my-2">
              {students.map((student) => {
                return (
                  <span
                    key={student.id}
                    className="mr-2 inline-flex items-center rounded bg-gray-800 px-2 py-1 text-sm font-medium text-white"
                  >
                    {student.user.name}
                    <button
                      type="button"
                      onClick={() => {
                        setStudents(
                          students.filter(({ id }) => {
                            return student.id !== id;
                          })
                        );
                      }}
                      className="ml-2 inline-flex items-center rounded-sm bg-transparent p-0.5 text-sm text-gray-400 hover:bg-white hover:text-gray-900"
                    >
                      <svg
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Remove Student</span>
                    </button>
                  </span>
                );
              })}
            </div>
          ) : (
            <></>
          )}

          <StudentSelect onSelect={handleStudentSelect} reset />

          <InputError message={errors.student_ids} className="mt-2" />
        </div>

        <div className="my-4 flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
          >
            <p className="text-sm text-gray-600">
              Enrollment has been updated.
            </p>
          </Transition>
        </div>
      </form>

      <CsvUploadForm section={section} formData={data} />
    </section>
  );
}
