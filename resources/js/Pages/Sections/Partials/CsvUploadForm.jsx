import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function CsvUploadForm({ section, formData }) {
  const [confirmingCsvUpload, setConfirmingCsvUpload] = useState(false);

  const confirmCsvUpload = () => {
    setConfirmingCsvUpload(true);
  };

  const { data, setData, post, processing, errors, reset, recentlySuccessful } =
    useForm({
      document: null,
      teacher: null,
    });


  useEffect(() => {
    setData("teacher", formData.teacher_id);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route("sections.enrollments.csv-import", section.id));
  };

  const closeModal = () => {
    setConfirmingCsvUpload(false);

    reset();
  };

  return (
    <>
      <PrimaryButton type="button" disabled={false} onClick={confirmCsvUpload}>
        Upload CSV
      </PrimaryButton>

      <Modal show={confirmingCsvUpload} onClose={closeModal}>
        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Import CSV</h2>

          <div className="max-w-xl">
            <input
              className="mt-1 block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
              id="document"
              name="document"
              type="file"
              accept=".csv"
              onChange={(e) => setData("document", e.target.files[0])}
              required
            />

            <InputError message={errors.document} className="mt-2" />
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

            <PrimaryButton type="submit" className="ml-3" disabled={processing}>
              Upload
            </PrimaryButton>
          </div>
        </form>
      </Modal>
    </>
  );
}
