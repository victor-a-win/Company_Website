import GenericContainer from "@/components/containers/generic.container";
import { Card } from "flowbite-react";
import cardTheme from "@/theme/card.theme";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full ">
        <Image
          src="/Bus_Banner.webp"
          alt="My Bus-ID Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/[.25] flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Bus-ID</h1>
            <p className="text-xl md:text-2xl">Your reliable transportation partner across Indonesia</p>
          </div>
        </div>
      </section>

      <GenericContainer>
        {/* Company Overview */}
        <section className="py-12 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">About Our Company</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Our Story</h3>
              <p className="text-gray-600 dark:text-gray-700">
                Founded in 2010, My Bus-ID has been providing reliable transportation services across Indonesia. 
                We pride ourselves on our commitment to safety, comfort, and punctuality for all our passengers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Our Culture</h3>
              <p className="text-gray-600 dark:text-gray-700">
                At My Bus-ID, we believe in creating a family environment where both our employees and customers 
                feel valued. Our team is dedicated to providing the best travel experience possible.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-300 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} theme={cardTheme.card} className="h-full">
                <h3 className="text-xl font-semibold dark:text-gray-200">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-200">{service.description}</p>
                <button className="mt-4 text-blue-600 hover:underline self-start">
                  Learn More →
                </button>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-12 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} theme={cardTheme.card} className="h-full">
                <p className="italic mb-4 dark:text-gray-200">{testimonial.quote}</p>
                <p className="font-semibold dark:text-gray-200">- {testimonial.author}</p>
                <p className="text-sm text-gray-500 dark:text-gray-200">{testimonial.position}</p>
              </Card>
            ))}
          </div>
        </section>
      </GenericContainer>
    </>
  );
}

// Sample data - replace with your actual content

const services = [
  {
    title: "Intercity Travel",
    description: "Comfortable and reliable bus services connecting major cities across Indonesia."
  },
  {
    title: "Corporate Transport",
    description: "Dedicated bus services for companies, schools, and organizations."
  },
  {
    title: "Tour Packages",
    description: "Customized travel packages for groups and tourists exploring Indonesia."
  }
];

const testimonials = [
  {
    quote: <span>My Bus-ID provides the most comfortable intercity travel experience I&apos;ve ever had. Their punctuality is impressive.</span>,
    author: "Budi Santoso",
    position: "Regular Commuter"
  },
  {
    quote: <span>We&apos;ve been using My Bus-ID for our company events for years. Their service is always reliable and professional.</span>,
    author: "Dewi Anggraini",
    position: "Office Manager"
  },
  {
    quote: <span>The tour package to Bali was exceptionally well-organized. The buses were clean and the drivers were courteous.</span>,
    author: "Sarah Johnson",
    position: "Tourist from Australia"
  }
];