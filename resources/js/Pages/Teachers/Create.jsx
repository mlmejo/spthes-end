import Card from "@/Components/Card";
import Container from "@/Components/Container";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Create({ auth }) {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } =
    useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("teachers.store"));
  };

  return (
    <AdminLayout user={auth.user}>
      <Head title="Create Teacher Account" />

      <Container>
        <Card>
          <header>
            <div className="mb-4 border-b border-gray-200 text-center text-sm font-medium text-gray-800">
              <ul className="-mb-px flex flex-wrap">
                <li className="mr-2">
                  <a
                    href={route("students.create")}
                    className="inline-block rounded-t-lg border-b-2 border-transparent p-2 hover:border-indigo-300 hover:text-indigo-600"
                  >
                    Students
                  </a>
                </li>
                <li className="mr-2">
                  <a
                    href={route("teachers.create")}
                    className="inline-block rounded-t-lg border-b-2 border-indigo-300 border-transparent p-2 text-indigo-600 hover:border-indigo-300 hover:text-indigo-600"
                  >
                    Teachers
                  </a>
                </li>
              </ul>
            </div>

            <h2 className="text-lg font-medium text-gray-900">
              Create Teacher Account
            </h2>
          </header>

          <form onSubmit={submit}>
            <div className="mt-4 max-w-xl">
              <InputLabel htmlFor="name" value="Name" />

              <TextInput
                id="name"
                name="name"
                value={data.name}
                className="mt-1 block w-full"
                autoComplete="name"
                isFocused
                onChange={handleChange}
                required
              />

              <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="mt-4 max-w-xl">
              <InputLabel htmlFor="email" value="Email" />

              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                autoComplete="username"
                onChange={handleChange}
                required
              />

              <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="mt-4 max-w-xl">
              <InputLabel htmlFor="password" value="Password" />

              <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                autoComplete="new-password"
                onChange={handleChange}
                required
              />

              <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="mt-4 max-w-xl">
              <InputLabel
                htmlFor="password_confirmation"
                value="Confirm Password"
              />

              <TextInput
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                className="mt-1 block w-full"
                autoComplete="new-password"
                onChange={handleChange}
                required
              />

              <InputError
                message={errors.password_confirmation}
                className="mt-2"
              />
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
                  Account has been created.
                </p>
              </Transition>
            </div>
          </form>
        </Card>
      </Container>
    </AdminLayout>
  );
}
