"use client";

import { ComponentProps, useState } from "react";
import { Button } from "../ui/button";
import { CourseJSON } from "@/utils/types";
import { ChevronDown, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";

type FilterType = {
  type: 'term' | 'area' | 'level';
  value: string;
  label: string;
};

type PillButtonProps = ComponentProps<typeof Button> & {
  currentValue?: string;
  hasDropdown?: boolean;
  active?: boolean;
  id?: string;
};

export function PillButton({
  hasDropdown = false,
  active = false,
  id,
  currentValue,
  ...props
}: PillButtonProps) {
  const baseClasses = "border-1 px-4 py-1.5 rounded-2xl font-semibold text-sm transition-all duration-200 ease-in-out cursor-pointer flex items-center min-w-[100px] justify-center";
  
  // Determine if this button should be active based on currentValue or active prop
  const isActive = active || (currentValue && id === currentValue);
  
  return (
    <button
      className={`${baseClasses} hover:text-blue-600 hover:border-blue-600
                  ${isActive ? 'text-blue-600 border-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-foreground' : 'text-foreground dark:border-muted bg-accent'}`}
      {...props}
    >
      <span className="flex items-center whitespace-nowrap">
        {id}
        {hasDropdown && <ChevronDown className="ml-1 h-4 w-4 transition-transform" />}
      </span>
    </button>
  );
}

type PillButtonContainerProps = {
  mainSubjects?: Map<string, CourseJSON[]>;
  selectedFilters?: FilterType[];
  setSelectedFilters?: (filters: FilterType[]) => void;
  variant?: "default" | "course-filter";
};

export function PillbuttonContainer({ 
  mainSubjects, 
  selectedFilters = [],
  setSelectedFilters,
  variant = "default"
}: PillButtonContainerProps) {
  const [legacySelected, setLegacySelected] = useState("Alla");
  
  const toggleFilter = (filter: FilterType) => {
    if (!setSelectedFilters) return;
    
    const exists = selectedFilters.some(f => 
      f.type === filter.type && f.value === filter.value
    );
    
    if (exists) {
      setSelectedFilters(selectedFilters.filter(f => 
        !(f.type === filter.type && f.value === filter.value)
      ));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const filterOptions = {
    term: [
      { value: "termin7", label: "Termin 7" },
      { value: "termin8", label: "Termin 8" },
      { value: "termin9", label: "Termin 9" }
    ],
    area: [
      { value: "Datateknik", label: "Datateknik" },
      { value: "Medieteknik", label: "Medieteknik" }
    ],
    level: [
      { value: "Avancerad", label: "Avancerad" },
      { value: "Grund", label: "Grund" }
    ]
  };

  if (variant === "course-filter") {
    return (
      <div className="space-y-3 my-4">
        {selectedFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Aktiva filter:</span>
            {selectedFilters.map((filter, index) => (
              <Badge 
                key={index}
                variant="outline"
                className="px-3 py-1 text-sm flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30"
              >
                {filter.label}
                <button 
                  onClick={() => toggleFilter(filter)}
                  className="ml-1 rounded-full p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800/50"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <button 
              onClick={() => setSelectedFilters?.([])}
              className="text-sm text-blue-600 hover:underline ml-2"
            >
              Rensa alla
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {Object.entries(filterOptions).map(([type, options]) => (
            <div key={type} className="relative">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <div>
                    <PillButton
                      id={type === 'term' ? 'Termin' : type === 'area' ? 'Område' : 'Nivå'}
                      hasDropdown
                      active={selectedFilters.some(f => f.type === type)}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="min-w-[120px]"
                  sideOffset={5}
                  align="start"
                  avoidCollisions={true}
                  collisionPadding={10}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  {options.map(option => {
                    const isActive = selectedFilters.some(
                      f => f.type === type && f.value === option.value
                    );
                    return (
                      <DropdownMenuItem 
                        key={option.value}
                        onSelect={() => toggleFilter({
                          type: type as 'term' | 'area' | 'level',
                          value: option.value,
                          label: option.label
                        })}
                        className={`cursor-pointer ${isActive ? 'bg-blue-100 dark:bg-blue-900/30' : ''}`}
                      >
                        <span className="flex items-center gap-2">
                          {isActive && (
                            <span className="w-2 h-2 rounded-full bg-blue-600" />
                          )}
                          {option.label}
                        </span>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-4 flex gap-4">
      <PillButton 
        id={"Alla"} 
        value={"Alla"} 
        currentValue={legacySelected} 
        onClick={() => setLegacySelected("Alla")} 
      />
      <PillButton 
        id={"Oavklarade"} 
        value={"Oavklarade"} 
        currentValue={legacySelected} 
        onClick={() => setLegacySelected("Oavklarade")} 
      />
      <PillButton 
        id={"Avklarade"} 
        value={"Avklarade"} 
        currentValue={legacySelected} 
        onClick={() => setLegacySelected("Avklarade")} 
      />
      {mainSubjects && Array.from(mainSubjects.keys()).map((subject: string) => (
        <PillButton 
          key={subject} 
          id={subject} 
          value={subject} 
          currentValue={legacySelected} 
          onClick={() => setLegacySelected(subject)} 
        />
      ))}
    </div>
  );
}