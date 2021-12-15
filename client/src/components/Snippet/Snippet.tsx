import {
  faEdit,
  faEllipsisV,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Code, CodeBlock, ShowMore, TopInfo } from ".";
import {
  Card,
  DeleteSnippet,
  EditSnippet,
  Icon,
  Menu,
  MenuItem,
  ToprightIcon,
} from "..";
import { getSnippet } from "../../utils/api/snippets";
import { SnippetType } from "../../utils/types";
import BottomBar from "./BottomBar";

interface Props {
  id: string;
  userId?: string | undefined;
  preview?: boolean;
  newSnippet?: boolean;
  onNewSnippetClick?: () => void;
  removeSnippet?: (id: string) => void;
}

const Snippet: React.FC<Props> = ({
  id,
  preview,
  userId,
  newSnippet,
  onNewSnippetClick,
  removeSnippet,
}) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [snippet, setSnippet] = React.useState<SnippetType | undefined>();
  const navigate = useNavigate();

  // Get snippet data
  useEffect(() => {
    const getData = async () => {
      const data = await getSnippet(id);
      if (data) setSnippet(data);
    };
    if (!newSnippet) getData();
  }, [id, newSnippet]);

  // Open individual snippet
  const handleClick = () => {
    navigate("/" + id);
  };

  const updateSnippet = (updatedSnippet: SnippetType) => {
    setSnippet(updatedSnippet);
  };

  // Placeholder snippet for creating a new snippet
  if (newSnippet)
    return (
      <div onClick={onNewSnippetClick}>
        {userId && (
          <TopInfo
            title="Create something new"
            userId={userId}
            titleClickable
          />
        )}
        <CodeBlock hover>
          <Code>{"Write some code here..."}</Code>
        </CodeBlock>
      </div>
    );

  if (!snippet) return null;

  // Trim snippet content for preview
  let content = "";
  const numberOfLines = snippet.content.split("\n").length || 0;
  if (preview) {
    if (numberOfLines > 8) {
      snippet.content.split("\n").forEach((line, i) => {
        if (i < 8) {
          content += line + "\n";
        }
      });
      content += "...";
    } else {
      content = snippet.content || "";
    }
  } else content = snippet.content;

  return (
    <>
      <Card clickable={preview} onClick={preview ? handleClick : () => null}>
        {/* Menu icon */}
        {snippet.userId === userId && (
          <ToprightIcon
            icon={faEllipsisV}
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(true);
            }}
          />
        )}

        {/* Menu */}
        {showMenu && (
          <Menu closeMenu={() => setShowMenu(false)}>
            <MenuItem
              onClick={() => {
                setShowEditModal(true);
                setShowMenu(false);
              }}
            >
              <Icon icon={faEdit} />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                setShowDeleteModal(true);
                setShowMenu(false);
              }}
            >
              <Icon icon={faTrash} />
              Delete
            </MenuItem>
          </Menu>
        )}

        {/* Snippet information */}
        <TopInfo
          title={snippet.title}
          createdAt={snippet.createdAt}
          updatedAt={snippet.updatedAt}
          userId={snippet.userId}
          titleClickable={preview}
        />
        <CodeBlock>
          <Code>{content}</Code>
          <ShowMore show={preview ? numberOfLines > 8 : false}>
            Show more
          </ShowMore>
        </CodeBlock>
        <BottomBar snippetId={snippet.id} userId={userId} />
      </Card>

      {/* Modal for editing snippets */}
      {snippet.userId === userId && (
        <EditSnippet
          snippet={snippet}
          updateSnippet={updateSnippet}
          show={showEditModal}
          close={() => setShowEditModal(false)}
        />
      )}

      {/* Modal for confirming deletion */}
      {snippet.userId === userId && removeSnippet && (
        <DeleteSnippet
          snippet={snippet}
          show={showDeleteModal}
          close={() => setShowDeleteModal(false)}
          removeSnippet={removeSnippet}
        />
      )}
    </>
  );
};

export default Snippet;
