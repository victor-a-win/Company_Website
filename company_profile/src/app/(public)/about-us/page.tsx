import GenericContainer from "@/components/containers/generic.container";
import { Card } from "flowbite-react";
import cardTheme from "@/theme/card.theme";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full">
        <Image
          src="/about_us_banner.webp"
          alt="About My Bus-ID"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/[.25] flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About My Bus-ID</h1>
            <p className="text-xl md:text-2xl">Driving Indonesia forward since 2010</p>
          </div>
        </div>
      </section>

      <GenericContainer>
        {/* Company History */}
        <section className="py-12 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our History</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-4">From Humble Beginnings</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                My Bus-ID was founded in 2010 with just three buses serving routes between Jakarta and Bandung. 
                Our founder, Mr. Ahmad Wijaya, saw the need for reliable, comfortable, and affordable transportation 
                for Indonesians traveling between cities.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                What started as a small family business has now grown into one of Indonesia's leading transportation 
                companies, with over 200 buses serving more than 50 routes across Java, Sumatra, and Bali.
              </p>
            </div>
            <div className="relative h-64 md:h-96">
              <Image
                src="/company_history.webp"
                alt="My Bus-ID early days"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Milestones */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-center mb-6">Our Milestones</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {milestones.map((milestone, index) => (
                <Card key={index} theme={cardTheme.card} className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{milestone.year}</p>
                  <p className="text-gray-600 dark:text-gray-300">{milestone.event}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Behind My Bus-ID is a dedicated team of professionals committed to providing the best transportation
            experience for our customers. From our drivers to our management team, everyone plays a vital role
            in our success.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} theme={cardTheme.card} className="text-center">
                <div className="relative h-48 w-48 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.position}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-12 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Culture</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 md:h-96 order-2 md:order-1">
              <Image
                src="/company_culture.webp" // Replace with your actual culture image
                alt="My Bus-ID company culture"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold mb-4">Values We Live By</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                At My Bus-ID, we believe that our people are our greatest asset. We've built a culture that 
                values safety, reliability, innovation, and customer satisfaction above all else.
              </p>
              <div className="space-y-4">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <value.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{value.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </GenericContainer>
    </>
  );
}

// Icons for values (you might need to install react-icons)
import { 
  FiShield, 
  FiClock, 
  FiUsers, 
  FiHeart,
  FiAward,
  FiTrendingUp
} from "react-icons/fi";

// Sample data - replace with your actual content
const milestones = [
  { year: "2010", event: "Founded with 3 buses" },
  { year: "2013", event: "Expanded to 20 buses" },
  { year: "2016", event: "Launched mobile app" },
  { year: "2020", event: "200+ buses fleet" }
];

const teamMembers = [
  {
    name: "Ahmad Wijaya",
    position: "Founder & CEO",
    bio: "With over 20 years in the transportation industry, Ahmad founded My Bus-ID with a vision to revolutionize Indonesian bus travel.",
    image: "/core_team/CEO_My_BUS_ID.webp" // Replace with actual image
  },
  {
    name: "Sari Dewi",
    position: "Operations Director",
    bio: "Sari ensures our buses run on schedule and our operations meet the highest standards of efficiency.",
    image: "/core_team/Operation_Director_My_BUS_ID.webp" // Replace with actual image
  },
  {
    name: "Budi Santoso",
    position: "Head of Safety",
    bio: "Budi oversees all safety protocols and training programs to ensure passenger safety is never compromised.",
    image: "/core_team/Head_Safety_My_BUS_ID.webp" // Replace with actual image
  },
  {
    name: "Dewi Anggraini",
    position: "Customer Experience Manager",
    bio: "Dewi leads our customer service team to ensure every passenger has a pleasant journey with My Bus-ID.",
    image: "/core_team/Costumer_Manager_My_BUS_ID.webp" // Replace with actual image
  }
];

const values = [
  {
    title: "Safety First",
    description: "We prioritize the safety of our passengers and staff above all else.",
    icon: FiShield
  },
  {
    title: "Punctuality",
    description: "We understand the value of your time and strive to maintain our schedules.",
    icon: FiClock
  },
  {
    title: "Customer Focus",
    description: "Our passengers are at the heart of everything we do.",
    icon: FiUsers
  },
  {
    title: "Compassion",
    description: "We treat everyone with respect and understanding.",
    icon: FiHeart
  },
  {
    title: "Excellence",
    description: "We continuously improve our services to exceed expectations.",
    icon: FiAward
  },
  {
    title: "Innovation",
    description: "We embrace new technologies to enhance the travel experience.",
    icon: FiTrendingUp
  }
];