import type { ChangeEvent } from "react";
import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { createWorker } from "tesseract.js";

import { Button } from "@/components/ui/button";

type PassportUploadBoxProps = {
  fileUploaded: boolean;
  fileName: string;
  isScanning: boolean;
  setFileUploaded: (value: boolean) => void;
  setFileName: (value: string) => void;
  setIsScanning: (value: boolean) => void;
  setPassportNumber: (value: string) => void;
};

const PassportUploadBox = ({
  fileUploaded,
  fileName,
  isScanning,
  setFileUploaded,
  setFileName,
  setIsScanning,
  setPassportNumber,
}: PassportUploadBoxProps) => {
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileUploaded(true);
    setFileName(file.name);
    setIsScanning(true);

    try {
      const worker = await createWorker("eng");
      const {
        data: { text },
      } = await worker.recognize(file);

      const passportRegex = /([A-Z]{1,2}[0-9]{6,9})/i;
      const matches = text.replace(/\s/g, "").match(passportRegex);

      if (matches?.[0]) {
        setPassportNumber(matches[0].toUpperCase());
      } else {
        alert("Could not detect a clear passport number. Please enter manually.");
      }

      await worker.terminate();
    } catch (error) {
      console.error("OCR Error:", error);
      alert("Passport scan failed. Please enter passport number manually.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div
      className={`rounded-md border p-4 transition-all ${
        fileUploaded
          ? "border-green-500 bg-green-50/50 dark:bg-green-950/20"
          : "border-blue-400 bg-blue-50/50 dark:bg-blue-950/20"
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        {isScanning ? (
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
        ) : fileUploaded ? (
          <CheckCircle2 className="h-5 w-5 text-green-600" />
        ) : (
          <Upload className="h-5 w-5 text-blue-600" />
        )}

        <h3
          className={`text-sm font-semibold uppercase ${
            fileUploaded
              ? "text-green-700 dark:text-green-400"
              : "text-blue-700 dark:text-blue-400"
          }`}
        >
          {isScanning ? "Scanning Passport..." : "Auto-fill from Passport Image"}
        </h3>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="file"
          id="passport-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileUpload}
        />

        <Button variant="outline" className="bg-background" asChild>
          <label htmlFor="passport-upload" className="cursor-pointer">
            Choose File
          </label>
        </Button>

        <span className="max-w-50 truncate text-sm text-muted-foreground">
          {isScanning ? "Processing image..." : fileName}
        </span>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Upload a clear image of your passport. Supported formats: JPG, PNG, WEBP.
      </p>
    </div>
  );
};

export default PassportUploadBox;