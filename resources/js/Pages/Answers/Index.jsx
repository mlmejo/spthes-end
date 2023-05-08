import Card from "@/Components/Card";
import Container from "@/Components/Container";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import StudentLayout from "@/Layouts/StudentLayout";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { Head, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function Show({ auth, exam, enrollment }) {
  const { data, setData, post, errors } = useForm({
    "answer-sheet": null,
  });

  const inputRef = useRef(null);

  const [filename, setFilename] = useState("");

  const submit = (e) => {
    e.preventDefault();

    post(route("answers.scan", [exam.id]));
  };

  const Layout = ({ children }) => {
    return auth.user.userable_type.includes("Teacher") ? (
      <TeacherLayout user={auth.user}>{children}</TeacherLayout>
    ) : (
      <StudentLayout user={auth.user}>{children}</StudentLayout>
    );
  };

  return (
    <Layout>
      <Head title={`${exam.title} - ${enrollment.section.name}`} />

      <Container>
        <Card>
          <header>
            <h2 className="text-lg font-medium text-gray-900">{exam.title}</h2>
            <p className="text-sm font-medium text-gray-500">
              Section {enrollment.section.name}
            </p>
            <p className="text-sm font-medium text-gray-500">
              Adviser: {enrollment.teacher.user.name}
            </p>
          </header>

          {auth.user.userable_type.includes("Teacher") ? (
            <form onSubmit={submit}>
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg, image/png"
                name="answer-sheet"
                onChange={(e) => {
                  setFilename(e.target.files[0].name);
                  setData("answer-sheet", e.target.files[0]);
                }}
                id="answer-sheet"
                className="hidden"
              />

              <div className="max-w-xl mt-4">
                <InputLabel value="Student's Answer Sheet" />

                <TextInput value={filename} className="block w-full" readOnly />

                <InputError message={errors["answer-sheet"]} className="mt-1" />
              </div>

              <div className="mt-4 flex space-x-2">
                <PrimaryButton
                  type="button"
                  disabled={false}
                  onClick={() => inputRef.current.click()}
                >
                  Scan
                </PrimaryButton>
                <PrimaryButton type="submit" disabled={false}>
                  Generate Score
                </PrimaryButton>
              </div>
            </form>
          ) : (
            <></>
          )}

          <div className="my-4 mt-8 flex justify-between">
            <h2 className="text-md font-medium text-gray-800">Students</h2>
            <p>Score</p>
          </div>
          <ul className="text-md m  t-2 w-full space-y-2 rounded-lg bg-white font-medium text-gray-900">
            {enrollment.students.map((student) => {
              return (
                <li
                  key={student.id}
                  className="flex w-full justify-between border-b py-2 "
                >
                  <a
                    href={route("exams.answers.show", [exam.id, student.id])}
                    className="hover:text-indigo-500 hover:underline"
                  >
                    {student.user.name}
                  </a>
                  <span>
                    {
                      student.answers.filter(
                        (answer) => answer.choice.correct === 1 && answer.exam_id === exam.id
                      ).length
                    }{" "}
                    / {exam.questions.length}
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>
      </Container>
    </Layout>
  );
}
