/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAppDispatch, useAppSelector } from "@/src/redux/redux-hooks";
import { setShowAddPhoto, setShowPhoto } from "@/src/redux/tree/tree-slice";
import { FamilyNode, Image } from "@/src/types/family-member";
import { ImageIcon, Upload } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import UploadPhotos from "../photos/upload";
import FilePreview from "../photos/view";
import { selectUser } from "@/src/redux/auth/auth-slice";
import { useEffect, useState } from "react";
import { UserRoles } from "@/src/enums/userRoles";

interface PhotosTabProps {
  person: FamilyNode;
  refetch: () => void;
}
const PhotosTab = ({ person, refetch }: PhotosTabProps) => {
  const dispatch = useAppDispatch();
  const [showBtn, setShowBtn] = useState<boolean>(false);

  const user = useAppSelector(selectUser);

  const showUploadDialog = () => {
    dispatch(setShowAddPhoto({ show: true, person: person }));
  };

  const showPhoto = (file: Image) => {
    dispatch(setShowPhoto({ show: true, photo: file }));
  };

  useEffect(() => {
    if (user) {
      console.log("user:", user);
      setShowBtn((user as any).Role === UserRoles.ADMIN);
    }
  }, [user]);

  return (
    <>
      <UploadPhotos person={person} refetch={refetch} />
      <FilePreview refetch={refetch} />
      <Card>
        <CardContent>
          {showBtn && (
            <div className="relative pb-3">
              <Button
                variant="outline"
                // size="icon"
                className="absolute top-0 right-1 z-5"
                onClick={showUploadDialog}
              >
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </Button>
            </div>
          )}
          <div className="pt-6">
            <div className="flex items-center mb-4">
              <ImageIcon className="h-5 w-5 mr-2" />
              <h4 className="font-medium">Photo Gallery</h4>
            </div>
            {person.images.length === 0 ? (
              <span>No images!</span>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {person.images.map((photo, index) => (
                  <div
                    key={index}
                    className="aspect-square relative rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => showPhoto(photo)}
                  >
                    <img
                      src={photo.path || "/placeholder.svg"}
                      alt={`${person.firstName} photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PhotosTab;
