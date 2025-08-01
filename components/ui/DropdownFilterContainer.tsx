"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CourseJSON } from "@/utils/types";

type FilterDropdownProps = {
  label: string;
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
};

function FilterDropdown({ label, options, selected, setSelected }: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{label}: {selected}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        {options.map(option => (
          <DropdownMenuItem key={option} onSelect={() => setSelected(option)}>
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type DropdownFilterContainerProps = {
  mainSubjects?: Map<string, CourseJSON[]>;
  selected: string;
  setSelected: (filter: string) => void;
};

export function DropdownFilterContainer({ mainSubjects, selected, setSelected }: DropdownFilterContainerProps) {
  const [dummy, setDummy] = useState("Alla"); // For controlled updates

  const termOptions = ["Alla Kurser", "Termin 7", "Termin 8", "Termin 9"];
  const levelOptions = ["Avancerad nivå", "Grundnivå"];
  const subjectOptions = ["Datateknik", "Medieteknik", ...(mainSubjects ? Array.from(mainSubjects.keys()) : [])];

  return (
    <div className="flex flex-wrap gap-4 my-4">
      <FilterDropdown label="Termin" options={termOptions} selected={selected} setSelected={setSelected} />
      <FilterDropdown label="Nivå" options={levelOptions} selected={dummy} setSelected={setDummy} />
      <FilterDropdown label="Huvudområde" options={subjectOptions} selected={dummy} setSelected={setDummy} />
    </div>
  );
}
