import React from "react";
import { teamMembers } from "../../assets/teamMembersArray";
import RenderTeamMembers from "./_components/RenderTeamMembers";
import TeamHeading from "./_components/teamHeading";

export default function TeamPage() {
  return (
    <div className="mt-[4rem] bg-stone-100 pt-8 md:pt-10 lg:pt-14">
      <TeamHeading />
      <RenderTeamMembers teamMembers={teamMembers} />
    </div>
  );
}
