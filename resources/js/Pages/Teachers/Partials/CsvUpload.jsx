import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function CsvUpload({
  confirmingUpload,
  closeModal,
  confirmUpload,
}) {
  const { setData, post, processing, errors, recentlySuccessful } = useForm({
    document: null,
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("teachers.csv-import"));
  };

  return (
    <>
      <PrimaryButton type="button" disabled={false} onClick={confirmUpload}>
        Upload CSV
      </PrimaryButton>

      <Modal show={confirmingUpload} onClose={closeModal}>
        <form onSubmit={submit} id="upload-form" className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Import CSV</h2>

          <div className="max-w-xl">
            <InputLabel htmlFor="document" value="Document" />

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

          <div className="mt-6 flex">
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

            <PrimaryButton type="submit" className="ml-3" disabled={processing}>
              Upload
            </PrimaryButton>

            <Transition
              show={recentlySuccessful}
              enterFrom="opacity-0"
              leaveTo="opacity-0"
              className="transition ease-in-out"
            >
              <p className="text-sm text-gray-600">Document has been upload.</p>
            </Transition>
          </div>
        </form>
      </Modal>
    </>
  );
}
