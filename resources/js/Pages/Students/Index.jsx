import Card from "@/Components/Card";
import Container from "@/Components/Container";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth, students }) {
  return (
    <AdminLayout user={auth.user}>
      <Head title="Student Accounts" />

      <Container>
        <Card>
          <header>
            <div className="mb-4 border-b border-gray-200 text-center text-sm font-medium text-gray-800">
              <ul className="-mb-px flex flex-wrap">
                <li className="mr-2">
                  <a
                    href={route("students.index")}
                    className={
                      "inline-block rounded-t-lg border-b-2 border-transparent p-2 hover:border-indigo-300 hover:text-indigo-600 " +
                      `${
                        route().current("students.index")
                          ? "border-indigo-300 text-indigo-600"
                          : ""
                      }`
                    }
                  >
                    Students
                  </a>
                </li>
                <li className="mr-2">
                  <a
                    href={route("teachers.index")}
                    className={
                      "inline-block rounded-t-lg border-b-2 border-transparent p-2 hover:border-indigo-300 hover:text-indigo-600 " +
                      `${
                        route().current("teachers.index")
                          ? "border-indigo-300 text-indigo-600"
                          : ""
                      }`
                    }
                  >
                    Teachers
                  </a>
                </li>
              </ul>
            </div>

            <h2 className="text-lg font-medium text-gray-900">
              Student Account List
            </h2>
          </header>

          <div className="max-w-2xl overflow-x-auto pt-4 sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Student Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Academic Level
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {students.length === 0 && (
                  <tr className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    <td colSpan={4} className="px-6 py-4 text-gray-500">
                      No data available in table.
                    </td>
                  </tr>
                )}

                {students.map((student) => {
                  return (
                    <tr
                      key={student.id}
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                    >
                      <th
                        scope="col"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                      >
                        {student.id}
                      </th>
                      <td className="px-6 py-4 text-gray-500">
                        {student.user.name}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {student.user.email}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {student.academic_level.name}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        <a
                          href={route("students.edit", student.id)}
                          className="font-medium text-indigo-600 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </Container>
    </AdminLayout>
  );
}
