import { cn } from "@/src/lib/utils";
import { IUpdateMemberSchema } from "@/src/validations/family-member-validation";
import { Label } from "@radix-ui/react-label";
import { Edit, Trash, Upload } from "lucide-react";
import { FC, useRef, useState } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { FamilyNode } from "@/src/types/family-member";
import { toast } from "sonner";
import { useUploadPhotoMutation } from "@/src/redux/tree/tree-api-slice";
import HandleErrors from "@/src/lib/handle-errors";
import { useAppDispatch } from "@/src/redux/redux-hooks";
import { setEditPerson } from "@/src/redux/tree/tree-slice";

interface BasicInfoProps {
  register: UseFormRegister<IUpdateMemberSchema>;
  errors: FieldErrors<IUpdateMemberSchema>;
  watch: UseFormWatch<IUpdateMemberSchema>;
  setValue: UseFormSetValue<IUpdateMemberSchema>;
  person: FamilyNode;
  refetch: () => void;
}
const BasicInfo: FC<BasicInfoProps> = ({
  register,
  errors,
  watch,
  setValue,
  person,
  refetch,
}) => {
  const [base64String, setBase64String] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  // const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const gender = watch("gender");

  const handleGenderChange = (option: string) => {
    setValue("gender", option as "Male" | "Female");
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      convertToBase64(selectedFile);
    }
  };

  const convertToBase64 = (file: File) => {
    setBase64String(null);

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/png;base64,") if needed
      //   const base64 = result.split(",")[1];
      setBase64String(result);
    };

    reader.onerror = () => {
      toast.error("Error", {
        description: "Failed to convert file to base64",
      });
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

  const [sendPhoto, { isLoading }] = useUploadPhotoMutation();

  const submitAvatar = async () => {
    try {
      if (file === null) {
        return toast.error("Avatar is required!");
      }
      const formData = new FormData();

      formData.append("familyMemberId", person.id.toString());
      formData.append("file", file!);

      if (person.avatar !== null) {
        formData.append("oldAvatar", person.avatar.id.toString());
      }
      formData.append("type", "avatar");

      const response = await sendPhoto(formData);

      HandleErrors(response);

      const { data } = response;

      toast.success("Avatar", {
        description: data.message,
      });

      setFile(null);
      setBase64String(null);

      refetch();
      dispatch(setEditPerson({ show: false, person: null }));
    } catch (err: any) {
      console.log(err);
      toast.success("Avatar", {
        description: "Error adding avatar!",
      });
    }
  };

  return (
    <div className="space-y-4 py-4">
      <div className="flex flex-col items-center justify-center mb-4">
        <div className="relative">
          <Avatar className={cn("h-24 w-24 border-2", "border-purple-300")}>
            {person.avatar === null ? (
              <AvatarImage
                src={base64String ?? "unknown.jpg"}
                alt={person.firstName}
              />
            ) : (
              <AvatarImage
                src={base64String ?? person.avatar.path}
                alt={person.firstName}
              />
            )}
          </Avatar>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="*/*"
          />
          {person.avatar === null ? (
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
              onClick={triggerFileInput}
            >
              {base64String === null ? (
                <Upload className="h-4 w-4" />
              ) : (
                <Edit className="h-4 w-4" />
              )}
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
              onClick={triggerFileInput}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {base64String && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute top-0 right-0 h-8 w-8 rounded-full"
              onClick={clearFile}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
        {base64String && (
          <Button
            type="button"
            className="mt-2"
            disabled={isLoading}
            onClick={submitAvatar}
          >
            {isLoading ? "Saving changes..." : "Save change"}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">First name</Label>
          <Input
            id="first-name"
            {...register("firstName")}
            placeholder="Enter first name...."
          />
          {errors.firstName && (
            <p className="text-sm" style={{ color: "red" }}>
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="middle-name">Middle name</Label>
          <Input
            id="middle-name"
            {...register("middleName")}
            placeholder="Enter middle name...."
          />
          {errors.middleName && (
            <p className="text-sm" style={{ color: "red" }}>
              {errors.middleName.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Last name</Label>
          <Input
            id="last-name"
            {...register("lastName")}
            placeholder="Enter last name...."
          />
          {errors.lastName && (
            <p className="text-sm" style={{ color: "red" }}>
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Gender</Label>
        <RadioGroup
          value={gender}
          onValueChange={handleGenderChange}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="birthYear">Date of Birth</Label>
          <Input id="birthYear" type="date" {...register("born")} />
          {errors.born && (
            <p className="text-sm" style={{ color: "red" }}>
              {errors.born.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="deathYear">Date of Death</Label>
          <Input
            id="deathYear"
            type="date"
            {...register("died")}
            className={errors.died ? "border-destructive" : ""}
          />
          {errors.died && (
            <p className="text-sm text-destructive">{errors.died.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
