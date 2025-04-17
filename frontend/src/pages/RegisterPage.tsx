import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { NotebookPen } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import schema from "@/models/registerSchema";
import { axiosInstance } from "@/services/Apiclient";
import { DepartmentSelect } from "@/components/DepartmentSelect";

type FormData = z.infer<typeof schema>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // file error msg

  const onSubmit = async (data: FormData) => {
    try {
      // Create a FormData object
      const formData = new FormData();

      // Append form fields
      formData.append("user_type", "student"); // Assuming user_type is always "student"
      formData.append("fName", data.fName);
      formData.append("lName", data.lName);
      formData.append("gender", data.gender);
      formData.append("enDate", data.enDate);
      formData.append("grDate", data.grDate);
      formData.append("email", data.stEmail);
      formData.append("password", data.password);

      // Append the file (profile picture)
      const fileInput = document.querySelector<HTMLInputElement>("#pp");

      if (fileInput?.files?.[0]) {
        formData.append("profilePic", fileInput.files[0]);
      }

      // Send the POST request using axios
      const response = await axiosInstance.post(`/students`, formData);

      // Handle the response
      console.log("Response from backend:", response.data);

      if (response.data.status === "success") {
        alert("Registration successful!");
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred. Please try again.");
    }
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

        {/* INPUTS */}
        <div className="space-y-4 px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-2 gap-y-3">
            {/* FNAME LNAME */}
            <div className="md:pr-3">
              <Label htmlFor="fName">First Name *</Label>
              <Input
                id="fName"
                className={cn("p-5", errors.fName && "border-red-400")}
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
                className={cn("p-5", errors.lName && "border-red-400")}
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
            <div className="flex items-center gap-3">
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
            <Label>Department</Label>
            <DepartmentSelect />
          </div>

          {/* DATES */}
          <div className="-mt-2 grid w-full grid-cols-1 gap-1">
            <div className="my-3 flex flex-1 flex-col items-start justify-center">
              <Label htmlFor="enD">Enrolled Date *</Label>
              <Input type="date" className="w-max" {...register("enDate")} />
              {errors.enDate && (
                <p className="py-2 text-xs text-red-400">
                  {errors.enDate.message}
                </p>
              )}
            </div>
            <div className="flex flex-1 flex-col items-start justify-center">
              <Label htmlFor="grD">Graduation Date *</Label>
              <Input type="date" className="w-max" {...register("grDate")} />
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
              className={cn("p-5", errors.stEmail && "border-red-400")}
              {...register("stEmail")}
              type="email"
              placeholder="abebe.beso@aastustudent.edu.et"
            />
            {errors.stEmail && (
              <p className="py-2 text-xs text-red-400">
                {errors.stEmail.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="w-full">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              className={cn("p-5", errors.password && "border-red-400")}
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
          <div className="flex flex-col sm:items-start">
            <Label htmlFor="pp">Profile Pic</Label>
            <input
              id="pp"
              className="w-full cursor-pointer rounded bg-[url(@/assets/Forms/choose.svg)] bg-cover bg-center bg-no-repeat px-2 py-14 text-xs text-purple-600 shadow-xs ring-1 ring-[#e5e5e5]"
              type="file"
              accept="image/*"
              name="pp"
            />
          </div>
        </div>

        {/* FORGOT PASSWORD */}
        <div className="text-xs">
          <p>
            Forgot your password?{" "}
            <a href="#" className="text-blue-400 hover:underline">
              click here
            </a>
          </p>
        </div>

        {/* BTN */}
        <Button
          className={cn(
            "w-[60%] cursor-pointer bg-[#7D7ADA] py-6 text-lg font-[600] hover:bg-[#5c5bb9] md:w-[30%]",
          )}
        >
          Log In
        </Button>
        <div className="text-xs">
          <p>
            Doesn't have an account?{" "}
            <a href="#" className="text-blue-400 hover:underline">
              click here
            </a>
          </p>
        </div>

        <p className="py-2 text-xs text-red-400"></p>
      </form>
    </div>
  );
};

export default RegisterPage;
