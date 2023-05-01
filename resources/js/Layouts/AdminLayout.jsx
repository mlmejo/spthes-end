import Sidebar from "@/Components/Sidebar";
import {
  BuildingOfficeIcon,
  CircleStackIcon,
  HomeIcon,
  PencilSquareIcon,
  UserGroupIcon,
  ArrowPathIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/20/solid";
import AuthenticatedLayout from "./AuthenticatedLayout";

export default function AdminLayout({ user, children }) {
  return (
    <AuthenticatedLayout user={user}>
      <div className="flex">
        <Sidebar role="Administrator">
          <Sidebar.Item
            href={route("dashboard")}
            active={route().current("dashboard")}
            icon={HomeIcon}
          >
            Dashboard
          </Sidebar.Item>

          <Sidebar.Collapse icon={CircleStackIcon} label="Data">
            <Sidebar.Item
              href={route("students.index")}
              active={
                route().current("students.index") ||
                route().current("teachers.index") ||
                route().current("students.edit") ||
                route().current("teachers.edit")
              }
              icon={UserGroupIcon}
            >
              Accounts
            </Sidebar.Item>

            <Sidebar.Item
              href={route("sections.index")}
              active={
                route().current("sections.index") ||
                route().current("sections.edit")
              }
              icon={BuildingOfficeIcon}
            >
              Sections
            </Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Collapse icon={PencilSquareIcon} label="Create">
            <Sidebar.Item
              href={route("students.create")}
              active={
                route().current("students.create") ||
                route().current("teachers.create")
              }
              icon={UserGroupIcon}
            >
              Accounts
            </Sidebar.Item>

            <Sidebar.Item
              href={route("sections.create")}
              active={route().current("sections.create")}
              icon={BuildingOfficeIcon}
            >
              Sections
            </Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Item
            href={route("admin.csv-import")}
            active={route().current("admin.csv-import")}
            icon={DocumentArrowUpIcon}
          >
            Import CSV
          </Sidebar.Item>
        </Sidebar>

        <div className="mt-16 w-full overflow-hidden md:ml-64">{children}</div>
      </div>
    </AuthenticatedLayout>
  );
}
