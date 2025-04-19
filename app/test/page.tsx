import { withAuth } from "@/serverhooks/withAuth";
import { WithAuthProps } from "@/utils/types";

function Page({ user, userData }: WithAuthProps) {
  return <h1>{user?.user_metadata.name}</h1>;
}

export default withAuth(Page);
