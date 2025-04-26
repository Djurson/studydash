import { ThemeSwitcher } from "@/components/supabase-template/theme-switcher";
import { Laptop, Moon, Sun } from "lucide-react";

export default function Page() {
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
            <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-60 h-36 sm:w-64 sm:h-40 rounded-xl overflow-hidden border border-gray-200 shadow-md bg-gray-100 p-2">
                  <div className="h-full rounded-lg p-3 flex flex-col bg-white border border-gray-200">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-300 mx-auto mb-2 sm:mb-3"></div>

                    <div className="h-1.5 sm:h-2 w-1/2 bg-gray-300 mx-auto mb-3 sm:mb-4 rounded-full"></div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="h-2 sm:h-2.5 w-full bg-gray-200 rounded-full"></div>
                      <div className="h-2 sm:h-2.5 w-5/6 bg-gray-200 rounded-full"></div>
                      <div className="h-2 sm:h-2.5 w-full bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <Sun className="w-4 h-4" />
                  <p className="text-sm font-medium">Ljust</p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className="w-60 h-36 sm:w-64 sm:h-40 rounded-xl overflow-hidden border border-gray-700 shadow-md bg-gray-800 p-2">
                  <div className="h-full rounded-lg p-3 flex flex-col bg-gray-900 border border-gray-700">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-600 mx-auto mb-2 sm:mb-3"></div>

                    <div className="h-1.5 sm:h-2 w-1/2 bg-gray-600 mx-auto mb-3 sm:mb-4 rounded-full"></div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="h-2 sm:h-2.5 w-full bg-gray-100 rounded-full"></div>
                      <div className="h-2 sm:h-2.5 w-5/6 bg-gray-100 rounded-full"></div>
                      <div className="h-2 sm:h-2.5 w-full bg-gray-100 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <Moon className="w-4 h-4" />
                  <p className="text-sm font-medium">Mörkt</p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className="relative w-60 h-36 sm:w-64 sm:h-40 rounded-xl overflow-hidden border border-gray-300 shadow-md">
                  <div className="absolute inset-y-0 left-0 w-1/2 bg-white"></div>

                  <div className="absolute inset-y-0 right-0 w-1/2 bg-gray-800"></div>

                  <div
                    className="absolute inset-2 rounded-lg p-3 flex flex-col border border-gray-300 
                bg-[linear-gradient(to_right,theme(colors.white)_50%,theme(colors.gray.800)_50%)]">
                    <div
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mx-auto mb-2 sm:mb-3
                          bg-[linear-gradient(to_right,theme(colors.gray.400)_50%,theme(colors.gray.300)_50%)]"></div>

                    <div
                      className="h-1.5 sm:h-2 w-1/2 mx-auto mb-3 sm:mb-4 rounded-full
                          bg-[linear-gradient(to_right,theme(colors.gray.400)_50%,theme(colors.gray.300)_50%)]"></div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <div
                        className="h-2 sm:h-2.5 w-full rounded-full
                            bg-[linear-gradient(to_right,theme(colors.gray.300)_50%,theme(colors.gray.100)_50%)]"></div>
                      <div
                        className="h-2 sm:h-2.5 w-5/6 rounded-full
                            bg-[linear-gradient(to_right,theme(colors.gray.300)_60%,theme(colors.gray.100)_40%)]"></div>
                      <div
                        className="h-2 sm:h-2.5 w-full rounded-full
                            bg-[linear-gradient(to_right,theme(colors.gray.300)_50%,theme(colors.gray.100)_50%)]"></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <Laptop className="w-4 h-4" />
                  <p className="text-sm font-medium">System</p>
                </div>
              </div>
            </div>
          </div>
          <ThemeSwitcher />
        </div>
        <div className="">
          <h2 className="text-2xl font-semibold">Konto</h2>
          <p>Här visas din kontoinformation.</p>
        </div>
      </section>
    </>
  );
}
