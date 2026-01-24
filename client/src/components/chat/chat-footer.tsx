import type { MessageType } from "@/types/chat.type";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface Props {
      chatId: string | null;
      currentUserId: string | null;
      replyTo: MessageType | null;
      onCancelReply: () => void;
};

const messageSchema = z.object({
      message: z.string().optional()
});

const ChatFooter = ({ chatId, currentUserId, replyTo, onCancelReply }: Props) => {
      const [image, setImage] = useState<string | null>(null);
      const imageInputRef = useRef<HTMLInputElement | null>(null);
      const form = useForm({
            resolver: zodResolver(messageSchema),
            defaultValues: {
                  message: ""
            }
      });

      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];

            if (!file) return;
            if (!file.type.startsWith("image/")) {
                  toast.error("Please select an image file");
                  return;
            };

            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
      };

      const handleRemoveImage = () => {
            setImage(null);
            if (imageInputRef.current) imageInputRef.current.value = "";
      };

      const onSubmit = (values: { message?: string }) => {
            if (!image && !values.message?.trim()) {
                  toast.error("Please enter a message and select an image");
                  return;
            };

            // Send Message

            onCancelReply();
            handleRemoveImage();
            form.reset();
      };


      return (
            <div className="sticky bottom-0 inset-x-0 bg-card border-t border-border py-4 z-999">
                  {image && (
                        <div className="max-w-6xl mx-auto px-8.5">
                              <div className="relative">
                                    <img src={image} alt="" className="h-16 min-w-16 object-contain bg-muted" />
                                    <Button type="button"
                                          size="icon"
                                          variant="ghost"
                                          className="absolute top-1 right-1 bg-black/50 text-white rounded-full">
                                          <X className="h-3 w-3" />
                                    </Button>
                              </div>
                        </div>
                  )}

                  {/* form */}

            </div>
      )
}

export default ChatFooter