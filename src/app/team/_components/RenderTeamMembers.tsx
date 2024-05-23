"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Text } from "../../_components/text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Facebook, Github, MessageCircle } from "lucide-react";

type TeamMember = {
  id: number;
  role: string;
  name: string;
  imageUrl: string;
};

type props = {
  teamMembers: TeamMember[];
};

export default function RenderTeamMembers(props: props) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const socialIcons = [
    {
      name: "Facebook",
      icon: <Facebook />,
    },
    {
      name: "Whatsapp",
      icon: <MessageCircle />,
    },
    {
      name: "Github",
      icon: <Github />,
    },
  ];

  useEffect(() => {
    setTeamMembers(props.teamMembers);
  }, [props.teamMembers]);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-2 py-6 md:grid-cols-3 md:px-3 md:py-8 lg:py-14 xl:py-16 2xl:px-0">
      {teamMembers.map((member) => (
        <div
          key={`${member.id}-team-member`}
          className="w-full space-y-4 rounded-xl border p-4 shadow"
        >
          <div className="group relative z-10 max-w-sm overflow-hidden rounded-xl">
            <Image
              className="aspect-square w-full transition-all duration-300 group-hover:scale-105"
              src={member.imageUrl}
              height={1024}
              width={1024}
              alt={member.name + " " + member.role}
            />

            <div className="pointer-events-none absolute bottom-0 left-0 z-[19] h-[40%] w-full translate-y-[150%] select-none bg-gradient-to-t from-white/50 to-transparent ring-0 transition-all duration-300 group-hover:translate-y-0" />
            <div className="absolute bottom-[3%] left-0 z-20 flex w-full translate-y-[150%] flex-row items-center justify-around gap-2 ring-0 transition-all duration-300 group-hover:translate-y-0">
              <div className="flex flex-row items-center justify-between gap-3">
                {socialIcons.map((icon) => (
                  <TooltipProvider
                    key={`${icon.name}-social-icon`}
                    delayDuration={300}
                  >
                    <Tooltip>
                      <TooltipTrigger>
                        <Button className="flex items-center justify-center rounded-full bg-black p-2 text-white transition-all duration-300 hover:scale-105">
                          {icon.icon}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{icon.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-2 lg:flex-row lg:items-center">
            <Text size="md" className="font-bold tracking-wide text-black/85">
              {member.name}
            </Text>
            <Text size="s" className="font-medium text-black/70">
              ({member.role})
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}
