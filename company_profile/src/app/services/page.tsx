import GenericContainer from "@/components/containers/generic.container";
import { Card, Badge } from "flowbite-react";
import cardTheme from "@/theme/card.theme";
import Image from "next/image";

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full">
        <Image
          src="/bus_services.webp"
          alt="My Bus-ID Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/[.50] flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl md:text-2xl">Comprehensive transportation solutions for all your needs</p>
          </div>
        </div>
      </section>

      <GenericContainer>
        {/* Services Introduction */}
        <section className="py-12 px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Transportation Solutions</h2>
            <p className="text-gray-600 dark:text-gray-700">
              My Bus-ID offers a wide range of transportation services tailored to meet the diverse needs of our customers. 
              From daily commutes to special events, we provide safe, reliable, and comfortable travel experiences.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                theme={cardTheme.card} 
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 w-full mb-4">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold dark:text-gray-200">{service.title}</h3>
                  {service.popular && (
                    <Badge color="info" className="ml-2">
                      Most Popular
                    </Badge>
                  )}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 dark:text-blue-200">Pricing:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {service.pricing.map((price, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{price.option}</span>
                        <span className="font-semibold">{price.cost}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-200">
                  <h4 className="font-semibold mb-2 dark:text-gray-200">What Our Customers Say:</h4>
                  <div className="space-y-3">
                    {service.testimonials.map((testimonial, i) => (
                      <div key={i} className="text-sm italic text-gray-600 dark:text-gray-200">
                        <p>{testimonial.quote}</p>
                        <p className="mt-1 not-italic font-semibold dark:text-blue-200">- {testimonial.author}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Book Now
                </button>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Services Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800 px-4">
          <h2 className="text-3xl font-bold text-center mb-8 dark:text-gray-200">Additional Services</h2>
          <div className="grid md:grid-cols-2 gap-8 dark:text-gray-200">
            <Card theme={cardTheme.card}>
              <h3 className="text-xl font-semibold mb-4">VIP Charter Services</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Experience luxury travel with our VIP charter services. Perfect for corporate events, weddings, 
                and special occasions where comfort and style are paramount.
              </p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Features:</h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Luxury buses with premium seating</li>
                  <li>On-board entertainment systems</li>
                  <li>Complimentary refreshments</li>
                  <li>Professional chauffeur service</li>
                </ul>
              </div>
              <p className="font-semibold text-blue-600">Contact us for custom pricing</p>
            </Card>
            
            <Card theme={cardTheme.card}>
              <h3 className="text-xl font-semibold mb-4">Student Transportation</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Safe and reliable transportation solutions for schools and universities. Our student services 
                are designed with safety as the top priority.
              </p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Features:</h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>GPS tracking for parents and administrators</li>
                  <li>Trained staff with student safety certification</li>
                  <li>Regular maintenance and safety inspections</li>
                  <li>Flexible scheduling for school activities</li>
                </ul>
              </div>
              <p className="font-semibold text-blue-600">Discounted rates for educational institutions</p>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-gray-600 dark:text-gray-700 max-w-2xl mx-auto mb-6">
            We understand that every transportation need is unique. Contact us to discuss custom solutions 
            tailored to your specific requirements.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg text-lg font-semibold transition-colors">
            Contact Us
          </button>
        </section>
      </GenericContainer>
    </>
  );
}

// Sample data - replace with your actual content
const services = [
  {
    title: "Intercity Travel",
    description: "Comfortable and reliable bus services connecting major cities across Indonesia with multiple daily departures.",
    image: "/services/intercity_travel.webp",
    popular: true,
    pricing: [
      { option: "Economy Seat", cost: "IDR 150,000" },
      { option: "Business Class", cost: "IDR 250,000" },
      { option: "Premium (with meal)", cost: "IDR 350,000" }
    ],
    testimonials: [
      {
        quote: <span>I travel between Jakarta and Bandung weekly for work. My Bus-ID is always punctual and comfortable.</span>,
        author: "Rina Wijaya, Business Consultant"
      },
      {
        quote: <span>The business class seats are worth the extra cost. I can work comfortably during the journey.</span>,
        author: "Budi Santoso, Sales Manager"
      }
    ]
  },
  {
    title: "Corporate Transport",
    description: "Dedicated transportation solutions for companies, including employee shuttle services and event transportation.",
    image: "/services/corporate_travel.webp",
    popular: false,
    pricing: [
      { option: "Daily Employee Shuttle", cost: "IDR 5M/month" },
      { option: "Event Transportation", cost: "IDR 2.5M/day" },
      { option: "Executive Transport", cost: "IDR 1.2M/day" }
    ],
    testimonials: [
      {
        quote: <span>My Bus-ID has been our employee shuttle provider for 3 years. Their reliability is exceptional.</span>,
        author: "Dewi Anggraini, HR Director"
      },
      {
        quote: <span>They handled our company retreat transportation flawlessly for 200 employees.</span>,
        author: "Ahmad Fauzi, Event Coordinator"
      }
    ]
  },
  {
    title: "Tour Packages",
    description: <span>Customized travel packages for groups and tourists exploring Indonesia&apos;s beautiful destinations.</span>,
    image: "/services/tour_packages.webp",
    popular: true,
    pricing: [
      { option: "Day Trip (up to 8 hours)", cost: "IDR 2.8M" },
      { option: "Weekend Package (2D1N)", cost: "IDR 8.5M" },
      { option: "Custom Multi-day Tour", cost: "Contact for quote" }
    ],
    testimonials: [
      {
        quote: <span>The Bali tour package was amazing! Comfortable buses and knowledgeable guides.</span>,
        author: "Sarah Johnson, Tourist from Australia"
      },
      {
        quote: <span>Our school trip to Yogyakarta was well-organized and safe thanks to My Bus-ID.</span>,
        author: "Ibu Siti, School Principal"
      }
    ]
  },
  {
    title: "Airport Transfers",
    description: "Reliable airport transportation services with flight monitoring to ensure timely pickups and drop-offs.",
    image: "/services/airport_transfer.webp",
    popular: false,
    pricing: [
      { option: "Standard Sedan (1-3 passengers)", cost: "IDR 350,000" },
      { option: "VIP Van (1-6 passengers)", cost: "IDR 600,000" },
      { option: "Group Shuttle (up to 15 passengers)", cost: "IDR 950,000" }
    ],
    testimonials: [
      {
        quote: <span>I never worry about missing flights when using My Bus-ID&apos;s airport service.</span>,
        author: "Michael Chen, Frequent Flyer"
      },
      {
        quote: <span>Their flight monitoring system is impressive. They adjusted pickup time when my flight was delayed.</span>,
        author: "Lisa Darmawan, Business Executive"
      }
    ]
  },
  {
    title: "Event Transportation",
    description: "Specialized transportation services for weddings, conferences, concerts, and other large events.",
    image: "/services/event_transportation.webp",
    popular: false,
    pricing: [
      { option: "Wedding Package (6 hours)", cost: "IDR 3.5M" },
      { option: "Conference Shuttle (per day)", cost: "IDR 4.2M" },
      { option: "Concert/Stadium Service", cost: "IDR 6.8M" }
    ],
    testimonials: [
      {
        quote: <span>My Bus-ID handled transportation for our 500-guest wedding flawlessly.</span>,
        author: "Rina & Adi, Newlyweds"
      },
      {
        quote: <span>The conference shuttle service was punctual and professional throughout our 3-day event.</span>,
        author: "Conference Organizer, Tech Summit 2023"
      }
    ]
  },
  {
    title: "Monthly Commuter Pass",
    description: "Cost-effective monthly passes for regular commuters with unlimited travel on selected routes.",
    image: "/services/monthly_commuter_pass.webp",
    popular: true,
    pricing: [
      { option: "Jakarta-Bandung Route", cost: "IDR 2.8M/month" },
      { option: "Jakarta-Surabaya Route", cost: "IDR 4.5M/month" },
      { option: "All Routes Pass", cost: "IDR 6.5M/month" }
    ],
    testimonials: [
      {
        quote: <span>The monthly pass saves me both time and money. Highly recommended for regular travelers.</span>,
        author: "Andi Pratama, Consultant"
      },
      {
        quote: <span>I&apos;ve been using the monthly pass for over a year. The convenience is unmatched.</span>,
        author: "Sari Dewi, University Lecturer"
      }
    ]
  }
];