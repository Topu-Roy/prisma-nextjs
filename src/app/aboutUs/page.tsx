import React from "react";
import Hero from "./_components/hero";
import Testimonials from "./_components/testimonials";
import { teamMembers } from "../../assets/teamMembersArray";
import { testimonialsArray } from "../../assets/testimonialsArray";
import SecondCTA from "../home/_components/secondCTA";
import BrandsWorkedWith from "../home/_components/brandsWorkedWith";
import Team from "./_components/renderTeam";

export default function AboutusPage() {
  return (
    <>
      <Hero />
      <BrandsWorkedWith />
      <Team teamMembers={teamMembers} className="bg-stone-100" />
      <SecondCTA />
      <Testimonials testimonials={testimonialsArray} />
    </>
  );
}
