import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function RegisterAdmin() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "Administrator",
    email: "admin@example.com",
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

    post(route("register.admin"));
  };

  return (
    <GuestLayout>
      <Head title="Administrator Registration" />

      <p className="mb-4 text-gray-800">
        Create an administrator account to continue.
      </p>
      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            onChange={handleChange}
            isFocused
            required
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div className="mt-4">
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

        <div className="mt-4">
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

        <div className="mt-4">
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

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <PrimaryButton type="submit" className="mt-4" disabled={processing}>
          Register
        </PrimaryButton>
      </form>
    </GuestLayout>
  );
}
