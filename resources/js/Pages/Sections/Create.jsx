import AcademicLevelSelect from "@/Components/AcademicLevelSelect";
import Card from "@/Components/Card";
import Container from "@/Components/Container";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
  const { data, setData, post, processing, errors, recentlySuccessful } =
    useForm({
      name: "",
      academic_level_id: "",
    });

  const submit = (e) => {
    e.preventDefault();

    post(route("sections.store"));
  };

  return (
    <AdminLayout user={auth.user}>
      <Head title="Create Section" />

      <Container>
        <Card>
          <header>
            <div className="mb-4 text-lg font-medium text-gray-900">
              Create Section
            </div>
          </header>

          <form onSubmit={submit}>
            <div className="mt-4 max-w-xl">
              <InputLabel
                className="mt-1"
                htmlFor="academic_level_id"
                value="Academic Level"
              />

              <AcademicLevelSelect
                onSelect={(option) =>
                  setData("academic_level_id", option.value)
                }
              />

              <InputError message={errors.academic_level_id} className="mt-2" />
            </div>

            <div className="mt-4 max-w-xl">
              <InputLabel htmlFor="name" value="Section Name" />

              <TextInput
                id="name"
                name="name"
                value={data.name}
                className="mt-1 block w-full"
                isFocused
                onChange={(e) => setData("name", e.target.value)}
                required
              />

              <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="mt-4 flex items-center gap-4">
              <PrimaryButton disabled={processing}>Create</PrimaryButton>

              <Transition
                show={recentlySuccessful}
                enterFrom="opacity-0"
                leaveTo="opacity-0"
                className="transition ease-in-out"
              >
                <p className="text-sm text-gray-600">
                  Section has been created.
                </p>
              </Transition>
            </div>
          </form>
        </Card>
      </Container>
    </AdminLayout>
  );
}
