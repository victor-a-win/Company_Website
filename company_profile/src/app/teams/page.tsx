"use client";

import GenericContainer from "@/components/containers/generic.container";
import { Card } from "flowbite-react";
import cardTheme from "@/theme/card.theme";
import Image from "next/image";
import { useEffect, useState } from "react";

interface TeamMember {
  id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
  };
  location: {
    city: string;
    country: string;
  };
  role: string;
  bio: string;
}

export default function TeamsPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Predefined roles for our team members
  const roles = [
    "CEO & Founder",
    "Operations Director",
    "Head of Safety",
    "Customer Experience Manager",
    "Senior Bus Driver",
    "Maintenance Supervisor",
    "Route Planner",
    "Marketing Director",
    "IT Manager",
    "HR Specialist",
    "Finance Manager",
    "Customer Support Lead"
  ];

  // Predefined bios for our team members
  const bios = [
    "With over 20 years in the transportation industry, dedicated to revolutionizing bus travel in Indonesia.",
    "Ensures our operations run smoothly and efficiently across all routes and services.",
    "Oversees all safety protocols and training programs to ensure passenger safety is never compromised.",
    "Leads our customer service team to ensure every passenger has a pleasant journey with My Bus-ID.",
    "Certified professional driver with 15 years of accident-free service and extensive route knowledge.",
    "Manages our fleet maintenance to ensure all vehicles meet the highest standards of reliability.",
    "Designs and optimizes our routes to provide the most efficient travel options for our customers.",
    "Develops strategies to communicate our services and values to customers across Indonesia.",
    "Manages our technology infrastructure and digital platforms for seamless customer experiences.",
    "Responsible for recruiting and developing the talented individuals who make up our team.",
    "Oversees financial planning and ensures the sustainable growth of our services.",
    "Leads our support team to resolve customer inquiries and ensure satisfaction."
  ];

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://randomuser.me/api/?results=12&nat=us,gb,au,ca');
        const data = await response.json();
        
        // Map API data to our team structure with roles and bios
        const members = data.results.map((user: any, index: number) => ({
          id: user.login.uuid,
          name: user.name,
          email: user.email,
          picture: user.picture,
          location: user.location,
          role: roles[index % roles.length],
          bio: bios[index % bios.length]
        }));
        
        setTeamMembers(members);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load team data. Please try again later.');
        setIsLoading(false);
        console.error('Error fetching team data:', err);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full bg-blue-900">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
            <p className="text-xl md:text-2xl">Meet the dedicated professionals behind My Bus-ID</p>
          </div>
        </div>
      </section>

      <GenericContainer>
        {/* Team Introduction */}
        <section className="py-12 px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">The People Who Drive Us Forward</h2>
            <p className="text-gray-600 dark:text-gray-300">
              At My Bus-ID, our team is our greatest asset. From our drivers to our management staff, 
              every member plays a crucial role in delivering exceptional transportation services 
              to our customers across Indonesia.
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(12)].map((_, index) => (
                <Card key={index} theme={cardTheme.card}>
                  <div className="flex justify-center">
                    <div className="h-32 w-32 rounded-full bg-gray-300 animate-pulse" />
                  </div>
                  <div className="h-6 w-3/4 mx-auto bg-gray-300 rounded animate-pulse my-2" />
                  <div className="h-4 w-1/2 mx-auto bg-gray-200 rounded animate-pulse my-1" />
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse my-1" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse my-1" />
                  <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse my-1" />
                </Card>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 text-xl mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Team Grid */}
          {!isLoading && !error && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} theme={cardTheme.card} className="text-center">
                  <div className="relative h-40 w-40 mx-auto mb-4">
                    <Image
                      src={member.picture.large}
                      alt={`${member.name.first} ${member.name.last}`}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{member.name.first} {member.name.last}</h3>
                  <p className="text-blue-600 mb-2">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {member.location.city}, {member.location.country}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {member.email}
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Team Culture Section */}
          <section className="py-12 mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Our Team Culture</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl font-semibold mb-4">Collaboration & Excellence</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  At My Bus-ID, we believe that our strength comes from our people. We foster a 
                  collaborative environment where every team member's voice is heard and valued.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  We invest in continuous training and development to ensure our team has the 
                  skills and knowledge to deliver exceptional service to our customers.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Diversity & Inclusion</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our team represents the diverse communities we serve across Indonesia. We celebrate 
                  different perspectives and experiences that make our company stronger.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  We're committed to creating an inclusive workplace where everyone feels respected 
                  and has equal opportunities to grow and succeed.
                </p>
              </div>
            </div>
          </section>

          {/* Join Our Team CTA */}
          <section className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Interested in Joining Our Team?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              We're always looking for passionate individuals who share our commitment to excellence 
              in transportation services. Check out our current openings.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg text-lg font-semibold transition-colors">
              View Open Positions
            </button>
          </section>
        </section>
      </GenericContainer>
    </>
  );
}