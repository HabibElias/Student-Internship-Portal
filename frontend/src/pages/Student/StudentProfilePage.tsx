import { DepartmentSelect } from "@/components/Student/DepartmentSelect";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Student from "@/models/Student";
import { axiosPrivate } from "@/services/Apiclient";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function StudentProfilePage() {
  const [student, setStudent] = useState<Student>();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const [department, setDepartment] = useState<number | undefined>();
  const [profileImage, setProfileImage] = useState<string>("");

  useEffect(() => {
    // Fetch student profile from backend
    const fetchProfile = async () => {
      try {
        const res = await axiosPrivate.get(
          `${import.meta.env.VITE_API_URL}/student/profile`,
        );
        setStudent(res.data.data);
        if (res.data.data?.profile_picture) {
          setProfileImage(res.data.data.profile_picture);
        }
        if (res.data.data?.department) {
          setDepartment(Number(res.data.data.department));
        }
        if (res.data.data?.graduation_date) {
          setDate(new Date(res.data.data.graduation_date));
        }
      } catch (err) {
        toast.error("Failed to load profile.");
      }
    };
    fetchProfile();
  }, []);

  // Handle image upload and set base64 string to profileImage
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle deleting the image (set to empty string)
  const handleDeleteImage = () => {
    setProfileImage("");
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      await axiosPrivate.patch(
        `${import.meta.env.VITE_API_URL}/student/profile`,
        {
          ...student,
          department: department,
          graduation_date: date ? date.toISOString().split("T")[0] : undefined,
          profile_picture:
            profileImage && profileImage.startsWith("data:image")
              ? profileImage
              : profileImage === ""
                ? ""
                : student?.profile_picture,
        },
      );
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      if (
        err?.response?.data?.errors &&
        Array.isArray(err.response.data.errors)
      ) {
        err.response.data.errors.forEach((errorMsg: string) => {
          toast.error(errorMsg);
        });
      } else if (
        err?.response?.data?.errors &&
        typeof err.response.data.errors === "object"
      ) {
        // If errors is an object (e.g., { field: ["msg1", "msg2"] })
        Object.values(err.response.data.errors)
          .flat()
          .forEach((errorMsg) => {
            toast.error(String(errorMsg));
          });
      } else {
        toast.error(
          err?.response?.data?.message ||
            "Failed to update company profile. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!student) {
    return (
      <div className="flex min-h-[50vh] w-full flex-col items-center justify-center font-[poppins] font-semibold">
        <div className="loader"></div>
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-screen pt-30 pb-40 font-[poppins]">
      {/* Main content */}
      <div className="flex-1 p-6 md:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Student Profile</h1>

            {/* Profile picture section */}
            <div className="space-y-2">
              <h2 className="text-muted-foreground text-sm font-medium">
                Profile picture
              </h2>
              <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={
                      profileImage && profileImage.startsWith("data:image")
                        ? profileImage
                        : profileImage
                          ? `${import.meta.env.VITE_API_URL}/file?file=${profileImage}`
                          : "/placeholder.svg"
                    }
                    alt={`${student.first_name} ${student.last_name}`}
                  />
                  <AvatarFallback>
                    {student.first_name?.charAt(0)}
                    {student.last_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    id="profile-image-upload"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <Button
                    className="bg-[#7D7ADA] text-white hover:bg-[#5c5bb9]"
                    variant="default"
                    onClick={() =>
                      document.getElementById("profile-image-upload")?.click()
                    }
                  >
                    Change picture
                  </Button>
                  {(profileImage || student.profile_picture) && (
                    <Button
                      variant="outline"
                      className="border-[#7D7ADA] text-[#7D7ADA] hover:bg-[#ecebff]"
                      type="button"
                      onClick={handleDeleteImage}
                    >
                      Delete picture
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Name section */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="first-name"
                  className="text-muted-foreground text-sm font-medium"
                >
                  First name
                </label>
                <Input
                  id="first-name"
                  value={student.first_name || ""}
                  onChange={(e) =>
                    setStudent({ ...student, first_name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="last-name"
                  className="text-muted-foreground text-sm font-medium"
                >
                  Last name
                </label>
                <Input
                  id="last-name"
                  value={student.last_name || ""}
                  onChange={(e) =>
                    setStudent({ ...student, last_name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label
                htmlFor="gender"
                className="text-muted-foreground text-sm font-medium"
              >
                Gender
              </label>
              <Select
                value={student.gender}
                onValueChange={(value) =>
                  setStudent({ ...student, gender: value })
                }
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Department */}
            <div className="space-y-2 *:flex">
              <label
                htmlFor="department"
                className="text-muted-foreground text-sm font-medium"
              >
                Department
              </label>
              <DepartmentSelect value={department} setValue={setDepartment} />
            </div>

            {/* Graduation Date */}
            <div className="space-y-2">
              <label
                htmlFor="graduation-date"
                className="text-muted-foreground text-sm font-medium"
              >
                Graduation Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      if (newDate) {
                        setStudent({
                          ...student,
                          graduation_date: newDate.toDateString(),
                        });
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* About me */}
            <div className="space-y-2">
              <label
                htmlFor="about"
                className="text-muted-foreground text-sm font-medium"
              >
                About me
              </label>
              <Textarea
                id="about"
                value={student.about || ""}
                onChange={(e) =>
                  setStudent({ ...student, about: e.target.value })
                }
                className="min-h-[100px]"
              />
            </div>

            {/* Save button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSaveChanges}
                disabled={loading}
                className="rounded-lg bg-[#7D7ADA] px-8 py-2 text-lg font-semibold text-white hover:bg-[#5c5bb9]"
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
