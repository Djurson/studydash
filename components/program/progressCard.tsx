"use server";

import { Progress } from "@/components/ui/progress";
import { WithAuthProps, Examination, Program, Course } from "@/utils/types";
import LiuImg from "@/assets/liu.png";
import { ExternalLink } from "lucide-react";

export async function ProgressCard({ userData, url, credits }: Partial<WithAuthProps> & Partial<Program>) {
  const merits = GetMerits(userData?.studyinfo);
  const totalMerits = Number.parseInt(credits?.slice(0, 3) ?? "300");
  const progress = merits / totalMerits;
  const percentage = progress * 100;
  return (
    <main className="flex flex-col gap-2">
      <div className="flex items-center">
        <img src={LiuImg.src} alt="" className="h-[4.25rem] dark:grayscale-100 dark:invert" />
        <a href={url} target="_blank" className="ml-4">
          <p className="text-sm font-semibold text-gray-600">{credits}</p>
          <div className="flex items-center gap-2 hover:underline">
            <h2 className="text-2xl font-semibold">{userData?.program}.</h2>
            <ExternalLink />
          </div>
        </a>
      </div>
      <div className="flex flex-col gap-2">
        <Progress value={percentage} className="w-[100%] h-4" color="bg-blue-900" />
        <p className="text-sm font-light text-muted">
          {percentage.toFixed(1)}% avklarad | {merits}/{totalMerits} hp
        </p>
      </div>
    </main>
  );
}

function GetMerits(map: Map<string, Course> | undefined): number {
  if (!map) {
    return 0;
  }

  let merits = 0;

  for (const course_code of map.keys()) {
    const course = map.get(course_code);

    if (!course) {
      continue;
    }

    if (course.grade !== "") {
      merits += course.hp;
      continue;
    }

    for (const exam_code of course.examinations.keys()) {
      const exam = course.examinations.get(exam_code);

      if (!exam) {
        continue;
      }

      if (exam.grade !== "") {
        merits += exam.hp;
        continue;
      }
    }
  }
  return merits;
}
