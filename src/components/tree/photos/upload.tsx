"use client";

import type React from "react";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import HandleErrors from "@/src/lib/handle-errors";
import { useAppDispatch, useAppSelector } from "@/src/redux/redux-hooks";
import { useUploadPhotoMutation } from "@/src/redux/tree/tree-api-slice";
import {
  setShowAddPhoto,
  setViewPerson,
  showAddPhoto,
} from "@/src/redux/tree/tree-slice";
import { FamilyNode } from "@/src/types/family-member";
import { File, FileText, ImageIcon, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

interface UploadPhotosProps {
  person: FamilyNode;
  refetch: () => void;
}

export default function UploadPhotos({ person, refetch }: UploadPhotosProps) {
  const [base64String, setBase64String] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loadingImageUpload, setLoadingImageUpload] = useState<boolean>(false);
  // const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      convertToBase64(selectedFile);
    }
  };

  const convertToBase64 = (file: File) => {
    setLoadingImageUpload(true);
    setBase64String(null);

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/png;base64,") if needed
      //   const base64 = result.split(",")[1];
      setBase64String(result);
      setLoadingImageUpload(false);
    };

    reader.onerror = () => {
      toast.error("Error", {
        description: "Failed to convert file to base64",
      });
      setLoadingImageUpload(false);
    };

    reader.readAsDataURL(file);
  };

  const clearFile = () => {
    setFile(null);
    setBase64String(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getFileIcon = () => {
    if (!file) return <Upload className="h-8 w-8 text-muted-foreground" />;

    const fileType = file.type.split("/")[0];

    switch (fileType) {
      case "image":
        return <ImageIcon className="h-8 w-8 text-blue-500" />;
      case "text":
        return <FileText className="h-8 w-8 text-green-500" />;
      default:
        return <File className="h-8 w-8 text-orange-500" />;
    }
  };

  const renderPreview = () => {
    if (!file || !base64String) return null;

    if (file.type.startsWith("image/")) {
      return (
        <div className="mt-4 flex justify-center">
          <div className="relative max-w-xs overflow-hidden rounded-lg border">
            <img
              src={base64String}
              alt="Preview"
              // width={100}
              className="max-h-48 w-auto object-contain"
            />
          </div>
        </div>
      );
    }

    return null;
  };

  const dispatch = useAppDispatch();

  const open = useAppSelector(showAddPhoto);

  const onOpenChange = (show: boolean) => {
    dispatch(setShowAddPhoto({ show: show, person: person }));
  };

  const [sendPhoto, { isLoading }] = useUploadPhotoMutation();

  const submitPhoto = async () => {
    try {
      if (file === null) {
        return toast.error("File is required!");
      }
      const formData = new FormData();

      formData.append("familyMemberId", person.id.toString());

      formData.append("file", file!);

      const response = await sendPhoto(formData);

      HandleErrors(response);

      const { data } = response;

      toast.success("Adding family member photo", {
        description: data.message,
      });

      setFile(null);
      setBase64String(null);

      refetch();
      onOpenChange(false);
      dispatch(setViewPerson({ show: false, person: null }));
    } catch (err: any) {
      console.log(err);
      toast.success("Adding family member photo", {
        description: "Error adding photo!",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto"> */}
      <DialogContent className="sm:max-w-[600px]  overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Photo</DialogTitle>
          <DialogDescription>Upload family member photo.</DialogDescription>
        </DialogHeader>
        <Card className="w-full max-w-md mx-auto">
          <CardContent>
            <div className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${
                file
                  ? "border-primary/50 bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5"
              }`}
                onClick={triggerFileInput}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="*/*"
                />

                <div className="flex flex-col items-center gap-2">
                  {file ? (
                    <>
                      <div className="flex items-center gap-2">
                        {getFileIcon()}
                        <span className="font-medium">{file.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB •{" "}
                        {file.type || "Unknown type"}
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Any file type supported
                      </p>
                    </>
                  )}
                </div>
              </div>

              {renderPreview()}

              {loadingImageUpload && (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={clearFile} disabled={!file}>
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
            <Button type="button" onClick={triggerFileInput}>
              <Upload className="mr-2 h-4 w-4" />
              {file ? "Change File" : "Upload File"}
            </Button>
          </CardFooter>
        </Card>
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={!file}
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
          <Button type="button" onClick={submitPhoto} disabled={isLoading}>
            <Upload className="mr-2 h-4 w-4" />
            {file || !isLoading ? "Send File" : "Sending File..."}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
