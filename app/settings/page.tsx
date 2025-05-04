import UserInfo from "@/components/card/userInfo";
import { withAuth } from "@/serverhooks/withAuth";
import { WithAuthProps } from "@/utils/types";
import { Trash } from "lucide-react";

function Page({ user }: WithAuthProps) {
  console.log("user:", user);
  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold">Inställningar.</h1>
        <p>Anpassa dina inställningar så att det passar dig.</p>
      </header>
      <section className="flex flex-col gap-6 mt-6">
        <div className="w-full">
          <h2 className="text-2xl font-semibold">Välj tema</h2>
          <p>Välj vilket tema du vill använda på webbsidan.</p>
          <div className="flex w-full gap-4 p-4">
            <UserInfo />
          </div>
          {/* <ThemeSwitcher /> */}
        </div>
        <div className="">
          <h2 className="text-2xl font-semibold">Konto</h2>
          <p>Här visas din kontoinformation.</p>
        </div>
        <div className="border border-muted-foreground rounded-2xl p-4 ">
          <div className="flex justify-between">
            <div className="rounded-2xl overflow-hidden aspect-square w-20 h-20 flex items-end justify-center">
              <img src={user.user_metadata.avatar_url} alt="profilbild" />
            </div>
            <div>
              <p className="text-muted-foreground font-light">Namn</p>
              <p className="text-lg">{user.user_metadata.name.split(" ")[0]}</p>
            </div>
            <div>
              <p className="text-muted-foreground font-light">Efternamn</p>
              <p className="text-lg">{user.user_metadata.name.split(" ")[1]}</p>
            </div>
            <div>
              <p className="text-muted-foreground font-light">Email</p>
              <p className="text-lg">{user.email}</p>
            </div>
            <div className="w-20 h-20 bg-red-900 flex items-center justify-center rounded-2xl">
              <Trash className=" text-white" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default withAuth(Page);
