"use client";

import { ComponentProps } from "react";
import { Button } from "../ui/button";
import { CourseJSON } from "@/utils/types";

type PillButtonProps = ComponentProps<typeof Button> & {
  currentValue: string;
  filterType?: "subject" | "level" | "term" | "default";
};

/**
 * Pill button component
 *
 * @remarks
 * This component renders a button that changes its appearance based on the current value.
 * It highlights the selected button with a different style.
 *
 * @param currentValue - The currently selected value used to determine the active button
 * @param filterType - Optional prop to specify button style type (subject/level/term)
 * @param props - Additional button props such as `value` and `id` passed down from the parent component
 *
 * @returns Returns a styled pill button with a hover effect and active state
 */

export function PillButton({ currentValue, filterType = "default", ...props }: PillButtonProps) {
  const baseClasses = "border-1 px-4 py-1.5 rounded-2xl font-semibold text-sm transition duration-200 ease-in-out cursor-pointer";
  
  const typeClasses = {
    subject: {
      base: "hover:text-primary hover:border-primary",
      active: "text-primary border-primary bg-highlight dark:text-foreground"
    },
    level: {
      base: "hover:text-green-600 hover:border-green-600",
      active: "text-green-600 border-green-600 bg-green-100 dark:bg-green-900/30 dark:text-foreground"
    },
    term: {
      base: "hover:text-blue-600 hover:border-blue-600",
      active: "text-blue-600 border-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-foreground"
    },
    default: {
      base: "hover:text-blue-900 hover:border-blue-900",
      active: "text-blue-900 border-blue-900 bg-highlight dark:text-foreground"
    }
  };

  return (
    <button
      className={`${baseClasses} ${typeClasses[filterType].base} 
                  ${props.value === currentValue ? typeClasses[filterType].active : "text-foreground dark:border-muted bg-accent"}`}
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
  showAllFilters = false 
}: PillButtonContainerProps) {
  return (
    <div className="my-4 flex flex-wrap gap-2">
      {showAllFilters && (
        <>

          <PillButton 
            id="Alla terminer" 
            value="Alla" 
            currentValue={selected} 
            onClick={() => setSelected("Alla")}
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
            filterType="level"
          />
          <PillButton 
            id="Grundnivå" 
            value="Grund" 
            currentValue={selected} 
            onClick={() => setSelected("Grund")}
            filterType="level"
          />
          
    
          <PillButton 
            id="Datateknik" 
            value="Datateknik" 
            currentValue={selected} 
            onClick={() => setSelected("Datateknik")}
            filterType="subject"
          />
          <PillButton 
            id="Medieteknik" 
            value="Medieteknik" 
            currentValue={selected} 
            onClick={() => setSelected("Medieteknik")}
            filterType="subject"
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
          />
          <PillButton 
            id="Oavklarade" 
            value="Oavklarade" 
            currentValue={selected} 
            onClick={() => setSelected("Oavklarade")}
          />
          <PillButton 
            id="Avklarade" 
            value="Avklarade" 
            currentValue={selected} 
            onClick={() => setSelected("Avklarade")}
          />
          {Array.from(mainSubjects.keys()).map((subject: string) => (
            <PillButton 
              key={subject} 
              id={subject} 
              value={subject} 
              currentValue={selected} 
              onClick={() => setSelected(subject)}
              filterType="subject"
            />
          ))}
        </>
      )}
    </div>
  );
}