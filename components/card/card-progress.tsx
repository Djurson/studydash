"use client";

import Card from "@/components/card/card";
import { Progress } from "@/components/ui/progress";
import { Pie, PieChart } from "recharts";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

interface Inputs {
  startyear: number;
  hp: number;
  year: string;
}

interface Data {
  name: string;
  value: number;
  fill: string;
}

const ClientSidePieChart = ({ data }: { data: Data[] }) => {
  return (
    <PieChart width={50} height={50}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={16} outerRadius={22} strokeWidth={4} stroke="none" />
    </PieChart>
  );
};

export default function CardProgress({ startyear, hp, year }: Inputs) {
  const [isClient, setIsClient] = useState(false);

  let progress = 0;
  let completed = false;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (year == "1") {
    if (hp >= 37) {
      completed = true;
      progress = 100;
    } else {
      progress = (hp / 37) * 100;
    }
  }
  if (hp >= 45) {
    completed = true;
    progress = 100;
  } else {
    progress = Math.round((hp / 45) * 100);
  }
  const data: Data[] = [
    { name: "Completed", value: progress, fill: "#0071e3" },
    { name: "Remaining", value: 100 - progress, fill: "#6e6e73" },
  ];

  if (completed == true) {
    return (
      <>
        <div className=" border-2 border-green-900 rounded-2xl row-span-1, col-span-1">
          <Card variant="no-header" cardTitle="">
            <div className="flex items-center justify-between">
              <div className="w-50">
                <h2 className="text-xl font-semibold">{"Årskurs " + year}</h2>
                <p className="text-gray-600">{startyear + " - " + [startyear + 1]}</p>
              </div>
              <div className="w-3/4 flex items-center justify between">
                <div className="pr-2 w-50px h-50px">
                  <div className="flex justify-center bg-green-900 rounded-full p-3 ">
                    <Check style={{ color: "white" }} />
                  </div>
                </div>
                <div className="w-full">
                  <div className="w-full flex items-center">
                    <h3 className="font-bold pr-2">{progress + "%"}</h3>
                    <p className="text-gray-600">
                      Uppfyllt ({hp}/{year == "1" ? "37" : "45"})
                    </p>
                  </div>
                  <div className="w-[40vw]">
                    <Progress value={progress} color="bg-green-900" className="mt-4" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="row-span-1, col-span-1">
          <Card variant="no-header" cardTitle="">
            <div className="flex items-center justify-between">
              <div className="w-50">
                <h2 className="text-xl font-semibold">{"Årskurs " + year}</h2>
                <p className="text-gray-600">{startyear + " - " + [startyear + 1]}</p>
              </div>
              <div className="w-3/4 flex items-center justify between">
                <div className="flex justify-center pr-2">
                  {isClient ? (
                    <ClientSidePieChart data={data} />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full border-4 border-gray-200"></div>
                    </div>
                  )}
                </div>
                <div className="w-full flex-row justify-center">
                  <div className="w-full flex items-center">
                    <h3 className="font-bold pr-2">{progress + "%"}</h3>
                    <p className="text-gray-600">
                      Uppfyllt ({hp}/{year == "1" ? "37" : "45"})
                    </p>
                  </div>
                  <div className="w-[40vw]">
                    <Progress value={progress} color="bg-blue-900" className="mt-4" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </>
    );
  }
}
