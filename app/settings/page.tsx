"use client";
import { ThemeSwitcher } from "@/components/supabase-template/theme-switcher";
import { Laptop, Moon, Sun, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef, useState, useEffect } from "react";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };
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
              <div className="relative flex flex-col items-center space-y-2">
                {theme === "light" && (
                  <div className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <button
                  onClick={() => handleThemeChange("light")}
                  className={`w-60 h-36 sm:w-64 sm:h-40 rounded-xl overflow-hidden shadow-md bg-gray-100 p-2 ${
                    theme === "light" ? "border-3 border-blue-900" : "border border-gray-200 hover:opacity-60 cursor-pointer"
                  }`}>
                  <div className="h-full rounded-lg p-3 flex flex-col bg-white border border-gray-200">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-300 mx-auto mb-2 sm:mb-3"></div>

                    <div className="h-1.5 sm:h-2 w-1/2 bg-gray-300 mx-auto mb-3 sm:mb-4 rounded-full"></div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="h-2 sm:h-2.5 w-full bg-gray-200 rounded-full"></div>
                      <div className="h-2 sm:h-2.5 w-5/6 bg-gray-200 rounded-full"></div>
                      <div className="h-2 sm:h-2.5 w-full bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </button>

                <div className="flex gap-2 items-center">
                  <Sun className="w-4 h-4" />
                  <p className="text-sm font-medium">Ljust</p>
                </div>
              </div>

              <div className="relative flex flex-col items-center space-y-2">
                {theme === "dark" && (
                  <div className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <button
                  onClick={() => handleThemeChange("dark")}
                  className={`relative w-60 h-36 sm:w-64 sm:h-40 rounded-xl overflow-hidden  shadow-md bg-gray-800 p-2 ${
                    theme === "dark" ? "border-3 border-blue-900" : "border border-gray-700 hover:opacity-60 cursor-pointer"
                  }`}>
                  <div className="h-full rounded-lg p-3 flex flex-col bg-gray-900 border border-gray-700">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-600 mx-auto mb-2 sm:mb-3"></div>

                    <div className="h-1.5 sm:h-2 w-1/2 bg-gray-600 mx-auto mb-3 sm:mb-4 rounded-full"></div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="h-2 sm:h-2.5 w-full bg-gray-100 rounded-full"></div>
                      <div className="h-2 sm:h-2.5 w-5/6 bg-gray-100 rounded-full"></div>
                      <div className="h-2 sm:h-2.5 w-full bg-gray-100 rounded-full"></div>
                    </div>
                  </div>
                </button>

                <div className="flex gap-2 items-center">
                  <Moon className="w-4 h-4" />
                  <p className="text-sm font-medium">Mörkt</p>
                </div>
              </div>

              <div className="relative flex flex-col items-center space-y-2">
                {theme === "system" && (
                  <div className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <button
                  onClick={() => handleThemeChange("system")}
                  className={`relative w-60 h-36 sm:w-64 sm:h-40 rounded-xl overflow-hidden  shadow-md ${
                    theme === "system" ? "border-3 border-blue-900" : "border border-gray-300 hover:opacity-60 cursor-pointer"
                  }`}>
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
                </button>

                <div className="flex gap-2 items-center">
                  <Laptop className="w-4 h-4" />
                  <p className="text-sm font-medium">System</p>
                </div>
              </div>
            </div>
          </div>
          {/* <ThemeSwitcher /> */}
        </div>
        <div className="">
          <h2 className="text-2xl font-semibold">Konto</h2>
          <p>Här visas din kontoinformation.</p>
        </div>
      </section>
    </>
  );
}
