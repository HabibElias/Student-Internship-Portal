import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, useState } from "react";
import useDepartments from "@/hooks/useDepartments";
import { UseFormSetValue } from "react-hook-form";

interface Props {
  value: number | undefined;
  setValue: Dispatch<React.SetStateAction<number | undefined>>;
  setDept: UseFormSetValue<{
    fName: string;
    lName: string;
    gender: "male" | "female";
    enDate: string;
    grDate: string;
    dept: number;
    email: string;
    password: string;
    consent: boolean;
  }>;
}

export function DepartmentSelect({ value, setDept, setValue }: Props) {
  const { isLoading, departments } = useDepartments();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={isLoading}
          className="justify-between"
        >
          {value
            ? departments.find(
                (department) => department.id.toString() === value.toString(),
              )?.name
            : "Select Department..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 sm:w-[400px]">
        <Command>
          <CommandInput placeholder="Search Department..." />
          <CommandList>
            <CommandEmpty>No Department found.</CommandEmpty>
            <CommandGroup>
              {departments.map((department) => (
                <CommandItem
                  key={department.id}
                  value={department.name}
                  onSelect={(_) => {
                    setValue(
                      department.id === value
                        ? undefined
                        : Number(department.id),
                    );
                    setDept("dept", Number(department.id));
                    setOpen(false);
                  }}
                >
                  {department.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === department.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
