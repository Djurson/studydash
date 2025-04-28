import UserInfo from "@/components/card/userInfo";
import { ThemeSwitcher } from "@/components/supabase-template/theme-switcher";
import { withAuth } from "@/serverhooks/withAuth";
import { WithAuthProps } from "@/utils/types";

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
        <div className="border border-muted-foreground rounded-2xl p-20 flex">
          <div>
            <p>Namn</p>
            <p></p>
          </div>
          <div>
            <p>Efternamn</p>
          </div>
          <div>
            <p>Email</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default withAuth(Page);
