
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Trash2, Edit, Upload, X, Loader2 } from "lucide-react";

const defaultEvent = () => ({
  id: Date.now(),
  title: "",
  titleLocLang: "",
  contents: "",
  contentLocLang: "",
  titlePic: "",
  contentPic: "",
  contentVideo: "",
  mediaType: "image", 
  titlePicFile: null,
  contentPicFile: null,
  contentVideoFile: null,
});

const TimelineForm = ({
  timelineData,
  setTimelineData,
  editData = null,
  onClose,
  onSave = null, // API save callback for future integration
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteEventIndex, setDeleteEventIndex] = useState(null);
  const [formData, setFormData] = useState({
    year: "",
    events: [defaultEvent()],
  });

  // Initialize form when dialog opens or editData changes
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setFormData({
          ...editData,
          events: editData.events.map((event) => ({
            ...event,
            titleLocLang: event.titleLocLang || "",
            contentLocLang: event.contentLocLang || "",
            mediaType: event.mediaType || "image",
            titlePicFile: null,
            contentPicFile: null,
            contentVideoFile: null,
          })),
        });
      } else {
        setFormData({
          year: "",
          events: [defaultEvent()],
        });
      }
    }
  }, [editData, isOpen]);

  const handleYearChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      year: e.target.value,
    }));
  };

  const handleEventChange = (index, field, value) => {
    const updatedEvents = [...formData.events];
    updatedEvents[index] = {
      ...updatedEvents[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      events: updatedEvents,
    }));
  };

  const handleFileUpload = (index, field, file) => {
    if (file) {
      const updatedEvents = [...formData.events];
      updatedEvents[index] = {
        ...updatedEvents[index],
        [field + "File"]: file,
        [field]: URL.createObjectURL(file), // Preview
      };
      setFormData((prev) => ({
        ...prev,
        events: updatedEvents,
      }));
    }
  };

  const removeFile = (index, field) => {
    const updatedEvents = [...formData.events];
    updatedEvents[index] = {
      ...updatedEvents[index],
      [field + "File"]: null,
      [field]: "",
    };
    setFormData((prev) => ({
      ...prev,
      events: updatedEvents,
    }));
  };

  const addEvent = () => {
    setFormData((prev) => ({
      ...prev,
      events: [...prev.events, defaultEvent()],
    }));
  };

  const confirmRemoveEvent = (index) => {
    setDeleteEventIndex(index);
  };

  const removeEvent = () => {
    if (formData.events.length > 1 && deleteEventIndex !== null) {
      const updatedEvents = formData.events.filter((_, i) => i !== deleteEventIndex);
      setFormData((prev) => ({
        ...prev,
        events: updatedEvents,
      }));
    }
    setDeleteEventIndex(null);
  };

  // Prepare data for API submission
  const prepareAPIData = async () => {
    const yearData = {
      year: parseInt(formData.year),
      events: await Promise.all(
        formData.events.map(async (event) => {
          const eventData = {
            id: event.id || Date.now() + Math.random(),
            title: event.title,
            titleLocLang: event.titleLocLang,
            contents: event.contents,
            contentLocLang: event.contentLocLang,
            titlePic: event.titlePic,
            contentPic: event.contentPic,
            contentVideo: event.contentVideo,
            mediaType: event.mediaType,
          };

          if (event.titlePicFile) eventData.titlePicFile = event.titlePicFile;
          if (event.contentPicFile) eventData.contentPicFile = event.contentPicFile;
          if (event.contentVideoFile) eventData.contentVideoFile = event.contentVideoFile;

          return eventData;
        })
      ),
    };

    return yearData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.year || formData.events.some((event) => !event.title || !event.contents)) {
        alert("Please fill in all required fields");
        return;
      }

      const yearData = await prepareAPIData();

      if (onSave) {
        await onSave(yearData, editData);
      } else {
        if (editData) {
          const updatedData = timelineData.map((item) =>
            item.year === editData.year ? yearData : item
          );
          setTimelineData(updatedData);
        } else {
          const updatedData = [...timelineData, yearData].sort((a, b) => a.year - b.year);
          setTimelineData(updatedData);
        }
      }

      setIsOpen(false);
      if (onClose) onClose();

      setFormData({
        year: "",
        events: [defaultEvent()],
      });
    } catch (error) {
      console.error("Error saving timeline data:", error);
      alert("Error saving data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open && onClose) onClose();
  };

  const FileUploadField = ({ index, field, label, accept, currentValue }) => (
    <div className="space-y-2">
      <Label htmlFor={`${field}-${index}`}>{label}</Label>
      {currentValue ? (
        <div className="flex items-center gap-2 p-2 border rounded-md">
          {field.includes("Pic") ? (
            <img src={currentValue} alt="Preview" className="h-12 w-12 object-cover rounded" />
          ) : (
            <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
              <Upload className="h-6 w-6 text-gray-400" />
            </div>
          )}
          <span className="flex-1 text-sm truncate">
            {formData.events[index][field + "File"]?.name || "Uploaded file"}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeFile(index, field)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            id={`${field}-${index}`}
            value={formData.events[index][field]}
            onChange={(e) => handleEventChange(index, field, e.target.value)}
            placeholder="URL or upload file..."
            className="flex-1"
          />
          <Input
            id={`${field}-file-${index}`}
            type="file"
            accept={accept}
            onChange={(e) => handleFileUpload(index, field, e.target.files[0])}
            className="hidden"
          />
          <Label
            htmlFor={`${field}-file-${index}`}
            className="cursor-pointer border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium"
          >
            <Upload className="h-4 w-4 mr-1" />
            Upload
          </Label>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          {editData ? (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Edit className="h-4 w-4" />
            </Button>
          ) : (
            <Button className="group/btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2">
              <Plus className="w-4 h-4 mr-2" />
              Add Timeline
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editData ? `Edit Timeline - ${editData.year}` : "Add New Timeline Entry"}
            </DialogTitle>
            <DialogDescription>
              {editData
                ? "Update the timeline information below."
                : "Add a new year and events to the timeline."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Year */}
            <div className="space-y-2">
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={handleYearChange}
                placeholder="e.g., 2014"
                min="1900"
                max="2100"
                required
                disabled={!!editData}
              />
              {editData && (
                <p className="text-sm text-muted-foreground">
                  Year cannot be changed when editing an existing timeline entry.
                </p>
              )}
            </div>

            {/* Events */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Events *</Label>
                <Button type="button" onClick={addEvent} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Event
                </Button>
              </div>

              {formData.events.map((event, index) => (
                <Card key={event.id || index} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Event {index + 1}</CardTitle>
                      {formData.events.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => confirmRemoveEvent(index)}
                          className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <CardDescription>
                      Event details for {formData.year || "the selected year"}
                    </CardDescription>
                  </CardHeader>

                  {/* Event Fields */}
                  <CardContent className="space-y-6 pt-0">
                    {/* --- Title Section --- */}
                    <div className="space-y-4 border-b pb-4">
                      <div className="space-y-2">
                        <Label htmlFor={`title-${index}`}>Title *</Label>
                        <Input
                          id={`title-${index}`}
                          value={event.title}
                          onChange={(e) => handleEventChange(index, "title", e.target.value)}
                          placeholder="Enter title"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`titleLocLang-${index}`}>Title (Local Language)</Label>
                        <Input
                          id={`titleLocLang-${index}`}
                          value={event.titleLocLang || ""}
                          onChange={(e) =>
                            handleEventChange(index, "titleLocLang", e.target.value)
                          }
                          placeholder="Enter localized title"
                        />
                      </div>

                      <FileUploadField
                        index={index}
                        field="titlePic"
                        label="Title Image"
                        accept="image/*"
                        currentValue={event.titlePic}
                      />
                    </div>

                    {/* --- Content Section --- */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`contents-${index}`}>Content *</Label>
                        <Textarea
                          id={`contents-${index}`}
                          value={event.contents}
                          onChange={(e) => handleEventChange(index, "contents", e.target.value)}
                          placeholder="Enter content description"
                          rows={3}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`contentLocLang-${index}`}>Content (Local Language)</Label>
                        <Textarea
                          id={`contentLocLang-${index}`}
                          value={event.contentLocLang || ""}
                          onChange={(e) =>
                            handleEventChange(index, "contentLocLang", e.target.value)
                          }
                          placeholder="Enter localized content"
                          rows={2}
                        />
                      </div>

                      {/* Media Type Selection */}
                      <div className="space-y-2">
                        <Label>Content Media</Label>
                        <div className="flex gap-4">
                          <Button
                            type="button"
                            variant={event.mediaType === "image" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleEventChange(index, "mediaType", "image")}
                          >
                            Image
                          </Button>
                          <Button
                            type="button"
                            variant={event.mediaType === "video" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleEventChange(index, "mediaType", "video")}
                          >
                            Video
                          </Button>
                        </div>

                        {event.mediaType === "image" && (
                          <FileUploadField
                            index={index}
                            field="contentPic"
                            label="Upload Content Image"
                            accept="image/*"
                            currentValue={event.contentPic}
                          />
                        )}

                        {event.mediaType === "video" && (
                          <FileUploadField
                            index={index}
                            field="contentVideo"
                            label="Upload Content Video"
                            accept="video/*"
                            currentValue={event.contentVideo}
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="group/btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editData ? "Update Timeline" : "Add Timeline"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteEventIndex !== null} onOpenChange={() => setDeleteEventIndex(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the event from the timeline. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={removeEvent} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TimelineForm;
