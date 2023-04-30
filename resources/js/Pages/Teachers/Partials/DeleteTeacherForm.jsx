import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TeacherContext from "@/Contexts/Teacher";
import { useForm } from "@inertiajs/react";
import { useContext, useState } from "react";

export default function DeleteTeacherForm() {
  const teacher = useContext(TeacherContext);

  const [confirmingTeacherDeletion, setConfirmingTeacherDeletion] =
    useState(false);

  const { delete: destroy, processing } = useForm();

  const deleteTeacher = (e) => {
    e.preventDefault();

    destroy(route("teachers.destroy", teacher.id));
  };

  return (
    <section>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Delete Teacher Account
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Once this account is deleted, all of its resources and data will be
          permanently deleted.
        </p>
      </header>

      <DangerButton
        className="mt-6"
        onClick={() => setConfirmingTeacherDeletion(true)}
      >
        Delete Teacher Account
      </DangerButton>

      <Modal
        show={confirmingTeacherDeletion}
        onClose={() => setConfirmingTeacherDeletion(false)}
      >
        <div className="p-6">
          <form onSubmit={deleteTeacher}>
            <h2 className="text-lg font-medium text-gray-900">
              Are you sure you want to delete this account?
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Once you delete this account, all of its resources and data will
              be permanently deleted.
            </p>

            <div className="mt-6 flex justify-end">
              <SecondaryButton
                onClick={() => setConfirmingTeacherDeletion(false)}
              >
                Cancel
              </SecondaryButton>

              <DangerButton className="ml-3" disabled={processing}>
                Delete Teacher Account
              </DangerButton>
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
}
