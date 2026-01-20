import { useChat } from "@/hooks/use-chat";
import { memo, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ArrowLeft, PenBoxIcon, Search, UserIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Spinner } from "../ui/spinner";
import type { UserType } from "@/types/auth.type";
import AvatarWithBadge from "../avatar-with-badge";
import { Checkbox } from "../ui/checkbox";

export const NewChatPopover = memo(() => {
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

      console.log(isOpen);

      return (
            <Popover open={isOpen} onOpenChange={handleOpenChange}>
                  <PopoverTrigger asChild>
                        <Button variant="ghost" onClick={() => setIsOpen(true)} size="icon" className="h-8 w-8 hover:cursor-pointer">
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
                                    ) : !isGroupMode ? (
                                          <>
                                                <NewGroupItem disabled={isCreatingChat} onClick={() => setIsGroupMode(true)} />
                                                {users?.map(user => (
                                                      <ChatUserItem key={user._id}
                                                            user={user}
                                                            isLoading={loadingUserId === user._id}
                                                            disabled={loadingUserId !== null}
                                                            onClick={handleCreateChat} />
                                                ))}
                                          </>
                                    ) : (
                                          users?.map(user => (
                                                <GroupUserItem key={user._id}
                                                      user={user}
                                                      isSelected={selectedUsers.includes(user._id)}
                                                      onToggle={toggleUserSelection} />
                                          ))
                                    )
                              }
                        </div>

                        {isGroupMode && (
                              <div className="border-t p-3">
                                    <Button onClick={handleCreateGroup}
                                          className="w-full"
                                          disabled={isCreatingChat ||
                                                !groupName.trim() ||
                                                selectedUsers.length === 0}>
                                          {isCreatingChat && <Spinner className="w-4 h-4" />}
                                          Create Group
                                    </Button>
                              </div>
                        )}
                  </PopoverContent>
            </Popover >
      )
});
NewChatPopover.displayName = "NewChatPopover";

const UserAvatar = memo(({ user }: { user: UserType }) => (
      <>
            <AvatarWithBadge name={user.name} src={user.avatar ?? ""} />
            <div className="min-w-0 flex-1">
                  <h5 className="text-[13.5px] font-medium truncate">{user.name}</h5>
                  <p className="text-xs text-muted-foreground">Hey there! I'm using flashChat</p>
            </div>
      </>
));
UserAvatar.displayName = "UserAvatar";

const NewGroupItem = memo(({ disabled, onClick }: {
      disabled: boolean;
      onClick: () => void;
}) => (
      <button onClick={onClick} disabled={disabled} className="w-full flex items-center gap-2 p-2 rounded-sm text-left hover:bg-accent transition-colors disabled:opacity-50">
            <div className="bg-primary/10 p-2 rounded-full">
                  <UserIcon className="size-4 text-primary" />
            </div>
            <span>New Group</span>
      </button>
));
NewGroupItem.displayName = "NewGroupItem";

const ChatUserItem = memo(({ user, isLoading, disabled, onClick }: {
      user: UserType;
      disabled: boolean;
      isLoading: boolean;
      onClick: (id: string) => void;
}) => (
      <button
            disabled={isLoading || disabled}
            onClick={() => onClick(user._id)}
            className="relative w-full flex items-center gap-2 p-2 rounded-sm bg-accent text-left transition-colors disabled:opacity-50"
      >
            <UserAvatar user={user} />
            {isLoading && (
                  <Spinner className="absolute w-4 h-4 right-2 ml-auto" />
            )}
      </button>
));
ChatUserItem.displayName = "ChatUserItem";

const GroupUserItem = memo(({ user, isSelected, onToggle }: {
      user: UserType;
      isSelected: boolean;
      onToggle: (id: string) => void;
}) => (
      <label role="button" className="w-full flex items-center gap-2 p-2 rounded-sm bg-accent text-left transition-colors">
            <UserAvatar user={user} />
            <Checkbox checked={isSelected} onCheckedChange={() => onToggle(user._id)} />
      </label>
));
GroupUserItem.displayName = "GroupUserItem";