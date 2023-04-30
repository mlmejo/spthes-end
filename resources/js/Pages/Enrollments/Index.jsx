import Card from "@/Components/Card";
import Container from "@/Components/Container";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth, enrollments }) {
  return (
    <TeacherLayout user={auth.user}>
      <Head title="My Sections" />

      <Container>
        <h2 className="mb-3 text-xl font-semibold">Section List</h2>
        <div className="grid grid-cols-1 place-items-start gap-3 overflow-hidden md:grid-cols-3">
          {enrollments.map((enrollment) => {
            return (
              <a
                href={route("enrollments.show", enrollment.id)}
                key={enrollment.id}
                className="block w-full rounded-lg border border-gray-200 bg-white p-6 shadow hover:border-gray-300 hover:bg-gray-50 hover:shadow"
              >
                <p className="mb-2 text-sm text-gray-800">
                  {enrollment.section.academic_level.name}
                </p>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {enrollment.section.name}
                </h5>
                <p className="text-sm text-gray-700">
                  Adviser: {enrollment.teacher.user.name}
                </p>
              </a>
            );
          })}
        </div>
      </Container>
    </TeacherLayout>
  );
}
