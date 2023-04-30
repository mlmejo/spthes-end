import Sidebar from "@/Components/Sidebar";
import AuthenticatedLayout from "./AuthenticatedLayout";
import { HomeIcon } from "@heroicons/react/20/solid";

export default function StudentLayout({ user, children }) {
  return (
    <AuthenticatedLayout user={user}>
      <div className="flex">
        <Sidebar role="Student">
          <Sidebar.Item
            href={route("enrollments.index")}
            active={route().current("enrollments.*")}
            icon={HomeIcon}
          >
            Dashboard
          </Sidebar.Item>
        </Sidebar>
        <div className="mt-16 w-full md:ml-64">{children}</div>
      </div>
    </AuthenticatedLayout>
  );
}
