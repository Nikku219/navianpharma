import { motion } from "framer-motion";
import {
  Target,
  Eye,
  ShieldCheck,
  Award,
  CheckCircle2,
} from "lucide-react";

const values = [
  "Quality First",
  "Farmer Focused",
  "Innovation Driven",
  "Trust & Transparency",
  "Commitment to Animal Health",
];

const missions = [
  "Provide reliable feed supplement solutions",
  "Support healthier and more productive livestock",
  "Strengthen farmer success through better nutrition",
  "Maintain quality, trust and long-term relationships",
  // "Contribute to India's livestock industry growth",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 bg-gradient-to-b from-[#fdf8f2] to-[#f8f1e8]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-[#4c005f]">
            About Navian Pharma
          </h2>

          <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mt-4" />

          <p className="mt-5 text-lg lg:text-xl font-medium text-yellow-600">
            Healthy Animals. Prosperous Farmers. Stronger Nation.
          </p>
        </motion.div>

        {/* About Intro */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-7 shadow-md border border-purple-100"
          >
            <h3 className="text-2xl font-bold text-[#4c005f] mb-4">
              Who We Are
            </h3>

            <p className="text-gray-700 leading-8">
              Navian Pharma Pvt. Ltd. was established in 2021 with a simple yet
              powerful vision — to support livestock health through quality
              nutrition and help farmers achieve better productivity and
              profitability.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-4 shadow-md border border-purple-100"
          >
            <h3 className="text-2xl font-bold text-[#4c005f] mb-4">
              What We Do
            </h3>

            <p className="text-gray-700 leading-8">
              India’s livestock sector plays a vital role in strengthening
              rural livelihoods. Navian Pharma provides trusted feed
              supplements and animal healthcare solutions that improve
              nutrition, immunity, growth and overall animal well-being.
            </p>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="grid lg:grid-cols-2 gap-4 mt-4">

          {/* Vision */}
          <motion.div
            whileHover={{ y: -5 }}
            className="
              bg-white
              rounded-3xl
              p-4
              shadow-md
              border
              border-purple-100
              transition-all
            "
          >
            <div className="flex items-center gap-4 mb-">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Eye className="w-6 h-6 text-[#4c005f]" />
              </div>

              <h3 className="text-2xl font-bold text-[#4c005f]">
                Our Vision
              </h3>
            </div>

            <p className="text-gray-700 leading-8">
              To become a trusted and recognized name in livestock nutrition
              and animal healthcare by delivering quality solutions that create
              lasting value for farmers and livestock businesses.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            whileHover={{ y: -5 }}
            className="
              bg-white
              rounded-3xl
              p-7
              shadow-md
              border
              border-purple-100
              transition-all
            "
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-yellow-600" />
              </div>

              <h3 className="text-2xl font-bold text-[#4c005f]">
                Our Mission
              </h3>
            </div>

            <div className="space-y-1">
              {missions.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 shrink-0" />

                  <p className="text-gray-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mt-16">
          <h3 className="text-center text-3xl lg:text-4xl font-bold text-[#4c005f] mb-8">
            Our Core Values
          </h3>

          <div className="grid grid-cols-3 justify-center gap-4">
            {values.map((value) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={value}
                className="
                  flex items-center gap-2
                  px-5 py-3
                  bg-white
                  rounded-full
                  border
                  border-yellow-400
                  shadow-sm
                "
              >
                <ShieldCheck className="w-4 h-4 text-yellow-600" />

                <span className="font-medium text-[#4c005f]">
                  {value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Brand Card */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div
            className="
              max-w-4xl
              mx-auto
              bg-gradient-to-r
              from-[#4c005f]
              via-[#62007a]
              to-[#4c005f]
              rounded-3xl
              p-10
              text-center
              shadow-2xl
            "
          >
            <Award className="w-12 h-12 mx-auto text-yellow-400 mb-4" />

            <h3 className="text-3xl lg:text-4xl font-bold text-white">
              Navian Pharma Pvt. Ltd.
            </h3>

            <p className="mt-4 text-lg lg:text-xl text-yellow-300 italic">
              Trusted Nutrition. Better Health. Higher Productivity.
            </p>
          </div>
        </motion.div> */}

      </div>
    </section>
  );
}