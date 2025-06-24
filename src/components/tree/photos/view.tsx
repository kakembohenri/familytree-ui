/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/src/components/ui/button";
import HandleErrors from "@/src/lib/handle-errors";
import { useAppDispatch, useAppSelector } from "@/src/redux/redux-hooks";
import { useDeletePhotoMutation } from "@/src/redux/tree/tree-api-slice";
import {
  selectedPhoto,
  setShowPhoto,
  setViewPerson,
  showViewPhoto,
} from "@/src/redux/tree/tree-slice";
import { Delete, Minus, Plus, RotateCcw, X } from "lucide-react";
import { JSX, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import { Card, CardContent, CardFooter } from "../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

interface FilePreviewProps {
  refetch: () => void;
}
const FilePreview = ({ refetch }: FilePreviewProps): JSX.Element => {
  const [zoom, setZoom] = useState(100);

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const open = useAppSelector(showViewPhoto);

  const onOpenChange = (show: boolean) => {
    dispatch(setShowPhoto({ show, file: null }));
  };

  const file = useAppSelector(selectedPhoto);

  const [deletePhoto, { isLoading }] = useDeletePhotoMutation();

  const submitPhoto = async () => {
    try {
      const response = await deletePhoto(file?.id ?? 0);

      HandleErrors(response);

      const { data } = response;

      toast.success("Removing member photo", {
        description: data.message,
      });

      refetch();
      onOpenChange(false);
      dispatch(setViewPerson({ show: false, person: null }));
    } catch (err: any) {
      console.log(err);
      toast.success("Removing member photo", {
        description: "Error adding photo!",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto"> */}
      <DialogContent className="sm:max-w-[600px]  overflow-y-auto">
        <DialogHeader>
          <DialogTitle>View Photo</DialogTitle>
        </DialogHeader>
        <Card>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setZoom(Math.max(25, zoom - 25))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  {/* <Slider
            className="w-[100px]"
            value={[zoom]}
            onValueChange={([value]: [any]) => setZoom(value)}
            min={25}
            max={200}
            step={25}
          /> */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setZoom(Math.min(200, zoom + 25))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground w-16">
                    {zoom}%
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setZoom(100)}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              {/* <div className="relative border rounded-lg bg-background"> */}
              <div
                // className="aspect-[4/3] rounded-lg bg-muted"
                className="aspect-[4/3] rounded-lg"
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: "top left",
                  height: zoom > 100 ? `${zoom}%` : "100%",
                }}
              >
                <img
                  width={50}
                  height={50}
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw, (max-height: 400px) 100vh, (max-height: 1200px) 50vh, 33vh"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw, (max-height: 400px) 100vh, (max-height: 1200px) 50vh, 33vh"
                  src={file?.path}
                  alt={""}
                  className="w-full object-cover rounded-lg transition-transform group-hover:scale-[1.02] max-h-[90vh]"
                />
              </div>
              {/* </div> */}
            </div>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                <X className="mr-2 h-4 w-4" />
                Close
              </Button>
              <Button
                type="button"
                onClick={() => setConfirmDelete(true)}
                disabled={isLoading}
              >
                <Delete className="mr-2 h-4 w-4" />
                Remove Photo
              </Button>
            </CardFooter>
            {confirmDelete && (
              <Alert variant="destructive" className="mt-2">
                <AlertTitle>Remove photo</AlertTitle>
                <AlertDescription>
                  This action is irriversable. Are you sure you want to proceed?
                </AlertDescription>
                <div>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={submitPhoto}
                    disabled={isLoading}
                  >
                    {isLoading ? "Deleting ..." : "Yes, Delete"}
                  </Button>
                </div>
              </Alert>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default FilePreview;
