import { DepartmentSelect } from "@/components/Student/DepartmentSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import schema from "@/models/registerSchema";
import { useAuth } from "@/providers/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Loader, NotebookPen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ImageInput from "../ImageInput";

export type FormData = z.infer<typeof schema>;

const StudentForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [dept, setDept] = useState<number | undefined>();

  const { registerStudent, fetchState } = useAuth();

  const onSubmit = async (data: FormData) => {
    registerStudent(data);
  };

  return (
    <div className="flex max-h-max min-h-[80vh] items-center justify-center px-[20px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative container flex flex-col items-center justify-center gap-5 rounded-2xl bg-white py-[50px] shadow-2xl md:w-[90%] xl:w-[50%]"
      >
        {/* ICON */}
        <NotebookPen
          size={30}
          className="absolute top-6 left-6 text-[#7d7ada]"
        />

        {/* HEADER */}
        <h1 className="mb-6 font-[DM_Serif_Text] text-3xl md:text-5xl">
          Register
        </h1>

        <p className="-mt-8 font-[Dm_Sans] text-xs text-[#7D7ADA]">Student</p>

        {/* INPUTS */}
        <div className="space-y-4 px-12">
          <div className="grid grid-cols-1 items-center gap-x-2 gap-y-3 md:grid-cols-2">
            {/* FNAME LNAME */}
            <div className="md:pr-3">
              <Label htmlFor="fName">First Name *</Label>
              <Input
                id="fName"
                className={cn("mt-2 p-5", errors.fName && "border-red-400")}
                type="text"
                {...register("fName")}
                placeholder="Abbé"
              />
              {errors.fName && (
                <p className="py-2 text-xs text-red-400">
                  {errors.fName.message}
                </p>
              )}
            </div>
            <div className="">
              <Label htmlFor="lName">Last Name *</Label>
              <Input
                id="lName"
                {...register("lName")}
                type="text"
                className={cn("mt-2 p-5", errors.lName && "border-red-400")}
                placeholder="Doha"
              />
              {errors.lName && (
                <p className="py-2 text-xs text-red-400">
                  {errors.lName.message}
                </p>
              )}
            </div>
          </div>

          {/* GENDER */}
          <div>
            <Label htmlFor="male">Gender *</Label>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-md bg-[#F8F7FF] p-2">
                <input
                  type="radio"
                  {...register("gender")}
                  value="male"
                  id="male"
                />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-[#F8F7FF] p-2">
                <input
                  type="radio"
                  {...register("gender")}
                  value="female"
                  id="female"
                />
                <Label htmlFor="female">Female</Label>
              </div>
            </div>
            {errors.gender && (
              <p className="py-2 text-xs text-red-400">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* DEPARTMENT */}
          <div className="flex flex-col">
            <Label className="mb-2">Department</Label>
            <input
              type="number"
              className="[display:none]"
              {...register("dept")}
            />
            <DepartmentSelect
              value={dept}
              setValue={setDept}
              setDept={setValue}
            />
            {errors.dept && (
              <p className="py-2 text-xs text-red-400">{errors.dept.message}</p>
            )}
          </div>

          {/* DATES */}
          <div className="grid w-full grid-cols-1 gap-1">
            <div className="flex flex-1 flex-col items-start justify-center">
              <Label htmlFor="grD">Graduation Date *</Label>
              <Input
                type="date"
                className="mt-2 w-max"
                {...register("grDate")}
              />
              {errors.grDate && (
                <p className="py-2 text-xs text-red-400">
                  {errors.grDate.message}
                </p>
              )}
            </div>
          </div>

          {/* STUDENT EMAIL */}
          <div className="w-full">
            <Label htmlFor="sEmail">Student Email *</Label>
            <Input
              id="sEmail"
              className={cn("mt-2 p-5", errors.email && "border-red-400")}
              {...register("email")}
              type="email"
              placeholder="abebe.beso@aastustudent.edu.et"
            />
            {errors.email && (
              <p className="py-2 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="w-full">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              className={cn("mt-2 p-5", errors.password && "border-red-400")}
              {...register("password")}
              type="password"
              placeholder="*******"
            />
            {errors.password && (
              <p className="py-2 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* PROFILE PICTURE */}
          <ImageInput id="pp" labelName="Profile Image" />

          <div className="w-full">
            <Label htmlFor="consent">Consent *</Label>
            <div className="mt-2 flex items-center gap-3">
              <input
                id="consent"
                className={cn("size-6", errors.consent && "border-red-400")}
                {...register("consent")}
                type="checkbox"
              />
              <Label htmlFor="consent" className="cursor-pointer text-xs">
                I agree to be a part of these community and take any
                responsibilities for my actions.
              </Label>
            </div>
            {errors.consent && (
              <p className="py-2 text-xs text-red-400">
                {errors.consent.message}
              </p>
            )}
          </div>
        </div>

        {/* BTN */}
        <Button
          className={cn(
            "w-[60%] cursor-pointer bg-[#7D7ADA] py-6 text-lg font-[600] hover:bg-[#5c5bb9] md:w-[30%]",
          )}
          disabled={fetchState === "registering"}
        >
          {fetchState == "ready" ? (
            "Register"
          ) : (
            <>
              <div className="animate-spin">
                <Loader />
              </div>
              Registering
            </>
          )}
        </Button>

        <div className="text-xs">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              click here
            </a>
          </p>
        </div>

        <p className="py-2 text-xs text-red-400"></p>
      </form>
    </div>
  );
};

export default StudentForm;
