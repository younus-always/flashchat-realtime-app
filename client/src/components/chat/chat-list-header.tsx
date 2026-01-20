import { Search } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { NewChatPopover } from "./newchat-popover";

interface Props {
      onSearch: (val: string) => void;
}

const ChatListHeader = ({ onSearch }: Props) => {
      return (
            <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-3">
                        <h1 className="text-xl font-semibold">Chat</h1>
                        <div>
                              <NewChatPopover />
                        </div>
                  </div>
                  <div>
                        <InputGroup className="bg-background text-sm" >
                              <InputGroupInput
                                    placeholder="Search..."
                                    onChange={(e) => onSearch(e.target.value)} />
                              <InputGroupAddon>
                                    <Search className="h-4 w-4 text-muted-foreground" />
                              </InputGroupAddon>
                        </InputGroup>
                  </div>
            </div>
      )
}

export default ChatListHeader