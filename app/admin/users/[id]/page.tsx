import { getUserById } from "@/lib/actions/user.actions";
import { requireAdmin } from "@/lib/auth-guard";
import { notFound } from "next/navigation";
import UpdateUserForm from "./update-user-form";

const AdminUserUpdatePage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  await requireAdmin();

  const { id } = await props.params;
  const user = await getUserById(id);
  if (!user) notFound();

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <h1 className="h2-bold">Update User</h1>
      <UpdateUserForm user={user} />
    </div>
  );
};

export default AdminUserUpdatePage;
