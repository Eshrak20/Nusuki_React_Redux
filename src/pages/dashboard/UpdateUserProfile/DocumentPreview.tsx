import { Eye, FileImage } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DocumentPreviewProps {
  label: string;
  imageUrl?: string | null;
}

export default function DocumentPreview({
  label,
  imageUrl,
}: DocumentPreviewProps) {
  return (
    <Card className="overflow-hidden border bg-background transition-all hover:shadow-md">
      <div className="flex items-center gap-4 p-3">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={label}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FileImage className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h4 className="font-medium">{label}</h4>
          <p className="text-sm text-muted-foreground">
            {imageUrl ? "Document uploaded" : "No document available"}
          </p>
        </div>

        {imageUrl && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-4xl p-2">
              <img
                src={imageUrl}
                alt={label}
                className="max-h-[80vh] w-full rounded-sm object-contain"
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Card>
  );
}