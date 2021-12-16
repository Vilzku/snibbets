import {
  faCommentAlt,
  faShareAlt,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from ".";
import { Icon } from "../..";
import {
  deleteVote,
  getVotes,
  postVote,
  updateVote,
} from "../../../utils/api/votes";
import { VoteType } from "../../../utils/types";

interface Props {
  snippetId: string;
  userId: string | undefined;
}

const BottomBar: React.FC<Props> = ({ snippetId, userId }) => {
  const [votes, setVotes] = useState<VoteType[]>([]);
  const navigate = useNavigate();

  const userVote = userId
    ? votes.find((vote: VoteType) => vote.userId === userId)
    : undefined;

  /**
   * Get votes for snippet
   */
  useEffect(() => {
    const getData = async () => {
      const data = await getVotes(snippetId);
      if (data) setVotes(data);
    };
    getData();
  }, [snippetId]);

  /**
   * Create new vote, update existing vote or delete vote based
   * on the state if the user has already voted
   */
  const handleVote = async (type: "positive" | "negative") => {
    const positive = type === "positive";

    try {
      if (!userVote) {
        // Create new vote if user has not voted yet
        const data = await postVote(snippetId, positive, "snippet");
        if (data) {
          setVotes((votes) => [...votes, data]);
        }
      } else if (positive === userVote.positive) {
        // Delete vote if user has voted and same button is pressed
        if (await deleteVote(userVote.id))
          setVotes((votes) =>
            votes.filter((vote: VoteType) => vote.id !== userVote.id)
          );
      } else {
        // Toggle the vote if user has voted and other button is pressed
        const data = await updateVote(userVote.id, positive);
        if (data) {
          setVotes((votes) =>
            votes.map((vote: VoteType) =>
              vote.id === userVote.id ? data : vote
            )
          );
        }
      }
    } catch (error) {
      // TODO: error messages
      console.error(error);
    }
  };

  const positiveVotes = votes.filter((vote: VoteType) => vote.positive).length;
  const negativeVotes = votes.filter((vote: VoteType) => !vote.positive).length;

  return (
    <Container>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleVote("positive");
        }}
        active={userVote && userVote.positive}
      >
        <Icon icon={faThumbsUp} />
        {positiveVotes + " Likes"}
      </Button>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleVote("negative");
        }}
        active={userVote && !userVote.positive}
      >
        <Icon icon={faThumbsDown} />
        {negativeVotes + " Dislikes"}
      </Button>
      <Button onClick={() => navigate("/snippet/" + snippetId)}>
        <Icon icon={faCommentAlt} />
        {" Comment"}
      </Button>
      <Button
        onClick={() => {
          //TODO: Share
        }}
      >
        <Icon icon={faShareAlt} />
        {" Share"}
      </Button>
    </Container>
  );
};

export default BottomBar;
