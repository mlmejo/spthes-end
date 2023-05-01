import Card from "@/Components/Card";
import Container from "@/Components/Container";
import StudentLayout from "@/Layouts/StudentLayout";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { Head } from "@inertiajs/react";

export default function Show({ auth, enrollment }) {
  const Layout = ({ children }) => {
    return auth.user.userable_type.includes("Teacher") ? (
      <TeacherLayout user={auth.user}>{children}</TeacherLayout>
    ) : (
      <StudentLayout user={auth.user}>{children}</StudentLayout>
    );
  };

  return (
    <Layout>
      <Head title={"Section " + enrollment.section.name} />

      <Container>
        <Card>
          <h2 className="text-lg font-medium text-gray-900">
            Section {enrollment.section.name}
          </h2>

          {auth.user.userable_type.includes("Teacher") ? (
            <div className="mt-4 space-x-4">
              <a
                href={route("exams.csv-import", enrollment.id)}
                className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
              >
                Import CSV
              </a>
              <a
                href={route("enrollments.exams.create", enrollment.id)}
                className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
              >
                Create Exam
              </a>
            </div>
          ) : (
            <></>
          )}

          <h2 className="text-md mt-6 font-medium text-gray-800">
            Ongoing Examinations
          </h2>
          <ul className="text-md mt-2 w-full space-y-2 rounded-lg bg-white font-medium text-gray-900">
            {console.log(enrollment)}
            {enrollment.exams.map((exam) => {
              return (
                <li
                  key={exam.id}
                  className="w-full border-b border-gray-200 px-4 py-2 "
                >
                  <a
                    href={
                      auth.user.userable_type.includes("Student")
                        ? route("enrollments.exams.show", [
                            enrollment.id,
                            exam.id,
                          ])
                        : route("exams.answers.index", exam.id)
                    }
                    className="hover:text-indigo-500 hover:underline"
                  >
                    {exam.title}
                  </a>
                </li>
              );
            })}
          </ul>

          <h2 className="text-md mt-6 font-medium text-gray-800">Students</h2>
          <ul className="text-md m  t-2 w-full space-y-2 rounded-lg bg-white font-medium text-gray-900">
            {enrollment.students.map((student) => {
              return (
                <li
                  key={student.id}
                  className="w-full cursor-pointer border-b px-4 py-2 "
                >
                  <span className="hover:text-indigo-500 hover:underline">
                    {student.user.name}
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
