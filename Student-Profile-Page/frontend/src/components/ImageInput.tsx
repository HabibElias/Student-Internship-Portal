import { X } from "lucide-react";
import { useState } from "react";

interface Prop {
  id: string;
  required?: boolean;
  labelName: string;
}

const ImageInput = ({ required, id, labelName }: Prop) => {
  const [file, setFile] = useState<File>();

  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm/6 font-medium text-gray-900"
      >
        {labelName} {required && "*"}
      </label>
      <div
        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add("border-indigo-600", "bg-indigo-50");
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("border-indigo-600", "bg-indigo-50");
        }}
        onDrop={async (e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("border-indigo-600", "bg-indigo-50");
          const selectedFile = e.dataTransfer.files?.[0];
          if (!selectedFile) return;
          if (selectedFile.size > 10 * 1024 * 1024) {
            alert("File size exceeds 10MB.");
            return;
          }
          setFile(() => selectedFile);
        }}
      >
        <div className="text-center">
          {!file ? (
            <svg
              className="mx-auto size-12 text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <div className="relative">
              <button
                onClick={() => {
                  setFile(undefined);
                }}
                className="absolute top-0 right-0 cursor-pointer rounded-full bg-red-400 p-2 text-white duration-200 hover:bg-red-600"
              >
                <X size={18} />
              </button>
              <img
                src={file ? URL.createObjectURL(file) : ""}
                className="mx-auto mt-4 max-h-48 rounded"
                alt="Preview"
              />
            </div>
          )}
          <div className="mt-4 flex items-center justify-center text-sm/6 text-gray-600">
            <label
              htmlFor={id}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id={id}
                name={id}
                type="file"
                className="sr-only"
                accept="image/png, image/jpeg, image/gif"
                onChange={async (e) => {
                  const selectedFile = e.target.files?.[0];
                  if (!selectedFile) return;
                  if (selectedFile.size > 10 * 1024 * 1024) {
                    alert("File size exceeds 10MB.");
                    return;
                  }
                  setFile(() => selectedFile);
                }}
              />
            </label>
            <p className="pl-1 text-xs/tight">or drag and drop</p>
          </div>
          <p className="text-xs/tight text-gray-600">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
      {required && (
        <div>
          {!file && (
            <p className="py-2 text-xs text-red-400">{labelName} Is required</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageInput;
