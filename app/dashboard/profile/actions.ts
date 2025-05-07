"use server";
import { createClient, User } from "@supabase/supabase-js";

export const DeleteAccountAction = async (user: User) => {
  const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service_role = process.env.NEXT_PUBLIC_SERVICE_ROLE;

  if (!supabase_url || !service_role) {
    console.error("No admin keys");
    return;
  }

  const supabase = await createClient(supabase_url, service_role, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { error: deleteError } = await supabase.from("user-datatable").delete().match({ user_id: user.id });

  if (deleteError) {
    console.error(deleteError);
    return;
  }

  try {
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      console.error(signOutError);
    }
    const { error: deleteAccountError } = await supabase.auth.admin.deleteUser(user.id);

    if (deleteAccountError) {
      console.error(deleteAccountError);
      return;
    }
  } catch (error) {
    console.error(error);
  }
};
