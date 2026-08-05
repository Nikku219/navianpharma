import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Map, Users, ArrowRight } from 'lucide-react';
export function DistributorSection() {
  return (
    <section
      id="distributor"
      className="py-24 bg-cream text-black border relative overflow-hidden">
      
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#D9A441 2px, transparent 2px)',
          backgroundSize: '40px 40px'
        }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            className="font-display text-4xl md:text-5xl font-bold text-cream mb-6">
            
            Partner With Navian Pharma
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
            className="text-lg text-cream/80">
            
            Join our growing network of successful distributors. Build a
            profitable business while contributing to animal healthcare.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Benefits */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{
                opacity: 0,
                x: -30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              className="bg-cream/5 border border-cream/10 p-6 rounded-2xl backdrop-blur-sm">
              
              <Briefcase className="w-8 h-8 text-golden-yellow mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">
                High Profit Margins
              </h3>
              <p className="text-cream/70 text-sm">
                Enjoy competitive pricing and attractive margins that ensure a
                highly profitable business model.
              </p>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: -30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: 0.1
              }}
              className="bg-cream/5 border border-cream/10 p-6 rounded-2xl backdrop-blur-sm">
              
              <Map className="w-8 h-8 text-golden-yellow mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">
                Exclusive Territories
              </h3>
              <p className="text-cream/70 text-sm">
                Get exclusive distribution rights in your region, minimizing
                competition and maximizing growth.
              </p>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: -30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: 0.2
              }}
              className="bg-cream/5 border border-cream/10 p-6 rounded-2xl backdrop-blur-sm">
              
              <Users className="w-8 h-8 text-golden-yellow mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">
                Marketing Support
              </h3>
              <p className="text-cream/70 text-sm">
                Receive comprehensive marketing materials, training, and
                continuous support from our expert team.
              </p>
            </motion.div>
          </div>

          {/* Form */}
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
  className="lg:col-span-7 bg-cream rounded-[2rem] p-6 md:p-8 shadow-2xl text-soft-ink"
>

  <h3 className="font-display text-3xl font-bold text-dark-purple mb-2">
Message For Enquiry  </h3>

  <p className="text-soft-ink/70 mb-8">
    Fill out the form below and our team will contact you shortly.
  </p>

  <form
    className="space-y-5"
    onSubmit={(e) => e.preventDefault()}
  >

    {/* Required Fields */}

    <div className="grid md:grid-cols-2 gap-5">

      <div>
        <label className="block text-sm font-semibold text-dark-purple mb-2">
          Full Name *
        </label>

        <input
          type="text"
          required
          placeholder="Enter your full name"
          className="w-full px-4 py-3 rounded-xl bg-beige border border-dark-purple/10 focus:ring-2 focus:ring-mid-purple outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-dark-purple mb-2">
          Email Address *
        </label>

        <input
          type="email"
          required
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-xl bg-beige border border-dark-purple/10 focus:ring-2 focus:ring-mid-purple outline-none"
        />
      </div>

    </div>

    <div>

      <label className="block text-sm font-semibold text-dark-purple mb-2">
        City / Region *
      </label>

      <input
        type="text"
        required
        placeholder="e.g. Indore, Madhya Pradesh"
        className="w-full px-4 py-3 rounded-xl bg-beige border border-dark-purple/10 focus:ring-2 focus:ring-mid-purple outline-none"
      />

    </div>

    {/* Optional Fields */}

    <div className="grid md:grid-cols-2 gap-5">

      <div>
        <label className="block text-sm font-semibold text-dark-purple mb-2">
          Phone Number
        </label>

        <input
          type="tel"
          placeholder="+91 9876543210"
          className="w-full px-4 py-3 rounded-xl bg-beige border border-dark-purple/10 focus:ring-2 focus:ring-mid-purple outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-dark-purple mb-2">
          Firm / Company Name
        </label>

        <input
          type="text"
          placeholder="Your company name"
          className="w-full px-4 py-3 rounded-xl bg-beige border border-dark-purple/10 focus:ring-2 focus:ring-mid-purple outline-none"
        />
      </div>

    </div>

    <div>

      <label className="block text-sm font-semibold text-dark-purple mb-2">
        Current Business Experience
      </label>

      <textarea
        rows={3}
        placeholder="Tell us about your current business..."
        className="w-full px-4 py-3 rounded-xl bg-beige border border-dark-purple/10 focus:ring-2 focus:ring-mid-purple outline-none resize-none"
      />

    </div>

    <button
      type="submit"
      className="
        w-full
        py-4
        bg-dark-purple
        text-cream
        rounded-xl
        font-bold
        text-lg
        hover:bg-mid-purple
        transition-all
        flex
        items-center
        justify-center
        gap-2
        group
      "
    >

      Submit Application

      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

    </button>

  </form>

</motion.div>
        </div>
      </div>
    </section>);

}