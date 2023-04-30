import Card from "@/Components/Card";
import Container from "@/Components/Container";
import SectionContext from "@/Contexts/Section";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import DeleteSectionForm from "./Partials/DeleteSectionForm";
import EnrollmentForm from "./Partials/EnrollmentForm";
import UpdateSectionInformationForm from "./Partials/UpdateSectionForm";

export default function Edit({ auth, section }) {
  return (
    <AdminLayout user={auth.user}>
      <Head title="Edit Section" />

      <Container>
        <SectionContext.Provider value={section}>
          <Card>
            <UpdateSectionInformationForm />
          </Card>

          <Card className="mt-4">
            <EnrollmentForm />
          </Card>

          <Card className="mt-4">
            <DeleteSectionForm />
          </Card>
        </SectionContext.Provider>
      </Container>
    </AdminLayout>
  );
}
