import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import StudentContext from "@/Contexts/Student";
import { useForm } from "@inertiajs/react";
import { useContext, useState } from "react";

export default function DeleteStudentForm() {
  const student = useContext(StudentContext);

  const [confirmingStudentDeletion, setConfirmingStudentDeletion] =
    useState(false);

  const { delete: destroy, processing } = useForm();

  const deleteStudent = (e) => {
    e.preventDefault();

    destroy(route("students.destroy", student.id));
  };

  return (
    <section>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Delete Student Account
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Once this account is deleted, all of its resources and data will be
          permanently deleted.
        </p>
      </header>

      <DangerButton
        className="mt-6"
        onClick={() => setConfirmingStudentDeletion(true)}
      >
        Delete Student Account
      </DangerButton>

      <Modal
        show={confirmingStudentDeletion}
        onClose={() => setConfirmingStudentDeletion(false)}
      >
        <div className="p-6">
          <form onSubmit={deleteStudent}>
            <h2 className="text-lg font-medium text-gray-900">
              Are you sure you want to delete this account?
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Once you delete this account, all of its resources and data will
              be permanently deleted.
            </p>

            <div className="mt-6 flex justify-end">
              <SecondaryButton
                onClick={() => setConfirmingStudentDeletion(false)}
              >
                Cancel
              </SecondaryButton>

              <DangerButton className="ml-3" disabled={processing}>
                Delete Student Account
              </DangerButton>
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
}
