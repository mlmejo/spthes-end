import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TeacherContext from "@/Contexts/Teacher";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useContext } from "react";

export default function UpdateTeacherInformationForm() {
  const teacher = useContext(TeacherContext);

  const { data, setData, patch, processing, errors, recentlySuccessful } =
    useForm({
      name: teacher.user.name,
      email: teacher.user.email,
    });

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    patch(route("teachers.update", teacher.id));
  };

  return (
    <section>
      <header>
        <h2 className="mb-4 text-lg font-medium text-gray-900">
          Update Teacher Information
        </h2>
      </header>

      <form onSubmit={submit}>
        <div className=" max-w-xl">
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            name="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={handleChange}
            required
            isFocused
          />

          <InputError className="mt-2" message={errors.name} />
        </div>

        <div className="mt-4 max-w-xl">
          <InputLabel htmlFor="email" value="Email address" />

          <TextInput
            id="email"
            name="email"
            className="mt-1 block w-full"
            value={data.email}
            onChange={handleChange}
            required
          />

          <InputError className="mt-2" message={errors.email} />
        </div>

        <div className="mt-4 flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
          >
            <p className="text-sm text-gray-600">Account has been updated.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
