import TeacherContext from "@/Contexts/Teacher";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import UpdateTeacherInformationForm from "./Partials/UpdateTeacherInformationForm";
import DeleteTeacherForm from "./Partials/DeleteTeacherForm";
import Container from "@/Components/Container";
import Card from "@/Components/Card";

export default function Edit({ auth, teacher }) {
  return (
    <AdminLayout user={auth.user}>
      <Head title="Edit Teacher Account" />

      <Container>
        <TeacherContext.Provider value={teacher}>
          <Card>
            <UpdateTeacherInformationForm />
          </Card>

          <Card className="mt-4">
            <DeleteTeacherForm />
          </Card>
        </TeacherContext.Provider>
      </Container>
    </AdminLayout>
  );
}
