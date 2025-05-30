import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LoginSchema } from "@/models/LoginSchema";
import { useAuth } from "@/providers/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Loader, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { z } from "zod";

export type FormData = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  });

  const { login, fetchState } = useAuth();

  const onSubmit = async (data: FormData) => {
    const email = data.email;
    const password = data.password;

    login(email, password);
  };

  return (
    <div className="flex max-h-max min-h-[70vh] items-center justify-center px-[30px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative container flex flex-col items-center justify-center gap-5 rounded-2xl bg-white py-[50px] shadow-2xl md:w-[80%] xl:w-[50%]"
      >
        {/* ICON */}
        <LogIn size={30} className="absolute top-6 left-6 text-[#7d7ada]" />

        {/* HEADER */}
        <h1 className="mb-6 font-[DM_Serif_Text] text-3xl md:text-5xl">
          Log In
        </h1>

        {/* INPUTS */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            className={cn("w-65 p-5", errors.email && "border-red-400")}
            type="email"
            {...register("email")}
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <p className="py-2 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            className={cn("w-65 p-5", errors.password && "border-red-400")}
            placeholder="********"
          />
          {errors.password && (
            <p className="py-2 text-xs text-red-400">
              {errors.password.message}
            </p>
          )}
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
          disabled={fetchState === "logging"}
        >
          {fetchState == "ready" ? (
            "Log In"
          ) : (
            <>
              <div className="animate-spin">
                <Loader />
              </div>
              Logging In
            </>
          )}
        </Button>
        <div className="text-xs">
          <p>
            Doesn't have an account?{" "}
            <NavLink to={"/register"} className="text-blue-400 hover:underline">
              click here
            </NavLink>
          </p>
        </div>

        <p className="py-2 text-xs text-red-400"></p>
      </form>
    </div>
  );
};

export default LoginPage;
