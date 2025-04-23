import { Skeleton } from "../ui/skeleton";

export default function CreditsLoading() {
  return (
    <main>
      <header className="py-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-[0.875rem] w-1/2 rounded-md" />
          <Skeleton className="h-8 w-5/12 rounded-lg" />
        </div>

        <Skeleton className="h-9 w-1/4 rounded-md" />
      </header>

      <section>
        <Skeleton className="w-full h-[250px] aspect-auto rounded-xl" />
      </section>
    </main>
  );
}
