"use client";

import { ComponentProps } from "react";
import { Button } from "../ui/button";
import { CourseJSON } from "@/utils/types";

type PillButtonProps = ComponentProps<typeof Button> & {
  currentValue: string;
  filterType?: "term";
};

export function PillButton({
  currentValue,
  filterType = "term",
  ...props
}: PillButtonProps) {
  const baseClasses =
    "border-1 px-4 py-1.5 rounded-2xl font-semibold text-sm transition duration-200 ease-in-out cursor-pointer";

  const typeClasses = {
    term: {
      base: "hover:text-blue-600 hover:border-blue-600",
      active:
        "text-blue-600 border-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-foreground",
    },
  };

  return (
    <button
      className={`${baseClasses} ${typeClasses[filterType].base} ${
        props.value === currentValue
          ? typeClasses[filterType].active
          : "text-foreground dark:border-muted bg-accent"
      }`}
      {...props}
    >
      {props.id}
    </button>
  );
}

type PillButtonContainerProps = {
  mainSubjects?: Map<string, CourseJSON[]>;
  selected: string;
  setSelected: (filter: string) => void;
  showAllFilters?: boolean;
};

export function PillbuttonContainer({
  mainSubjects,
  selected,
  setSelected,
  showAllFilters = false,
}: PillButtonContainerProps) {
  return (
    <div className="my-4 flex flex-wrap gap-2">
      {showAllFilters && (
        <>
          <PillButton
            id="Alla Kurser"
            value="Alla"
            currentValue={selected}
            onClick={() => setSelected("Alla")}
            filterType="term"
          />
          <PillButton
            id="Termin 7"
            value="termin7"
            currentValue={selected}
            onClick={() => setSelected("termin7")}
            filterType="term"
          />
          <PillButton
            id="Termin 8"
            value="termin8"
            currentValue={selected}
            onClick={() => setSelected("termin8")}
            filterType="term"
          />
          <PillButton
            id="Termin 9"
            value="termin9"
            currentValue={selected}
            onClick={() => setSelected("termin9")}
            filterType="term"
          />
          <PillButton
            id="Avancerad nivå"
            value="Avancerad"
            currentValue={selected}
            onClick={() => setSelected("Avancerad")}
            filterType="term"
          />
          <PillButton
            id="Grundnivå"
            value="Grund"
            currentValue={selected}
            onClick={() => setSelected("Grund")}
            filterType="term"
          />
          <PillButton
            id="Datateknik"
            value="Datateknik"
            currentValue={selected}
            onClick={() => setSelected("Datateknik")}
            filterType="term"
          />
          <PillButton
            id="Medieteknik"
            value="Medieteknik"
            currentValue={selected}
            onClick={() => setSelected("Medieteknik")}
            filterType="term"
          />
        </>
      )}

      {mainSubjects && (
        <>
          <PillButton
            id="Alla"
            value="Alla"
            currentValue={selected}
            onClick={() => setSelected("Alla")}
            filterType="term"
          />
          <PillButton
            id="Oavklarade"
            value="Oavklarade"
            currentValue={selected}
            onClick={() => setSelected("Oavklarade")}
            filterType="term"
          />
          <PillButton
            id="Avklarade"
            value="Avklarade"
            currentValue={selected}
            onClick={() => setSelected("Avklarade")}
            filterType="term"
          />
          {Array.from(mainSubjects.keys()).map((subject: string) => (
            <PillButton
              key={subject}
              id={subject}
              value={subject}
              currentValue={selected}
              onClick={() => setSelected(subject)}
              filterType="term"
            />
          ))}
        </>
      )}
    </div>
  );
}
