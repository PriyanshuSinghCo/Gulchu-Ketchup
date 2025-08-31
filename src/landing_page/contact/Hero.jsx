import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Whatsaap from './../Whatsaap';

const Hero = () => {
  const form = useRef();


const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.EMAILJS_PUBLIC_KEY
    )
    .then(
      (result) => {
        console.log("Success:", result.text);
        alert("Message sent successfully!");
        form.current.reset();
      },
      (error) => {
        console.error("Error:", error);
        alert("Failed to send message.");
      }
    );
};


  return (
    <>
    <section className="bg-gray-50 py-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center mt-20">
        {/* Contact Info */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
          <h1 className="text-4xl font-bold text-red-700 mb-4">Contact Us</h1>
          <p className="text-gray-700 mb-6">
            Have a question, feedback, or want to say hello? Fill out the form
            and our team will get back to you soon!
          </p>
          <div className="text-gray-600">
            <p className="mb-2">
              <span className="font-semibold">Email:</span>{" "}
              kaushikagrofoods@gmail.com
            </p>
            <p>
              <span className="font-semibold">Phone:</span> +91 9905120896
            </p>
          </div>
        </div>

     
        <form
          ref={form}
          onSubmit={sendEmail}
          className="w-full md:w-1/2 space-y-5">
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            type="phone-number"
            name="user_number"
            placeholder="Your Phone Number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
            <input
            type="text"
            name="user_address"
            placeholder="Your Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            required></textarea>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition duration-300">
            Send Message
          </button>
        </form>
      </div>
    </section>
    <Whatsaap/>
    </>
  );
};

export default Hero;
