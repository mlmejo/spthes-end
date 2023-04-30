import AcademicLevelSelect from "@/Components/AcademicLevelSelect";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import SectionContext from "@/Contexts/Section";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useContext } from "react";

export default function UpdateSectionInformationForm() {
  const section = useContext(SectionContext);

  const { data, setData, patch, processing, errors, recentlySuccessful } =
    useForm({
      name: section.name,
      academic_level_id: section.academic_level.id,
    });

  const submit = (e) => {
    e.preventDefault();

    patch(route("sections.update", section.id), {
      preserveScroll: true,
    });
  };

  return (
    <section>
      <h2 className="mb-4 text-lg font-medium text-gray-900">
        Update Section Information
      </h2>

      <form onSubmit={submit}>
        <div className="mt-4 max-w-xl">
          <InputLabel
            className="mt-1"
            htmlFor="academic_level_id"
            value="Academic Level"
          />

          <AcademicLevelSelect
            value={{
              label: section.academic_level.name,
              value: section.academic_level.id,
            }}
            onSelect={(value) => setData("academic_level_id", value)}
          />

          <InputError message={errors.academic_level_id} className="mt-2" />
        </div>

        <div className="mt-4 max-w-xl">
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            name="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
            isFocused
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div className="mt-4 flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
          >
            <p className="text-sm text-gray-600">Section has been updated.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
