import React, { useEffect, useState } from "react";
import { BottomContainer, LikeButton } from ".";
import { SubHeader } from "../../../../components";
import {
  deleteVote,
  getVotes,
  postVote,
  updateVote,
} from "../../../../utils/api/votes";
import { getCreatedAtString } from "../../../../utils/dateHelper";
import { VoteType } from "../../../../utils/types";

interface Props {
  createdAt: string;
  updatedAt: string | undefined;
  userId: string | undefined;
  commentId: string;
}

const BottomInfo: React.FC<Props> = ({
  createdAt,
  updatedAt,
  userId,
  commentId,
}) => {
  const [votes, setVotes] = useState<VoteType[]>([]);
  const userVote = userId
    ? votes.find((vote: VoteType) => vote.userId === userId)
    : undefined;

  /**
   * Get votes for comment
   */
  useEffect(() => {
    const getData = async () => {
      const data = await getVotes(commentId);
      if (data) setVotes(data);
    };
    getData();
  }, [commentId]);

  /**
   * Create new vote, update existing vote or delete vote based
   * on the state if the user has already voted
   */
  const handleVote = async (type: "positive" | "negative") => {
    const positive = type === "positive";

    try {
      if (!userVote) {
        // Create new vote if user has not voted yet
        const data = await postVote(commentId, positive, "comment");
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
    <BottomContainer>
      <SubHeader>
        <LikeButton onClick={() => handleVote("positive")}>
          {positiveVotes + " likes"}{" "}
        </LikeButton>
        <b>-</b>
        <LikeButton onClick={() => handleVote("negative")}>
          {negativeVotes + " dislikes"}
        </LikeButton>
        {" - " +
          getCreatedAtString(createdAt as string) +
          (updatedAt
            ? " - updated " +
              getCreatedAtString(updatedAt as string).toLowerCase()
            : "")}
      </SubHeader>
    </BottomContainer>
  );
};

export default BottomInfo;
