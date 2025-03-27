import { UploadPDFInput } from "@/components/form/uploadpdf";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Page() {
  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold">Redigera kurser och moment.</h1>
      </header>
      <main className="w-full mt-4">
        <section className="mt-4 w-full flex gap-12">
          <div className="flex flex-col flex-1 gap-4">
            <Select disabled>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Linköpings universitet"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Universitet</SelectLabel>
                  <SelectItem value="Linköpings universitet">Linköpings universitet</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex w-full gap-4">
              <Select disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Civilingenjör i medieteknik"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Program/utbildning</SelectLabel>
                    <SelectItem value="Civilingenjör i medieteknik">Civilingenjör i medieteknik</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="HT 2022"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Antagningstillfälle</SelectLabel>
                    <SelectItem value="HT 2022">HT 2022</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <h2 className="text-2xl font-semibold">Meritvärde</h2>
          </div>

          <div className="w-full flex-1 sticky">
            <form>
              <UploadPDFInput />
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
