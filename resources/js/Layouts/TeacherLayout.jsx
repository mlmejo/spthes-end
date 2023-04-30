import Sidebar from "@/Components/Sidebar";
import {
  BuildingOfficeIcon,
  CircleStackIcon,
  HomeIcon,
} from "@heroicons/react/20/solid";
import AuthenticatedLayout from "./AuthenticatedLayout";

export default function Teacher({ user, children }) {
  return (
    <AuthenticatedLayout user={user}>
      <div className="flex">
        <Sidebar role="Teacher">
          <Sidebar.Item
            href={route("dashboard")}
            active={route().current("dashboard")}
            icon={HomeIcon}
          >
            Dashboard
          </Sidebar.Item>

          <Sidebar.Collapse icon={CircleStackIcon} label="Records Data">
            <Sidebar.Item
              href={route("enrollments.index")}
              active={route().current("enrollments.*")}
              icon={BuildingOfficeIcon}
            >
              Sections
            </Sidebar.Item>
          </Sidebar.Collapse>
        </Sidebar>
        <div className="mt-16 w-full md:ml-64">{children}</div>
      </div>
    </AuthenticatedLayout>
  );
}
