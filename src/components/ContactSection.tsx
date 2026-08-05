import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            className="font-display text-4xl md:text-5xl font-bold text-dark-purple mb-6">
            
            Get in Touch
          </motion.h2>
          <motion.p
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: 0.1
            }}
            className="text-lg text-soft-ink/80">
            
            Have questions about our products or need veterinary advice? Our
            team is here to help.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-dark-purple/5 flex items-start gap-4">
              
              <div className="w-12 h-12 rounded-full bg-beige flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-dark-purple" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-dark-purple mb-1">
                  Call Us
                </h4>
                <p className="text-soft-ink/70 text-sm mb-2">
                  Mon-Sat, 9am to 6pm
                </p>
                <a
                  href="tel:+919171303700"
                  className="font-semibold text-mid-purple hover:text-dark-purple transition-colors">
                  
              +91 9171 303700 
               <br />
              +91 8989 403011 
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: 0.1
              }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-dark-purple/5 flex items-start gap-4">
              
              <div className="w-12 h-12 rounded-full bg-beige flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-dark-purple" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-dark-purple mb-1">
                  Email Us
                </h4>
                <p className="text-soft-ink/70 text-sm mb-2">
                  We'll reply within 24 hours
                </p>
                <a
                  href="mailto:info@navianpharma.com"
                  className="font-semibold text-mid-purple hover:text-dark-purple transition-colors">
                  
                  sales@navianpharma.com
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: 0.2
              }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-dark-purple/5 flex items-start gap-4">
              
              <div className="w-12 h-12 rounded-full bg-beige flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-dark-purple" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-dark-purple mb-1">
                  Head Office
                </h4>
                <p className="text-soft-ink/70 text-sm leading-relaxed">
                 121 C Block, Sharda Nagar, Nariyal Kheda,
                 Bhopal, Madhya Pradesh - 462038, India
                </p>
              </div>
            </motion.div>
          </div>

          {/* Map & Quick Form */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            className="lg:col-span-2 bg-white rounded-[2rem] overflow-hidden shadow-premium border border-dark-purple/5 flex flex-col md:flex-row">
            
            {/* Map Placeholder */}
           {/* Google Map */}
           <div className="w-full md:w-1/2 h-64 md:h-auto">
            <iframe
               title="Navian Pharma Location"
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d828.5919183488651!2d77.39290686763916!3d23.28691364811165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c686f637fece1%3A0x61db945143c6fcd2!2sNaryialkheda%20community%20hall!5e0!3m2!1sen!2sin!4v1783424441665!5m2!1sen!2sin"
                   className="w-full h-full border-0"
                   loading="lazy"
                   allowFullScreen
                   referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
            </div>

            {/* Form */}
            <div className="w-full md:w-1/2 p-8">
              <h3 className="font-display text-2xl font-bold text-dark-purple mb-6">
                Send a Message
              </h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-cream border border-dark-purple/10 focus:ring-2 focus:ring-mid-purple outline-none transition-all"
                    placeholder="Your Name" />
                  
                </div>
                <div>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl bg-cream border border-dark-purple/10 focus:ring-2 focus:ring-mid-purple outline-none transition-all"
                    placeholder="Phone Number" />
                  
                </div>
                <div>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-cream border border-dark-purple/10 focus:ring-2 focus:ring-mid-purple outline-none transition-all resize-none"
                    placeholder="How can we help you?">
                  </textarea>
                </div>
                <button className="w-full py-3.5 bg-golden-yellow text-dark-purple rounded-xl font-bold hover:bg-[#e6b555] transition-colors shadow-md">
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}