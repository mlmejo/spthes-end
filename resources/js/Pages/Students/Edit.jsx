import StudentContext from "@/Contexts/Student";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import UpdateStudentInformationForm from "./Partials/UpdateStudentInformationForm";
import DeleteStudentForm from "./Partials/DeleteStudentForm";
import Card from "@/Components/Card";
import Container from "@/Components/Container";

export default function Edit({ auth, student }) {
  return (
    <AdminLayout user={auth.user}>
      <Head title="Edit Student Account" />

      <Container>
        <StudentContext.Provider value={student}>
          <Card>
            <UpdateStudentInformationForm />
          </Card>

          <Card className="mt-4">
            <DeleteStudentForm />
          </Card>
        </StudentContext.Provider>
      </Container>
    </AdminLayout>
  );
}
