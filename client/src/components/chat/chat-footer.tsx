/* eslint-disable react-hooks/refs */
import type { MessageType } from "@/types/chat.type";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../ui/button";
import { Paperclip, Send, X } from "lucide-react";
import { Form, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import ChatReplyBar from "./chat-reply-bar";
import { useChat } from "@/hooks/use-chat";

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
      const { sendMessage } = useChat();
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
            sendMessage({
                  chatId,
                  content: values.message,
                  image: image || undefined,
                  replyTo
            });

            onCancelReply();
            handleRemoveImage();
            form.reset();
      };


      return (
            <>
                  <div className="sticky bottom-0 inset-x-0 bg-card border-t border-border py-4 z-999">
                        {image && (
                              <div className="max-w-6xl mx-auto px-8.5">
                                    <div className="relative w-fit">
                                          <img src={image} alt="" className="h-16 min-w-16 object-contain bg-muted" />
                                          <Button type="button"
                                                size="icon"
                                                variant="ghost"
                                                onClick={handleRemoveImage}
                                                className="absolute top-1 right-1 bg-black/50 text-white rounded-full cursor-pointer">
                                                <X className="h-3 w-3" />
                                          </Button>
                                    </div>
                              </div>
                        )}

                        {/* form */}
                        <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)}
                                    className="max-w-6xl mx-auto px-8.5 flex items-end gap-2">
                                    <div className="flex items-center gap-1.5">
                                          <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                className="rounded-full"
                                                onClick={() => imageInputRef.current?.click()}>
                                                <Paperclip className="h-4 w-4" />
                                          </Button>
                                          <input
                                                type="file"
                                                accept="*/image"
                                                ref={imageInputRef}
                                                onChange={handleImageChange}
                                                className="hidden"
                                          />
                                    </div>
                                    <FormField
                                          control={form.control}
                                          name="message"
                                          render={({ field }) => (
                                                <FormItem className="flex-1">
                                                      <Input
                                                            {...field}
                                                            autoComplete="off"
                                                            placeholder="Type new message"
                                                            className="bg-background min-h-10"
                                                      />
                                                </FormItem>
                                          )} />

                                    <Button
                                          type="submit"
                                          size="icon"
                                          className="rounded-lg">
                                          <Send className="h-3.5 w-3.5" />
                                    </Button>
                              </form>
                        </Form>
                  </div>

                  {replyTo && (
                        <ChatReplyBar
                              replyTo={replyTo}
                              currentUserId={currentUserId}
                              onCancel={onCancelReply}
                        />
                  )}
            </>
      )
}

export default ChatFooter