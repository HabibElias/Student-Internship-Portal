import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Company from "@/models/Company";
import { axiosPrivate } from "@/services/Apiclient";
import { useEffect, useState } from "react";
// Add toast import
import { toast } from "sonner";

const UpdateProfile = ({
  company,
}: {
  company?: Company;
  onUpdate?: (data: any) => void;
}) => {
  const [form, setForm] = useState({
    name: company?.company_name || "",
    location: company?.location || "",
    website: company?.socials?.website || "",
    linkedIn: company?.socials?.linkedin || "",
    twitter: company?.socials?.twitter || "",
    facebook: company?.socials?.facebook || "",
    description: company?.description || "",
    company_image: company?.company_image || "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload and set base64 string to company_image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          company_image: reader.result as string, // set to company_image (base64)
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let payload: {
        company_name: string;
        location: string;
        website: string;
        facebook: string;
        linkedin: string;
        twitter: string;
        description: string;
        company_image?: string;
      } = {
        company_name: form.name,
        location: form.location,
        website: form.website,
        facebook: form.facebook,
        linkedin: form.linkedIn,
        twitter: form.twitter,
        description: form.description,
      };
      // Always send company_image if it's a base64 string (new upload)
      if (form.company_image && form.company_image.startsWith("data:image")) {
        payload.company_image = form.company_image;
      } else if (!form.company_image && company?.company_image) {
        // If no new image, send the existing filename
        payload.company_image = company.company_image;
      }
      await axiosPrivate.patch(
        `${import.meta.env.VITE_API_URL}/company`,
        payload,
      );
      toast.success("Company profile updated successfully!");
      // Optionally, you can call onUpdate(form) here if needed
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to update company profile. Please try again.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="bg-[#7D7ADA] text-white hover:bg-[#5c5bb9]"
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-[poppins]">
            Update Company Profile
          </DialogTitle>
          <span
            id="update-company-profile-desc"
            className="mt-1 text-sm text-gray-500"
          >
            Update your company details and profile image.
          </span>
        </DialogHeader>
        <form
          className="mt-2 h-[80vh] space-y-4 overflow-y-scroll px-4 font-[poppins]"
          onSubmit={handleSubmit}
          aria-describedby="update-company-profile-desc"
        >
          <div className="flex flex-col items-center gap-2">
            {form.company_image &&
            form.company_image.startsWith("data:image") ? (
              <img
                src={form.company_image}
                alt="Company Logo"
                className="h-20 w-20 rounded-full border object-cover"
              />
            ) : form.company_image ? (
              <img
                src={`${import.meta.env.VITE_API_URL}/file?file=${form.company_image}`}
                alt="Company Logo"
                className="h-20 w-20 rounded-full border object-cover"
              />
            ) : null}
            <label className="mb-1 block text-sm font-medium">
              Company Image
            </label>
            <div className="flex gap-2">
              <Input
                type="file"
                accept="image/*"
                name="company_image"
                onChange={handleImageChange}
              />
              {(form.company_image || company?.company_image) && (
                <Button
                  type="button"
                  variant="outline"
                  className="border-[#7D7ADA] text-[#7D7ADA] hover:bg-[#ecebff]"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      company_image: "",
                    }))
                  }
                >
                  Delete image
                </Button>
              )}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Company Name
            </label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Company Name"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Location</label>
            <Input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Website</label>
            <Input
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="Website"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Facebook</label>
            <Input
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
              placeholder="Facebook URL"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">LinkedIn</label>
            <Input
              name="linkedIn"
              value={form.linkedIn}
              onChange={handleChange}
              placeholder="LinkedIn URL"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Twitter</label>
            <Input
              name="twitter"
              value={form.twitter}
              onChange={handleChange}
              placeholder="Twitter URL"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Company Description"
              aria-describedby={undefined}
              className="w-full rounded border px-3 py-2 text-sm"
              rows={3}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-[#7D7ADA] px-8 py-2 text-lg font-semibold text-white hover:bg-[#5c5bb9]"
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
