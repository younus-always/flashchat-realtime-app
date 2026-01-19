import { useChat } from "@/hooks/use-chat";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ArrowLeft, PenBoxIcon, Search, UserIcon, UserSearch } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Spinner } from "../ui/spinner";

const NewChatPopover = () => {
      const { users, fetchAllUsers, isUsersLoading, createChat, isCreatingChat } = useChat();

      const [isOpen, setIsOpen] = useState(false);
      const [isGroupMode, setIsGroupMode] = useState(false);
      const [groupName, setGroupName] = useState("");
      const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
      const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

      useEffect(() => {
            fetchAllUsers()
      }, [fetchAllUsers])

      const toggleUserSelection = (id: string) => {
            setSelectedUsers((prev) =>
                  prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id])
      };

      const handleBack = () => {
            resetState()
      };

      const resetState = () => {
            setIsGroupMode(false);
            setGroupName("");
            setSelectedUsers([]);
      };

      const handleOpenChange = (open: boolean) => {
            setIsOpen(open);
            resetState()
      };

      const handleCreateGroup = async () => {
            if (!groupName.trim() || selectedUsers?.length === 0) return;
            await createChat({
                  isGroup: true,
                  participants: selectedUsers,
                  groupName
            });
            setIsOpen(false);
            resetState();
      };

      const handleCreateChat = async (userId: string) => {
            setLoadingUserId(userId);

            try {
                  await createChat({
                        isGroup: false,
                        participantId: userId
                  });
                  setIsOpen(false);
                  resetState();
            } finally {
                  setLoadingUserId(null);
                  setIsOpen(false);
                  resetState();
            }
      };

      return (
            <Popover open={isOpen} onOpenChange={handleOpenChange}>
                  <PopoverTrigger asChild>
                        <Button variant="ghost" onClick={() => setIsOpen(true)} size="icon" className="h-8 w-8">
                              <PenBoxIcon className="h-5! w-5! stroke-1!" />
                        </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-80 min-h-100 max-h-[80vh] flex flex-col p-0 rounded-xl z-999">
                        <div className="flex flex-col gap-2 p-3 border-b">
                              <div className="flex items-center gap-2">
                                    {isGroupMode && (
                                          <Button variant={"ghost"} size={"icon"} onClick={handleBack}>
                                                <ArrowLeft size={16} />
                                          </Button>
                                    )}
                                    <h3 className="text-lg font-semibold">
                                          {isGroupMode ? "New Group" : "New Chat"}
                                    </h3>
                              </div>

                              <InputGroup>
                                    <InputGroupInput
                                          value={isGroupMode ? groupName : ""}
                                          placeholder={isGroupMode ? "Enter group name" : "Search name"}
                                          onChange={
                                                isGroupMode ? (e) => setGroupName(e.target.value) : undefined
                                          } />
                                    <InputGroupAddon>
                                          {isGroupMode ? <UserIcon /> : <Search />}
                                    </InputGroupAddon>
                              </InputGroup>
                        </div>

                        <div className="flex-1 justify-center overflow-y-auto p-1 space-y-1">
                              {
                                    isUsersLoading ? (
                                          <Spinner className="h-6 w-6" />
                                    ) : users && users.length === 0 ? (
                                          <p className="text-center text-muted-foreground">No users found</p>
                                    ) : isGroupMode ? (
                                          <></>
                                    ) : (
                                          <></>
                                    )
                              }
                        </div>
                  </PopoverContent>
            </Popover >
      )
}

export default NewChatPopover