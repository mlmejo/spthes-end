import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import SectionContext from "@/Contexts/Section";
import { useForm } from "@inertiajs/react";
import { useContext, useState } from "react";

export default function DeleteSectionForm() {
  const section = useContext(SectionContext);

  const [confirmingSectionDeletion, setConfirmingSectionDeletion] =
    useState(false);

  const { delete: destroy, processing } = useForm();

  const deleteSection = (e) => {
    e.preventDefault();

    destroy(route("sections.destroy", section.id));
  };

  return (
    <section>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Delete Section</h2>

        <p className="mt-1 text-sm text-gray-600">
          Once this section is deleted, all of its resources and data will be
          permanently deleted.
        </p>
      </header>

      <DangerButton
        className="mt-6"
        onClick={() => setConfirmingSectionDeletion(true)}
      >
        Delete Section
      </DangerButton>

      <Modal
        show={confirmingSectionDeletion}
        onClose={() => setConfirmingSectionDeletion(false)}
      >
        <div className="p-6">
          <form onSubmit={deleteSection}>
            <h2 className="text-lg font-medium text-gray-900">
              Are you sure you want to delete this section?
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Once you delete this section, all of its resources and data will
              be permanently deleted.
            </p>

            <div className="mt-6 flex justify-end">
              <SecondaryButton
                onClick={() => setConfirmingSectionDeletion(false)}
              >
                Cancel
              </SecondaryButton>

              <DangerButton className="ml-3" disabled={processing}>
                Delete Section
              </DangerButton>
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
}
