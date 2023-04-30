import Card from "@/Components/Card";
import Container from "@/Components/Container";
import StudentLayout from "@/Layouts/StudentLayout";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { Head } from "@inertiajs/react";

export default function Show({ auth, exam, enrollment }) {
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

          <div className="my-4 flex justify-between">
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
                        (answer) => answer.choice.correct === 1
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
