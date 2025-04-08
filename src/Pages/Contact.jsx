import React, { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage("Thank you! Your message has been sent successfully.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage("");
      }, 5000);
    }, 1500);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="bg-[#f0f4f8] min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about the Ice Stupa Project? Want to get involved or
            learn more? Reach out to our team using the contact form or
            information below.
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Send Us a Message
              </h2>

              {submitMessage && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name*
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="Mingmad Dolo"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address*
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="mingmaddolo@example.com"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject*
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="How can we help you?"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Contact Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-cyan-600 mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-800">Address</h4>
                    <p className="text-gray-600">
                      SECMOL Campus, Phey
                      <br />
                      Leh, Ladakh, 194101
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="text-cyan-600 mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-800">Phone</h4>
                    <p className="text-gray-600">
                      <a href="tel:+911982252421" >
                        +91 1982 252421
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a href="tel:+919682574823" >
                        +91 9682574823 (Mobile)
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="text-cyan-600 mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-800">Email</h4>
                    <p className="text-gray-600">
                      <a href="mailto:jigmatdorjey255@gmail.com">
                        jigmatdorjey255@gmail.com
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a href="mailto:sonam.wangchuk@hial.edu.in">
                        sonam.wangchuk@hial.edu.in
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="text-cyan-600 mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-800">Office Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 5:00 PM
                      <br />
                      Saturday: 10:00 AM - 2:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Social Media Links replaced with Hire Me button */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Join Our Team
              </h2>
              <p className="text-gray-600 mb-4">
                Want to join the Ice Stupa Project? Explore current openings and
                opportunities.
              </p>
              <a
                href="/careers"
                className="w-full py-3 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition duration-300 flex items-center justify-center"
              >
                <span className="mr-2">🚀</span>
                <span>View Job Openings</span>
              </a>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Find Us
            </h2>

            {/* Map placeholder - In a real implementation, replace with an actual map component */}
            {/* Google Maps iframe */}
            <div className="w-full h-96 overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.0725038720334!2d77.45567731155839!3d34.16760427300167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38fd97673208e4bb%3A0x884e0e639530fb50!2sHimalayan%20Institute%20of%20Alternatives%20Ladakh!5e1!3m2!1sen!2sin!4v1744087611588!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Himalayan Institute of Alternatives Ladakh Map Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
