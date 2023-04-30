import Card from "@/Components/Card";
import Container from "@/Components/Container";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import AdminLayout from "@/Layouts/AdminLayout";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";

export default function CsvImport({ auth }) {
  const { setData, post, processing, errors, recentlySuccessful } = useForm({
    document: null,
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("admin.csv-import"));
  };

  return (
    <AdminLayout user={auth.user}>
      <Head title="Import CSV Data" />

      <Container>
        <Card>
          <h2 className="mb-4 text-lg font-medium text-gray-900">Import CSV</h2>

          <form onSubmit={submit} encType="multipart/form-data">
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

            <div className="mt-4 flex items-center gap-4">
              <PrimaryButton disabled={processing}>Upload</PrimaryButton>

              <Transition
                show={recentlySuccessful}
                enterFrom="opacity-0"
                leaveTo="opacity-0"
                className="transition ease-in-out"
              >
                <p className="text-sm text-gray-600">
                  Document has been upload.
                </p>
              </Transition>
            </div>
          </form>
        </Card>
      </Container>
    </AdminLayout>
  );
}
