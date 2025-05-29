import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { axiosPrivate } from "@/services/Apiclient";
import Company from "@/models/Company";

export default function CompanyProfile() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [form, setForm] = useState({
    company_name: "",
    location: "",
    website: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    description: "",
    company_image: "",
  });

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      try {
        const result = (await axiosPrivate.get(`/company`)).data;
        setCompany(result.data);
        setForm({
          company_name: result.data.company_name || "",
          location: result.data.location || "",
          website: result.data.socials?.website || "",
          linkedin: result.data.socials?.linkedin || "",
          twitter: result.data.socials?.twitter || "",
          facebook: result.data.socials?.facebook || "",
          description: result.data.description || "",
          company_image: result.data.company_image || "",
        });
        setProfileImage(result.data.company_image || "");
      } catch (e) {
        toast.error("Failed to load company profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      await axiosPrivate.patch(`${import.meta.env.VITE_API_URL}/company`, {
        ...form,
        company_image:
          profileImage && profileImage.startsWith("data:image")
            ? profileImage
            : profileImage === ""
              ? ""
              : company?.company_image,
      });
      toast.success("Company profile updated successfully!");
      // Optionally, refetch or update state here
    } catch (err: any) {
      // Check for validation errors (assuming they are in err.response.data.errors)
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

  if (!company) {
    return (
      <div className="flex min-h-[80vh] w-full flex-col items-center justify-center font-[poppins] font-semibold">
        <div className="loader"></div>
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-screen pt-30 pb-40 font-[poppins]">
      <div className="flex-1 p-6 md:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Company Profile</h1>
            {/* Profile picture section */}
            <div className="space-y-2">
              <h2 className="text-muted-foreground text-sm font-medium">
                Company Logo
              </h2>
              <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={
                      profileImage && profileImage.startsWith("data:image")
                        ? profileImage
                        : profileImage
                          ? `${import.meta.env.VITE_API_URL}/file?file=${profileImage}`
                          : "/default-company-logo.png"
                    }
                    alt={form.company_name}
                  />
                  <AvatarFallback>
                    {form.company_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    id="company-image-upload"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <Button
                    variant="secondary"
                    className="bg-[#7D7ADA] hover:bg-[#5c5bb9] text-white"
                    onClick={() =>
                      document.getElementById("company-image-upload")?.click()
                    }
                  >
                    Change logo
                  </Button>
                  {(profileImage || company.company_image) && (
                    <Button
                      variant="outline"
                      className="border-[#7D7ADA] text-[#7D7ADA] hover:bg-[#ecebff]"
                      type="button"
                      onClick={handleDeleteImage}
                    >
                      Delete logo
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {/* Company Name */}
            <div className="space-y-2">
              <label className="text-muted-foreground text-sm font-medium">
                Company Name
              </label>
              <Input
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
                required
                placeholder="Company Name"
              />
            </div>
            {/* Location */}
            <div className="space-y-2">
              <label className="text-muted-foreground text-sm font-medium">
                Location
              </label>
              <Input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
              />
            </div>
            {/* Website */}
            <div className="space-y-2">
              <label className="text-muted-foreground text-sm font-medium">
                Website
              </label>
              <Input
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="Website"
              />
            </div>
            {/* LinkedIn */}
            <div className="space-y-2">
              <label className="text-muted-foreground text-sm font-medium">
                LinkedIn
              </label>
              <Input
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn URL"
              />
            </div>
            {/* Twitter */}
            <div className="space-y-2">
              <label className="text-muted-foreground text-sm font-medium">
                Twitter
              </label>
              <Input
                name="twitter"
                value={form.twitter}
                onChange={handleChange}
                placeholder="Twitter URL"
              />
            </div>
            {/* Facebook */}
            <div className="space-y-2">
              <label className="text-muted-foreground text-sm font-medium">
                Facebook
              </label>
              <Input
                name="facebook"
                value={form.facebook}
                onChange={handleChange}
                placeholder="Facebook URL"
              />
            </div>
            {/* Description */}
            <div className="space-y-2">
              <label className="text-muted-foreground text-sm font-medium">
                Description
              </label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Company Description"
                className="min-h-[100px]"
              />
            </div>
            {/* Save button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSaveChanges}
                disabled={loading}
                className="bg-[#7D7ADA] hover:bg-[#5c5bb9] text-white px-8 py-2 rounded-lg text-lg font-semibold"
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
