import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CompSchema } from "@/models/registerSchema";
import { axiosInstance } from "@/services/Apiclient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Check, NotebookPen } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Textarea } from "../ui/textarea";

type FormData = z.infer<typeof CompSchema>;

const CompanyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CompSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();

      // Append form fields
      formData.append("user_type", "company"); // Assuming user_type is always "company"
      formData.append("compName", data.compName);
      formData.append("password", data.password);
      formData.append("location", data.location);
      formData.append("description", data.description);
      formData.append("email", data.email);
      formData.append("webLink", data.webLink ?? "");
      formData.append("instagramLink", data.instagramLink ?? "");
      formData.append("facebookLink", data.facebookLink ?? "");

      // Append the file (profile picture)
      const fileInput = document.querySelector<HTMLInputElement>("#cp");

      if (fileInput?.files?.[0]) {
        formData.append("compImg", fileInput.files[0]);
      }

      // Send the POST request using axios
      const response = await axiosInstance.post(`/register`, formData);

      // Handle the response
      console.log("Response from backend:", response.data);

      if (response.data.status) {
        toast("Registration successful!", {
          icon: <Check />,
          style: { background: "#f1f2fa" },
        });
      } else {
        toast(`Error: ${response.data.message ?? ""}`, {
          description: `${JSON.stringify(data)}`,
        });
      }
    } catch (err: any) {
      console.error("Error:", err);
      toast(`${err.response.data.message}`, {
        style: {
          background: "#e83232",
          borderColor: "ff5136",
          color: "white",
        },
      });
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

        <p className="-mt-8 font-[Dm_Sans] text-xs text-[#7D7ADA]">Company</p>

        {/* INPUTS */}
        <div className="space-y-4 px-12 md:mt-10">
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
            <div className="space-y-4">
              {/* FNAME LNAME */}
              <div className="">
                <Label htmlFor="compName">Company Name *</Label>
                <Input
                  id="compName"
                  className={cn("p-5", errors.compName && "border-red-400")}
                  type="text"
                  {...register("compName")}
                  placeholder="SJP"
                />
                {errors.compName && (
                  <p className="py-2 text-xs text-red-400">
                    {errors.compName.message}
                  </p>
                )}
              </div>
              {/* LOCATION */}
              <div className="">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  {...register("location")}
                  type="text"
                  className={cn("p-5", errors.location && "border-red-400")}
                  placeholder="Addis Ababa, Ethiopia"
                />
                {errors.location && (
                  <p className="py-2 text-xs text-red-400">
                    {errors.location.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Label htmlFor="email">Company Email *</Label>
                <Input
                  id="email"
                  className={cn("p-5", errors.email && "border-red-400")}
                  {...register("email")}
                  type="email"
                  placeholder="SJP@gmail.com"
                />
                {errors.email && (
                  <p className="py-2 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  className={cn("p-5", errors.password && "border-red-400")}
                  {...register("password")}
                  type="password"
                  placeholder="********"
                />
                {errors.password && (
                  <p className="py-2 text-xs text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* PROFILE PICTURE */}
              <div className="flex flex-col sm:items-start">
                <Label htmlFor="pp">Company Image</Label>
                <input
                  id="cp"
                  className="w-full cursor-pointer rounded bg-[url(@/assets/Forms/choose.svg)] bg-cover bg-center bg-no-repeat px-2 py-14 text-xs text-purple-600 shadow-xs ring-1 ring-[#e5e5e5]"
                  type="file"
                  accept="image/*"
                  name="cp"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="description">Company description *</Label>
                <Textarea
                  id="description"
                  className={cn(
                    "min-h-[150px] p-5",
                    errors.description && "border-red-400",
                  )}
                  {...register("description")}
                  placeholder="Your Company Description..."
                />
                {errors.description && (
                  <p className="py-2 text-xs text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* SECOND COL */}

            <div className="space-y-4 md:-mt-10">
              <h2 className="font-semibold">Optional Links</h2>
              <div className="">
                <Label htmlFor="webLink">Company Web Link</Label>
                <Input
                  id="webLink"
                  {...register("webLink")}
                  type="url"
                  className={cn("p-5", errors.webLink && "border-red-400")}
                  placeholder="http://www.example.com"
                />
                {errors.webLink && (
                  <p className="py-2 text-xs text-red-400">
                    {errors.webLink.message}
                  </p>
                )}
              </div>
              <div className="">
                <Label htmlFor="instagramLink">Company Instagram Link</Label>
                <Input
                  id="instagramLink"
                  {...register("instagramLink")}
                  type="text"
                  className={cn(
                    "p-5",
                    errors.instagramLink && "border-red-400",
                  )}
                  placeholder="https://www.instagram.com"
                />
                {errors.instagramLink && (
                  <p className="py-2 text-xs text-red-400">
                    {errors.instagramLink.message}
                  </p>
                )}
              </div>
              <div className="">
                <Label htmlFor="facebookLink">Company Facebook Link</Label>
                <Input
                  id="facebookLink"
                  {...register("facebookLink")}
                  type="text"
                  className={cn("p-5", errors.facebookLink && "border-red-400")}
                  placeholder="https://www.facebook.com"
                />
                {errors.facebookLink && (
                  <p className="py-2 text-xs text-red-400">
                    {errors.facebookLink.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-2 w-full">
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
          onClick={() => console.log(errors)}
          className={cn(
            "mt-6 w-[60%] cursor-pointer bg-[#7D7ADA] py-6 text-lg font-[600] hover:bg-[#5c5bb9] md:w-[30%]",
          )}
        >
          Register
        </Button>
        <div className="text-xs">
          <p>
            Already have an account?{" "}
            <a href={"/login"} className="text-blue-400 hover:underline">
              click here
            </a>
          </p>
        </div>

        <p className="py-2 text-xs text-red-400"></p>
      </form>
    </div>
  );
};

export default CompanyForm;
